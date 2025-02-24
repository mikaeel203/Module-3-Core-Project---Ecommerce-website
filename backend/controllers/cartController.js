import db from '../config/db.js';

export const addToCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  try {
    await db.query('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)', [user_id, product_id, quantity]);
    res.status(201).send('Added to cart');
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getCart = async (req, res) => {
  const { user_id } = req.params;

  try {
    const [cartItems] = await db.query('SELECT * FROM cart WHERE user_id = ?', [user_id]);
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).send(err);
  }
};