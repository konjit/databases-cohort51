import { executeQuery } from "../databases/executeQueries.js";

// All research papers and the number of authors that wrote that paper.
export const allResearchPaperAndNumAuthor = async () => {
  const query = `
    SELECT rp.paper_title, 
           COUNT(arp.author_id) AS number_of_authors 
    FROM research_papers AS rp
    JOIN author_research_papers AS arp ON rp.paper_id = arp.paper_id
    GROUP BY rp.paper_id;
  `;

  const result = await executeQuery(query);

  console.log("\nAll research papers and the number of authors who wrote each paper:\n");

  result.forEach(row => {
    console.log(`${row.paper_title} --> ${row.number_of_authors} author(s)`);
  });
};

export const allPaperByGender = async () => {
  const query = `
    SELECT COUNT(arp.paper_id) AS paper_by_female_count
    FROM authors AS a 
    JOIN author_research_papers AS arp ON arp.author_id = a.author_id
    WHERE a.gender = 'F';
  `;

  const result = await executeQuery(query);

  console.log("\nSum of the research papers published by all female authors:\n");

  console.log(`Total: ${result[0].paper_by_female_count}`);
};

  // Average of the h-index of all authors per university.
  export const avgHIndexByUniversity = async () => {
    const query = `
      SELECT university, AVG(h_index) AS average_h_index
      FROM authors
      GROUP BY university;
    `;
  
    const result = await executeQuery(query);
  
    console.log("\nAverage of the h-index of all authors per university:\n");
  
    result.forEach(row => {
      console.log(`${row.university}: ${parseFloat(row.average_h_index).toFixed(2)}`);
    });
  };
  
  // Sum of the research papers of the authors per university.
  export const totalPapersByUniversity = async () => {
    const query = `
      SELECT a.university, COUNT(arp.paper_id) AS total_published
      FROM authors AS a
      JOIN author_research_papers arp ON a.author_id = arp.author_id
      JOIN research_papers AS rp ON rp.paper_id = arp.paper_id
      GROUP BY a.university;
    `;
  
    const result = await executeQuery(query);
  
    console.log("\nSum of the research papers of the authors per university:\n");
  
    result.forEach(row => {
      console.log(`${row.university}: ${row.total_published} papers`);
    });
  };
  
  // Minimum and maximum of the h-index of all authors per university.
  export const minMaxHIndexByUniversity = async () => {
    const query = `
      SELECT a.university, 
             MIN(a.h_index) AS min_h_index, 
             MAX(a.h_index) AS max_h_index
      FROM authors a
      GROUP BY a.university;
    `;
  
    const result = await executeQuery(query);
  
    console.log("\nMinimum and maximum of the h-index of all authors per university:\n");
  
    result.forEach(row => {
      console.log(`${row.university}: Min H-Index = ${row.min_h_index}, Max H-Index = ${row.max_h_index}`);
    });
  };
  
  