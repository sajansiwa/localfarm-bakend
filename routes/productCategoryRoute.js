const express = require("express");
const router = express.Router();
const db = require("../models");

/**
 * @swagger
 * /api/product-categories:
 *   get:
 *     summary: Get all product categories
 *     tags:
 *       - Product Categories
 *     responses:
 *       200:
 *         description: List of all product categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   categoryName:
 *                     type: string
 *                     example: "Beverages"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while fetching product categories"
 */
router.get("/api/product-categories", async (req, res) => {
  try {
    const categories = await db.ProductCategory.findAll();
    console.log(categories);
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching product categories:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching product categories" });
  }
});

/**
 * @swagger
 * /api/product-categories/{id}:
 *   patch:
 *     summary: Update a product category by ID
 *     tags:
 *       - Product Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryName
 *             properties:
 *               categoryName:
 *                 type: string
 *                 example: "Dairy Products"
 *     responses:
 *       200:
 *         description: Product category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product category updated successfully"
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     categoryName:
 *                       type: string
 *                       example: "Dairy Products"
 *       400:
 *         description: Invalid or missing categoryName
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "categoryName is required"
 *       404:
 *         description: Product category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product category not found"
 *       409:
 *         description: Category name already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category name already exists"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while updating product category"
 */
router.patch("/api/product-categories/:id", async (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;

  if (
    !categoryName ||
    typeof categoryName !== "string" ||
    !categoryName.trim()
  ) {
    return res.status(400).json({ message: "categoryName is required" });
  }

  const trimmed = categoryName.trim();

  try {
    const category = await db.ProductCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Product category not found" });
    }

    const duplicate = await db.ProductCategory.findOne({
      where: { categoryName: trimmed },
    });
    if (duplicate && duplicate.id !== parseInt(id)) {
      return res.status(409).json({ message: "Category name already exists" });
    }

    category.categoryName = trimmed;
    await category.save();

    res.status(200).json({
      message: "Product category updated successfully",
      category: category.toJSON(),
    });
  } catch (error) {
    console.error("Error updating product category:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating product category" });
  }
});

/**
 * @swagger
 * /api/product-categories:
 *   post:
 *     summary: Create a new product category
 *     tags:
 *       - Product Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryName
 *             properties:
 *               categoryName:
 *                 type: string
 *                 example: "Snacks"
 *     responses:
 *       201:
 *         description: Product category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product category created successfully"
 *       400:
 *         description: Invalid or missing categoryName
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid category name"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while creating product category"
 */
router.post("/api/product-categories", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { categoryName } = req.body;

    if (
      categoryName === undefined ||
      typeof categoryName !== "string" ||
      !categoryName.trim()
    ) {
      return res.status(400).json({ message: "Invalid category name" });
    }

    await db.ProductCategory.create(
      { categoryName: categoryName.trim() },
      { transaction },
    );

    await transaction.commit();

    res.status(201).json({ message: "Product category created successfully" });
  } catch (error) {
    await transaction.rollback();
    console.error("Error creating product category:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating product category" });
  }
});

module.exports = router;
