import { initDatabase } from "./databases/migrations/runMigrations.js";
import { closePool } from "./databases/configDB.js";
import {
  populateAuthorData,
  populatePaperData,
  populateJunctionData,
} from "./models/data.js";

import {
  getAuthorAndMentorNames,
  getAuthorAndPublications,
} from "./exercise-3/joinQueries.js";
import {
  allResearchPaperAndNumAuthor,
  allPaperByGender,
  avgHIndexByUniversity,
  avgPaperByUniversity,
  minMaxHIndexByUniversity,
} from "./exercise-4/aggregateQueries.js";

const main = async () => {
  try {
    await initDatabase();
    await populateAuthorData();
    await populatePaperData();
    await populateJunctionData();
    await getAuthorAndMentorNames();
    await getAuthorAndPublications();
    await allResearchPaperAndNumAuthor();
    await allPaperByGender();
    await avgHIndexByUniversity();
    await avgPaperByUniversity();
    await minMaxHIndexByUniversity();
  } catch (error) {
    console.error("Main application error:", error);
  }
};

await main();
await closePool();
