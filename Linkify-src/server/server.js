//Backend Authors: Jonathan Haddad 40111053, Saad Hanna  40113826

const express = require("express");
const { connectDB } = require("./config/connectDB.js");
const userRouter = require("./routes/accountR");
const cvRouter = require("./routes/cvR");
const userPropertyRouter = require("./routes/userPropertyR");
const connectionRoutes = require("./routes/connectionR");
const feedRoutes = require("./routes/feedsR");
const jobPostsRouter = require("./routes/jobPostsR");
const messagesRouter = require("./routes/messagesR");
const dotenv = require("dotenv");
const app = express();

const bodyParser = require("body-parser");

dotenv.config();
connectDB();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api/account", userRouter);
app.use("/user/cv", cvRouter);
app.use("/api/user/property", userPropertyRouter);
app.use("/user/connection", connectionRoutes);
app.use("/user/feed", feedRoutes);
app.use("/user/jobPosts", jobPostsRouter);
app.use('/api/messages', messagesRouter);

app.listen(process.env.PORT || 8080, () =>
  console.log(`App listening on port ${process.env.PORT}!`)
);
