const cassandra = require("cassandra-driver");
const {
  ActivityMetricConfig,
  createActivityMetricTableQuery,
} = require("./models/activityMetric");

const client = new cassandra.Client({
  contactPoints: process.env.CONTACT_POINTS
    ? [process.env.CONTACT_POINTS]
    : ["127.0.0.1"],
  localDataCenter: process.env.CASSANDRA_LOCAL_DATA_CENTER || "datacenter1",
  keyspace: process.env.CASSANDRA_KEYSPACE || "bdnr",
});

const mappingOptions = {
  models: {
    activity_metric: ActivityMetricConfig,
  },
};

const mapper = new cassandra.mapping.Mapper(client, {
  mappingOptions,
});

const ActivityMetric = mapper.forModel("activity_metric");

const config = async () => {
  try {
    await client.execute(createActivityMetricTableQuery);
    console.log("Cassandra Tables created");
  } catch (e) {
    console.log("Cassandra Tables fail to be created");
  }
};

module.exports = { ActivityMetric, config };
