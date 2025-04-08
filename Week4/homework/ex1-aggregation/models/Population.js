import mongoose from "mongoose";
const { Schema, model } = mongoose;

const populationSchema = new Schema({
  country: { type: String, required: true },
  year: { type: Number, required: true },
  age: { type: String, required: true },
  femalePopulation: { type: Number, required: true },
  malePopulation: { type: Number, required: true },
});

export default model("Population", populationSchema);
