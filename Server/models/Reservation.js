module.exports = (Sequelize, DataTypes, Op, Model) => {
  // const Users = require("./Users");
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
    Status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "New",
    },
   FeeStatus:{
    type: DataTypes.STRING,
    allowNull: true,  

   },
  

    ActualArrivalTime: {
      type: DataTypes.STRING,
      allowNull: true,  
    },
    Reservation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TableNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Start: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Reservation.associate = (models) => {
    Reservation.belongsTo(models.Users, { foreignKey: "userId" });
  };

  return Reservation;
};
