const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  scores: [{ type: Schema.Types.ObjectId, ref: "Score" }],
});

const scoreSchema = new Schema({
  points: Number,
  date: Date,
  topic: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (plainPassword) {
  let hashedPassword = this.password;
  return await bcrypt.compare(plainPassword, hashedPassword);
};

userSchema.statics.userForEmail = async function (email) {
  if (!email) return false;
  return await User.findOne({ email }).exec();
};

userSchema.statics.register = async function (data) {
  let newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    ...data,
  });
  return await newUser.save();
};

userSchema.methods.edit = async function (name, password) {
  this.name = name;
  if (password) {
    this.password = password;
  }
  return await this.save();
};

const User = mongoose.model("User", userSchema);
const Score = mongoose.model("Score", scoreSchema);

module.exports.User = User;
module.exports.Score = Score;
