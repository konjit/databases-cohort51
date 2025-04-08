import mongoose from "mongoose";
const { Schema, model } = mongoose;

const accountSchema = new Schema({
  account_number: { type: Number, required: true, unique: true },
  balance: {
    type: Number,
    required: true,
    min: [0, "Balance can't be negative."],
  },
  account_changes: [
    {
      change_number: { type: Number, required: true },
      amount: { type: Number, required: true },
      changed_date: { type: Date, required: true },
      remark: { type: String, required: true },
    },
  ],
});

export default model("Account", accountSchema);
