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
        foreignKey: "categoryId",
        as: "category",
      });

      Product.hasMany(models.ProductPhoto, {
        foreignKey: "productId",
        as: "photos",
      });

      Product.hasMany(models.OrderDetail, {
        foreignKey: "productId",
      });
    }
  }
  Product.init(
    {
      categoryId: { type: DataTypes.INTEGER, allowNull: false },
      productName: DataTypes.STRING,
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
