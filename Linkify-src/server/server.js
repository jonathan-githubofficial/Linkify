const express = require("express");
const { connectDB } = require("./config/connectDB.js");
const userR = require("./routes/userR");
const cvR = require("./routes/cvR");
const userPropertyR = require("./routes/userPropertyR");
const connectionR = require("./routes/connectionR");
const feedsR = require("./routes/feedsR.js");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;

connectDB();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.json());
app.use("/api/users", userR);
app.use("/user/cv", cvR);
app.use("/api/user/property", userPropertyR);
app.use("/user/connection", connectionR);
app.use("/api/feeds", feedsR);

app.listen(port, () =>
  console.log(`App listening on port ${process.env.PORT}!`)
);
