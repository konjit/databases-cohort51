
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

let pool;

export const getPool = async (dbName) => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: dbName,
    });
  }
  return pool;
};


export default getPool;