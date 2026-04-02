const db = require("../models");

const updateBlogs = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const { id } = req.params;
    const blogId = parseInt(id, 10);
    const { title, slug, introduction } = req.body;

    const blog = await db.Blog.findByPk(blogId);
    if (!blog) {
      await transaction.rollback();
      return res.status(404).json({ message: "Blog not found" });
    }

    // Update blog
    await db.Blog.update(
      { title, slug, introduction },
      { where: { id: blogId }, transaction },
    );

    // Replace images (simple approach)
    // if new photos uploaded
    // console.log("id:", req.params);
    // console.log("updatebody:", req.body);
    // console.log("updatefiles:", req.files);
    if (req.files && req.files.length > 0) {
      await db.BlogImage.destroy({
        where: { blogId: blogId },
        transaction,
      });

      const photos = req.files.map((file) => ({
        blogId: blogId,
        imagePath: "uploads/blogImages/" + file.filename,
      }));

      await db.BlogImage.bulkCreate(photos, { transaction });
      // ← and here
    }

    const updatedBlog = await db.Blog.findByPk(blogId, {
      include: [{ model: db.BlogImage, as: "photos" }],
    });

    await transaction.commit();

    res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    res.status(500).json({ error: "Error updating blog" });
  }
};
module.exports = updateBlogs;
