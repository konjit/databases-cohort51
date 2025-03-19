import { executeQuery } from "../databases/executeQueries.js";

//Write a query that prints names of all authors and their corresponding mentors.
export const getAuthorAndMentorNames = async () => {
  const query = `
      SELECT a.author_name AS author, m.author_name AS mentor 
      FROM authors as a 
      JOIN authors as m
      ON a.mentor = m.author_id;
    `;
  return await executeQuery(query);
};
// Write a query that prints all columns of authors and their published 
// paper_title. If there is an author without any research_Papers, 
// print the information of that author too.
export const getAuthorAndPublications = async () => {
  const query = `
    
    SELECT *, rp.paper_title FROM authors AS a
    LEFT JOIN author_research_papers as arp
    ON a.author_id = arp.author_id 
    JOIN  research_papers AS rp
    ON rp.paper_id = arp.paper_id;
    `;
  return await executeQuery(query);
};
