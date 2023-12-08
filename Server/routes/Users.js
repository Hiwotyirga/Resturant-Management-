const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
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
  const user = await Users.findOne({ where: { name: name, email: email, password: password },
  });

  if (!user) {
    res.json({ error: "User doesn't exist" });
    return;
  }

  // const match = await bcrypt.compare(password, user.password).then((match)=>{
  //   if (!match) {
  //     res.json({ error: "Wrong password or name" });

  //   }
  const accessToken = sign({ name: user.name, id: user.id }, "importantsecret");
  res.json(accessToken);
  
  // })

 
});

module.exports = router;
