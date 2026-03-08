"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete("Blogs", null, {});

    await queryInterface.bulkInsert("Blogs", [
      {
        title: "The Buzz on Mad Honey: Nature’s Sweetest Risky Business",
        slug: "benefits-of-mad-honey",
        introduction: `Deep in the high altitudes of Nepal and Turkey, there is a honey that does a lot more than sweeten your tea. Known as "Mad Honey" (or deli bal in Turkish), this rare, amber nectar is famous for its medicinal properties—and its potent, sometimes trippy side effects.`,
        content: `Deep in the high altitudes of Nepal and Turkey, there is a honey that does a lot more than sweeten your tea. Known as "Mad Honey" (or deli bal in Turkish), this rare, amber nectar is famous for its medicinal properties—and its potent, sometimes trippy side effects. What Makes it "Mad"? The "magic" ingredient isn't actually in the bees; it's in the flowers. Honeybees (specifically the Himalayan giant honeybee) forage on certain species of Rhododendron. These flowers contain grayanotoxins, a natural neurotoxin.`,
        author: "Admin",
        status: "published",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Why Bee Pollen is Healthy",
        slug: "bee-pollen-benefits",
        introduction: `Deep in the high altitudes of Nepal and Turkey, there is a honey that does a lot more than sweeten your tea. Known as "Mad Honey" (or deli bal in Turkish), this rare, amber nectar is famous for its medicinal properties—and its potent, sometimes trippy side effects.`,
        content: `Deep in the high altitudes of Nepal and Turkey, there is a honey that does a lot more than sweeten your tea. Known as "Mad Honey" (or deli bal in Turkish), this rare, amber nectar is famous for its medicinal properties—and its potent, sometimes trippy side effects. What Makes it "Mad"? The "magic" ingredient isn't actually in the bees; it's in the flowers. Honeybees (specifically the Himalayan giant honeybee) forage on certain species of Rhododendron. These flowers contain grayanotoxins, a natural neurotoxin.`,
        author: "Admin",
        status: "published",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Blogs", null, {});
  },
};
