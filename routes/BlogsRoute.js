const express = require("express");
const router = express.Router();
const db = require("../models");

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
router.get("/api/blogslp", async (req, res) => {
  try {
    const blogs = await db.Blog.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]],
      attributes: ["id", "title", "slug", "introduction", "createdAt"],
      include: [
        {
          model: db.BlogImage,
          as: "photos",
          attributes: ["imagePath"],
          limit: 1,
        },
      ],
    });
    // console.log(blogs);
    res.json(blogs);
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ error: "An error occurred while fetching blogs." });
  }
});

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
router.get("/api/blogs/:slug", async (req, res) => {
  try {
    const blog = await db.Blog.findOne({
      where: { slug: req.params.slug },
      include: [
        {
          model: db.BlogImage,
          as: "photos",
          attributes: ["imagePath"],
        },
      ],
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blog" });
  }
});

module.exports = router;
