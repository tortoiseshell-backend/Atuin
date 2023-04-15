const db = require('../db/db.js')
const pgp = require('pg-promise')();

exports.products = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const count = parseInt(req.query.count) || 5;
  const offset = (page - 1) * count;

  try {
    // Define the prepared statement with a name
    const statement = {
      name: 'get-products',
      text: `
        SELECT json_agg(
          json_build_object(
            'id', p.id,
            'name', p.name,
            'slogan', p.slogan,
            'description', p.description,
            'category', p.category,
            'default_price', p.default_price
          )
        ) AS products
        FROM products.products p
        WHERE p.id BETWEEN $1 AND $2
      `,
      values: [offset + 1, offset + count],
      // add cache properties
      // this will cache the result for 10 seconds
      // and invalidate it if any changes occur in the products table
      // or if no results were returned by the query
      cache: {
        key: `products-${offset + 1}-${offset + count}`,
        ttl: 60,
        // cache invalidation rules
        table: ['products'],
        empty: true,
      },
    };

    const results = await db.one(statement);
    res.send(results.products);

  } catch (error) {
    console.error(error);
    res.status(500).send(error + '\nError getting products');
  }
};

exports.product = async (req, res) => {
  try {
    // Define the prepared statement with a name
    const statement = {
      name: 'get-product',
      text: `
        SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price,
              json_agg(
                json_build_object(
                  'feature', f.feature,
                  'value', NULLIF(f.value, 'null')
                )
              ) AS features
        FROM products.products p
        LEFT JOIN products.features f ON f.product_id = p.id
        WHERE p.id = $1
        GROUP BY p.id
      `,
      values: [req.params.product_id],
      // add cache properties
      // this will cache the result for 60 seconds
      // and invalidate it if any changes occur in the products or features table
      // or if no results were returned by the query
      cache: {
        key: `product-${req.params.product_id}`,
        ttl: 60,
        table: ['products', 'features'],
        empty: false, // do not cache empty results
      },
    };

    const product = await db.oneOrNone(statement);

    if (!product) {
      res.status(404).send(`Product with id ${req.params.product_id} not found`);
      return;
    }

    product.features = product.features || [];
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send(error + '\nError getting product');
  }
};


exports.styles = async (req, res) => {
  try {
    const statement = await db.prepare({
      name: 'get_styles',
      text: `
        SELECT json_build_object(
          'product_id', $1,
          'results', json_agg(
            json_build_object(
              'style_id', s.id,
              'name', s.name,
              'original_price', s.original_price::text,
              'sale_price', s.sale_price::text,
              'default?', s.default_style = '1',
              'photos', (
                SELECT COALESCE(json_agg(
                  json_build_object(
                    'thumbnail_url', p.thumbnail_url,
                    'url', p.url
                  )
                  ORDER BY p.id ASC
                ), '[]')
                FROM products.photos p
                WHERE p.style_id = s.id
              ),
              'skus', (
                SELECT json_object_agg(
                  sk.id::text,
                  json_build_object(
                    'size', sk.size,
                    'quantity', sk.quantity
                  )
                )
                FROM products.skus sk
                WHERE sk.style_id = s.id
              )
            )
            ORDER BY s.id ASC
          )
        )
        FROM products.styles s
        WHERE s.product_id = $1
        GROUP BY s.product_id
      `,
      cache: {
        key: `styles_${req.params.product_id}`,
        ttl: 60,
        table: ['products.styles', 'products.photos', 'products.skus'],
        empty: false, // do not cache empty results
      }
    });

    const cachedResults = await db.oneOrNone(statement);
    if (!cachedResults) {
      res.status(404).send(`Styles for product with id ${req.params.product_id} not found`);
      return;
    }

    res.send(cachedResults);
  } catch (error) {
    console.error(error);
    res.status(500).send(error + '\nError getting styles');
  }
};



exports.related = async (req, res) => {
  const relatedQuery = new pgp.PreparedStatement({
    name: 'get-related-products',
    text: `
      SELECT related_product_id
      FROM products.related
      WHERE product_id = $1
  `,
    cache: {
      key: `related_${req.params.product_id}`,
      ttl: 60, // cache result for 1 minute
      table: ['products.related'], // invalidate cache if related table is modified
      empty: false, // do not cache empty results
    },
  });

  try {
    const relatedProductIds = await db.map(relatedQuery, [req.params.product_id], result => result.related_product_id);
    res.send(relatedProductIds);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting related');
  }
};


exports.getCart = async (req, res) => {
  const cartQuery = new pgp.PreparedStatement({
    name: 'get-cart',
    text: `
      SELECT sku_id, CAST(COUNT(*) AS INTEGER) as count
      FROM products.cart
      WHERE user_session = $1
      GROUP BY sku_id
    `,
    cache: {
      key: 'getCart:' + req.query.user,
      ttl: 60, // cache for 60 seconds
      table: ['products.cart'], // invalidate cache if cart table is modified
      empty: true, // cache empty results
    },
  });

  try {
    const results = await db.manyOrNone(cartQuery, [req.query.user]);
    res.send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send(error + '\nError getting cart');
  }
};



exports.postCart = (req, res) => {
  const { user, sku_Id } = req.query;
  db.none(`
    INSERT INTO products.cart (user_session, sku_id, active)
    VALUES ($1, $2, 1)
  `, [user, sku_Id])
    .then(() => {
      res.status(201).send('Product added to cart');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error + '\nError adding product to cart');
    });
}