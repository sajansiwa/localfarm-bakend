"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkDelete("ProductCategories", null, {});

    await queryInterface.bulkInsert("ProductCategories", [
      {
        category_name: "Honey",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: "Shilajit",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: "Tea",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: "Pickles",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, sequelize) {
    await queryInterface.bulkDelete("ProductCategories", null, {});
  },
};
