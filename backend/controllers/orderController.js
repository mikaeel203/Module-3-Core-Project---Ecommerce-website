import db from '../config/db.js';

export const placeOrder = async (req, res) => {
  const { user_id, items, total } = req.body;

  try {
    await db.query('INSERT INTO orders (user_id, total) VALUES (?, ?)', [user_id, total]);
    res.status(201).send('Order placed');
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getOrders = async (req, res) => {
  const { user_id } = req.params;

  try {
    const [orders] = await db.query('SELECT * FROM orders WHERE user_id = ?', [user_id]);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).send(err);
  }
};