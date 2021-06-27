const mongoose = require("mongoose");
Schema = mongoose.Schema;

const pictureActivitySchema = new Schema({
  url: { type: String, required: true },
  comment: { type: String, required: true },
});

const PictureActivity = mongoose.model(
  "PictureActivity",
  pictureActivitySchema
);

module.exports = { PictureActivity };
