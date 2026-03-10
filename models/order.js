"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Order → OrderDetails
      Order.hasMany(models.OrderDetail, {
        foreignKey: "orderId",
        as: "items",
      });
    }
  }

  Order.init(
    {
      customerName: {
        type: DataTypes.STRING,
      },

      customerPhone: {
        type: DataTypes.STRING,
      },

      customerEmail: {
        type: DataTypes.STRING,
      },

      customerAddress: {
        type: DataTypes.STRING,
      },

      totalPrice: {
        type: DataTypes.STRING,
      },

      orderStatus: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "Orders",
    }
  );

  return Order;
};