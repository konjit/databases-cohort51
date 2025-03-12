
import { executeQuery, insertData } from "../queries.js";

export const createMeeting = async () => {
  const meetingTable = `CREATE TABLE IF NOT EXISTS Meeting (
        id INT AUTO_INCREMENT PRIMARY KEY,
        meeting_no INT,
        meeting_title VARCHAR(50) NOT NULL,
        starting_time DATETIME,
        ending_time DATETIME,
        room_no INT,
        FOREIGN KEY (room_no) REFERENCES Room(id)
    )`;
  // create table 
  await executeQuery(meetingTable);

  const tableData = {
    table: "Meeting",
    data: [
      [16, "SQL for All", "2025-03-12 09:00:00", "2025-03-12 09:00:00", 4],
      [
        26, "Human Computer Interaction for HYF Students","2025-04-03 08:30:00","2025-04-03 15:30:00",2
      ],
      [36, "Introduction to Negotiation","2025-04-03 08:30:00","2025-04-03 14:10:00", 2],
      [45, "Accessibility in Web Development", "2025-04-03 08:30:00","2025-04-03 16:30:00", 4],
      [67,"You are Not the User", "2025-06-13 08:30:00","2025-06-13 15:30:00", 5],
    ],
  };

  // insert data
  await insertData(
    tableData.table,
    ["meeting_no", "meeting_title", "starting_time", "ending_time", "room_no"],
    tableData.data
  );
};
