import { getPool } from "./db-config.js";

const executeQuery = async (query, params = []) => {
  const pool = await getPool();

  try {
    const [result] = await pool.query(query);
    return result;
  } catch (error) {
    throw error;
  }
};

const listIngredients = async (recipe) => {
  const GET_INGREDIENTS = `
    SELECT i.name AS ingredient_name
    FROM recipes as r 
    INNER JOIN recipe_ingredients AS ri ON r.id = ri.recipe_id
    INNER JOIN ingredients AS i ON i.id = ri.ingredient_id
    WHERE r.name = "${recipe}";
    `;
  return await executeQuery(GET_INGREDIENTS);
};

// Gets recipes that contain the certain ingredient
const getRecipesWithIngredient = async (ingredient) => {
  const GET_RECIPES = `
    SELECT r.name AS recipe_name
    FROM recipes AS r 
    INNER JOIN recipe_ingredients AS ri ON r.id = ri.recipe_id
    INNER JOIN ingredients AS i ON i.id = ri.ingredient_id
    WHERE i.name LIKE "%${ingredient}%";
    `;
  return await executeQuery(GET_RECIPES);
};

// Gets recipes that do not contain the certain ingredient
const getRecipesWithNoIngredient = async (ingredient) => {
  const GET_RECIPES = `
    SELECT r.name AS recipe_name
    FROM recipes AS r 
    INNER JOIN recipe_ingredients AS ri ON r.id = ri.recipe_id
    INNER JOIN ingredients AS i ON i.id = ri.ingredient_id
    WHERE i.name NOT LIKE "%${ingredient}%";
    `;
  return await executeQuery(GET_RECIPES);
};

const listSteps = async (recipe) => {
  const GET_STEPS = `
    SELECT s.description AS instruction, rs.step_order AS orders
    FROM recipes AS r 
    INNER JOIN recipe_steps AS rs ON r.id = rs.recipe_id
    INNER JOIN steps AS s ON s.id = rs.step_id
    WHERE r.name = "${recipe}";
    `;
  return await executeQuery(GET_STEPS);
};

// Display recipe ingredients and steps given recipe name
const displayRecipeDetails = async (recipeName) => {
  const ingredients = await listIngredients(recipeName);
  const steps = await listSteps(recipeName);

  console.log(`\nIngredients for ${recipeName}:`);
  ingredients.forEach((i) => console.log(`- ${i.ingredient_name}`));

  console.log(`\nSteps for ${recipeName}:`);
  steps
    .sort((a, b) => a.orders - b.orders)
    .forEach((step) => {
      console.log(`Step ${step.orders}: ${step.instruction}`);
    });

  console.log("\n" + "-".repeat(40));
};

// Gets recipes given category
const getRecipeByCategory = async (category) => {
  const GET_RECIPES_BY_CATEGORY = `
    SELECT r.name, c.name FROM recipes as r 
    inner join recipe_categories as rc ON r.id=rc.recipe_id
    inner join categories as c on c.id=rc.category_id
    where c.name="${category};"`;

  return await executeQuery(category);
};

export const closePool = async () => {
  const pool = await getPool(process.env.DB_NAME_2);
  try {
    await pool.end();
    console.log("Pool closed successfully.");
  } catch (error) {
    console.error("Error closing the pool:", error);
  }
};

await displayRecipeDetails("Sushi Roll");
await closePool();
