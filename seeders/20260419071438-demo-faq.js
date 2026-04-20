"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Faqs", null, {});

    await queryInterface.bulkInsert("Faqs", [
      {
        question: "What is Mad Honey?",
        answer:
          "Mad Honey is a type of honey produced by bees that collect nectar from certain species of rhododendron flowers. It contains grayanotoxins, which can cause hallucinations and other effects when consumed in large quantities.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: "Is Mad Honey safe to consume?",
        answer:
          "Mad Honey can be safe to consume in small amounts, but it can be dangerous if consumed in large quantities. It is important to consult with a healthcare professional before consuming Mad Honey, especially if you have any underlying health conditions.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: "What are the potential benefits of Mad Honey?",
        answer:
          "Some people believe that Mad Honey has medicinal properties and may help with conditions such as high blood pressure, digestive issues, and sexual dysfunction. However, more research is needed to fully understand the potential benefits and risks of consuming Mad Honey.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Faq", null, {});
  },
};
