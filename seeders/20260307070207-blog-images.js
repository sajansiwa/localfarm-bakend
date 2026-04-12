"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("BlogImages", null, {});

    await queryInterface.bulkInsert("BlogImages", [
      {
        blogId: 1,
        imagePath: "uploads/blogImages/beepollen.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        blogId: 1,
        imagePath: "uploads/blogImages/madhoney.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("BlogImages", null, {});
  },
};
