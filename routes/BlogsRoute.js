const express = require("express");
const router = express.Router();
const getLatestBlogs = require("../controllers/getLatestBlogs");
const getBlogsBySlug = require("../controllers/getBlogsBySlug");
const getAllBlogs = require("../controllers/getAllBlogs");
const updateBlogs = require("../controllers/updateBlog");
const createBlogs = require("../controllers/createBlogs");
const getBlogsByProductCategory = require("../controllers/getBlogsByProductCategory");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

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
 * /api/blogs:
 *   get:
 *     summary: Get all blogs for the blogs page
 *     description: Retrieve a list of all blogs
 *     tags:
 *       - Blogs
 *     responses:
 *       200:
 *         description: List of blogs
 *       500:
 *         description: Server error
 */
router.get("/api/blogs", getAllBlogs);

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update a blog by ID
 *     description: Updates blog details and images using form-data.
 *     tags:
 *       - Blogs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Why mad honey is Healthy
 *               slug:
 *                 type: string
 *                 example: mad-honey-benefits
 *               introduction:
 *                 type: string
 *                 example: Bee pollen is a natural substance collected by bees from flowers. It is rich in nutrients and has been used for centuries for its health benefits. In this blog, we will explore the various benefits of bee pollen and why it is considered a superfood.
 *               content:
 *                 type: string
 *                 example: Bee pollen is packed with vitamins, minerals, proteins, lipids, and antioxidants. It has been shown to boost the immune system, improve digestion, and reduce inflammation. Additionally, bee pollen may help with allergies by acting as a natural antihistamine. It can also enhance athletic performance and promote skin health. Overall, incorporating bee pollen into your diet can provide numerous health benefits.
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Server error
 */
router.put(
  "/api/blogs/:id",
  authMiddleware,
  (req, res, next) => {
    req.uploadFolder = "uploads/blogImages/";
    next();
  },
  upload.array("photos"),
  updateBlogs,
);

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog
 *     description: Creates a new blog with the provided details and images.
 *     tags:
 *       - Blogs
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: new blog title
 *               slug:
 *                 type: string
 *                 example: new-blog-slug
 *               introduction:
 *                 type: string
 *                 example: new blog introduction
 *               content:
 *                 type: string
 *                 example: new blog content
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Blog created successfully
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Server error
 */
router.post(
  "/api/blogs",
  authMiddleware,
  (req, res, next) => {
    req.uploadFolder = "uploads/blogImages/";
    next();
  },
  upload.array("photos"),
  createBlogs,
);

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
router.get("/api/blogs/:slug", getBlogsBySlug);

/**
 * @swagger
 * /api/blogs/category/{id}:
 *   get:
 *     summary: Get blog by product category
 *     description: Retrieve a single blog using its ID
 *     tags:
 *       - Blogs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: category ID
 *         schema:
 *           type: string
 *           example: 1
 *     responses:
 *       200:
 *         description: Blog found
 *       404:
 *         description: Blog not found
 */
router.get("/api/blogs/category/:id", getBlogsByProductCategory);

module.exports = router;
