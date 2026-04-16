const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login");
const auth = require("../middlewares/authMiddleWare");
const changePassword = require("../controllers/changePassword");

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Admin login
 *     description: Authenticate admin and return a JWT token
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/api/login", loginController.Login)



/**
 * @swagger
 * /api/admin/change-password:
 *   put:
 *     summary: Change admin password
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: "admin123"
 *               newPassword:
 *                 type: string
 *                 example: "newSecurePass99"
 *               confirmPassword:
 *                 type: string
 *                 example: "newSecurePass99"
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Validation error (missing fields, mismatch, same password)
 *       401:
 *         description: Current password is incorrect or token missing
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Server error
 */
router.put("/api/admin/change-password", auth, changePassword);



module.exports = router;
