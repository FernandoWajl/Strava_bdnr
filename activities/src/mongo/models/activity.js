const mongoose = require("mongoose");
const { PhysicalActivity } = require("./physicalActivity");
const { PublicationActivity } = require("./publicationActivity");
const { PictureActivity } = require("./pictureActivity");
Schema = mongoose.Schema;

const ACTIVITY_TYPE = ["PICTURE", "PUBLICATION", "PHYSICAL"];
const ACTIVITY_TYPE_DICTIONARY = {
  PICTURE: ACTIVITY_TYPE[0],
  PUBLICATION: ACTIVITY_TYPE[1],
  PHYSICAL: ACTIVITY_TYPE[2],
};

const activitySchema = new Schema({
  title: { type: String, required: true },
  user_id: { type: String, required: true },
  created_on: { type: Date, required: true },
  activity: PictureActivity | PublicationActivity | PhysicalActivity,
  type: { type: String, require: true, enum: ACTIVITY_TYPE },
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = { Activity, ACTIVITY_TYPE_DICTIONARY };
