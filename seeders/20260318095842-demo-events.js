"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("events", null, {});
    await queryInterface.bulkInsert("events", [
      {
        id: 1,
        eventTitle: "Body building competition",
        eventDescription: "local farm became a part of the body building competition",
        isUpcoming: true,
        date: new Date("2024-12-01"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        eventTitle: "Movie Premier Night",
        eventDescription: "Aktor movie premiere sponsored by local farm",
        isUpcoming: false,
        date: new Date("2024-12-01"),

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        eventTitle: "Movie Screening Event",
        eventDescription: "AANKHA MOVIE screening sponsored by local farm",
        isUpcoming: false,
        date: new Date("2024-12-01"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        eventTitle: "Meet Up with the Superstar",
        eventDescription: "Meet up with the superstar swastima khadka",
        isUpcoming: false,
        date: new Date("2024-12-01"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("events", null, {});
  },
};
