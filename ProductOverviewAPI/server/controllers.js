const db = require('../db/db.js')
const pgp = require('pg-promise')();

exports.products = async (req, res) => {
  const getProductsQuery = pgp.prepare(`
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
  `);

  const page = parseInt(req.query.page) || 1;
  const count = parseInt(req.query.count) || 5;
  const offset = (page - 1) * count;

  try {
    // Use the prepared statement to avoid parsing the SQL every time the query is executed
    const results = await db.one(getProductsQuery, [offset + 1, offset + count]);

    // Send the products JSON object
    res.send(results.products);
  } catch (error) {
    console.error(error);
    res.status(500).send(error + '\nError getting products');
  }
};

exports.product = async (req, res) => {
  try {
    const statement = {
      name: 'get-product-details',
      text: `
        SELECT
          p.id,
          p.name,
          p.slogan,
          p.category,
          p.description,
          p.default_price,
          json_agg(
            json_build_object(
              'feature', f.feature,
              'value', NULLIF(f.value, 'null')
            )
          ) AS features
        FROM
          products.products p
          LEFT JOIN products.features f ON p.id = f.product_id
        WHERE
          p.id = $1
        GROUP BY
          p.id
      `,
      values: [req.params.product_id]
    };

    const result = await db.one(statement);
    res.send(result);

  } catch (error) {
    console.error(error);
    res.status(500).send(error + '\nError getting product details');
  }
};

exports.styles = async (req, res) => {
  try {
    const result = await db.tx(async (t) => {
      const query = `
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
      `;
      return t.any(query, [req.params.product_id]);
    });

    res.send(result);
  } catch (e) {
    console.error(e);
    res.status(500).send(e + '\nError getting styles');
  }
};

exports.related = (req, res) => {
  db.any(`
  SELECT json_agg(r.related_product_id) as "rpIDs"
  FROM products.related as r
  WHERE r.product_id = $1
  `, [req.params.product_id])
    .then((results) => {
      res.send(results[0].rpIDs);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error getting related');
    });
}

exports.getCart = (req, res) => {
  db.any(`
  SELECT sku_id, CAST(COUNT(*) AS INTEGER) as count
  FROM products.cart
  WHERE user_session = $1
  GROUP BY sku_id
`, [req.query.user])
    .then((results) => {

      res.send(results);

    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error + '\nError adding product to cart');
    });
}

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