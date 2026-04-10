"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkDelete("ProductCategories", null, {});

    await queryInterface.bulkInsert("ProductCategories", [
      {
        categoryName: "Honey",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryName: "Shilajit",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryName: "Pollen",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryName: "Pickles",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryName: "Dairy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, sequelize) {
    await queryInterface.bulkDelete("ProductCategories", null, {});
  },
};
