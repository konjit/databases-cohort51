import { executeQuery } from "../utils/queryUtilities.js";
import pool from "./dbConfig.js";
import { up as createTables } from "./migrations/transactions-create-tables.js";
import { populateTables } from "./seeds/transactions-insert-values.js";


export const initDatabase = async () => {
  try {
    // Migrate accounts and account_changes tables
    await pool.query(`USE ${process.env.DB_NAME}`);
    await createTables();

    // Populate accounts and account_changes tables -> seeding
    await populateTables();
  } catch (error) {
    console.log("Database operation failed. ", error);
    throw error;
  }
};
