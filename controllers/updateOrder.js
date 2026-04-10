const db = require("../models");

exports.updateOrder = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  let committed = false;

  try {
    const { id } = req.params;
    const orderId = parseInt(id, 10);
    const { status } = req.body;

    const VALID_STATUSES = ["pending", "approved", "rejected", "delivered"];
    if (!status || !VALID_STATUSES.includes(status)) {
      await transaction.rollback();
      return res
        .status(400)
        .json({ message: "Invalid or missing status value" });
    }

    const order = await db.Order.findByPk(orderId, { transaction });
    if (!order) {
      await transaction.rollback();
      return res.status(404).json({ message: "Order not found" });
    }

    const isBeingApproved =
      status === "approved" && order.status !== "approved";

    if (isBeingApproved) {
      const items = await db.OrderDetail.findAll({
        where: { orderId },
        transaction,
      });

      for (const item of items) {
        const product = await db.Product.findByPk(item.productId, {
          transaction,
        });

        if (!product) {
          await transaction.rollback();
          return res.status(404).json({
            message: `Product with id ${item.productId} not found`,
          });
        }

        if (product.quantity < item.quantity) {
          await transaction.rollback();
          return res.status(400).json({
            message: `Insufficient stock for ${product.name}. Available: ${product.quantity}, Ordered: ${item.quantity}`,
          });
        }

        await db.Product.update(
          { quantity: product.quantity - item.quantity },
          { where: { id: item.productId }, transaction },
        );
      }
    }

    order.orderStatus = status;
    await order.save({ transaction });
    await transaction.commit();
    committed = true;

    const updatedOrder = await db.Order.findByPk(orderId, {
      include: [{ model: db.OrderDetail, as: "items" }],
    });

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    if (!committed) await transaction.rollback();
    console.error(error);
    res.status(500).json({ error: "Error updating order" });
  }
};
