import { executeQuery } from "../executeQueries.js";

export const up = async () => {
  const CREATE_AUTHOR_RESEARCH_PAPER = `
    CREATE TABLE IF NOT EXISTS author_research_papers(
        author_id INT,
        paper_id INT,
        PRIMARY KEY(author_id, paper_id),
        FOREIGN KEY(author_id) REFERENCES authors(author_id) ON DELETE CASCADE,
        FOREIGN KEY(paper_id) REFERENCES research_papers(paper_id) ON DELETE CASCADE
    );`;
  await executeQuery(CREATE_AUTHOR_RESEARCH_PAPER);
  console.log("AuthorPaper table created successfully.");
};

export const down = async () => {
  const DROP_JUNCTION_AUTHOR_PAPERS = `DROP TABLE IF EXISTS  author_research_papers;`;

  await executeQuery(DROP_JUNCTION_AUTHOR_PAPERS);
  console.log("ResearchPaper table deleted successfully.");
};

