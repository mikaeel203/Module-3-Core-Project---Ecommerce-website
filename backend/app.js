import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import payplanRoutes from './routes/payplanRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    // origin: 'http://localhost:8081', // Replace with your frontend URL
    // credentials: true,
  }));
app.use(express.json());

// Serve static files (e.g., uploaded images)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Mount routes
app.use('/api/reviews', reviewRoutes);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payplan',payplanRoutes)
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

import db from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';

// Mount admin routes
app.use('/api/admin', adminRoutes);
// Test database connection
const testConnection = async () => {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        console.log('Database connection successful:', rows);
    } catch (err) {
        console.error('Database connection failed:', err);
    }
};

testConnection();

export default app;