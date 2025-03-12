import { getPool } from "./db.js";

export const executeQuery = async (query, params = []) => {
  const pool = await getPool(process.env.DB_NAME);
  try {
    const [results] = await pool.query(query, params);
    return results;
  } catch (error) {
    throw error;
  }
};

export const closePool = async () => {
  const pool = await getPool(process.env.DB_NAME);
  try {
    await pool.end();
    console.log("Pool closed successfully.");
  } catch (error) {
    console.error("Error closing the pool:", error);
  }
};

const getTables = async () => {
  const showQuery = "SHOW TABLES";
  return await executeQuery(showQuery);
};

export const dropTables = async () => {
  const results = await getTables();
  const tables = results.map((result) => Object.values(result)[0]);
  for (const table of tables) {
    const dropQuery = `DROP TABLE IF EXISTS ${table}`;
    await executeQuery(dropQuery);
  }
};

// Insert data to a given 'table' with column properties 'cols' and values '...args'
// To make the insertion logic generic.
export const insertData = async (table, cols, data) => {
  // The placeholder which is '?' instead of 'data' to prevent SQL Injection
  // The 'executeQuery' will have the query and data separately
  const placeholders = data
    .map(() => `(${new Array(cols.length).fill("?").join(",")})`)
    .join(",");
  const values = data.flat();
  const insertQuery = `INSERT INTO ${table} (${cols.join(
    ","
  )}) VALUES ${placeholders}`;
  await executeQuery(insertQuery, values);
};
