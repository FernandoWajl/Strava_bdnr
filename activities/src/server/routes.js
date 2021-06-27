const express = require("express");

const router = new express.Router();
const { ActivityMetric } = require("../cassandra");
const {
  Activity,
  ACTIVITY_TYPE_DICTIONARY,
} = require("../mongo/models/activity");
const {
  REGISTRATION_TYPE_DICTIONARY,
} = require("../mongo/models/physicalActivity");
const { distanceBetweenTwoLatLong } = require("../utils/distanceFunctions");
const { diffreneceOfTimeStrings } = require("../utils/timeFunctions");

const baseRoute = "/activity";

// Add metric
router.post(`${baseRoute}/:activityId/metric`, async (req, res) => {
  try {
    await ActivityMetric.insert({
      ...req.body,
      activity_id: req.params.activityId,
    });
    res.send("Saved");
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

// Query for activies in some period of time
router.get(baseRoute, async (req, res) => {
  const { from, to } = req.query;
  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    try {
      const activities = await Activity.find({
        created_on: {
          $gte: fromDate.toISOString(),
          $lte: toDate.toISOString(),
        },
      });
      res.send(activities);
    } catch (e) {
      res.status(400).send("Error");
    }
  } else {
    res.status(400).send("Missing from and to query params");
  }
});

// Create activity
router.post(baseRoute, async (req, res) => {
  try {
    const body = req.body;
    const activitiy = new Activity(body);
    await activitiy.save();
    res.send(activitiy);
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

// Finsih activity
router.put(`${baseRoute}/:activityId/finish`, async (req, res) => {
  try {
    const cassandraResult = await ActivityMetric.find(
      {
        activity_id: req.params.activityId,
      },
      { orderBy: { created_at: "asc" } }
    );
    let duration = 0;
    let lastTimestamp;
    let distance = 0;
    let lastLongitude;
    let lastLatitude;
    let totalAverageSpeed = 0;
    let totalCaloriesBurned = 0;
    let totalCadence = 0;
    let index = 0;
    for (let activityMetric of cassandraResult) {
      if (lastTimestamp) {
        duration += diffreneceOfTimeStrings(
          activityMetric.created_at,
          lastTimestamp
        );
        distance += distanceBetweenTwoLatLong(
          lastLatitude,
          lastLongitude,
          activityMetric.gps_latitude,
          activityMetric.gps_longitude
        );
      }
      totalAverageSpeed += activityMetric.avg_speed;
      totalCaloriesBurned += activityMetric.calories_burned || 0;
      totalCadence += activityMetric.cadence || 0;
      lastLongitude = activityMetric.gps_longitude;
      lastLatitude = activityMetric.gps_latitude;
      lastTimestamp = activityMetric.created_at;
      index++;
    }
    const newValues = {
      distance,
      duration,
      distance,
      avg_speed: totalAverageSpeed / index,
      calories_burned:
        totalCaloriesBurned !== 0 ? totalCaloriesBurned : undefined,
      cadence: totalCadence !== 0 ? totalCadence / index : undefined,
    };

    const result = await Activity.updateOne(
      {
        _id: req.params.activityId,
        type: ACTIVITY_TYPE_DICTIONARY.PHYSICAL,
        "activity.registration_type": REGISTRATION_TYPE_DICTIONARY.AUTOMATIC,
      },
      {
        "activity.data": newValues,
      }
    );
    if (result.n > 0) {
      res.send("Finished");
    } else {
      res.status(404).send({ error: "Activity not found" });
    }
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

module.exports = router;
