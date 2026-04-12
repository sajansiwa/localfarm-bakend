"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Blog.belongsTo(models.ProductCategories, {
        foreignKey: "categoryId",
        as: "category",
      });

      Blog.hasMany(models.BlogImage, {
        foreignKey: "BlogId",
        as: "photos",
      });
    }
  }
  Blog.init(
    {
      productId: { type: DataTypes.INTEGER, allowNull: false },
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      introduction: DataTypes.TEXT,
      content: DataTypes.TEXT,
      author: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Blog",
    },
  );
  return Blog;
};
