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
      {
        categoryID: 1,
        productName: "localfarm mad honey 200g ",
        quantity: 200,
        price: 1200,
        description:
          "Sourced from Nepal’s wild beehives, Local Farm's Mad Honeyis a pure, traditional product harvested by expert local farmers. Known for its distinct, high-altitude properties, it offers a truly unique taste of the Himalayas, straight from a dedicated Nepali company.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryID: 1,
        productName: "localfarm jamun honey 200g ",
        quantity: 200,
        price: 1200,
        description:
          "Harvested from the dense Himalayan forests of Nepal, Local Farm’s Jamun Honeyis a rare, dark, and robust monofloral nectar. Rich in antioxidants and minerals, it offers a unique, slightly bitter-sweet flavor profile. This 100% pure, raw honey is a natural superfood for wellness and vitality.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryID: 5,
        productName: "localfarm cow ghee 300ml ",
        quantity: 200,
        price: 1200,
        description:
          "Handcrafted in the Himalayan foothills, Local Farm’s Cow Gheeis a pure, clarified butter made using traditional Nepali methods. Rich in healthy fats and a nutty aroma, it enhances digestion and boosts energy. Experience the authentic, golden essence of Nepal with every spoonful from our local company.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryID: 4,
        productName: "localfarm mango pickle 375g ",
        quantity: 200,
        price: 1200,
        description:
          "Local Farm’s Mango Pickleis a burst of authentic Himalayan flavor. Made with sun-ripened mangoes and a traditional blend of aromatic spices like Hing, Kalonji, and Mustard, it delivers a perfect tangy-spicy kick. Elevate any meal with this pure, preservative-free Nepali classic.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryID: 4,
        productName: "localfarm timur ko chop 200g ",
        quantity: 200,
        price: 1200,
        description:
          "Local Farm’s Timur ko Chopis a signature Himalayan spice blend. Combining the citrusy, numbing zing of wild Timur pepper with roasted chilies, it adds a bold, authentic flavor to any dish. Experience this pure, preservative-free \"taste of home\" in every bite.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
