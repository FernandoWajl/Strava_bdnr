const mongoose = require("mongoose");
Schema = mongoose.Schema;

const PHYSICAL_ACTIVITY_TYPE = ["SWIMMING", "CYCLING", "RUNNING"];
const PERCEIVED_EXERTION_TYPES = ["EASY", "MEDIUM", "HARD", "MAXIMUM_EFFORT"];

const REGISTRATION_TYPE = ["MANUAL", "AUTOMATIC"];
const REGISTRATION_TYPE_DICTIONARY = {
  MANUAL: REGISTRATION_TYPE[0],
  AUTOMATIC: REGISTRATION_TYPE[1],
};

const manualActivity = new Schema({
  duration: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  distance: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  picture: { type: String },
  description: { type: String },
  perceived_exertion: { type: String, enum: PERCEIVED_EXERTION_TYPES },
});

const ManualActivity = mongoose.model("ManualActivity", manualActivity);

const automaticActivity = new Schema({
  duration: {
    type: mongoose.Types.Decimal128,
    default: -1,
  },
  distance: {
    type: mongoose.Types.Decimal128,
    default: -1,
  },
  avg_speed: { type: mongoose.Types.Decimal128, default: -1 },
  calories_burned: { type: mongoose.Types.Decimal128, default: -1 },
  cadence: { type: mongoose.Types.Decimal128, default: -1 },
});

const AutomaticActivity = mongoose.model(
  "AutomaticActivity",
  automaticActivity
);

const physicalActivitySchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: PHYSICAL_ACTIVITY_TYPE,
  },
  registration_type: {
    type: String,
    required: true,
    enum: REGISTRATION_TYPE,
  },
  data: { type: AutomaticActivity | ManualActivity, default: {} },
});

const PhysicalActivity = mongoose.model(
  "PhysicalActivity",
  physicalActivitySchema
);

module.exports = { PhysicalActivity, REGISTRATION_TYPE_DICTIONARY };
