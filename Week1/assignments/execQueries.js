import { dropTables, closePool } from "./queries.js";
import { createInvitee } from "./tables/inviteeTable.js";
import { createMeeting } from "./tables/meetingTable.js";
import { createRoom } from "./tables/roomTable.js";

const runQueries = async () => {
  try {
    await dropTables();
    await createInvitee();
    await createRoom();
    await createMeeting();
  } catch (error) {
    throw error;
  }
};

await runQueries();
await closePool();
