const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { error } = require("console");
router.get("/", async (req, res) => {
  const postAll = await Users.findAll();
  res.json(postAll);
});

router.post("/", async (req, res) => {
  const register = req.body;
  await Users.create(register);
  res.json("Success");
});

router.post("/login", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await Users.findOne({
    where: { name: name },
  });
  if (user) {
    if ((password === user.password) & (email === user.email)) {
      const accessToken = sign(
        { name: user.name, id: user.id },
        "importantsecret"
      );
      res.json(accessToken);
    } else {
      res.json({ error: "wrong password or email " });
    }
  } else {
    res.json({ error: "This name is doesn't exist" });
  }

  //  res.json("secuss")
});

module.exports = router;
