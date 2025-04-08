
import mongoose from "mongoose";
import { URL } from "../constants.js";


/** 
 * According to the mongoose doc, there are two classes of errors that can occur with a Mongoose connection.
 * 1: Error on initial connection:  
        which Mongoose doesn't auto connect if it fails to connect.
 * 2: Error after initial connection was established in which Mongoose 
        will attempt to reconnect, and it will emit an 'error' event.
*/

export const connectDb = () => {
  return new Promise((resolve, reject) => {
    mongoose.connection.once("open", () => {
      console.log(`Connection to ${mongoose.connection.name} is successful.\n`);
      resolve();
    });

    mongoose.connection.on("reconnected", () => {
      console.log(`Reconnected to ${dbName()}.`);
      resolve();
    });

    mongoose.connection.on("error", (err) => {
      console.log(err);
      reject(err);
    });

    mongoose.connect(URL, { dbName: "databasesWeek4" });
  });
};

export const disconnectDb = () => {
  return new Promise((resolve, reject) => {
    mongoose.connection.on("disconnected", () => {
      console.log(`\n${mongoose.connection.name}  disconnected successfully.`);
      resolve();
    });

    mongoose.connection.on("error", (err) => {
      console.log(err);
      reject(err);
    });

    mongoose.disconnect();
  });
};

// In case we want to abort(CTRL + C) the application for example may be it is taking
// too long and still want our database to close gracefully. 
process.on("SIGINT", () => {
  mongoose.disconnect();
  console.log("MongoDB disconnected successfully.");
  process.exit(0);
});
export const dbName = () => mongoose.connection.name;
