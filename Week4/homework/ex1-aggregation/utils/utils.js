import path  from "path"
import { fileURLToPath } from "url"
import Population from "../models/Population.js";
import mongoose from "mongoose";
import fs from "fs";
import csv from "csv-parser"

// Return file path given file name
export const getFilePath = (fileName) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return  path.join(__dirname, "..", fileName);
}

// Parsing the data from .csv file to an array
export const parseData = (path) => {
    return new Promise((resolve, reject) => {
      fs.access(path, fs.constants.F_OK, (err) => {
        if (err) return reject(new Error('File not found.'));
  
        const results = [];
        fs.createReadStream(path)
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', () => resolve(results))
          .on('error', (err) => reject(new Error('Error parsing CSV: ' + err.message)));
      });
    });
  };

// For refreshing the database.
export const refreshDb = async () => {
    const db = mongoose.connection.name;
    try {
      console.log(`Refreshing ${db}...`);
      const models = [Population];
  
      for (const model of models) {
        await model.deleteMany({});
        console.log(`All records from ${model.modelName} deleted successfully.`);
      }
      console.log(`Refreshing ${db} completed.`);
    } catch (error) {

      console.log(`Error refreshing ${db}.`, error.message);
      throw new Error(error);
    }
  };
  