const mongoose = require("mongoose");

const server = process.env.DB_ADDRESS || "mongodb://127.0.0.1:27017/strava_db";

const connectToDb = async () => {
  await mongoose.connect(server, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on(
    "error",
    console.error.bind(console, "connection error:")
  );
};

module.exports = { connectToDb };