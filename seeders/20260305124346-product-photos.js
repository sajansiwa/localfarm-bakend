"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProductPhotos", null, {});

    await queryInterface.bulkInsert("ProductPhotos", [
      {
        productId: 1,
        imagePath: "uploads/products/beepollen.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        imagePath: "uploads/products/madhoney.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        imagePath: "uploads/products/pickle.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        imagePath: "uploads/products/silajit.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProductPhotos", null, {});
  },
};
