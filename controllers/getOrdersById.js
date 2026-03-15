const db = require("../models");

exports.getAllOrdersById = async (req, res) => {
  try {
    const orders = await db.Order.findByPk(req.params.id, {
      include: [
        {
          model: db.OrderDetail,
          as: "items",
        },
      ],
    });

    console.log(orders);

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to retrieve orders",
      error: error.message,
    });
  }
};
