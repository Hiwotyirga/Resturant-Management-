const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Authmiddleware");

const { Users, Reservation } = require("../models");

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const userReservations = await Users.findByPk(userId, {
      include: {
        model: Reservation,
        attributes: ["PhoneNumber", "Date", "Time", "NumberOfGuest", "Selection"],
      },
    });

    if (!userReservations) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(userReservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    // const { userId, PhoneNumber, Date, Timeime, NumberOfGuest, Selection}
    const newReservation = req.body;

    // Check if the user exists
    const user = await Users.findByPk(newReservation.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new reservation
    await Reservation.create(newReservation);

    res.json(newReservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update", async (req, res) => {
  const { newreservation, id } = req.body;
  await Reservation.update({ update: newreservation }, { where: { id: id } });
  res.json(newreservation);
});
router.delete("/:postId", async (req, res) => {
  const postId = req.params.postId;
  await Reservation.destroy({
    where: {
      id: postId,
    },
  });
  res.json("Delete sucessfully");
});

module.exports = router;
