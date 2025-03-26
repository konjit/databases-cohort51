import pool from "../databases/dbConfig.js";


export const executeQuery = async (query, params = []) => {
  try {
    const [result] = await pool.execute(query, params);
    return result;
  } catch (error) {
    console.error("Database query error: ", error.message);
    throw error;
  }
};

// Insert data to a given 'table' with column properties 'cols' and values 'data'
// To make the insertion logic generic.
export const insertData = async (table, cols, data) => {
  const formattedCols = cols.map((col) => `${col}`);
  const placeholders = data
    .map(() => `(${new Array(cols.length).fill("?").join(",")})`)
    .join(",");
  const values = data.flat();
  
  // The 'IGNORE' handles an error when we try to insert values with duplicate primary key.
  // Otherwise it will throw an 'Error: Duplicate entry: A record with the same primary key already exists.' 
  // Which is not useful in this case because we know we're seeding same data repeatedly. 
  const query = `INSERT IGNORE INTO ${table} (${formattedCols.join(",")}) 
    VALUES ${placeholders}`;
   await executeQuery(query, values);
};

