const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const {sign}=require("jsonwebtoken")

router.get("/", async (req, res) => {
  const postAll = await Users.findAll();
  res.json(postAll);
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received data:", name, email, password);

  try {
    const hash = await bcrypt.hash(password, 10);
    await Users.create({
      name: name,
      email: email,
      password: hash,
    });
    res.json("Success");
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  const user = await Users.findOne({ where: { name: name } });

  if (!user) {
    res.status(404).json({ error: "User doesn't exist" });
    return;
  }

  try {
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(401).json({ error: "Wrong password or name" });
      return;
    }
    const accessToken =sign({name:user.name,id:user.id},"importantsecret");
    res.json(accessToken)
    // alert("login successfully")

    // res.json("You logged in!!!");
  } catch (error) {
    console.error("Error comparing passwords:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
 