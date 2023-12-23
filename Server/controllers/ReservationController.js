const { Reservation } = require("../models");
// exports.closeReservation = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const reservation = await Reservation.findByPk(id);

//     if (!reservation) {
//       return res
//         .status(404)
//         .json({ success: false, error: "Reservation not found" });
//     }

//     await reservation.update({ Stuation: "close" });

//     res.status(200).json({ success: true, reservation });
//   } catch (error) {
//     console.error("Error closing reservation:", error);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// };

const ReservationMaxDuration = async (req, res, next) => {
  const { PhoneNumber, Date: ReservationDate, Time, NumberOfGuest, Selection } = req.body;
  const reservationMaxDuration = 60 * 60 * 1000; 

  const reservationEndTime =
    new Date(`${Date}T${Time}:00Z`).getTime() + reservationMaxDuration;

  if (Date.now() > reservationEndTime) {
    return res.json({ error: "Reservation has expired" });
  }

  next();
};

module.exports = ReservationMaxDuration;
