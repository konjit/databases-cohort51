import { connectDb, disconnectDb } from "./config/db.js";
import { parseData, refreshDb, getFilePath } from "./utils/utils.js";
import { saveToDb } from "./controllers/populationsController.js";
import Population from "./models/Population.js";
import { FILE_NAME, continents } from "./constants.js";

const seedDb = async () => {
  try {
    await refreshDb();
    await saveToDb(await parseData(getFilePath(FILE_NAME)));
  } catch (error) {
    console.log("Error during db operations.", error.message);
  }
};

const main = async () => {
  try {
    await connectDb();

    // I want to seed database only once (because it takes a while) and run queries multiple times.
    // Usage: node main --seed to seed the database or just node main to skip it.
    const shouldSeed = process.argv.includes("--seed");
    if (shouldSeed) {
      await seedDb();
    }

    // Run queries
    await getPopulation("Netherlands");
    await getPopulationByContinentAndAge(2020, "100+");
   
  } catch (error) {
    console.log("Main application error.", error.message);
  } finally {
    await disconnectDb();
  }
};

/** Write a function that will return the array of the total population 
 * (M + F over all age groups) for a given Country per year. 
 */

const getPopulation = async (country) => {
  console.log(`\nCalculating ${country}'s population...`);
  try {
    return await Population.aggregate([
      { $match: { country: country } },
      {
        $group: {
          _id: "$year",
          totalPopulation: {
            $sum: { $add: ["$malePopulation", "$femalePopulation"] },
          },
        },
      },
    ]);
  } catch (error) {
    console.error("Error fetching population data.", error.message);
  }
};

/** Write a function that will return all the information of each continent 
 * for a given Year and Age field but add a new field 
 * TotalPopulation that will be the addition of M and F.
*/
const getPopulationByContinentAndAge = async (year, ages) => {
  try {
    const result = await Population.aggregate([
      { $match: { year: year, age: ages, country: { $in: continents } } },
      { $group: { _id: "$country", M: { $sum: "$malePopulation" }, F: { $sum: "$femalePopulation" }}},
      { $addFields: { TotalPopulation: { $add: ["$M", "$F"] }} },
      { $project: { _id: 1, Country: "$_id", Year: year, Age: ages,
             M: 1, F: 1, TotalPopulation: 1 } },
    ]);
    return result;
  } catch (error) {
    console.error("Error fetching population data.", error.message);
  }
};


await main();
