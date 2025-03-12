import { getPool } from "./db.js";

export const executeQuery = async (query, params = []) => {
  const pool = await getPool(process.env.DB_NAME_2);
  try {
    const [results] = await pool.query(query, params);
    return results;
  } catch (error) {
    throw error;
  }
};

const selectQueries = [
  {
    desc: "Countries with population > 8 million",
    query: `SELECT Name FROM country WHERE Population > 8000000`,
  },
  {
    desc: "Countries that have 'land' in their name",
    query: `SELECT Name FROM country WHERE Name LIKE '%land%'`,
  },
  {
    desc: "Cities with population between 500000 and 1 million",
    query: `SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000`,
  },
  {
    desc: "Name of countries on the content Europe",
    query: `SELECT Name FROM country WHERE Continent="Europe"`,
  },
  {
    desc: "All countries in descending order of land area",
    query: `SELECT * FROM country ORDER BY SurfaceArea DESC`,
  },
  {
    desc: "Name of cities in the Netherlands",
    query: `SELECT * FROM city WHERE CountryCode='NLD'`,
  },
  {
    desc: "Population of Rotterdam is",
    query: `SELECT Population FROM city WHERE Name='Rotterdam'`,
  },
  {
    desc: "Top 10 countries by surface area",
    query: `SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10`,
  },
  {
    desc: "Top 10 countries by surface area",
    query: `SELECT Name FROM city ORDER BY Population DESC LIMIT 10`,
  },
  {
    desc: "World population is:",
    query: `SELECT SUM(Population) FROM country `,
  },

];

const executeSelectQuery =  async()=>{
  for(const {desc, query} of selectQueries){
    console.log("\n")
    console.log(desc);
    console.log("=============================");
    const result = await executeQuery(query);
    console.log(result)
  }
}

export const closePool = async () => {
    const pool = await getPool(process.env.DB_NAME_2);
    try {
      await pool.end();
      console.log("Pool closed successfully.");
    } catch (error) {
      console.error("Error closing the pool:", error);
    }
  };

await executeSelectQuery()
await closePool();