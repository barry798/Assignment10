const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const { name, email, password, type } = req.body;
  if (!name || !email || !password || !["admin", "employee"].includes(type)) {
    return res.status(400).json({ msg: "Invalid input" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, type });
    await user.save();
    res.status(201).json({ msg: "User created" });
  } catch (err) {
    res.status(500).json({ msg: "Error creating user", error: err });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, type: user.type }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token, user: { name: user.name, email: user.email, type: user.type } });
  } catch (err) {
    res.status(500).json({ msg: "Login failed", error: err });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email type");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching users", error: err });
  }
};