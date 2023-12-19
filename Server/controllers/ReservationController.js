const { Reservation } = require("../models");

exports.openReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByPk(id);

    if (!reservation) {
      return res
        .status(404)
        .json({ success: false, error: "Reservation not found" });
    }

    await reservation.update({ Stuation: "open" });

    res.status(200).json({ success: true, reservation });
  } catch (error) {
    console.error("Error opening reservation:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.closeReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByPk(id);

    if (!reservation) {
      return res
        .status(404)
        .json({ success: false, error: "Reservation not found" });
    }

    await reservation.update({ Stuation: "close" });

    res.status(200).json({ success: true, reservation });
  } catch (error) {
    console.error("Error closing reservation:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
