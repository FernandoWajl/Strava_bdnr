const { startServer } = require("./server");
const cassandra = require("./cassandra");
const { connectToDb } = require("./mongo");

const start = async () => {
  await cassandra.config();
  await connectToDb();
  await startServer();
};

start();
