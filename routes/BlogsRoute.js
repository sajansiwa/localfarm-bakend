const express = require("express");
const router = express.Router();
const getLatestBlogs = require("../controllers/getLatestBlogs");
const getProductByCategory = require("../controllers/getBlogsByCategory");

/**
 * @swagger
 * /api/blogslp:
 *   get:
 *     summary: Get latest blogs for the landing page
 *     description: Retrieve a list of all blogs
 *     tags:
 *       - Blogs
 *     responses:
 *       200:
 *         description: List of blogs
 *       500:
 *         description: Server error
 */
router.get("/api/blogslp", getLatestBlogs);

/**
 * @swagger
 * /api/blogs/{slug}:
 *   get:
 *     summary: Get blog by slug
 *     description: Retrieve a single blog using its slug
 *     tags:
 *       - Blogs
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: Blog slug
 *         schema:
 *           type: string
 *           example: benefits-of-mad-honey
 *     responses:
 *       200:
 *         description: Blog found
 *       404:
 *         description: Blog not found
 */
router.get("/api/blogs/:slug", getProductByCategory);

module.exports = router;
