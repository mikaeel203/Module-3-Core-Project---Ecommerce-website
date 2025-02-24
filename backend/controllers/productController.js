import db from '../config/db.js';

export const getProducts = async (req, res) => {
  const { category, minPrice, maxPrice, search } = req.query;
  let query = 'SELECT * FROM products WHERE 1=1';

  if (category) query += ` AND category = '${category}'`;
  if (minPrice) query += ` AND price >= ${minPrice}`;
  if (maxPrice) query += ` AND price <= ${maxPrice}`;
  if (search) query += ` AND title LIKE '%${search}%'`;

  try {
    const [products] = await db.query(query);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const [product] = await db.query('SELECT * FROM products WHERE product_id = ?', [id]);
    if (product.length === 0) return res.status(404).send('Product not found');
    res.status(200).json(product[0]);
  } catch (err) {
    res.status(500).send(err);
  }
};