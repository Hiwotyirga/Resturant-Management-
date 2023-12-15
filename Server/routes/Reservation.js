const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Authmiddleware");
const { Op } = require("sequelize");
const { Users, Reservation } = require("../models");
//for status count 
router.get("/count",async(req,res)=>{
  const confirmcount=await Reservation.count({
    where:{
      Status:"confirm"
    }
  })
  const startedcount=await Reservation.count({
    where:{
      Status:"started"
    }
  })
  res.json(confirmcount,startedcount)
})

router.get("/user", validateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const reservations = await Reservation.findAll({
      where: { userId: userId, Status: { [Op.not]: "cancle" } },
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

// to get all confirm reservarion
router.get("/confirm", async (req, res) => {
  try {
    const reservarion = await Reservation.findAll({
      where: { Status: "confirm" },
      include: {
        model: Users,
        attributes: ["name"],
      },
    });
    res.json(reservarion);
  } catch (error) {
    console.error(error);
  }
});
// to get all started reservarion
router.get("/started", async (req, res) => {
  try {
    const reservarion = await Reservation.findAll({
      where: { Status: "started" },
      include: {
        model: Users,
        attributes: ["name"],
      },
    });
    res.json(reservarion);
  } catch (error) {
    console.error(error);
  }
});
// get all new reservartion
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      where: { Status: "new" },
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
  const updatedReservation = {
    PhoneNumber,
    Date,
    Time,
    NumberOfGuest,
    Selection,
  };

  await Reservation.update(updatedReservation, { where: { userId: id } });

  res.json(updatedReservation);
});
router.put("/cancle/", validateToken,async (req, res) => {
  const { id } = req.user;
  const {Status}=req.body;
  cancle.Status = "cancle";
  await cancle.save();

  res.json("Success");
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

// router.put("/cancle/:id", async (req, res) => {
//   const { id } = req.params;

//   const cancle = await Reservation.findByPk(id);

//   if (!cancle) {
//     return res.status(404).json({ error: "Reservation not found" });
//   }

//   cancle.Status = "cancle";
//   await cancle.save();

//   res.json("Success");
// });

router.put("/start/:id", async (req, res) => {
  const { id } = req.params;

  const start = await Reservation.findByPk(id);

  if (!start) {
    return res.status(404).json({ error: "Reservation not found" });
  }

  start.Status = "started";
  await start.save();

  res.json("Success");
});

module.exports = router;
