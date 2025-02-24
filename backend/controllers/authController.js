import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

export const register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [result] = await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    res.status(201).send('User registered');
  } catch (err) {
    res.status(500).send(err);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0) return res.status(400).send('User not found');

    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) return res.status(400).send('Invalid password');

    const token = jwt.sign({ id: user[0].user_id }, process.env.JWT_SECRET);
    res.header('Authorization', `Bearer ${token}`).send(token);
  } catch (err) {
    res.status(500).send(err);
  }
};