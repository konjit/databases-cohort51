import { initDatabase } from "./databases/migrations/runMigrations.js";
import { closePool } from "./databases/configDB.js";
import {
  populateAuthorData,
  populatePaperData,
  populateJunctionData,
} from "./models/data.js";

import {
  printAuthorAndMentorNames,
  printAuthorAndPublications,
} from "./exercise-3/joinQueries.js";
import {
  allResearchPaperAndNumAuthor,
  allPaperByGender,
  avgHIndexByUniversity,
  totalPapersByUniversity,
  minMaxHIndexByUniversity,
} from "./exercise-4/aggregateQueries.js";

const main = async () => {
  try {
    await initDatabase();
    await populateAuthorData();
    await populatePaperData();
    await populateJunctionData();

    await printAuthorAndMentorNames();
    await printAuthorAndPublications();
    await allResearchPaperAndNumAuthor();
    await allPaperByGender();
    await avgHIndexByUniversity();
    await totalPapersByUniversity();
    await minMaxHIndexByUniversity();

  } catch (error) {
    console.error("Main application error:", error);
  }
};

await main();
await closePool();
