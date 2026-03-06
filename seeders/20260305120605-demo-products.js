"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkDelete("Products", null, {});

    await queryInterface.bulkInsert("Products", [
      {
        categoryID: 1,
        productName: "Bee Pollen",
        quantity: 100,
        price: 2500,
        description: "High-quality bee pollen collected from local flowers.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryID: 1,
        productName: "Mad Honey",
        quantity: 150,
        price: 1200,
        description:
          "Delicious mad honey form the himalayas of nepal with a unique flavor.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryID: 4,
        productName: "chilly Pickle",
        quantity: 200,
        price: 1200,
        description: "Spicy chilly pickle made from organic ingredients.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryID: 2,
        productName: "Shilajit",
        quantity: 200,
        price: 1200,
        description: "Pure shilajit resin sourced from the mountains of Nepal, known for its health benefits.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryID: 1,
        productName: "Bee Pollen",
        quantity: 100,
        price: 2500,
        description: "High-quality bee pollen collected from local flowers.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryID: 1,
        productName: "Mad Honey",
        quantity: 150,
        price: 1200,
        description:
          "Delicious mad honey form the himalayas of nepal with a unique flavor.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryID: 4,
        productName: "chilly Pickle",
        quantity: 200,
        price: 1200,
        description: "Spicy chilly pickle made from organic ingredients.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryID: 2,
        productName: "Shilajit",
        quantity: 200,
        price: 1200,
        description: "Pure shilajit resin sourced from the mountains of Nepal, known for its health benefits.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
  
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
