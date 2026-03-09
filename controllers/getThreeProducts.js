const db = require("../models");

const getAllProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll({
      limit: 3,
      include: [
        { model: db.ProductPhoto, as: "photos", attributes: ["imagePath"] },
      ],
    });
    // console.log(products);
    res.json(products);
  } catch (err) {
    // console.error("Error fetching products:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products." });
  }
};

module.exports = getAllProducts;
