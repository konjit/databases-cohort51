import { executeQuery } from "../databases/executeQueries.js";

const authorData = {
  table: "authors",
  cols: ["author_id", "author_name", "university", "date_of_birth", "h_index", "gender", "mentor"],
  data: [
    [1, "Sophia Turner", "Harvard University", "1980-05-15", 40, "F", null],
    [2, "James Brown", "MIT", "1975-03-20", 35, "M", 1],
    [3, "Michael Johnson", "Stanford University", "1985-07-10", 30, "M", 1],
    [4, "Rachel Adams", "University of Cambridge", "1990-11-25", 20, "F", 2],
    [5, "Olivia Harris", "Oxford University", "1982-01-05", 45, "F", 2],
    [6, "Daniel Walker", "Princeton University", "1987-09-12", 38, "M", 3],
    [7, "Grace Lee", "Harvard University", "1992-02-18", 25, "F", 4],
    [8, "Ethan Clark", "MIT", "1983-06-22", 33, "M", 3],
    [9, "Isabella Lewis", "University of Oxford", "1991-04-16", 28, "F", 6],
    [10, "Liam Mitchell", "Stanford University", "1980-12-30", 50, "M", 7],
    [11, "Sophia White", "Princeton University", "1993-08-09", 22, "F", 8],
    [12, "Lucas Scott", "Harvard University", "1984-03-10", 40, "M", 1],
    [13, "Mia Davis", "MIT", "1986-09-17", 36, "F", 4],
    [14, "Zoe Robinson", "University of Cambridge", "1988-10-22", 30, "F", 5],
    [15, "Elijah Harris", "Stanford University", "1990-12-11", 32, "M", 6],
  ]
};


const junctionData = {
  table: "author_research_papers",
  data: [
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 2],
    [2, 4],
    [2, 5],
    [3, 3],
    [3, 6],
    [3, 7],
    [4, 4],
    [4, 8],
    [4, 9],
    [5, 5],
    [5, 10],
    [5, 11],
    [6, 6],
    [6, 12],
    [6, 13],
    [7, 7],
    [7, 14],
    [7, 15],
    [8, 8],
    [8, 9],
    [8, 10],
    [9, 9],
    [9, 11],
    [9, 12],
    [10, 10],
    [10, 13],
    [10, 14],
    [11, 11],
    [11, 15],
    [11, 1],
    [12, 12],
    [12, 2],
    [12, 3],
    [13, 13],
    [13, 4],
    [13, 5],
    [14, 14],
    [14, 6],
    [14, 7],
    [15, 15],
    [15, 8],
    [15, 9],
  ],
};

const researchData = {
  table: "research_papers",
  data: [
    [
      1,
      "The Impact of Climate Change on Global Agricultural Yields",
      "Environmental Science Journal",
      "2022-05-15",
    ],
    [
      2,
      "Advanced Nanomaterials for Renewable Energy",
      "Journal of Sustainable Energy",
      "2021-08-22",
    ],
    [
      3,
      "Stem Cell Therapy in Treating Neurodegenerative Diseases",
      "International Journal of Neuroscience and Therapy",
      "2023-01-11",
    ],
    [
      4,
      "Advances in Cancer Immunotherapy",
      "Nature Reviews Cancer",
      "2022-09-05",
    ],
    [
      5,
      "Effects of Air Pollution on Respiratory Health in Urban Areas",
      "Environmental Health Perspectives",
      "2021-12-13",
    ],
    [
      6,
      "Understanding the Mechanics of Gravitational Waves",
      "Physics Letters A",
      "2020-11-01",
    ],
    [
      7,
      "New Horizons in Quantum Computing for Scientific Discovery",
      "Nature Physics",
      "2019-07-17",
    ],
    [
      8,
      "The Role of Microbiota in Human Immune System Functionality",
      "Journal of Immunology",
      "2020-05-30",
    ],
    [
      9,
      "Renewable Energy Storage: A Review of New Materials",
      "Journal of Energy Storage",
      "2021-04-19",
    ],
    [
      10,
      "Neuroplasticity and Brain Recovery after Traumatic Injury",
      "Journal of Neurosurgery",
      "2022-03-23",
    ],
    [
      11,
      "The Benefits of Organic Farming for Soil Health",
      "Agricultural Science Journal",
      "2022-06-17",
    ],
    [
      12,
      "The Future of Space Exploration: Challenges and Opportunities",
      "Journal of Space Exploration",
      "2020-09-14",
    ],
    [
      13,
      "Emerging Therapies for Alzheimers Disease",
      "Alzheimer’s & Dementia Journal",
      "2021-11-01",
    ],
    [
      14,
      "The Role of Big Data in Preventative Healthcare",
      "Journal of Health Informatics",
      "2023-02-05",
    ],
    [
      15,
      "Urbanization and Its Effects on Biodiversity",
      "Biodiversity and Conservation Journal",
      "2020-06-29",
    ],
    [
      16,
      "A New Approach to Carbon Capture Technologies",
      "Environmental Science and Technology",
      "2021-07-19",
    ],
    [
      17,
      "Applications of CRISPR in Modern Gene Therapy",
      "Nature Biotechnology",
      "2022-04-21",
    ],
    [
      18,
      "The Effect of Stress on Heart Disease",
      "Journal of Cardiovascular Disease",
      "2021-12-15",
    ],
    [
      19,
      "The Social Impacts of Autonomous Vehicles",
      "Journal of Transportation and Society",
      "2020-11-30",
    ],
    [
      20,
      "Understanding Climate Modeling for Accurate Predictions",
      "Environmental Science & Policy",
      "2021-03-17",
    ],
    [
      21,
      "Exploring the Role of Gut Health in Mental Health Disorders",
      "Journal of Psychiatry and Neuroscience",
      "2022-02-14",
    ],
    [
      22,
      "Green Architecture: Designing for Sustainability",
      "Journal of Architecture and Urban Planning",
      "2021-05-22",
    ],
    [
      23,
      "Understanding the Behavior of Dark Matter",
      "Astrophysical Journal",
      "2023-01-09",
    ],
    [
      24,
      "The Effects of Pesticides on Pollinators",
      "Environmental Toxicology and Chemistry",
      "2021-04-02",
    ],
    [
      25,
      "Advances in Bioinformatics for Personalized Medicine",
      "Bioinformatics Journal",
      "2020-07-11",
    ],
    [
      26,
      "Soil Erosion and Its Impact on Agricultural Productivity",
      "Soil Science Society Journal",
      "2022-03-18",
    ],
    [
      27,
      "The Influence of Artificial Intelligence on Drug Discovery",
      "Journal of Pharmaceutical Sciences",
      "2021-12-10",
    ],
    [
      28,
      "Integrating Renewable Energy into the Power Grid",
      "Renewable Energy Journal",
      "2020-11-05",
    ],
    [
      29,
      "Quantum Cryptography: Security in the Digital Age",
      "Journal of Cryptographic Research",
      "2023-01-13",
    ],
    [
      30,
      "Exploring the Genetic Basis of Human Longevity",
      "Journal of Gerontology",
      "2021-10-22",
    ],
  ],
};

export const populateAuthorData = async () => {
  try {
    await insertData(
      authorData.table,
      [
        "author_id",
        "author_name",
        "university",
        "date_of_birth",
        "h_index",
        "gender",
        "mentor",
      ],
      authorData.data
    );
    console.log("Author data inserted successfully.");
  } catch (error) {
    console.log("Insertion query failed.", error.message);
    throw error;
  }
};

export const populatePaperData = async () => {
  try {
    await insertData(
      researchData.table,
      ["paper_id", "paper_title", "conference", "publish_date"],
      researchData.data
    );

    console.log("Research data inserted successfully.");
  } catch (error) {
    console.log("Insertion query failed.", error.message);
    throw error;
  }
};

export const populateJunctionData = async () => {
  try {
    await insertData(
      junctionData.table,
      ["author_id", "paper_id"],
      junctionData.data
    );
    console.log("Author-Research data inserted successfully.");
  } catch (error) {
    console.log("Insertion query failed.", error.message);
    throw error;
  }
};

// Insert data to a given 'table' with column properties 'cols' and values 'data'
// To make the insertion logic generic.

export const insertData = async (table, cols, data, conflictKeys = []) => {
  const formattedCols = cols.map(col => `\`${col}\``); 
  const placeholders = data
    .map(() => `(${new Array(cols.length).fill("?").join(",")})`)
    .join(",");
  const values = data.flat();

  const updateClause = formattedCols
    .filter(col => !conflictKeys.includes(col.replace(/`/g, ""))) 
    .map(col => `${col} = VALUES(${col})`)
    .join(", ");

  const query = `
    INSERT INTO \`${table}\` (${formattedCols.join(", ")})
    VALUES ${placeholders}
    ON DUPLICATE KEY UPDATE ${updateClause};
  `;

  await executeQuery(query, values);
};
