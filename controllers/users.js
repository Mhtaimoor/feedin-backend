const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  // console.log({ username, password });
  try {
    const existingUser = await User.findOne({ username });

    if (!existingUser)
      return res.status(400).json({ message: "User doesn't exist" });
    const existingPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!existingPassword)
      return res.status(400).json({ message: "Invalid password" });
    const token = jwt.sign(
      {
        username: existingUser.username,
        id: existingUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.status(200).json({ token: token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.register = async (req, res) => {
  // console.log(req.body);
  try {
    const userData = { ...req.body };
    console.log(userData);
    const existingUser = await User.findOne({
      email: userData.email,
    });
    const existingUserName = await User.findOne({
      username: userData.username,
    });
    if (existingUser || existingUserName)
      return res
        .status(401)
        .json({ message: "User with this email already exists!" });
    else {
      let salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
      const user = await User.create(userData);
      const token = jwt.sign(
        { email: user.email, username: user.username, id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "3d",
        }
      );
      res.status(200).json({ token: token });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  // console.log({ ...req.body });
  try {
    const id = req.params.id;
    console.log(id);
    var user = await User.findById(id);
    // console.log(user);
    if (!user) return res.json({ error: "User is not registered" });
    res.status(200).json(user);
  } catch (e) {
    res.json({ error: e.message });
    console.log("error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  const user = req.body;
  // console.log(user);
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(201).json({ message: "Email already exists." });

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ ...user, password: hashPassword });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  let { name, username, email } = req.body;
  let editImage = req.file?.filename;
  let editData = {
    name,
    username,
    email,
  };
  if (editImage) {
    const existingUserName = await User.findOne({
      username: editData.username,
    });
    if (existingUserName) {
      res.status(400).send("Username Exists");
    } else {
      editData = { ...editData, image: editImage };
      console.log(editData);
      const user = await User.findByIdAndUpdate(req.params.id, editData);
      console.log("success");
      res.status(200).json({ user, editImage });
    }
  } else {
    const existingUserName = await User.findOne({
      username: editData.username,
    });
    if (existingUserName) {
      res.status(400).send("Username Exists");
    } else {
      // console.log(editData);
      const user = await User.findByIdAndUpdate(req.params.id, editData);
      console.log("success");
      res.status(200).json(user);
    }
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No user with that id");
  await User.findByIdAndRemove(id);
  res.status(200).json({ message: "User deleted successfully" });
};
