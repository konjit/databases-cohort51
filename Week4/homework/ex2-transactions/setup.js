import mongoose from "mongoose";
import dotenv from "dotenv";
import Account from "./models/Account.js";

dotenv.config();
export const setupDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, { dbName: "bankings" });

    console.log(`Connected to ${mongoose.connection.name}.`);
    const accounts = [
      {
        account_number: 101,
        balance: 1000,
        account_changes: [
          {
            change_number: 1,
            amount: 500,
            changed_date: new Date(),
            remark: "Deposit",
          },
          {
            change_number: 2,
            amount: -200,
            changed_date: new Date(),
            remark: "Withdrawal",
          },
        ],
      },
      {
        account_number: 102,
        balance: 2000,
        account_changes: [
          {
            change_number: 1,
            amount: 1500,
            changed_date: new Date(),
            remark: "Deposit",
          },
        ],
      },
      {
        account_number: 103,
        balance: 3000,
        account_changes: [
          {
            change_number: 1,
            amount: 200,
            changed_date: new Date(),
            remark: "Deposit",
          },
          {
            change_number: 2,
            amount: -100,
            changed_date: new Date(),
            remark: "Withdrawal",
          },
        ],
      },
    ];
    await Account.deleteMany({});
    await Account.insertMany(accounts);
    console.log(`Sample data inserted in accounts.`);
  } catch (error) {
    console.error(`Error setting up ${mongoose.connection.name}`, error);
  }
};

export const disconnectDb = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.log(`Disconnected from ${mongoose.connection.name}`);
  }
};
