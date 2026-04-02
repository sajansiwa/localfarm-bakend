const db = require("../models");

const createBlogs = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const { title, slug, introduction, content } = req.body;

    const newBlog = await db.Blog.create(
      { title, slug, introduction, content },
      { transaction },
    );

    console.log("files:", req.files);
    if (req.files && req.files.length > 0) {
      const photos = req.files.map((file) => ({
        BlogId: newBlog.id,
        imagePath: "uploads/blogImages/" + file.filename,
      }));

      await db.BlogImage.bulkCreate(photos, { transaction });
    }

    await transaction.commit();

    // fetch full blog with images
    const createdBlog = await db.Blog.findByPk(newBlog.id, {
      include: [{ model: db.BlogImage, as: "photos" }],
    });

    return res.status(201).json({
      message: "Blog created successfully",
      blog: createdBlog,
    });
  } catch (err) {
    if (!transaction.finished) {
      await transaction.rollback(); // safe rollback
    }

    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
module.exports = createBlogs;
