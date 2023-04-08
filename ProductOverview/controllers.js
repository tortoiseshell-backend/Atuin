const db = require('./db.js')

exports.products = (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 5;

  const products = db.any(`
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
  const product = db.any(`
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
  const styles = db.any(`

  `
    , [req.query.product_id]).then((results) => { res.send(results) })
}
exports.related = (req, res) => {
  const related = db.any(`

  `
    , [req.query.product_id]).then((results) => { res.send(results) })
}