import { executeQuery } from "../executeQueries.js";

export const up = async () => {
  const DOES_FK_CONSTRAINT_EXIST = `
    SELECT CONSTRAINT_NAME 
    FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
    WHERE CONSTRAINT_NAME = 'author_mfk' 
    AND TABLE_NAME = 'authors';
  `;

  const result = await executeQuery(DOES_FK_CONSTRAINT_EXIST);

  if (result.length > 0) {
    console.log("Foreign key constraint already exists.");
  } else {
    const ADD_FK_CONSTRAINT = `
      ALTER TABLE authors 
      ADD CONSTRAINT author_mfk 
      FOREIGN KEY (mentor) 
      REFERENCES authors(author_id) 
      ON DELETE CASCADE;
    `;
    await executeQuery(ADD_FK_CONSTRAINT);
    console.log("Foreign key added successfully.");
  }
};

export const down = async () => {
  const DROP_FK_CONSTRAINT = `
    ALTER TABLE authors 
    DROP CONSTRAINT author_mfk;`;
  await executeQuery(DROP_FK_CONSTRAINT);
  console.log("Foreign key deleted successfully.");
};
