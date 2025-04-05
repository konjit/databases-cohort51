## Recipes data model comparisons of RDBMS vs NoSQL

### Question 1: What are the collections? 

The `collections` for  recipes db are 
 - `recipes`  
 - `categories` 
 - `ingredients` depending on specific details
 
---

### Question 2: What information will you embed in a document and with you will store normalized.

The `steps` and `ingredients` can be embedded in `recipes` and `categories` is normalized. `ingredients` can also be normalized to  avoid redundancy and improve search by ingredient where reused across multiple recipes. 

---

### Question 3: What made you decide when to embed information? What assumptions did you make?

The decision to embed the `steps` and `ingredients` into the `recipes` collection is based on the following assumptions:

- Although `steps` and `ingredients` can be shared among multiple `recipes`, each recipe has unique combinations of ordering, quantity, and instructions.
- `steps` and `ingredients` of a certain `recipe` are unlikely to change, which means there will be fewer updates.
- It is rare to search by `steps`.

---

### Question 4: If you were given MySQL and MongoDB as choices to build the recipes' database at the beginning, which one would you choose and why?

I would choose `MongoDB` to build the recipes database but it all depends on the specific use cases. In general, an application using a recipes DB is read-heavy, with entities like `recipes`, `steps`, and `ingredients` rarely changing, making MongoDB a natural choice for fast read operations.  

- The structure of `recipes`, with `steps` and `ingredients` embedded directly in a recipe, suits MongoDB's document model. This can be easily represented using a **Mongoose schema**.

    Here’s how the **Recipe Schema** might look:

    ```js
    const mongoose = require('mongoose');
    const { Schema } = mongoose;

    const recipeSchema = new Schema({
      title: { type: String, required: true },
      categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
      ingredients: [
        { name: { type: String, required: true }, quantity: { type: String, required: true } }
      ],
      steps: [String]
    });

    const Recipe = mongoose.model('Recipe', recipeSchema);
    ```

    Example of the **Category Schema**:

    ```js
    const categorySchema = new Schema({
      name: { type: String, required: true }
    });

    const Category = mongoose.model('Category', categorySchema);
    ```





