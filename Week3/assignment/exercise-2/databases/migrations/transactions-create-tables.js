import { executeQuery } from "../../utils/queryUtilities.js";

export const up = async () => {
  const CREATE_ACCOUNT = `
    CREATE TABLE IF NOT EXISTS accounts(
        account_number INT PRIMARY KEY,
        balance DECIMAL(10, 2) CHECK(balance >= 0)
    );`;

  await executeQuery(CREATE_ACCOUNT);
  console.log("Account table created successfully.");

  const CREATE_ACCOUNT_CHANGE = `
    CREATE TABLE IF NOT EXISTS account_changes(
        change_number INT PRIMARY KEY AUTO_INCREMENT,
        account_number INT,
        amount DECIMAL(10, 2)  CHECK (amount <> 0),
        changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        remark TEXT,
        FOREIGN KEY(account_number) REFERENCES accounts(account_number) ON DELETE CASCADE
    );`;

  await executeQuery(CREATE_ACCOUNT_CHANGE);
  console.log("Account Change table created successfully.");
};

export const down = async () => {
  const DROP_ACCOUNT_CHANGE = `DROP TABLE IF EXISTS  account_changes;`;

  await executeQuery(DROP_ACCOUNT_CHANGE);
  console.log("Account Change  table deleted successfully.");

  const DROP_ACCOUNT = `DROP TABLE IF EXISTS accounts;`;

  await executeQuery(DROP_ACCOUNT);
  console.log("Account table deleted successfully.");
};
