import { setupDb, disconnectDb } from './setup.js';
import { transferAmount } from './transfer.js';

const main = async () => {
  await setupDb();  
  await transferAmount(101, 102, 1000);
  await disconnectDb()
};

main();
