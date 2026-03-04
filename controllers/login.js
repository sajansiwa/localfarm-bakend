const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");

const Login = async (req, res) => {
    const { username, password } = req.body;

  try {
    const admin = await db.Admin.findOne({ where: { username } });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { Login };