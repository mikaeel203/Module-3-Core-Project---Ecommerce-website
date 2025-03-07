DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(100),
  `phone` VARCHAR(20) UNIQUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
);
-- Products Table
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `description` MEDIUMTEXT NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `rating` DECIMAL(3,2) DEFAULT 0.0,
  `color` VARCHAR(50),
  `wood_type` VARCHAR(100),
  `category` ENUM('Casket', 'Urn', 'Coffin', 'Pet Memorial') NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`)
);
-- Product Images Table
DROP TABLE IF EXISTS `product_images`;
CREATE TABLE `product_images` (
  `image_id` INT AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE CASCADE
);
-- Customization Table
DROP TABLE IF EXISTS `customize`;
CREATE TABLE `customize` (
  `customize_id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `color` VARCHAR(50) NOT NULL,
  `wood_type` VARCHAR(100),
  `extra1` VARCHAR(45) NULL,
  `extra2` VARCHAR(45) NULL,
  PRIMARY KEY (`customize_id`),
  FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE CASCADE
);
-- Cart Table
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `cart_id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL, -- Add product_id for non-customized products
  `customize_id` INT NULL,   -- Make customize_id optional
  `quantity` INT NOT NULL CHECK (quantity > 0),
  `added_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE CASCADE,
  FOREIGN KEY (`customize_id`) REFERENCES `customize`(`customize_id`) ON DELETE CASCADE
);
-- Orders Table
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `total` DECIMAL(10,2) NOT NULL,
  `order_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `status` ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
  PRIMARY KEY (`order_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
);
-- Order Items Table
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (
  `order_item_id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `customize_id` INT NOT NULL,
  `quantity` INT NOT NULL CHECK (quantity > 0),
  `price` DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE,
  FOREIGN KEY (`customize_id`) REFERENCES `customize`(`customize_id`) ON DELETE CASCADE
);
-- Wishlist Table
DROP TABLE IF EXISTS `wishlist`;
CREATE TABLE `wishlist` (
  `wish_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `customize_id` INT NOT NULL,
  `added_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`wish_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`customize_id`) REFERENCES `customize`(`customize_id`) ON DELETE CASCADE
);
-- Previously Viewed Items Table
DROP TABLE IF EXISTS `viewed_items`;
CREATE TABLE `viewed_items` (
  `view_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `viewed_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`view_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE CASCADE
);