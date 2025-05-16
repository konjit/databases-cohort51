import { executeQuery } from "../databases/executeQueries.js";

//Write a query that prints names of all authors and their corresponding mentors.
export const printAuthorAndMentorNames = async () => {
  const query = `
      SELECT a.author_name AS author, m.author_name AS mentor 
      FROM authors as a 
      JOIN authors as m
      ON a.mentor = m.author_id;
    `;
  const result = await executeQuery(query);

  console.log("\n------Names of all authors and their mentors-------\n");
  console.log("Author   ->  Mentor \n");
  result.forEach((row) => {
    console.log(`${row.author} -> ${row.mentor}`);
  });
 
};
// Write a query that prints all columns of authors and their published 
// paper_title. If there is an author without any research_Papers, 
// print the information of that author too.
export const printAuthorAndPublications = async () => {
  const query = `
    SELECT a.author_name AS author, rp.paper_title AS paper
    FROM authors AS a
    LEFT JOIN author_research_papers AS arp ON a.author_id = arp.author_id
    LEFT JOIN research_papers AS rp ON rp.paper_id = arp.paper_id;
  `;

  const result = await executeQuery(query);

  console.log("\n------ Authors and their published papers ------\n");
  console.log("Author   ->  published paper \n");
  result.forEach((row) => {
    const paper = row.paper || "(No publications)";
   
    console.log(`${row.author} --> ${paper}`);
  });
};

