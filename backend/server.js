const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const { User, Score } = require("./models/user.model");
const LocalStrategy = require("passport-local").Strategy;

let config = {};
try {
  config = require("./config");
} catch {
  console.log("No config file. The app is probably running on a non local server.");
}

const CONNECTION_STRING = process.env.CONNECTION_STRING || config.CONNECTION_STRING;
const FRONTEND_ADDRESS = process.env.FRONTEND_ADDRESS || config.FRONTEND_ADDRESS;
const SESSION_SECRET = process.env.SESSION_SECRET || config.SESSION_SECRET;
const BACKEND_PORT = process.env.PORT || config.BACKEND_PORT;

mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// new
const app = express();
app.enable("trust proxy");
app.use(
  cors({
    origin: FRONTEND_ADDRESS,
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: false, sameSite: "none" },
    store: MongoStore.create({
      mongoUrl: CONNECTION_STRING,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

const localAuth = new LocalStrategy({ usernameField: "email" }, async function (email, password, done) {
  let user = await User.userForEmail(email);
  if (!user) return done(null, false);

  let validPassword = await user.comparePassword(password);
  if (!validPassword) return done(null, false);

  return done(null, user);
});

passport.use(localAuth);

passport.serializeUser(function (user, done) {
  // console.log("Creating cookies.");
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  // console.log("Reading cookies.");
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

function checkAuthentication(req, res, next) {
  const currentUser = req.user;
  if (!currentUser) {
    res.sendStatus(401);
    return;
  } else {
    next();
  }
}

app.listen(BACKEND_PORT, () => {
  console.log("Backend server has started.");
});

app.post("/sign-up", async function (req, res) {
  let email = req.body?.email;
  let userExists = await User.userForEmail(email);

  if (userExists) {
    res.sendStatus(409);
  } else {
    await User.register(req.body);
    res.sendStatus(201);
  }
  return;
});

app.post("/login", (req, res, next) => {
  // console.log(req.body);
  next();
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  // console.log("Login successful.");
  res.sendStatus(200);
  return;
});

app.get("/user", function (req, res) {
  // console.log(req.headers);
  // console.log(req.get("origin"));
  // console.log(req.session);
  // console.log("User:", req.user);
  req.user ? res.json(req.user) : res.sendStatus(401);
  return;
});

app.post("/edit", async function (req, res) {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  let name = req.body?.name;
  let password = req.body?.password;
  let currentUser = await User.userForEmail(req.user?.email);

  await currentUser.edit(name, password);
  res.sendStatus(200);
  return;
});

app.post("/logout", function (req, res) {
  req.logout();
  res.sendStatus(200);
  return;
});

app.post("/save-score", checkAuthentication, async function (req, res) {
  // How can we be sure that this is the user's true score?
  let newScoreData = req.body;
  if (!newScoreData) {
    res.sendStatus(400);
    return;
  }
  console.log(newScoreData);

  newScore = new Score({
    ...newScoreData,
    user: req.user._id,
  });
  await newScore.save();
  res.json(newScore);
  return;
});

app.get("/get-scores", checkAuthentication, async function (req, res) {
  const scores = await Score.find({ user: req.user._id });
  // console.log(scores);
  res.json(scores);
  return;
});

app.get("/get-ranking", checkAuthentication, async function (req, res) {
  const allScores = await Score.find({}).populate("user");
  res.json(allScores);
});

app.get("/get-score/:id", async function (req, res) {
  let scoreId = req.params?.id;
  if (!scoreId || !mongoose.isValidObjectId(scoreId)) {
    res.sendStatus(400);
    return;
  }

  const score = await Score.findById(scoreId).populate("user");
  score.user.password = undefined;
  res.json(score);
  return;
});

app.use("/", express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
