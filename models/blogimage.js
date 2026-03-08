"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BlogImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BlogImage.belongsTo(models.Blog, {
        foreignKey: "BlogId",
        as: "blog",
      });
    }
  }
  BlogImage.init(
    {
      BlogId: DataTypes.INTEGER,
      imagePath: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BlogImage",
    },
  );
  return BlogImage;
};
