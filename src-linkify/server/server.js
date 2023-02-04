const express = require("express");
const connectDB = require("./config/connectDB.js");
const userRouter = require("./routes/accountRoutes");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
connectDB();

app.use(express.json());

app.use("/account", userRouter);

app.listen(process.env.PORT || 8080, () =>
  console.log(`App listening on port ${process.env.PORT}!`)
);
