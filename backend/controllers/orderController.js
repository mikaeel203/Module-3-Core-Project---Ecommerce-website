import db from '../config/db.js';
import { sendOrderConfirmationEmail } from '../utils/emailService.js'; // Import the email service

export const placeOrder = async (req, res) => {
  const { shipping, payment, items, total } = req.body;
  const user_id = req.user.id; // From JWT token

  try {
    // Validate required fields
    if (!shipping || !payment || !items || !total) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Insert the order into the database
    const [orderResult] = await db.query(
      `INSERT INTO orders (user_id, total, shipping_name, shipping_address, shipping_city, shipping_state, shipping_zip, payment_card_number, payment_expiry, payment_cvv, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id, total,
        shipping.name, shipping.address, shipping.city, shipping.state, shipping.zip,
        payment.cardNumber, payment.expiry, payment.cvv, 'Pending'
      ]
    );

    const order_id = orderResult.insertId;

    // Insert order items
    for (const item of items) {
      await db.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`,
        [order_id, item.product_id, item.quantity, item.price]
      );
    }

    // Return the order details
    const [order] = await db.query(
      `SELECT * FROM orders WHERE order_id = ?`,
      [order_id]
    );

    res.status(201).json(order[0]); // Return the order details
  } catch (err) {
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

export const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  const user_id = req.user.id; // From JWT token

  try {
    const [order] = await db.query(
      `SELECT * FROM orders WHERE order_id = ? AND user_id = ?`,
      [orderId, user_id]
    );

    if (!order.length) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const [orderItems] = await db.query(
      `SELECT * FROM order_items WHERE order_id = ?`,
      [orderId]
    );

    res.status(200).json({
      ...order[0],
      items: orderItems,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch order details' });
  }
};