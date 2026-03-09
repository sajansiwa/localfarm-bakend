const db = require("../models");

const addProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;
    const product = await db.Product.create({
      name,
      description,
      price,
      categoryId,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = addProduct;
