import { executeQuery } from "../databases/executeQueries.js";

// All research papers and the number of authors that wrote that paper.
export const allResearchPaperAndNumAuthor = async () => {
    const query = `
      SELECT rp.paper_title, 
      COUNT(arp.author_id) AS number_of_authors 
      FROM research_papers AS rp
      JOIN author_research_papers AS arp
      ON rp.paper_id = arp.paper_id
      GROUP BY (arp.paper_id);
    `;
    return await executeQuery(query);
  };
  
  // Sum of the research papers published by all female authors.
  export const allPaperByGender = async () => {
    const query = `
      SELECT COUNT(arp.paper_id) paper_by_female_count FROM authors as a 
      JOIN author_research_papers as arp 
      ON arp.author_id = a.author_id
      JOIN research_papers as rp
      ON arp.paper_id = rp.paper_id
      GROUP BY a.gender
      HAVING a.gender="F";
    `;
    return await executeQuery(query);
  }
  
  // Average of the h-index of all authors per university.
  export const avgHIndexByUniversity = async () => {
    const query = `
    SELECT university, AVG(h_index) AS average_h_index
    FROM authors
    GROUP BY university;`
    return await executeQuery(query);
  }
  
  // Sum of the research papers of the authors per university.
  export const avgPaperByUniversity = async () => {
    const query = `
      SELECT a.university, COUNT(arp.paper_id) AS total_published FROM authors AS a
      JOIN author_research_papers arp 
      ON a.author_id = arp.author_id
      JOIN research_papers AS rp
      ON rp.paper_id = arp.paper_id
      GROUP BY a.university;
    `;
    return await executeQuery(query);
  }
  // Minimum and maximum of the h-index of all authors per university.
  export const minMaxHIndexByUniversity = async () => {
    const query = `
      SELECT a.university, MIN(a.h_index) AS min_h_index, 
      MAX(a.h_index) AS max_h_index
      FROM authors a
      GROUP BY a.university;
    `;
    return await executeQuery(query);
  }
  