import { executeQuery } from "../../utils/queryUtilities.js";
import pool from "../dbConfig.js";

export const transferAmount = async (amount, sender, receiver) => {
  const connection = await pool.getConnection();
  const transactions = [];

  try {
    await connection.beginTransaction();

    // checks if accounts 'sender' and 'receiver' exists.
    const senderAccount = await findAccount(sender);
    if (senderAccount.length === 0) {
      throw new Error(`No account associated with ${sender} found.`);
    }

    const receiverAccount = await findAccount(receiver);
    if (receiverAccount.length === 0) {
      throw new Error(`No account associated with ${receiver} found.`);
    }

    if (sender === receiver) {
      throw new Error("Transfer cannot be made to the same account");
    }

    // checks if a 'sender' has enough fund.
    if (senderAccount[0].balance < amount) {
      throw new Error(`Account ${sender} doesn't have sufficient fund.`);
    }

    // record the transactions
    transactions.push(await updateAccount(-amount, sender,  receiver, "Transfer to"));
    transactions.push(await updateAccount(amount, receiver, sender, "Transfer from"));

    await logTransactions(transactions);

    await connection.commit();
    console.log(`Transaction from ${sender} to ${receiver} is successful.`);
  } catch (error) {
    await connection.rollback();
    console.error("Transaction failed:", error.message);
  } finally {
    connection.release();
  }
};

const updateAccount = async (amount, account, targetAccount, transactionType) => {
  await executeQuery(
    "UPDATE accounts SET balance = balance + ? WHERE account_number = ?",
    [amount, account]
  );
  return {
    account: account,
    amount: amount,
    remark: `${transactionType} ${targetAccount}`,
  };
};

const logTransactions = async (transactions) => {
 transactions.forEach(transaction => {
  console.log(transaction)
 });
};

const findAccount = async (id) => {
  const query = "SELECT balance FROM accounts WHERE account_number = ?";
  const result = await executeQuery(query, [id]);
  return result;
};
