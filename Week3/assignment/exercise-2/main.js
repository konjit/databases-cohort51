
import  { closePool } from "./databases/dbConfig.js";
import { initDatabase } from "./databases/dbInit.js";

import { transferAmount } from "./databases/transactions/transactions.js";

export const main = async () => {
  try {
    // Init database
    await initDatabase();

    // Transfer amount
    await transferAmount(1000, 101, 102);
  } catch (error) {
    console.log("Database operation failed. ", error);
    throw error;
  }
};

await main();
await closePool();