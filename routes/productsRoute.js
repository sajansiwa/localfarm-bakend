const express = require("express");
const router = express.Router();
const db = require("../models");

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products for admin and product listing page
 *     description: Retrieve a list of all products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: List of products
 *       500:
 *         description: Server error
 */
router.get("/api/products", async (req, res) => {
  try {
    const products = await db.Product.findAll( {
        include: [
            {model: db.ProductPhoto, as: "photos", attributes: ["imagePath"]},
        ]
    });
    // console.log(products);
    res.json(products);
  } catch (err) {
    // console.error("Error fetching products:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products." });
  }
});

/**
 * @swagger
 * /api/products/three:
 *   get:
 *     summary: Get three products
 *     description: Retrieve three of all products for the landing page
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: List of three products
 *       500:
 *         description: server error
 */
router.get("/api/products/three", async (req, res) => {
  try {
    const products = await db.Product.findAll({
      limit: 3,
    });
    // console.log(products);
    res.json(products);
  } catch (err) {
    // console.error("Error fetching products:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products." });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     description: Retrieve a single product using its ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get("/api/products/:id", async (req, res) => {
  try {
    const product = await db.Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/products/category/{categoryId}:
 *   get:
 *     summary: Get products by category for product listing page
 *     description: Retrieve all products belonging to a specific category
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: List of products in the category
 *       404:
 *         description: No products found for this category
 *       500:
 *         description: Server error
 */
router.get("/api/products/category/:categoryId", async (req, res) => {
  try {
    const products = await db.Product.findAll({
      where: { categoryId: req.params.categoryId },
    });
    products.length > 0
      ? res.json(products)
      : res
          .status(404)
          .json({ message: "No products found for this category" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/**
 * @swagger
 * /api/products/category/three/{categoryId}:
 *   get:
 *     summary: Get three products by category
 *     description: Retrieve three products belonging to a specific category
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: List of products in the category
 *       404:
 *         description: No products found for this category
 *       500:
 *         description: Server error
 */
router.get("/api/products/category/three/:categoryId", async (req, res) => {
  try {
    const products = await db.Product.findAll({
      where: { categoryId: req.params.categoryId },
      limit: 3,
    });
    products.length > 0
      ? res.json(products)
      : res
          .status(404)
          .json({ message: "No products found for this category" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
