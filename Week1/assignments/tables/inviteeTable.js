import { executeQuery, insertData } from "../queries.js";

export const createInvitee = async () => {
  const inviteeTable = `CREATE TABLE IF NOT EXISTS Invitee(
      id INT AUTO_INCREMENT PRIMARY KEY,
      invitee_no INT NOT NULL,
      invitee_name VARCHAR(50),
      invited_by VARCHAR(50)
  );`;

  await executeQuery(inviteeTable);
  const tableData = {
    table: "Invitee",
    data: [
      [12, "Joe Doe", "HackYouFutureNL"],
      [21, "Alice Bob", "HackYouFutureBE"],
      [3, "Tamara Evert", "HackYouFutureDK"],
      [7, "Neeltje Arnold", "HackYouFutureNL"],
      [34, "Melanie Hans", "HackYouFutureNL"],
    ],
  };

  await insertData(
    tableData.table,
    ["invitee_no", "invitee_name", "invited_by"],
    tableData.data
  );
};

