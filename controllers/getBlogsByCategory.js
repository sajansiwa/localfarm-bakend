const db = require("../models");

const getProductByCategory = async (req, res) => {
  try {
    const blog = await db.Blog.findOne({
      where: { slug: req.params.slug },
      include: [
        {
          model: db.BlogImage,
          as: "photos",
          attributes: ["imagePath"],
          limit: 1,
        },
      ],
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    console.log("Fetched blog:", blog);
    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ error: "Error fetching blog" });
  }
};

module.exports = getProductByCategory;
