const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Authmiddleware");

const { Users, Reservation } = require("../models");
// const { Status } = require("../models");
// Modify your reservation GET endpoint in your Express.js server
router.get("/user", validateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const reservations = await Reservation.findAll({
      where: { userId: userId },
      include: {
        model: Users,
        attributes: ["name"],
      },
    });

    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: {
        model: Users,
        attributes: ["name"],
      },
    });

    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/", validateToken, async (req, res) => {
  const { name, id } = req.user;
  const { PhoneNumber, Date, Time, NumberOfGuest, Selection } = req.body;
  const newReservation = {
    PhoneNumber,
    Date,
    Time,
    NumberOfGuest,
    Selection,
    userId: id,
  };

  await Reservation.create(newReservation);

  res.json(newReservation);
});

// router.put("/:reservationId", async (req, res) => {
//   const reservationId = req.params.reservationId;
//   const { TableNumber } = req.body;

//   const reservation = await Reservation.findByPk(reservationId);

//   if (!reservation) {
//     return res.status(404).json({ error: "Reservation not found" });
//   }
//   await Reservation.update({ TableNumber }, { where: { id: reservationId } });
//   const updatedReservation = await Reservation.findByPk(reservationId);

//   res.json(updatedReservation);
// });
router.put("/table", async (req, res) => {
  const { newTable, id } = req.body;
  try {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    await reservation.update({ TableNumber: newTable });
    res.json(newTable);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/comfirm/:id", async (req, res) => {
  const { id } = req.params;

  const confirm = await Reservation.findByPk(id);

  if (!confirm) {
    return res.status(404).json({ error: "Reservation not found" });
  }

  confirm.Status = "comfirm";
  await confirm.save();

  res.json("Success");
});

// router.put("/update", async (req, res) => {
//   const { newreservation, id } = req.body;
//   await Reservation.update({ update: newreservation }, { where: { id: id } });
//   res.json(newreservation);
// });

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
