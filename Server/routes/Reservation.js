const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Authmiddleware");

const { Users, Reservation } = require("../models");
// const { Status } = require("../models");

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
router.post("/", async (req, res) => {
  try {
    const newReservation = req.body;

    const user = await Users.findByPk(newReservation.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await Reservation.create(newReservation);

    res.json(newReservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/:reservationId", async (req, res) => {
  const reservationId = req.params.reservationId;
  const { TableNumber } = req.body;

  const reservation = await Reservation.findByPk(reservationId);

  if (!reservation) {
    return res.status(404).json({ error: "Reservation not found" });
  }
  await Reservation.update({ TableNumber }, { where: { id: reservationId } });
  const updatedReservation = await Reservation.findByPk(reservationId);

  res.json(updatedReservation);
});
router.put('/comfirm/:id', async (req, res) => {
  
    const { id } = req.params;

    const confirm = await Reservation.findByPk(id);

    if (!confirm) {
      return res.status(404).json({ error: "Reservation not found" });
    }

  
    confirm.Status ="comfirm";
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
