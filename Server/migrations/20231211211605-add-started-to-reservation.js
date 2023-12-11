"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Reservations", " Started", {
      type: Sequelize.BOOLEAN,
      allowNull: true, // or false depending on your requirement
      defaultValue: false, // or true depending on your requirement
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Reservations", " Started");
  },
};
