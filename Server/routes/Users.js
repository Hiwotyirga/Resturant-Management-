const express = require("express");

const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      name: name,
      email: email,
      password: hash,
    });
    res.json("Success");
  });
});
router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  const user = await Users.findOne({ where: { name: name } });
  if (!user) res.json({ error: "Users doen't exist" });
  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "wrong password or name" });
    res.json("You logged in!!!");
  });
});
module.exports = router;
