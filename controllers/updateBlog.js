const db = require("../models");

const updateBlogs = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const { id } = req.params;
    const { title, slug, introduction, photos } = req.body;

    const blog = await db.Blog.findByPk(id);
    if (!blog) {
      await transaction.rollback();
      return res.status(404).json({ message: "Blog not found" });
    }

    // Update blog
    await db.Blog.update(
      { title, slug, introduction },
      { where: { id }, transaction },
    );

    // Replace images (simple approach)
    // if new photos uploaded
    if (req.files && req.files.length > 0) {
      // delete old photos
      await db.BlogImage.destroy({
        where: { blogId: id },
      });

      const photos = req.files.map((file) => ({
        blogId: id,
        image_path: "uploads/products/" + file.filename,
      }));

      await db.BlogImage.bulkCreate(photos);
    }
    await transaction.commit();

    const updatedBlog = await db.Blog.findByPk(id, {
      include: [{ model: db.BlogImage, as: "photos" }],
    });

    res.status(200).json(updatedBlog);
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    res.status(500).json({ error: "Error updating blog" });
  }
};
module.exports = updateBlogs;
