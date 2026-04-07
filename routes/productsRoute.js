const express = require("express");
const router = express.Router();
const db = require("../models");
const getAllProducts = require("../controllers/getAllProducts");
const getThreeProducts = require("../controllers/getThreeProducts");
const getProductById = require("../controllers/getProductById");
const getProductsByCategory = require("../controllers/getProductByCategory");
const getThreeProductsByCategory = require("../controllers/getThreeProductsByCategory");
const upload = require("../middlewares/upload");

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
router.get("/api/products", getAllProducts);

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
router.get("/api/products/three", getThreeProducts);

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
router.get("/api/products/:id", getProductById);

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
router.get("/api/products/category/:categoryId", getProductsByCategory);

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
router.get(
  "/api/products/category/three/:categoryId",
  getThreeProductsByCategory,
);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Add a new product with category and upload multiple product photos
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - categoryId
 *               - productName
 *               - price
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               productName:
 *                 type: string
 *                 example: Bee Pollen
 *               quantity:
 *                 type: integer
 *                 example: 20
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 15.5
 *               description:
 *                 type: string
 *                 example: Organic timur achhar from local farm
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post(
  "/api/products",
  upload.array("photos", 5), // max 5 images
  async (req, res) => {
    try {
      const { categoryId, productName, quantity, price, description } =
        req.body;

      // 1️⃣ Create product
      const product = await db.Product.create({
        categoryId,
        productName,
        quantity,
        price,
        description,
      });

      // 2️⃣ Save photos
      if (req.files && req.files.length > 0) {
        const photos = req.files.map((file) => ({
          productId: product.id,
          image_path: "uploads/products/" + file.filename,
        }));

        await db.ProductPhoto.bulkCreate(photos);
      }

      const productWithPhotos = await db.Product.findByPk(product.id, {
        include: [{ model: db.ProductPhoto, as: "photos" }],
      });

      res.status(201).json({
        message: "Product created successfully",
        product: productWithPhotos,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating product" });
    }
  },
);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     description: Update product details and optionally upload new product photos
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               productName:
 *                 type: string
 *                 example: Bee Pollen
 *               quantity:
 *                 type: integer
 *                 example: 20
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 15.5
 *               description:
 *                 type: string
 *                 example: Organic timur achhar from local farm
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put(
  "/api/products/:id",
  (req, res, next) => {
    req.uploadFolder = "uploads/products/";
    next();
  },
  upload.array("photos", 5),
  async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
      const { categoryId, productName, quantity, price, description } =
        req.body;

      const productId = req.params.id;

      // check if product exists
      const product = await db.Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // update product
      await product.update(
        {
          categoryId,
          productName,
          quantity,
          price,
          description,
        },
        { transaction },
      );

      // if new photos uploaded
      if (req.files && req.files.length > 0) {
        // delete old photos
        await db.ProductPhoto.destroy({
          where: { productId: productId },
          transaction,
        });

        const photos = req.files.map((file) => ({
          productId: productId,
          imagePath: "uploads/products/" + file.filename,
        }));

        const createdPhotos = await db.ProductPhoto.bulkCreate(photos, {
          transaction,
        });
      }

      const updatedProduct = await db.Product.findByPk(productId, {
        include: [{ model: db.ProductPhoto, as: "photos" }],
      });

      await transaction.commit();

      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      res.status(500).json({ error: "Error updating product" });
    }
  },
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product and its associated photos
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product deleted successfully"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error deleting product"
 */
router.delete("/api/products/:id", async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const { id } = req.params;
    const deleted = await db.Product.destroy({ where: { id }, transaction });

    if (!deleted) {
      await transaction.rollback();
      return res.status(404).json({ message: "Product not found" });
    }

    await transaction.commit();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ error: "Error deleting product" });
  }
});

module.exports = router;
