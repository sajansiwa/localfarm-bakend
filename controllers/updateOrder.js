// const db = require("../models");

// exports.updateOrder = async (req, res) => {
//   const transaction = await db.sequelize.transaction();

//   try {
//     const { id } = req.params;
//     const orderId = parseInt(id, 10);
//     const {
//       customerName,
//       customerPhone,
//       customerEmail,
//       customerAddress,
//       status,
//       items,
//     } = req.body;

//     // Check if order exists
//     const order = await db.Order.findByPk(orderId);
//     if (!order) {
//       await transaction.rollback();
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // Calculate total price
//     let totalPrice = 0;
//     items.forEach((item) => {
//       totalPrice += item.price * item.quantity;
//     });

//     // Update Order
//     await db.Order.update(
//       {
//         customerName,
//         customerPhone,
//         customerEmail,
//         customerAddress,
//         status,
//         totalPrice,
//       },
//       { where: { id: orderId }, transaction },
//     );

//     // Update OrderDetails    // For simplicity, delete old details and create new ones
//     await db.OrderDetail.destroy({ where: { orderId }, transaction });
//     const orderItems = items.map((item) => ({
//       orderId: orderId,
//       productId: item.productId,
//       productName: item.productName,
//       price: item.price,
//       quantity: item.quantity,
//       status: status,
//       totalPrice: item.price * item.quantity,
//     }));
//     await db.OrderDetail.bulkCreate(orderItems, { transaction });

//     await transaction.commit();
//     const updatedOrder = await db.Order.findByPk(orderId, {
//       include: [{ model: db.OrderDetail, as: "items" }],
//     });

//     res.status(200).json({
//       message: "Order updated successfully",
//       order: updatedOrder,
//     });

//   } catch (error) {
//     await transaction.rollback();
//     console.error(error);
//     res.status(500).json({ error: "Error updating order" });
//   }
// };

const db = require("../models");

exports.updateOrder = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {

    console.log("Request body:", req.body);

    const { id } = req.params;
    const orderId = parseInt(id, 10);

    // Check if order exists
    const order = await db.Order.findByPk(orderId);
    if (!order) {
      await transaction.rollback();
      return res.status(404).json({ message: "Order not found" });
    }

    // const isAdmin = req.user?.role === "admin";

    // // ── Non-admin: only allow status change ──────────────────────────────
    // if (!isAdmin) {
    //   return res.status(403).json({
    //     message: "You are not authorized to update orders.",
    //   });
    // }

    const {
      customerName,
      customerPhone,
      customerEmail,
      customerAddress,
      status,
      items,
    } = req.body;

    // ── If status is being changed to "approved", deduct stock ───────────
    const isBeingApproved =
      status === "approved" && order.status !== "approved";

    if (isBeingApproved) {
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
            message: `Insufficient stock for product: ${product.name}. Available: ${product.quantity}, Ordered: ${item.quantity}`,
          });
        }

        await db.Product.update(
          { quantity: product.quantity - item.quantity },
          { where: { id: item.productId }, transaction },
        );
      }
    }

    // ── Calculate total price ─────────────────────────────────────────────
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });

    // ── Update Order ──────────────────────────────────────────────────────
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

    // ── Replace OrderDetails ──────────────────────────────────────────────
    await db.OrderDetail.destroy({ where: { orderId }, transaction });
    const orderItems = items.map((item) => ({
      orderId,
      productId: item.productId,
      productName: item.productName,
      price: item.price,
      quantity: item.quantity,
      status,
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
    if (!transaction.finished) {
      await transaction.rollback();
    }
    console.error(error);
    res.status(500).json({ error: "Error updating order" });
  }
  // ── finally block removed (was double-committing) ─────────────────────
};
