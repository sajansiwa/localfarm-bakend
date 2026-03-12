const { Order, OrderDetail, sequelize } = require("../models");

exports.createOrder = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      customerAddress,
      items,
    } = req.body;

    // Calculate total price
    let totalPrice = 0;

    items.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });

    // Create Order
    const order = await Order.create(
      {
        customerName,
        customerPhone,
        customerEmail,
        customerAddress,
        totalPrice,
        orderStatus: "pending",
      },
      { transaction }
    );

    // Create OrderDetails
    const orderItems = items.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      productName: item.productName,
      price: item.price,
      quantity: item.quantity,
      totalPrice: item.price * item.quantity,
    }));

    await OrderDetail.bulkCreate(orderItems, { transaction });

    await transaction.commit();

    res.status(201).json({
      message: "Order created successfully",
      orderId: order.id,
    });
  } catch (error) {
    await transaction.rollback();

    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};