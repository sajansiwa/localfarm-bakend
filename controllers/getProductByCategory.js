const db = require("../models");

const getProductsByCategory = async (req, res) => {
  try {
    const products = await db.Product.findAll({
      where: { categoryId: req.params.categoryId },
      include: [
        { model: db.ProductPhoto, as: "photos", attributes: ["imagePath"] },
      ],
    });
    products.length > 0
      ? res.json(products)
      : res
          .status(404)
          .json({ message: "No products found for this category" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getProductsByCategory;
