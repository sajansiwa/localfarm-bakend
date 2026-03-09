const express = require("express");
const router = express.Router();
const db = require("../models");
const getAllProducts = require("../controllers/getAllProducts");
const getThreeProducts = require("../controllers/getThreeProducts");
const getProductById = require("../controllers/getProductById");
const getProductsByCategory = require("../controllers/getProductByCategory");
const getThreeProductsByCategory = require("../controllers/getThreeProductsByCategory");

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

module.exports = router;
