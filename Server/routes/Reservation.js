const express = require("express");
const router = express.Router();
const {validateToken}=require("../middlewares/Authmiddleware")

const { Reservation } = require("../models");


router.get("/", async (req, res) => {
  const postAll = await Reservation.findAll();
  res.json(postAll);
});

router.post("/",  async (req, res) => {
const post =req.body;
await Reservation.create(post)       
res.json(post)
    
  });

module.exports = router;
 