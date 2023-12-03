const express = require("express");
const router = express.Router();
const { Staff } = require("../models");
const bcrypt = require("bcrypt");
const {sign}=require("jsonwebtoken")

router.get("/", async (req, res) => {
  const postAll = await Staff.findAll();
  res.json(postAll);
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  // console.log("Received data:", name, email, password);


    const hash = await bcrypt.hash(password, 10);
    await Staff.create({
      name: name,
      email: email,
      password: hash,
    });
    res.json("Success");
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  const user = await Staff.findOne({ where: { name: name } });

  if (!user) {
    res.json({ error: "User doesn't exist" });
    return;
  }

  
    const match = await bcrypt.compare(password, user.password).then((match)=>{
      if (!match) {
        res.json({ error: "Wrong password or name" });
        
      }
      res.json("you login")
    })
 
    
    const accessToken =sign({name:user.name,id:user.id},"importantsecret");
    res.json(accessToken)
 
});

module.exports = router;
 