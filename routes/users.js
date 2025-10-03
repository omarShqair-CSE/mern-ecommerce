const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "Name and Email and password are required" });
  }

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User Already Exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  let token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY, {
    expiresIn: "2w",
  });
  res
    .status(201)
    .json({ message: "User register successfully", user: newUser, token });
});

router.post("/signin", async (req, res) => {
  console.log("Signin route hit");
  const { password, email } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email  and password are required" });
  }

  let user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    let token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1w",
    });

    return res
      .status(201)
      .json({ message: "User Signin successfully", user, token });
  } else {
    return res.status(400).json({ message: "Invalid email or password" });
  }
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }
  return res.status(200).json({ user });
});

module.exports = router;
