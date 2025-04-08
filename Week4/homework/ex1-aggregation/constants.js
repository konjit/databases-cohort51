
import dotenv from "dotenv";
dotenv.config()
export const URL = process.env.MONGODB_URL;
export const FILE_NAME = "population_pyramid_1950-2022.csv";
export const  continents = [
    "AFRICA", "ASIA", "EUROPE", "LATIN AMERICA AND THE CARIBBEAN", 
    "NORTHERN AMERICA", "OCEANIA"
  ];