"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProductPhotos", null, {});

    await queryInterface.bulkInsert("ProductPhotos", [
      {
        product_id: 12,
        image_path: "uploads/products/beepollen.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 13,
        image_path: "uploads/products/madhoney.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 14,
        image_path: "uploads/products/chillypickle.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 15,
        image_path: "uploads/products/shilajit.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProductPhotos", null, {});
  },
};
