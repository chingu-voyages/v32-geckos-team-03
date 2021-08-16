const config = require("./config");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const { User, Score } = require("./models/user.model");
const LocalStrategy = require("passport-local").Strategy;

mongoose.connect(config.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// new
const app = express();
app.use(
  cors({
    origin: `${config.FRONTEND_ADDRESS}:${config.FRONTEND_PORT}`,
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: "randomsecret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: config.CONNECTION_STRING,
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
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
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

app.listen(3000, () => {
  console.log("Server 2 started.");
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
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

app.get("/user", function (req, res) {
  req.user ? res.json(req.user) : res.sendStatus(401);
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
});

app.get("/logout", function (req, res) {
  req.logout();
  console.log(req.user);
  res.sendStatus(200);
});

app.post("/save-score", checkAuthentication, async function (req, res) {
  // How can we be sure that this is the user's true score?
  let newScoreData = req.body;
  if (!newScoreData) {
    res.sendStatus(400);
    return;
  }

  newScore = new Score({
    ...newScoreData,
    user: req.user._id,
  });
  await newScore.save();
  res.json(newScore);
});

app.get("/get-scores", checkAuthentication, async function (req, res) {
  const scores = await Score.find({ user: req.user._id });
  // console.log(scores);
  res.json(scores);
});

app.get("/get-ranking", checkAuthentication, async function (req, res) {
  const allScores = await Score.find({}).populate("user");
  res.json(allScores);
});

app.get("/get-score/:id", async function (req, res) {
  let scoreId = req.params?.id;
  console.log(req.params);
  if (!scoreId || !mongoose.isValidObjectId(scoreId)) {
    res.sendStatus(400);
    return;
  }

  const score = await Score.findById(scoreId).populate("user");
  score.user.password = undefined;
  res.json(score);
});
