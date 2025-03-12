
import { executeQuery, insertData } from "../queries.js";

export const createRoom = async () => {
    const roomTable = `CREATE TABLE IF NOT EXISTS Room(
        id INT AUTO_INCREMENT PRIMARY KEY,
        room_no INT NOT NULL,
        room_name VARCHAR(50),
        floor_number INT
    );`;
  
    await executeQuery(roomTable);
    const tableData = {
      table: "Room",
      data: [
        [2, "B23", 2],
        [3, "C23", 1],
        [4, "D23", 3],
        [5, "B24", 2],
        [6, "C29", 1],
      ],
    };
  
    await insertData(
      tableData.table,
      ["room_no", "room_name", "floor_number"],
      tableData.data
    );
  };