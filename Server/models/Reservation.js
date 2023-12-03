module.exports = (Sequelize, DataTypes) => {
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
    // TableNum: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  });

  return Reservation;
};
