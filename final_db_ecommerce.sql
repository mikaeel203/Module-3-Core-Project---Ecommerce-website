-- Drop existing schema if it exists
DROP SCHEMA IF EXISTS `eternal_rest_db`; 
CREATE SCHEMA `eternal_rest_db`; 
USE eternal_rest_db;

-- Users Table (Renamed from 'customers' to 'users' to match your schema)
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(50) NOT NULL UNIQUE,
  `phone` VARCHAR(20) UNIQUE,
  `password` VARCHAR(255) NOT NULL,
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

-- Orders Table
DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `customize_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `quantity` INT NOT NULL CHECK (quantity > 0),
  `order_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `status` ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
  PRIMARY KEY (`order_id`),
  CONSTRAINT `fk_customize_id` FOREIGN KEY (`customize_id`) REFERENCES `customize`(`customize_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
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

-- Insert Sample User
INSERT INTO `users` (`email`, `password`) VALUES ('juan@gmail.com', 'My name is Zwuan');

-- Sample Queries
-- SELECT * FROM `users`;
-- SELECT * FROM `products`;
-- SELECT * FROM `customize`;
-- SELECT * FROM `orders`;
-- SELECT * FROM `wishlist`;
-- SELECT * FROM `viewed_items`;
