const mongoose = require("mongoose");

const server = process.env.MONGO_DB_ADDRESS || "mongodb://127.0.0.1:27017/BDNR";

const connectToDb = async () => {
  await mongoose.connect(server, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Mongo db connection established");

  mongoose.connection.on(
    "error",
    console.error.bind(console, "connection error:")
  );
};

module.exports = { connectToDb };
