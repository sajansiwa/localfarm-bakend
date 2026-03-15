const express = require("express");
const router = express.Router();
const orderController = require("../controllers/createOrder");
const getOrderController = require("../controllers/getOrder");
const getOrdersByIdController = require("../controllers/getOrdersById");


/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     description: Creates an order along with multiple order items.
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *               - customerPhone
 *               - customerAddress
 *               - items
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: John Doe
 *               customerPhone:
 *                 type: string
 *                 example: 9800000000
 *               customerEmail:
 *                 type: string
 *                 example: john@example.com
 *               customerAddress:
 *                 type: string
 *                 example: Kathmandu
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - productName
 *                     - price
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 1
 *                     productName:
 *                       type: string
 *                       example: bee pollen
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 2500
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *           example:
 *             customerName: John Doe
 *             customerPhone: 9800000000
 *             customerEmail: john@example.com
 *             customerAddress: Kathmandu
 *             items:
 *               - productId: 1
 *                 productName: bee pollen
 *                 price: 2500
 *                 quantity: 2
 *               - productId: 2
 *                 productName: mad honey
 *                 price: 1200
 *                 quantity: 1
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Order created successfully
 *               orderId: 12
 *       500:
 *         description: Failed to create order
 */
router.post("/api/orders", orderController.createOrder);


/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve a list of all orders
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: List of orders
 *       500:
 *         description: Server error
 */
router.get("/api/orders", getOrderController.getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     description: Retrieve a specific order by its ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order found
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.get("/api/orders/:id", getOrdersByIdController.getAllOrdersById);

module.exports = router;