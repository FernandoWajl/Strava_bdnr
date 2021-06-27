const mongoose = require("mongoose");
Schema = mongoose.Schema;

const publicationActivitySchema = new Schema({
  text: { type: String, required: true },
});

const PublicationActivity = mongoose.model(
  "PublicationActivity",
  publicationActivitySchema
);

module.exports = { PublicationActivity };
