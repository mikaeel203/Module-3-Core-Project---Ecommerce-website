import db from '../config/db.js';

export const addToCart = async (req, res) => {
  const { product_id, customize_id, quantity } = req.body;
  const user_id = req.user.id; // From JWT token

  try {
    // Check if the product exists
    const [product] = await db.query('SELECT * FROM products WHERE product_id = ?', [product_id]);
    if (!product.length) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    // If customize_id is provided, validate it
    if (customize_id) {
      const [customization] = await db.query('SELECT * FROM customize WHERE customize_id = ?', [customize_id]);
      if (!customization.length) {
        return res.status(404).json({ error: 'Customization not found.' });
      }
    }

    // Insert into cart
    await db.query(
      'INSERT INTO cart (user_id, product_id, customize_id, quantity) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?',
      [user_id, product_id, customize_id || null, quantity, quantity]
    );

    res.status(201).json({ message: 'Added to cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add to cart.' });
  }
};

export const removeFromCart = async (req, res) => {
  const user_id = req.user.id;
  const { cart_id } = req.params;

  try {
    await db.query('DELETE FROM cart WHERE user_id = ? AND cart_id = ?', [user_id, cart_id]);
    res.status(200).json({ message: 'Removed from cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove from cart.' });
  }
};


export const getCart = async (req, res) => {
  const user_id = req.user.id;

  try {
    const [cartItems] = await db.query(`
      SELECT 
        c.cart_id,
        c.quantity,
        p.product_id,
        p.title,
        p.description,
        p.price,
        p.category,
        MIN(pi.image_url) AS image_url, -- Aggregate image URLs
        cu.color AS custom_color,
        cu.wood_type AS custom_wood_type
      FROM cart c
      JOIN products p ON c.product_id = p.product_id
      LEFT JOIN product_images pi ON p.product_id = pi.product_id
      LEFT JOIN customize cu ON c.customize_id = cu.customize_id
      WHERE c.user_id = ?
      GROUP BY c.cart_id -- Group by cart_id only
    `, [user_id]);

    res.status(200).json(cartItems || []);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
};