const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const cors = require("cors");

const PORT = process.env.PORT || 3892;

app.use(cors());
app.use(bodyParser.json());

app.use("/users", require("./routes"));


app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}!`);
});
