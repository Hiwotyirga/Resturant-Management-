"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Reservations", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      // Stuation: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      //   enum: ["open", "close"],
      //   defaultValue: "open",
      // },
      ActualArrivalTime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Reservation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      TableNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Start: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users", // Assuming your Users table is named Users
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