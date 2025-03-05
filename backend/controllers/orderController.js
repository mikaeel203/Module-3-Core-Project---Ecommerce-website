import db from '../config/db.js';
import { sendOrderConfirmationEmail } from '../utils/emailService.js'; // Import the email service

export const placeOrder = async (req, res) => {
  const { shipping, payment, items, total } = req.body;
  const user_id = req.user.id; // From JWT token

  console.log('Received Order Payload:', { shipping, payment, items, total }); // Log the payload

  let connection;
  try {
    // Validate required fields
    if (!shipping || !payment || !items || !total) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate shipping details
    if (!shipping.name || !shipping.address || !shipping.city || !shipping.state || !shipping.zip) {
      return res.status(400).json({ error: 'Invalid shipping details' });
    }

    // Validate payment details
    if (!payment.cardNumber || !payment.expiry || !payment.cvv) {
      return res.status(400).json({ error: 'Invalid payment details' });
    }

    // Validate items
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Invalid items' });
    }

    // Get a connection from the pool
    connection = await db.getConnection();

    // Start a transaction
    await connection.beginTransaction();

    // Insert order
    const [orderResult] = await connection.query(
      `INSERT INTO orders (
        user_id, total, shipping_name, shipping_address, shipping_city, shipping_state, shipping_zip,
        payment_card_number, payment_expiry, payment_cvv, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id, total,
        shipping.name, shipping.address, shipping.city, shipping.state, shipping.zip,
        payment.cardNumber, payment.expiry, payment.cvv, 'Pending'
      ]
    );
    const order_id = orderResult.insertId;

    // Insert order items
    for (const item of items) {
      await connection.query(
        `INSERT INTO order_items (
          order_id, product_id, customize_id, quantity, price
        ) VALUES (?, ?, ?, ?, ?)`,
        [order_id, item.product_id, item.customize_id || null, item.quantity, item.price]
      );
    }

    // Commit the transaction
    await connection.commit();

    // Send order confirmation email
    const order = {
      order_id,
      total,
      status: 'Pending',
      shipping,
    };
    // await sendOrderConfirmationEmail(req.user.email, order); // Send email

    res.status(201).json({ message: 'Order placed successfully', order_id });
  } catch (err) {
    // Rollback the transaction if an error occurs
    if (connection) await connection.rollback();
    console.error(err);
    res.status(500).json({ error: 'Failed to place order' });
  } finally {
    // Release the connection back to the pool
    if (connection) connection.release();
  }

   return order_id;
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