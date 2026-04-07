"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("eventphotos", [
      {
        eventId: 1,
        imagePath: "uploads/events/event1.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 2,
        imagePath: "uploads/events/event2.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 3,
        imagePath: "uploads/events/event3.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 4,
        imagePath: "uploads/events/event4.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("eventphotos", null, {});
  },
};
         