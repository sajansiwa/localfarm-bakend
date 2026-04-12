"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Blogs", null, {});

    await queryInterface.bulkInsert("Blogs", [
      {
        title: "Bee Pollen: Nature's Multivitamin from the Himalayan Heights",
        categoryId: 3,
        slug: "local-farm-bee-pollen",
        introduction: `Few natural substances on earth are as nutritionally complete as bee pollen. Collected by hardworking honeybees from thousands of wildflowers across the high-altitude meadows of the Himalayas, bee pollen has been used for centuries in traditional medicine across Asia and Europe. Today, modern science is catching up — and confirming what ancient healers always knew. Local Farm Bee Pollen brings this remarkable superfood directly from Nepal's pristine mountain ecosystems to your table.`,
        content: `Bee pollen is not simply pollen collected from flowers. It is a complex mixture of flower pollen, nectar, bee enzymes, honey, and wax that bees compact into tiny granules as they travel between blooms. This process creates one of nature's most concentrated nutritional packages. A single teaspoon contains over 250 biologically active substances including proteins, free amino acids, vitamins, enzymes, and flavonoids.
What sets Himalayan bee pollen apart is the extraordinary biodiversity of its source. Nepal's high-altitude flora, thriving above 3,000 metres in some of the cleanest air on the planet, offers bees a wildly diverse menu of blossoms — from rhododendron forests to alpine wildflowers. This botanical variety translates directly into a richer, more complex nutritional profile than pollen collected from lowland monocultures.
From a health perspective, bee pollen delivers on multiple fronts. It is one of the few plant-based sources of complete protein, containing all essential amino acids. Athletes and fitness enthusiasts have long used it as a natural energy booster, appreciating its ability to reduce fatigue and improve stamina without artificial stimulants. For those managing digestive health, the natural enzymes present in raw bee pollen aid nutrient absorption and gut function.
Its immune-supporting properties are equally impressive. Rich in antioxidants including flavonoids, carotenoids, and quercetin, bee pollen helps neutralise free radicals and reduce systemic inflammation. Regular consumption has been associated with improved allergy resilience over time, although it should be introduced gradually to those with existing pollen sensitivities.
Local Farm harvests Bee Pollen sustainably, ensuring neither the bees nor the mountain ecosystem are disrupted. The pollen is collected using specialised traps at hive entrances, dried at low temperatures to preserve enzymes, and packaged without additives or preservatives. What reaches your home is as close to raw nature as possible.
The taste is mild, subtly floral, and slightly sweet — making it incredibly versatile. Sprinkle it over yoghurt, blend it into smoothies, stir it into oatmeal, or simply take a teaspoon with warm water each morning. For best results, store it in a cool, dry place away from direct sunlight.
Whether you are an athlete seeking natural performance support, a wellness enthusiast building a clean supplement routine, or simply someone curious about what the mountains of Nepal have to offer — Local Farm Bee Pollen is a golden, granular answer. It is not a trend. It is a tradition, harvested with care from one of the most biodiverse mountain ranges in the world.
`,
        author: "Admin",
        status: "published",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Premium Mad Honey: The World's Most Legendary Wild Nectar",
        categoryId: 1,
        slug: "local-farm-premium-mad-honey",
        introduction: `Deep in the cliff faces of the Himalayan foothills, the world's largest honeybees — Apis dorsata laboriosa — construct hanging combs that can stretch wider than a person is tall. The honey they produce from rhododendron blossoms is unlike any other. Known globally as "mad honey," it has been harvested by the Gurung people of Nepal for over two thousand years and remains one of the most sought-after natural substances in the world. Local Farm Premium Mad Honey is sourced directly from these traditional hunters and delivered to you in its most authentic, unprocessed form.`,
        content: `The name "mad honey" comes from the naturally occurring compound grayanotoxin, found in the nectar of certain rhododendron species native to Nepal's hillsides. When bees collect this nectar and concentrate it into honey, the resulting product contains mild levels of this bioactive compound — giving the honey its characteristic slight bitterness and its legendary reputation for producing a gentle, warming sensation when consumed in small quantities.
This is not a novelty or a gimmick. For centuries, Nepali traditional medicine has used mad honey to treat hypertension, digestive disorders, and joint pain. Contemporary clinical research has begun exploring grayanotoxin's potential as a natural antihypertensive and anti-inflammatory agent. Small, measured doses have been associated with reduced blood pressure, improved digestion, and a calm, relaxed state of mind.
The harvest itself is one of Nepal's most remarkable traditions. Gurung honey hunters use hand-made rope ladders and long bamboo poles to access cliff-side hives, often at heights exceeding 300 metres. This practice, largely unchanged for millennia, is a ceremony as much as a livelihood — performed twice a year in spring and autumn when rhododendron blooms are at their peak.
Local Farm partners directly with these communities, ensuring the honey is ethically harvested, fairly traded, and free from adulteration. Our Premium Mad Honey undergoes no heating, filtering, or blending. It arrives in the same raw state it was extracted from the comb, preserving every enzyme, antioxidant, and bioactive compound the bees packed into it.
The flavour is rich, bold, and slightly medicinal — a deep, dark amber nectar with earthy undertones that distinguish it instantly from commercial honey. A teaspoon taken in warm water, or spread lightly on toast, is the traditional dosage. It is not meant to be consumed by the jar — its potency commands respect and moderation.
Mad honey is not for everyone. Those on heart medication, pregnant women, and children should consult a healthcare provider before use. But for the curious, the wellness-conscious, and the adventurous, it represents something genuinely rare: a food with documented history, cultural depth, and real physiological effect that no factory could ever replicate.
With Local Farm Premium Mad Honey, you are not simply buying honey. You are holding a piece of Himalayan heritage — bitter, golden, and extraordinary.
`,
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
