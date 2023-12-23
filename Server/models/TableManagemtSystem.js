module.exports = (Sequelize, DataType) => {
  const TableManagementSystem = Sequelize.define("TableManagementSystem", {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    TableNumber: {
      type: DataType.STRING,
      allowNull: true,
    },
    indoor: {
      type: DataType.STRING,
      allowNull: true,
    },

    SeatCapacity: {
      type: DataType.STRING,
      allowNull: true,
    },
    VIP: {
      type: DataType.STRING,
      allowNull: true,
    },
    Note: {
      type: DataType.STRING,
      allowNull: true,
    },
    TableStatus: {
      type: DataType.STRING,
      allowNull: true,
    },
  });
  return TableManagementSystem;
};
