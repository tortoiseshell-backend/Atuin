const db = require('../db/db.js')

exports.products = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const count = parseInt(req.query.count) || 5;
  db.any(`
    SELECT json_build_object(
      'id', p.id,
      'name', p.name,
      'slogan', p.slogan,
      'description', p.description,
      'category', p.category,
      'default_price', p.default_price
    ) as product
    FROM products.products p
    WHERE p.id BETWEEN $1 AND $2
  `, [(page - 1) * count + 1, page * count])
    .then((results) => {
      // Map the product information to the expected format
      const products = results.map((result) => result.product);
      res.send(products);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error getting products');
    });
};

exports.product = (req, res) => {
  db.task(async (t) => {
    // Retrieve the product information
    const productInfo = await t.one(`
      SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price
      FROM products.products p
      WHERE p.id = $1
    `, [req.params.product_id]);

    // Retrieve the features
    const features = await t.any(`
      SELECT json_build_object(
        'feature', f.feature,
        'value', NULLIF(f.value, 'null')
      )
      FROM products.features f
      WHERE f.product_id = $1
    `, [req.params.product_id]);

    // Combine the product information and features into a single object
    const product = {
      ...productInfo,
      features: features.map(feature => feature.json_build_object),
    };

    // Return the formatted product
    return product;
  })
  .then((product) => {
    res.send(product);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error getting product');
  });
};

exports.styles = (req, res) => {
  db.any(`
    SELECT
      s.id AS style_id,
      s.name AS name,
      s.original_price::text AS original_price,
      s.sale_price::text AS sale_price,
      s.default_style = '1' AS "default?",
      (
        SELECT COALESCE(json_agg(
          json_build_object(
            'thumbnail_url', p.thumbnail_url,
            'url', p.url
          )
          ORDER BY p.id ASC
        ), '[]')
        FROM products.photos p
        WHERE p.style_id = s.id
      ) AS photos,
      (
        SELECT json_object_agg(
          sk.id::text,
          json_build_object(
            'size', sk.size,
            'quantity', sk.quantity
          )
        )
        FROM products.skus sk
        WHERE sk.style_id = s.id
      ) AS skus
    FROM products.styles s
    WHERE s.product_id = $1
    GROUP BY s.id
  `, [req.params.product_id])
    .then((results) => {
      const formattedResults = results.map((result) => ({
        style_id: result.style_id,
        name: result.name,
        original_price: result.original_price,
        sale_price: result.sale_price || null,
        "default?": result.default_,
        photos: result.photos,
        skus: result.skus
      }));
      res.send({
        product_id: req.params.product_id,
        results: formattedResults
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error getting styles');
    });
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
      res.status(500).send('Error getting products');
    });
}

exports.getCart = (req, res) => {
  db.any(`
  SELECT sku_id, COUNT(*) as count
  FROM products.cart
  WHERE user_session = $1
  GROUP BY sku_id
`, [req.query.user])
    .then((results) => {
      const formattedResults = results.map((result) => ({
        sku_id: result.sku_id,
        count: Number(result.count)
      }));
      res.send(formattedResults);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error getting products');
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
      res.status(500).send('Error adding product to cart');
    });
}