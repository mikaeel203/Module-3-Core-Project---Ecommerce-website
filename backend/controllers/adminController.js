import db from '../config/db.js';

export const getProductStats = async (req, res) => {
  try {
    // Fetch total number of products
    const [totalProducts] = await db.query('SELECT COUNT(*) AS totalProducts FROM products');

    // Fetch most viewed product
    const [mostViewedProduct] = await db.query(`
      SELECT p.title, COUNT(vi.product_id) AS views
      FROM viewed_items vi
      JOIN products p ON vi.product_id = p.product_id
      GROUP BY vi.product_id
      ORDER BY views DESC
      LIMIT 1
    `);

    // Fetch total number of orders
    const [totalOrders] = await db.query('SELECT COUNT(*) AS totalOrders FROM orders');

    res.status(200).json({
      totalProducts: totalProducts[0].totalProducts,
      mostViewedProduct: mostViewedProduct[0] || { title: 'No views yet', views: 0 },
      totalOrders: totalOrders[0].totalOrders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching product stats');
  }
};

export const addProduct = async (req, res) => {
  const { title, description, price, category } = req.body;

  try {
    await db.query(
      'INSERT INTO products (title, description, price, category) VALUES (?, ?, ?, ?)',
      [title, description, price, category]
    );

    res.status(201).json({ message: 'Product added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding product');
  }
};