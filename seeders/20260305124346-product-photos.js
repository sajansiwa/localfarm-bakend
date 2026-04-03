"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProductPhotos", null, {});

    await queryInterface.bulkInsert("ProductPhotos", [
      {
        productId: 1,
        imagePath: "uploads/products/beepollen 0.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        imagePath: "uploads/products/premium mad honey.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        imagePath: "uploads/products/SHILAJIT.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProductPhotos", null, {});
  },
};
