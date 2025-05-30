import mysql from 'mysql2/promise';
import {config} from 'dotenv';
config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  
});


export default pool;