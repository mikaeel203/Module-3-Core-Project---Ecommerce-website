import db from '../config/db.js';

export const getProfile = async (req, res) => {
  const { id } = req.user; // User ID from the JWT token

  try {
    const [user] = await db.query('SELECT user_id, email, name, phone FROM users WHERE user_id = ?', [id]);
    if (user.length === 0) return res.status(404).send('User not found');
    res.status(200).json(user[0]);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.user; // User ID from the JWT token
  const { name, email, phone } = req.body;

  try {
    await db.query('UPDATE users SET name = ?, email = ?, phone = ? WHERE user_id = ?', [name, email, phone, id]);
    res.status(200).send('Profile updated');
  } catch (err) {
    res.status(500).send(err);
  }
};