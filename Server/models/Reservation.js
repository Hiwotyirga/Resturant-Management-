// C:\Users\Hiwi\Resturant-Management-\Server\models\Reservation.js
module.exports = (Sequelize, DataTypes) => {
  const Users = require("./Users");
  const Reservation = Sequelize.define("Reservation", {
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NumberOfGuest: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Selection: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  });

  Reservation.associate = (models) => {
    Reservation.belongsTo(models.Users, { foreignKey: "userId" });
  };

  return Reservation;
};