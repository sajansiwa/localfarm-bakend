const express = require("express");
const router = express.Router();
const contactController = require("../controllers/createMessage");
const constactController = require("../controllers/getMessages");
const updateFollowUp = require("../controllers/updateFollowUP");
const authMiddleware = require("../middlewares/authMiddleWare");

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Create a new contact message
 *     description: Allows a user to submit a contact form message.
 *     tags:
 *       - Contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               message:
 *                 type: string
 *                 example: I would like to inquire about your products.
 *               followUp:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Message created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Message created successfully
 *       400:
 *         description: Validation error - missing required fields
 *         content:
 *           application/json:
 *             example:
 *               error: Name, email, and message are required
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               error: Error creating message
 */
router.post("/api/contact", contactController.createMessage);

/**
 * @swagger
 * /api/contact:
 *   get:
 *     summary: Get all contact messages
 *     description: Retrieve a list of all contact messages
 *     tags:
 *       - Contact
 *     responses:
 *       200:
 *         description: List of blogs
 *       500:
 *         description: Server error
 */
router.get("/api/contact", authMiddleware, constactController.getMessages);

/**
 * @swagger
 * /api/contact/{id}:
 *   patch:
 *     summary: Update follow-up status of a message
 *     description: Allows admin to mark a contact message as followed up or not.
 *     tags:
 *       - Contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Message ID
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - followUp
 *             properties:
 *               followUp:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Follow-up status updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: John Doe
 *               email: john@example.com
 *               message: I would like to inquire about your products.
 *               followUp: true
 *               createdAt: 2026-04-01T00:00:00.000Z
 *               updatedAt: 2026-04-01T00:00:00.000Z
 *       404:
 *         description: Message not found
 *         content:
 *           application/json:
 *             example:
 *               error: Message not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
router.patch("/api/contact/:id", updateFollowUp.updateFollowUp);

module.exports = router;
