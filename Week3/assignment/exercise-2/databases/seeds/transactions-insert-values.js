import { insertData } from "../../utils/queryUtilities.js";


const accountsData = {
  table: "accounts",
  data: [[101, 5000], [102, 3000], [103, 7000], [104, 2500]]
};

const accountChangesData = {
  table: "account_changes",
  data: [
    [101, -500, "2025-03-25", "Withdrawal"],
    [102, 500, "2025-03-25", "Deposit"],
    [101, -200, "2025-03-24", "Payment"],
    [102, 200, "2025-03-24", "Transfer received"],
    [103, -1000, "2025-03-23", "Purchase"],
    [104, 1000, "2025-03-23", "Refund"],
    [103, -1500, "2025-03-22", "Bill Payment"],
    [104, 1500, "2025-03-22", "Transfer received"]
  ],
};

export const populateTables = async () => {
  try {
    await insertData(accountsData.table, ["account_number", "balance"], accountsData.data);
    console.log("Accounts table populated successfully.");
    await insertData(
      accountChangesData.table,
      ["account_number", "amount", "changed_date", "remark"],
      accountChangesData.data
    );
    console.log("Account Changes table populated successfully.");
  } catch (error) {
    console.log("Insertion query failed.", error.message);
    throw error;
  }
};
