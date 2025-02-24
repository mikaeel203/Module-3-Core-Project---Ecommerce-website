import db from '../config/db.js';

export const getProfile = async (req, res) => {
  const { id } = req.user;

  try {
    const [user] = await db.query('SELECT * FROM users WHERE user_id = ?', [id]);
    res.status(200).json(user[0]);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.user;
  const { name, email, phone } = req.body;

  try {
    await db.query('UPDATE users SET name = ?, email = ?, phone = ? WHERE user_id = ?', [name, email, phone, id]);
    res.status(200).send('Profile updated');
  } catch (err) {
    res.status(500).send(err);
  }
};