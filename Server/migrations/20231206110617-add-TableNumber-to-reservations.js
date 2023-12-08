"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Reservations", "TableNumber", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "pending", // Set a default value if needed
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Reservations", "TableNumber");
  },
};
