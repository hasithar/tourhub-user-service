const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("./passportConfig");

require("dotenv").config();

// importing routes
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user.route");
const roleRouter = require("./routes/role.route");
const profileRouter = require("./routes/profile.route");
const authRouter = require("./routes/auth.route");

const app = express();

// middlreware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// initialize Passport and session management
app.use(
  require("express-session")({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// db connection
const dbName =
  process.env.NODE_ENV === "test"
    ? process.env.dbTesting
    : process.env.NODE_ENV === "production"
    ? process.env.dbProduction
    : process.env.dbDevelopment;

mongoose
  .connect(
    `mongodb+srv://${process.env.connectionString}/${dbName}?retryWrites=true&w=majority&appName=${process.env.appName}`
  )
  .then(() => console.log("Connected to the databse"))
  .catch(() => console.log("Error connecting to the database"));

// routes
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/roles", roleRouter);
app.use("/profiles", profileRouter);
app.use("/auth", authRouter);

// error handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: { message: err.message } });
});

module.exports = app;
