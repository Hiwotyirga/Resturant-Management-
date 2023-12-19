module.exports = (Sequelize, DataTypes) => {
  const reservationStatus = Sequelize.define("reservationStatus", {
    Stuation: {
      type: DataTypes.STRING,
      allowNull: false,
      enum: ["open", "close"],
      defaultValue: "open",
    },
  });

  return reservationStatus;
};
