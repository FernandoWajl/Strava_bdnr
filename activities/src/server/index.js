if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const options = {
  cors: {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
};

const router = express.Router(options);

router.use(routes);

const app = express();
app.use(bodyParser.json());

app.use(router);

const port = process.env.PORT || 3000;

const startServer = async () => {
  await app.listen(port);
  console.log(`Server listening on port ${port}`);
};

module.exports = { startServer };
