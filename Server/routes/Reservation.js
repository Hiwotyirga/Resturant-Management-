const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Authmiddleware");

const { Users, Reservation } = require("../models");

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
router.get('/confirm/count',async(req,res)=>{
  const confirmcount=Reservation.filter(Reservation=Reservation.Status==='confirm').length;
  res.json(confirmcount)
  
})

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

router.put("/userdata", validateToken, async (req, res) => {
  const { name, id } = req.user;
  const { PhoneNumber, Date, Time, NumberOfGuest, Selection } = req.body;
  const updatedReservation = { PhoneNumber, Date, Time, NumberOfGuest, Selection };

  await Reservation.update(updatedReservation, { where: { userId: id } });

  res.json(updatedReservation);
});

router.delete("/delete", validateToken, async (req, res) => {
  const { id } = req.user;
  await Reservation.destroy({
    where: {
      userId: id,
    },
  });
  res.json("Delete successfully");
});

router.put("/table/:id", async (req, res) => {
  const reservationId = req.params.id;
  const { TableNumber } = req.body;

  try {
    const reservation = await Reservation.findByPk(reservationId);

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    reservation.TableNumber = TableNumber;
    await reservation.save();
    res.json(reservation);
  } catch (error) {
    console.error("Table update error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/comfirm/:id", async (req, res) => {
  const { id } = req.params;

  const confirm = await Reservation.findByPk(id);

  if (!confirm) {
    return res.status(404).json({ error: "Reservation not found" });
  }

  confirm.Status = "confirm";
  await confirm.save();

  res.json("Success");
});

router.put("/start/:id", async (req, res) => {
  const { id } = req.params;

  const start = await Reservation.findByPk(id);

  if (!start) {
    return res.status(404).json({ error: "Reservation not found" });
  }

  start.Start = "start";
  await start.save();

  res.json("Success");
});


module.exports = router;
