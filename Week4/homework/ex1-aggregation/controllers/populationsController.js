import Population from "../models/Population.js";
import { dbName } from "../config/db.js";

export const saveToDb = async (parsedData) => {
  try {
    const populationData = parsedData.map((item) => ({
      country: item.Country,
      year: Number(item.Year),
      age: item.Age,
      femalePopulation: Number(item.F),
      malePopulation: Number(item.M),
    }));

    console.log(`\nImporting population data to ${dbName()}...`);
    await Population.insertMany(populationData);
    console.log("Data population imported successfully.");
  } catch (error) {
    console.error("Error importing data to db:", error);
  }
};
