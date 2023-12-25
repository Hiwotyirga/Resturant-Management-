module.exports = (Sequelize, DataTypes, Op, Model) => {
  // const Users = require("./Users");
  const Reservation = Sequelize.define("Reservation", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
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
    FeeStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    ActualArrivalTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    // Reservation: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    TableNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: [],
    },
    // Start: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
  });

  Reservation.associate = (models) => {
    Reservation.belongsTo(models.Users, { foreignKey: "userId" });
  };

  return Reservation;
};
