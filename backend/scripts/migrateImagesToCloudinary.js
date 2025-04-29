import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mysql from 'mysql2/promise';
import cloudinary from 'cloudinary';

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

let db;

const getImageFullPath = (imageUrl) => {
  // Remove leading slash if present
  const cleanPath = imageUrl.startsWith('/') ? imageUrl.slice(1) : imageUrl;
  return path.join(__dirname, '..', cleanPath);
};

const migrateImages = async () => {
  try {
    // Create MySQL connection
    db = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await db.query('SELECT image_id, image_url FROM product_images');

    if (rows.length === 0) {
      console.log('No images found to migrate');
      return;
    }

    for (const row of rows) {
      const { image_id, image_url } = row;
      const localPath = getImageFullPath(image_url);

      if (!fs.existsSync(localPath)) {
        console.warn(`⚠️ File not found: ${localPath}`);
        continue;
      }

      try {
        const result = await cloudinary.v2.uploader.upload(localPath, {
          folder: 'ecommerce_products',
          timeout: 60000 // 60 seconds timeout
        });

        // Update image_url in the database
        await db.query(
          'UPDATE product_images SET image_url = ? WHERE image_id = ?',
          [result.secure_url, image_id]
        );

        console.log(`✅ Updated image ${image_id}: ${result.secure_url}`);
      } catch (uploadErr) {
        console.error(`❌ Failed to upload image ${image_id}:`, uploadErr.message);
      }
    }

    console.log('🚀 Migration completed!');
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  } finally {
    if (db) {
      await db.end();
      console.log('Database connection closed');
    }
    process.exit(0);
  }
};

migrateImages().catch(console.error);
