const db = require("../models");

const getBlogsByProductCategory = async (req, res) => {
  try {
    console.log("Fetching blogs for category ID:", req.params.id);
    const blogs = await db.Blog.findAll({
      where: { categoryId: req.params.id },
      include: [
        {
          model: db.BlogImage,
          as: "photos",
          attributes: ["imagePath"],
        },
        {
          model: db.ProductCategory,
          as: "category",
          attributes: ["categoryName"],
        },
      ],
    });

    if (!blogs || blogs.length === 0) {
      return res
        .status(404)
        .json({ message: "No blogs found for this category" });
    }

    console.log("Fetched blogs:", blogs);

    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Error fetching blogs" });
  }
};

module.exports = getBlogsByProductCategory;
