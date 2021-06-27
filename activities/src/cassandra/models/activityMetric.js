const cassandra = require("cassandra-driver");

const createActivityMetricTableQuery = `CREATE TABLE activity_metric (
  activity_id text ,
  gps_latitude double,
  gps_longitude double,
  avg_speed double,
  calories_burned double,
  created_at timestamp,        
  cadence double,
  PRIMARY KEY(activity_id,created_at)
);`;

const ActivityMetricConfig = {
  tables: ["activity_metric"],
  mappings: new cassandra.mapping.UnderscoreCqlToCamelCaseMappings(),
  columns: {
    activty_id: "activty_id",
    gps_latitude: "gps_latitude",
    gps_longitude: "gps_longitude",
    avg_speed: "avg_speed",
    calories_burned: "calories_burned",
    created_at: "created_at",
    cadence: "cadence",
  },
};

module.exports = { ActivityMetricConfig, createActivityMetricTableQuery };
