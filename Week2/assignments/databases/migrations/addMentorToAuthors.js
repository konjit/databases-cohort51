import { executeQuery } from "../executeQueries.js";

export const up = async () => {
  const DOES_COLUMN_MENTOR_EXISTS = `
    SELECT COLUMN_NAME 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'authors' 
    AND COLUMN_NAME = 'mentor';
  `;

  const result = await executeQuery(DOES_COLUMN_MENTOR_EXISTS);
  
  if (result.length > 0) {
    console.log("Mentor column already exists.");
  } else {
    const ADD_MENTOR_COLUMN = `ALTER TABLE authors ADD COLUMN mentor INT;`;
    await executeQuery(ADD_MENTOR_COLUMN);
    console.log("Mentor column added successfully.");
  }
};


export const down = async () => {
  const DROP_MENTOR_COLUMN = `ALTER TABLE authors DROP COLUMN mentor;`;
  await executeQuery(DROP_MENTOR_COLUMN);
  console.log("Mentor column deleted successfully.");
};
