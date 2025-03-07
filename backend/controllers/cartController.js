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

    // Get the product price
    const productPrice = product[0].price;

    // If customize_id is provided, validate it
    if (customize_id) {
      const [customization] = await db.query('SELECT * FROM customize WHERE customize_id = ?', [customize_id]);
      if (!customization.length) {
        return res.status(404).json({ error: 'Customization not found.' });
      }
    }

    // Insert into cart with price
    await db.query(
      'INSERT INTO cart (user_id, product_id, customize_id, quantity, price) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?',
      [user_id, product_id, customize_id || null, quantity, productPrice, quantity]
    );
    res.status(201).json({ message: 'Added to cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add to cart.' });
  }
};

export const removeFromCart = async (req, res) => {
  const { cart_id } = req.params; // Get cart_id from URL parameter
  const user_id = req.user.id;

  try {
    await db.query('DELETE FROM cart WHERE user_id = ? AND cart_id = ?', [user_id, cart_id]);
    res.status(200).json({ message: 'Removed from cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove from cart.' });
  }
};

export const removeAllFromCart = async (req, res) => {
  const user_id = req.user.id;

  try {
    await db.query('DELETE FROM cart WHERE user_id = ?', [user_id]);
    res.status(200).json({ message: 'Removed from cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove from cart.' });
  }
}


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
        (SELECT pi.image_url 
         FROM product_images pi 
         WHERE pi.product_id = p.product_id 
         LIMIT 1) AS image_url,
        cu.color AS custom_color,
        cu.wood_type AS custom_wood_type
      FROM cart c
      JOIN products p ON c.product_id = p.product_id
      LEFT JOIN customize cu ON c.customize_id = cu.customize_id
      WHERE c.user_id = ?
      GROUP BY c.cart_id
    `, [user_id]);

    // Convert relative paths to absolute URLs
    const processedItems = cartItems.map(item => ({
      ...item,
      image_url: item.image_url 
        ? `${req.protocol}://${req.get('host')}${item.image_url}`
        : null
    }));

    res.status(200).json(processedItems);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
};

export const updateCart = async (req, res) => {
  const { cart_id } = req.params; // Get cart_id from URL parameter
  const { quantity } = req.body;
  const user_id = req.user.id;

  try {
    await db.query('UPDATE cart SET quantity = ? WHERE user_id = ? AND cart_id = ?', [
      quantity,
      user_id,
      cart_id,
    ]);
    res.status(200).json({ message: 'Quantity updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update quantity.' });
  }
};