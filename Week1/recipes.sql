CREATE SCHEMA IF NOT EXISTS `recipes_db`;
USE `recipes_db`;

CREATE TABLE IF NOT EXISTS `recipes`(
 `id` INT AUTO_INCREMENT PRIMARY KEY,
 `name` VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS `dish_categories`(
 `id` INT AUTO_INCREMENT PRIMARY KEY,
 `name` VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS `recipes_dish_categories` (
  `recipe_id` INT,
  `dish_category_id` INT,
  PRIMARY KEY (`recipe_id`, `dish_category_id`),
  FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`),
  FOREIGN KEY (`dish_category_id`) REFERENCES `dish_categories`(`id`)
);

CREATE TABLE IF NOT EXISTS `ingredient_categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS `ingredients` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(45) NOT NULL,
  `category_id` INT,
  FOREIGN KEY (`category_id`) REFERENCES `ingredient_categories`(`id`)
);

CREATE TABLE  `steps` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `step_description` TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS `recipes_steps` (
  `recipe_id` INT,
  `step_id` INT,
  `step_order` INT,
  PRIMARY KEY (`recipe_id`, `step_id`),
  FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`),
  FOREIGN KEY (`step_id`) REFERENCES `steps`(`id`)
);

  
