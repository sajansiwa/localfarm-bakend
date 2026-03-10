"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      // OrderDetail → Order
      OrderDetail.belongsTo(models.Order, {
        foreignKey: "orderId",
        as: "order",
      });

      // OrderDetail → Product
      OrderDetail.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }

  OrderDetail.init(
    {
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderDetail",
    },
  );

  return OrderDetail;
};
