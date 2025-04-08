import Account from "./models/Account.js";
import mongoose from "mongoose";

export const transferAmount = async (sender, receiver, amount) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const senderAccount = await Account.findOne({
      account_number: sender,
    }).session(session);
    
    const receiverAccount = await Account.findOne({
      account_number: receiver,
    }).session(session);

    if(!senderAccount)
        throw `No account with ${senderAccount} found.`

   if(!receiverAccount) 
       throw `No account with ${receiverAccount} found.`

   if(senderAccount === receiverAccount) 
       throw `Transfer cannot be made to same account.`

   if(senderAccount.balance < amount)
       throw `Account ${sender} doesn't have sufficient funds.`

    await updateAccount(senderAccount, -amount, receiver, "Transfer to", session);
    await updateAccount(receiverAccount, amount, sender, "Transfer from", session);

    await session.commitTransaction();
    session.endSession();

    console.log(`Transaction from ${sender} to ${receiver} is successful.`);
  } catch (error) {
    await session.abortTransaction();
    console.log("Transaction failed.", error);
  } finally {
    session.endSession();
  }
};

const updateAccount = async (account, amount, targetAccount, transactionType, session) => {
  account.balance += amount;
  await account.save({ session });

  const changeNumber = account.account_changes.length + 1;
  account.account_changes.push({
    change_number: changeNumber,
    amount: amount,
    changed_date: new Date(),
    remark: `${transactionType} ${targetAccount}`,
  });
  
  await account.save({ session });

  console.log(`Updated ${transactionType} for ${account.account_number}`);
};
