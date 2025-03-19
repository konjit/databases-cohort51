import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

let pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const closePool = async () => {
  try {
    pool.end();
    console.log("Pool closes successfully.");
  } catch (error) {
    console.error("Pool Close failed: ", error);
    throw new Error("Database operation failed.");
  }
};

export default pool;
