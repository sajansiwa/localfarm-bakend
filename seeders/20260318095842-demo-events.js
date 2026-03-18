"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("events", null, {});
    await queryInterface.bulkInsert("events", [
      {
        id: 1,
        eventTitle: "Coffee Tasting Event",
        eventDescription: "Explore different coffee beans and flavors.",
        isUpcoming: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        eventTitle: "Honey Harvest Festival",
        eventDescription: "Experience raw honey collection and tasting.",
        isUpcoming: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        eventTitle: "Honey Harvest Festival",
        eventDescription: "Experience raw honey collection and tasting.",
        isUpcoming: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        eventTitle: "Honey Harvest Festival",
        eventDescription: "Experience raw honey collection and tasting.",
        isUpcoming: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        eventTitle: "Honey Harvest Festival",
        eventDescription: "Experience raw honey collection and tasting.",
        isUpcoming: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("events", null, {});
  },
};
