import db from '../config/db.js';

export const addReview = async (req, res) => {
    const { product_id, rating, comment } = req.body;
    const user_id = req.user.id; // From JWT token
  
    try {
      await db.query(
        'INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
        [product_id, user_id, rating, comment]
      );
      res.status(201).json({ message: 'Review added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add review' });
    }
  };

export const getProductReviews = async (req, res) => {
  const { product_id } = req.params;

  try {
    const [reviews] = await db.query(
      'SELECT * FROM reviews WHERE product_id = ?',
      [product_id]
    );
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};