// 3rd party modules
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

// Internal modules
const config = require('./config');
const localAuth = require('./strategies/local.strategy')(passport);
const User = require('./models/user.model');

// Initialization
const app = express();
mongoose.connect(config.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// Middleware
app.use(cors({ origin: `${config.SERVER_ADDRESS}:${config.SERVER_PORT}`, credentials: true }));
app.use(session({
  secret: 'v32geckost3',
  resave: false,
  saveUninitialized: false
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  } else {
    next();
  }
});

app.get('/login|/register', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    next();
  }
});

app.post('/register', async function (req, res) {
  let email = req.body?.email;
  let userExists = await User.userForEmail(email);

  if (userExists) {
    res.redirect('/register?already_registered');
  } else {
    await User.register(req.body);
    res.redirect('/login?registered')
  }
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login?incorrect' 
}));

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(config.SERVER_PORT, () => {
  console.log('Server running.');
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});