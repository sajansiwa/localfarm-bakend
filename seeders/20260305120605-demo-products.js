"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});

    await queryInterface.bulkInsert("Products", [
      {
        categoryID: 3,
        productName: "Bee Pollen",
        quantity: 100,
        price: 2500,
        description:
          "Harvested from the high-altitude flora of the Himalayas, Local Farm Bee Pollen is a nutrient-dense superfood from Nepal. This organic \"nature's multivitamin\" naturally boosts energy, aids digestion, and supports immune health. Packed with proteins and enzymes, it's a pure, golden gift from the heart of the mountains.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryID: 1,
        productName: "Premium Mad Honey",
        quantity: 150,
        price: 1200,
        description:
          "Sourced from the high-altitude cliffs of the Himalayas, Local Farm Premium Mad Honeyis a rare, medicinal nectar unique to Nepal. Renowned for its natural healing properties, it aids digestion, promotes deep relaxation, and supports immune health. Experience the potent, authentic essence of the world’s most legendary wild honey.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryID: 2,
        productName: "Shilajit",
        quantity: 200,
        price: 1200,
        description:
          "Sourced from the pristine heights of the Himalayas, Local Farm Shilajitis a potent, mineral-rich resin purified using traditional Nepali methods. This authentic, organic superfood supports energy, immunity, and holistic wellness. Experience the raw power of nature with every drop, straight from the heart of Nepal.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
