const db = require("../models");

exports.updateOrder = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const { id } = req.params;
    const orderId = parseInt(id, 10);
    const {
      customerName,
      customerPhone,
      customerEmail,
      customerAddress,
      status,
      items,
    } = req.body;

    // Check if order exists
    const order = await db.Order.findByPk(orderId);
    if (!order) {
      await transaction.rollback();
      return res.status(404).json({ message: "Order not found" });
    }

    // Calculate total price
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });

    // Update Order
    await db.Order.update(
      {
        customerName,
        customerPhone,
        customerEmail,
        customerAddress,
        status,
        totalPrice,
      },
      { where: { id: orderId }, transaction },
    );

    // Update OrderDetails    // For simplicity, delete old details and create new ones
    await db.OrderDetail.destroy({ where: { orderId }, transaction });
    const orderItems = items.map((item) => ({
      orderId: orderId,
      productId: item.productId,
      productName: item.productName,
      price: item.price,
      quantity: item.quantity,
      status: status,
      totalPrice: item.price * item.quantity,
    }));
    await db.OrderDetail.bulkCreate(orderItems, { transaction });

    await transaction.commit();
    const updatedOrder = await db.Order.findByPk(orderId, {
      include: [{ model: db.OrderDetail, as: "items" }],
    });

    res.status(200).json({
      message: "Order updated successfully",
      order: updatedOrder,
    });

  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ error: "Error updating order" });
  } finally {
    await transaction.commit();
  }
};
