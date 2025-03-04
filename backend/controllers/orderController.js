import db from '../config/db.js';

export const placeOrder = async (req, res) => {
  const { user_id, items, total } = req.body;

  try {
    // Start a transaction
    await db.query('START TRANSACTION');

    // Insert the order
    const [orderResult] = await db.query(
      'INSERT INTO orders (user_id, total) VALUES (?, ?)',
      [user_id, total]
    );

    const orderId = orderResult.insertId;

    // Insert order items
    for (const item of items) {
      await db.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    // Commit the transaction
    await db.query('COMMIT');

    res.status(201).json({ message: 'Order placed successfully', orderId });
  } catch (err) {
    // Rollback the transaction on error
    await db.query('ROLLBACK');
    console.error('Error placing order:', err);
    res.status(500).json({ error: 'Failed to place order' });
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