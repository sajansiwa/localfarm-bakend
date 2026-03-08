"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("BlogImages", null, {});

    await queryInterface.bulkInsert("BlogImages", [
      {
        blogId: 1,
        imagePath: "uploads/blogImages/blogimage1.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        blogId: 1,
        imagePath: "uploads/blogImages/blogimage2.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        blogId: 2,
        imagePath: "uploads/blogImages/blogimage3.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("BlogImages", null, {});
  },
};
