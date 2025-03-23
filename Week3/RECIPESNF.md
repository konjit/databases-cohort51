# Normalization Assessment of Recipes Database

## The recipes database has a total of 7 tables
# Database Tables and Their Columns

| Table Name        | Column Names                                  | Constraints                                      |
|-------------------|-----------------------------------------------|--------------------------------------------------|
| recipes           | id, name                                      | **PK** (id)                                      |
| categories        | id, name                                      | **PK** (id)                                      |
| ingredients       | id, name                                      | **PK** (id)                                      |
| steps             | id, description                               | **PK** (id)                                      |
| recipe_categories | recipe_id, category_id                        | **PK** (recipe_id, category_id), **FK** (recipe_id → recipes.id), **FK** (category_id → categories.id) |
| recipe_ingredients| recipe_id, ingredient_id                      | **PK** (recipe_id, ingredient_id), **FK** (recipe_id → recipes.id), **FK** (ingredient_id → ingredients.id) |
| recipe_steps      | recipe_id, step_id, step_order                | **PK** (recipe_id, step_id), **FK** (recipe_id → recipes.id), **FK** (step_id → steps.id) |



## Normalization Levels

### First Normal Form (1NF)
To meet 1NF, the tables follow these rules:
- Each cell contains a single value (no multiple values in one cell).
- Column names are unique and meaningful.
- There are no duplicate rows.
- The order of rows doesn’t matter.
- Each column follows a consistent data type** (e.g., INT, VARCHAR, TEXT).

### Second Normal Form (2NF)
To achieve 2NF:
- The tables are already in 1NF.
- There are no partial dependencies, no non-primary key column depends on just part of a composite key.
- Example: In **Table : recipe_steps**, which contains recipe_id, step_id, and step_order, the candidate key is (recipe_id, step_id), and step_order depends on both.

### Third Normal Form (3NF)
To reach 3NF:
- The tables satisfy 1NF and 2NF.
- There are no transitive dependencies, every non-key column depends directly on the primary key.
- Knowing the primary key lets us determine all other columns without relying on additional dependencies.

## Conclusion
This database is normalized up to 3NF. Since there are no duplicate records or unnecessary dependencies, there will be **no anomalies** related to **inserting, updating, or deleting** data. This structure helps maintain data integrity while optimizing performance.
