const db = require('./db.js')

exports.products = (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 5;

  db.any(`
  SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price
  FROM products.products p
  LIMIT $1 OFFSET $2
  `, [count, (page - 1) * count])
    .then((results) => {
      // Map the product information to the expected format
      const products = results.map((result) => ({
        id: result.id,
        name: result.name,
        slogan: result.slogan,
        description: result.description,
        category: result.category,
        default_price: result.default_price,
      }));
      res.send(products);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error getting products');
    });
};

exports.product = (req, res) => {
  db.any(`
  SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price, f.feature, f.value
  FROM products.products p
  LEFT JOIN products.features f ON p.id = f.product_id
  WHERE p.id = $1
`, [req.params.product_id]).then((results) => {
    // Group the features by feature name and map them to the expected format
    const features = results.reduce((acc, cur) => {
      acc.push({
        feature: cur.feature,
        value: cur.value
      });
      return acc;
    }, []);

    // Map the product information to the expected format
    const product = {
      id: results[0].id,
      name: results[0].name,
      slogan: results[0].slogan,
      description: results[0].description,
      category: results[0].category,
      default_price: results[0].default_price,
      features: features
    };

    res.send(product);
  })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error getting product');
    });
}
exports.styles = (req, res) => {
  db.task(async (task) => {
    const styles = await task.any(`
      SELECT s.id, s.name, s.original_price, s.sale_price, s.default_style,
        json_agg(
          json_build_object(
            'thumbnail_url', p.thumbnail_url,
            'url', p.url
          )
        ) AS photos,
        json_object_agg(
          sk.id::text,
          json_build_object(
            'size', sk.size,
            'quantity', sk.quantity
          )
        ) AS skus
      FROM products.styles s
      LEFT JOIN products.photos p ON s.id = p.style_id
      LEFT JOIN products.skus sk ON s.id = sk.style_id
      WHERE s.product_id = $1
      GROUP BY s.id
    `, [req.params.product_id]);

    const results = styles.map((style) => {
      return {
        style_id: style.id,
        name: style.name,
        original_price: style.original_price.toString(),
        salePrice: style.sale_price ? style.sale_price.toString() : null,
        "default?": style.default_style === '1',
        photos: style.photos || [],
        skus: style.skus || {}
      };
    });

    res.send({
      product_id: req.params.product_id,
      results: results
    });
  })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error getting product');
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