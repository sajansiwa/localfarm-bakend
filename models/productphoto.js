"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductPhoto.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
    }
  }
  ProductPhoto.init(
    {
      product_id: DataTypes.INTEGER,
      image_path: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ProductPhoto",
    },
  );
  return ProductPhoto;
};
