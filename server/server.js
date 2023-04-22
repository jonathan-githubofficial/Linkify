//Backend Authors: Jonathan Haddad 40111053, Saad Hanna  40113826

const express = require("express");
const { connectDB } = require("./config/connectDB.js");
const userRouter = require("./routes/accountRoute");
const cvRouter = require("./routes/cvRoute");
const userPropertyRouter = require("./routes/userPropertyRoute");
const connectionRoutes = require("./routes/connectionRoute");
const feedRoutes = require("./routes/feedsRoute");
const jobPostsRouter = require("./routes/jobPostsRoute");
const messagesRouter = require("./routes/messagesRoute");
const groupRouter = require("./routes/groupRoute");
const eventRouter = require("./routes/eventRoute");
const companiesRouter = require("./routes/companyRoute.js");
const notificationRouter = require("./routes/notificationRoute.js");
const passport = require("passport");
const session = require("express-session");
const passportConfig = require("./middleware/passport.js");
const dotenv = require("dotenv");
const path = require("path");
const app = express();

dotenv.config();

const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

connectDB();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

//passport google config related
passportConfig(passport);
app.use(
  session({
    secret: "qUht3y79Fmi3OF27ZxK9rTNN8Y94AnKfrSqTvPFG86v5CfY0YdMUzLIhsRxK8vCV",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day cookie expiration
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use(express.json());

app.use("/api/account", userRouter);
app.use("/api/user/cv", cvRouter);
app.use("/api/user/property", userPropertyRouter);
app.use("/api/user/connection", connectionRoutes);
app.use("/api/user/feed", feedRoutes);
app.use("/api/user/jobPosts", jobPostsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/groups", groupRouter);
app.use("/api/events", eventRouter);
app.use("/api/companies", companiesRouter);
app.use("/api/notifications", notificationRouter);

app.use(
  "/server/attachments/messages",
  express.static("server/attachments/messages")
);
app.use(
  "/server/attachments/feeds",
  express.static("server/attachments/feeds")
);
app.use(
  "/server/attachments/avatars",
  express.static("server/attachments/avatars")
);

// __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.listen(process.env.PORT || 8080, () =>
  console.log(`App running on port ${process.env.PORT}!`)
);
