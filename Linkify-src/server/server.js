require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const { connectDB } = require("./config/connectDB.js");
const userRouter = require("./routes/accountR");
const cvRouter = require("./routes/cvR");
const userPropertyRouter = require("./routes/userPropertyR");
const connectionRoutes = require("./routes/connectionR");


const app = express();

const bodyParser = require("body-parser");

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

app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.listen(process.env.PORT || 8080, () =>
  console.log(`App listening on port ${process.env.PORT}!`)
);
