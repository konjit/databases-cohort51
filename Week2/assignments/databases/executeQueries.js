import pool  from "./configDB.js";

export const executeQuery = async (query, params = []) => {
  try {
    const [result] = await pool.execute(query, params);
    return result;
  } catch (error) {
    console.error("Database query error: ", error.message);
    throw new Error("Database operation error.");
  }
};


