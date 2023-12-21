const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Authmiddleware");
const { Op, where } = require("sequelize");
const { Users, Reservation } = require("../models");
const ReservationController = require("../controllers/ReservationController");
// const ReservationStatus = require("../models/reservationStatus");
const { reservationStatus } = require("../models");
//for confirm count
router.get("/confirm-count", async (req, res) => {
  const confirmcount = await Reservation.count({
    where: {
      Status: "confirm",
    },
  });
 
  res.json(confirmcount);
});
//count start
router.get("/start-count", async (req, res) => {
  
 
  const startedcount = await Reservation.count({
    where: {
      Status: "started",
    },
  });
  res.json(startedcount);
});
// count cancel
router.get("/cancel-count",async(req,res)=>{
  const canceledcount = await Reservation.count({
    where: {
      Status: "canceled",
    },
  });
 
  res.json(canceledcount);
});
//count validate reservation
router.get("/userValidate-count",async(req,res)=>{
  const canceledcount = await Reservation.count({
    where: {
      Status: { [Op.not]: "canceled" } ,
    },
  });
 
  res.json(canceledcount);
});
//user reservation list with validateToken
router.get("/user", validateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const reservations = await Reservation.findAll({
      where: { 
         Status: { [Op.not]: "canceled" } },
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
router.put('/mark-reservations-as-read', async (req, res) => {
  
    const userId = req.user.id;

    // Mark reservations as read in the database based on userId
    await Reservation.update(
      { isRead: true },
      {
        where: {
          userId,
          Status: { [Op.not]: "canceled" },
          isRead: false,
        },
      }
    );

    res.json({ success: true });
})

//  from admin page to get all confirm reservarion
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
//  from admin page to get all started reservarion
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
//  from user page to get all cancel reservarion
router.get("/cancel", async (req, res) => {
  try {
    const reservarion = await Reservation.findAll({
      where: { Status: "canceled" },
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
//  from admin page get all new reservartion
router.get("/list", async (req, res) => {
  const reservations = await Reservation.findAll({
    where: { Status: "new" },
    include: {
      model: Users,
      attributes: ["name"],
    },
  });

  res.json(reservations);
});
router.get("/", async (req, res) => {
  const reservations = await Reservation.findAll({
    include: {
      model: Users,
      attributes: ["name"],
    },
  });

  res.json(reservations);
});

// Admin panel

let ReservationStatus = "";
const checkReservationStatus = async (req, res, next) => {
  const status = await reservationStatus.findOne();
  ReservationStatus = status ? status.Stuation : "";
  if (ReservationStatus === "closed") {
    return res.json({ message: "Reservation system is closed." });
  } else {
    next();
  }
};

router.post("/update-status", async (req, res) => {
  const { Stuation } = req.body;

  const statusRecord = await reservationStatus.findOne();
  if (statusRecord) {
    await statusRecord.update({ Stuation: Stuation });
  } else {
    await reservationStatus.create({ Stuation: Stuation });
  }

  ReservationStatus = Stuation;
  res.json({ message: `Reservation system status updated to ${Stuation}.` });
});

// Add this route to your backend server

router.get("/status", checkReservationStatus, (req, res) => {
  res.json({ status: ReservationStatus });
});

router.post("/", validateToken, checkReservationStatus, async (req, res) => {
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

//to update reservation
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

//admin to give table for user

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
//admine to confirm
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
//user cancle reservation
router.put("/cancel/:id", async (req, res) => {
  const { id } = req.params;

  const cancel = await Reservation.findByPk(id);

  if (!cancel) {
    return res.status(404).json({ error: "Reservation not found" });
  }

  cancel.Status = "canceled";
  await cancel.save();

  res.json("Success");
});

//admin to start
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
