import dotenv from "dotenv";

import * as author from "./createAuthors.js";
import * as mentorColumn from "./addMentorToAuthors.js";
import * as authorMentorConstraint from "./addConstraintFKToAuthors.js";
import * as research from "./createResearchPapers.js";
import * as authorResearch from "./createAuthorResearchPapers.js";

import pool  from "../configDB.js";

dotenv.config();

export const initDatabase = async () => {
  try {
    // In other parts of the codes pool.execute is used 
    // because it uses prepared statements to prevent SQL injection.
    // However, in this case we want to use the variable for the .env file
    // thus, using 'query' was the option.
 
    await pool.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    await pool.query(`USE ${process.env.DB_NAME}`);

    await author.up();
    await mentorColumn.up();
    await authorMentorConstraint.up();
    await research.up();
    await authorResearch.up();
    

    console.log("Database initialized successfully.");
  } catch (error) {
    console.log("Database operation failed. ", error);
    throw error;
  }
};

const dropTables = async () => {
  try {
    // In other parts of the codes pool.execute is used 
    // because it uses prepared statements to prevent SQL injection.
    // However, in this case we want to use the variable for the .env file
    // thus, using 'query' was the option.
    await research.down();
    await authorResearch.down();
    await author.down();
  
   

    console.log("Tables deleted successfully.");
  } catch (error) {
    console.log("Database operation failed. ", error);
    throw error;
  }
};




