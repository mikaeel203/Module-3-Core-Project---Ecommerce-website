import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

export const register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [result] = await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0) return res.status(400).send('User not found');

    // Compare the password
    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) return res.status(400).send('Invalid password');

    // Generate a JWT token
    const token = jwt.sign({ id: user[0].user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token in the response
    res.header('Authorization', `Bearer ${token}`).send({ token });
  } catch (err) {
    res.status(500).send(err);
  }
};