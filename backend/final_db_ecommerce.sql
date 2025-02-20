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
-- Insert Users
INSERT INTO `users` (`email`, `phone`, `password`) VALUES
('mickey@example.com', '1234567890', 'hashed_password1'),
('luke@example.com', '0987654321', 'hashed_password2'),
('zenande@example.com', '1122334455', 'hashed_password3'),
('sivo@example.com', '2233445566', 'hashed_password4');
-- Insert Products
INSERT INTO `products` (`title`, `description`, `price`, `rating`, `color`, `wood_type`, `category`) VALUES
('Classic Wooden Casket', 'A timeless oak casket with a polished finish.', 1200.99, 4.8, 'Brown', 'Oak', 'Casket'),
('Elegant Urn', 'A beautifully designed ceramic urn.', 299.99, 4.5, 'White', 'Ceramic', 'Urn'),
('Premium Coffin', 'Hand-crafted mahogany coffin with satin lining.', 2500.00, 4.9, 'Dark Brown', 'Mahogany', 'Coffin'),
('Pet Memorial Stone', 'A personalized granite stone for your beloved pet.', 99.99, 4.7, 'Gray', 'Granite', 'Pet Memorial');
-- Insert Customizations
INSERT INTO `customize` (`product_id`, `color`, `wood_type`, `extra1`, `extra2`) VALUES
(1, 'Black', 'Walnut', 'Gold Handles', 'Satin Interior'),
(2, 'Blue', 'Porcelain', NULL, NULL),
(3, 'Cherry Red', 'Mahogany', 'Velvet Lining', 'Silver Handles'),
(4, 'White', 'Marble', 'Engraved Name', NULL);
-- Insert Orders
INSERT INTO `orders` (`customize_id`, `user_id`, `quantity`, `status`) VALUES
(1, 1, 2, 'Processing'),
(2, 2, 1, 'Shipped'),
(3, 3, 1, 'Pending'),
(4, 4, 3, 'Delivered');
-- Insert Wishlist Items
INSERT INTO `wishlist` (`user_id`, `customize_id`) VALUES
(1, 3),
(2, 1),
(3, 2),
(4, 4);
-- Insert Previously Viewed Items
INSERT INTO `viewed_items` (`user_id`, `product_id`) VALUES
(1, 2),
(1, 3),
(2, 1),
(3, 4),
(4, 1);

-- Sample Queries
-- SELECT * FROM `users`;
-- SELECT * FROM `products`;
-- SELECT * FROM `customize`;
-- SELECT * FROM `orders`;
-- SELECT * FROM `wishlist`;
-- SELECT * FROM `viewed_items`;
