import db from '../config/db.js';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ecommerce_products', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

const upload = multer({ storage }).array('images', 5); // Allow up to 5 images

// Add a new product with Cloudinary images
export const addProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send('Error uploading images');
    }

    const { title, description, price, color, wood_type, category } = req.body;

    if (!title || !description || !price || !color || !wood_type || !category) {
      return res.status(400).send('All fields are required.');
    }

    try {
      const [productResult] = await db.query(
        'INSERT INTO products (title, description, price, color, wood_type, category) VALUES (?, ?, ?, ?, ?, ?)',
        [title, description, price, color, wood_type, category]
      );

      const productId = productResult.insertId;

      if (req.files && req.files.length > 0) {
        const imageQueries = req.files.map(file => {
          const imageUrl = file.path; // Cloudinary gives you a full CDN URL
          return db.query(
            'INSERT INTO product_images (product_id, image_url) VALUES (?, ?)',
            [productId, imageUrl]
          );
        });

        await Promise.all(imageQueries);
      }

      res.status(201).send('Product and images uploaded successfully!');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating product.');
    }
  });
};

// Get all products with their images
export const getProducts = async (req, res) => {
    try {
        const [products] = await db.query(`
            SELECT p.*, pi.image_url
            FROM products p
            LEFT JOIN product_images pi ON p.product_id = pi.product_id
        `);

        const groupedProducts = products.reduce((acc, row) => {
            if (!acc[row.product_id]) {
                acc[row.product_id] = {
                    product_id: row.product_id,
                    title: row.title,
                    description: row.description,
                    price: row.price,
                    color: row.color,
                    wood_type: row.wood_type,
                    category: row.category,
                    images: []
                };
            }
            if (row.image_url) {
                // Use Cloudinary URL directly
                acc[row.product_id].images.push(row.image_url);
            }
            return acc;
        }, {});

        res.status(200).json(Object.values(groupedProducts));
    } catch (err) {
        res.status(500).send(err);
    }
};

// Get a single product by ID with its images
export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const [product] = await db.query(
            'SELECT p.*, pi.image_url FROM products p LEFT JOIN product_images pi ON p.product_id = pi.product_id WHERE p.product_id = ?',
            [id]
        );

        if (product.length === 0) {
            return res.status(404).send('Product not found');
        }

        const productData = {
            product_id: product[0].product_id,
            title: product[0].title,
            description: product[0].description,
            price: product[0].price,
            color: product[0].color,
            wood_type: product[0].wood_type,
            category: product[0].category,
            // Use Cloudinary URLs directly
            images: product.map(row => row.image_url).filter(url => url !== null)
        };

        res.status(200).json(productData);
    } catch (err) {
        res.status(500).send(err);
    }
};