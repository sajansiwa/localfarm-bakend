const db = require("../models");

const getLatestBlogs = async (req, res) => {
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
};

module.exports = getLatestBlogs;
