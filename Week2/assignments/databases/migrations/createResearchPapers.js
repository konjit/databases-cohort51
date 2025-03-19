import { executeQuery } from "../executeQueries.js";

export const up = async () => {
  const CREATE_RESEARCH_PAPERS = `
    CREATE TABLE IF NOT EXISTS research_papers(
        paper_id INT PRIMARY KEY,
        paper_title TEXT NOT NULL,
        conference VARCHAR(50),
        publish_date DATE
    );`;

  await executeQuery(CREATE_RESEARCH_PAPERS);
  console.log("ResearchPaper table created successfully.");
};

export const down = async () => {
  const DROP_RESEARCH_PAPERS = `DROP TABLE IF EXISTS research_papers;`;

  await executeQuery(DROP_RESEARCH_PAPERS);
  console.log("ResearchPaper table deleted successfully.");
};

