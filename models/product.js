"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.ProductCategory, {
        foreignKey: "category_id",
        as: "category",
      });

      Product.hasMany(models.ProductPhoto, {
        foreignKey: "product_id",
        as: "photos",
      });

      Product.hasMany(models.OrderDetail, {
        foreignKey: "product_id",
      });
    }
  }
  Product.init(
    {
      category_id: DataTypes.INTEGER,
      product_name: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Product",
    },
  );
  return Product;
};
