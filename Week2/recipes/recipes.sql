CREATE TABLE recipes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE ingredients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE steps (
    id INT PRIMARY KEY AUTO_INCREMENT,
    description TEXT UNIQUE NOT NULL
);

CREATE TABLE recipe_categories (
    recipe_id INT,
    category_id INT,
    PRIMARY KEY (recipe_id, category_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE recipe_ingredients (
    recipe_id INT,
    ingredient_id INT,
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
);

CREATE TABLE recipe_steps (
    recipe_id INT,
    step_id INT,
    step_order INT,
    PRIMARY KEY (recipe_id, step_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (step_id) REFERENCES steps(id) ON DELETE CASCADE
);

INSERT INTO categories (name) VALUES 
('Japanese'),
('Cake'),
('Vegetarian');

INSERT INTO recipes (name) VALUES 
('Sushi Roll'),
('Matcha Cheesecake'),
('Vegetable Stir-Fry'),
('Miso Soup'),
('Chocolate Lava Cake'),
('Tofu Teriyaki');

INSERT INTO ingredients (name) VALUES 
('Sushi Rice'),
('Nori (Seaweed)'),
('Fresh Salmon'),
('Avocado'),
('Soy Sauce'),
('Rice Vinegar'),
('Matcha Powder'),
('Cream Cheese'),
('Eggs'),
('Flour'),
('Sugar'),
('Milk'),
('Tofu'),
('Miso Paste'),
('Dashi Stock'),
('Carrots'),
('Bell Pepper'),
('Onion'),
('Garlic'),
('Chocolate'),
('Butter');

INSERT INTO recipe_categories (recipe_id, category_id) VALUES 
(1, 1), 
(2, 2), 
(3, 3), 
(4, 1), 
(5, 2), 
(6, 1), 
(6, 3); 


INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES 
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
(2, 7), (2, 8), (2, 9), (2, 10), (2, 11), (2, 12),
(3, 13), (3, 16), (3, 17), (3, 18), (3, 19), (3, 5),
(4, 13), (4, 14), (4, 15),
(5, 20), (5, 21), (5, 11), (5, 9), (5, 10),
(6, 13), (6, 5), (6, 11), (6, 12), (6, 16), (6, 17);


INSERT INTO steps (description) VALUES 
('Cook sushi rice according to package instructions'),
('Spread rice on nori and add fillings'),
('Roll sushi tightly using a bamboo mat'),
('Cut sushi into bite-sized pieces'),

('Preheat oven to 350°F (175°C)'),
('Mix matcha, cream cheese, sugar, and eggs until smooth'),
('Pour into pan and bake for 45 minutes'),
('Let cheesecake cool before serving'),

('Heat oil in a pan and sauté garlic and onions'),
('Add chopped vegetables and stir-fry for 5 minutes'),
('Season with soy sauce and serve hot'),

('Boil water and add dashi stock'),
('Dissolve miso paste in the broth and add tofu'),
('Simmer for 5 minutes and serve'),

('Melt chocolate and butter together'),
('Mix with sugar, eggs, and flour'),
('Pour into ramekins and bake for 10 minutes'),
('Serve warm for a gooey center'),

('Pan-fry tofu until golden brown'),
('Mix soy sauce, sugar, and mirin for the teriyaki sauce'),
('Pour sauce over tofu and simmer for a few minutes'),
('Serve with rice and steamed vegetables');


INSERT INTO recipe_steps (recipe_id, step_id, step_order) VALUES 
-- Sushi Roll
(1, 1, 1), (1, 2, 2), (1, 3, 3), (1, 4, 4),

-- Matcha Cheesecake
(2, 5, 1), (2, 6, 2), (2, 7, 3), (2, 8, 4),

-- Vegetable Stir-Fry
(3, 9, 1), (3, 10, 2), (3, 11, 3),

-- Miso Soup
(4, 12, 1), (4, 13, 2), (4, 14, 3),

-- Chocolate Lava Cake
(5, 15, 1), (5, 16, 2), (5, 17, 3), (5, 18, 4),

-- Tofu Teriyaki
(6, 19, 1), (6, 20, 2), (6, 21, 3), (6, 22, 4);

