import { executeQuery } from "../executeQueries.js";

export const up = async () => {
  const CREATE_AUTHOR = `
    CREATE TABLE IF NOT EXISTS authors(
        author_id INT PRIMARY KEY,
        author_name VARCHAR(50) NOT NULL,
        university VARCHAR(50) NOT NULL,
        date_of_birth DATE NOT NULL,
        gender ENUM('M', 'F'),
        h_index INT
    );`;

  await executeQuery(CREATE_AUTHOR);
  console.log("Authors table created successfully.");
};

export const down = async () => {
  const DROP_AUTHOR = `DROP TABLE IF EXISTS  authors;`;

  await executeQuery(DROP_AUTHOR);
  console.log("Authors table deleted successfully.");
};

