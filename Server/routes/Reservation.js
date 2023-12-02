const express = require("express");
const router = express.Router();

const { Reservation } = require("../models");


router.get("/", async (req, res) => {
  const postAll = await Reservation.findAll();
  res.json(postAll);
});

router.post("/", async (req, res) => {
    try {
      const { PhoneNumber, Date, Time, NumberOfGuest, Selection } = req.body;
  
      
      if (!PhoneNumber || !Date || !Time || !NumberOfGuest || !Selection) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const post = {
        PhoneNumber,
        Date,
        Time,
        NumberOfGuest,
        Selection,
      };
  
      
      const newReservation = await Reservation.create(post);
  
      res.status(201).json(newReservation);
    } catch (error) {
      console.error("Error creating reservation:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
module.exports = router;
 