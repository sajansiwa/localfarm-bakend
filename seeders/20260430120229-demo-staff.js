"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Staffs", null, {});

    await queryInterface.bulkInsert("Staffs", [
      {
        name: "Santosh Shah",
        position: "Inventory Executive & all rounder",
        imagePath:
          "uploads/staff/Santosh_Shah.jpeg",
      },
      {
        name: "Sanjib Kumar",
        position: "Graphics and Packaging Designer",
        imagePath:
          "uploads/staff/sanjib_kumar.jpeg",
      },
      {
        name: "Nabin Neupane",
        position: "Junior Assistant Accountant",
        imagePath:
          "uploads/staff/nabin_neupane.jpeg",
      },
      {
        name: "Mahesh Pariyar",
        position: "Assistant Accountant",
        imagePath: "uploads/staff/mahesh_pariyar.jpeg",
      },
      {
        name: "Binu Bhujel",
        position: "Cook",
        imagePath: "uploads/staff/binu_bhujel.jpeg",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Staffs", null, {});
  },
};
