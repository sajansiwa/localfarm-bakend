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
      {
        productId: 4,
        imagePath: "uploads/products/madhoney.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 5,
        imagePath: "uploads/products/jamunhoney.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 6,
        imagePath: "uploads/products/cowghee.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 7,
        imagePath: "uploads/products/mangopickle.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 8,
        imagePath: "uploads/products/timurkochop.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProductPhotos", null, {});
  },
};
