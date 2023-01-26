const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const config=require("config")
router.post("/", async (req, res) => {
//   console.log("hello");
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send("No such user exists");
  }

  const result = await bcrypt.compare(req.body.password, user.password);
  if (!result) {
    return res.status(400).send("Invalid credentials");
  }
  const token=jwt.sign({ _id: user._doc._id }, config.get("privateKey"));
  res.send(token)
});

module.exports = router;
