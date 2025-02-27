DROP SCHEMA IF EXISTS `eternal_rest_db` ;
CREATE SCHEMA `eternal_rest_db` ;
USE eternal_rest_db;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `eternal_rest_db`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`user_id`));
  
  SELECT *from users;
  
  CREATE TABLE `eternal_rest_db`.`products` (
  `products_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `description` MEDIUMTEXT NOT NULL,
  `price` VARCHAR(45) NOT NULL,
  `rating` DECIMAL(2,1) NULL,
  PRIMARY KEY (`products_id`));
  
SELECT *from products;
  
  CREATE TABLE `eternal_rest_db`.`customize` (
  `customize_id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
--   `price` VARCHAR(50) NOT NULL,
--   `description` MEDIUMTEXT NOT NULL,
--   `title` VARCHAR(45) NULL,
  `color` VARCHAR(45) NOT NULL,
  `extra1` VARCHAR(45) NULL,
  `extra2` VARCHAR(45) NULL,
  PRIMARY KEY (`customize_id`));
  
SELECT *from customize;

CREATE TABLE `eternal_rest_db`.`orders` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `customize_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`order_id`),
  CONSTRAINT `customize_id`
    FOREIGN KEY ( `customize_id`)
    REFERENCES `eternal_rest_db`.`customize` ( `customize_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `eternal_rest_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
 SELECT *from orders;   
    
 CREATE TABLE `eternal_rest_db`.`wishlist` (
  `wish_id` INT NOT NULL AUTO_INCREMENT,
  `customize_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`wish_id`),
  INDEX `customize_id_idx` (`customize_id` ASC) VISIBLE,
  CONSTRAINT `fk_customize_id`
    FOREIGN KEY (`customize_id`)
    REFERENCES `eternal_rest_db`.`customize` (`customize_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `eternal_rest_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
SELECT *from wishlist;
  
INSERT INTO `eternal_rest_db`.`users` (`email`, `password`) VALUES ('juan@gmail.com', 'My name is Zwuan');


