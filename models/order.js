"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.hasMany(models.OrderDetail, {
        foreignKey: "order_id",
        as: "items",
      });
    }
  }
  Order.init(
    {
      customer_name: DataTypes.STRING,
      customer_phone: DataTypes.STRING,
      customer_email: DataTypes.STRING,
      customer_address: DataTypes.TEXT,
      total_price: DataTypes.DECIMAL,
      order_status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    },
  );
  return Order;
};
