const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function () {
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
  let newUser = new User(data);
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

module.exports = User;
