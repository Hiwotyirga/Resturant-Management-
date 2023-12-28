"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Reservations", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        // autoIncrement: true,
      },
      PhoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Time: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      NumberOfGuest: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Selection: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "New",
      },
      FeeStatus: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ActualArrivalTime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // Reservation: {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // },
      TableNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      startTime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      // Start: {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Reservations");
  },
};
