const express = require("express");
const auth = require("../middlewares/authMiddleWare");

const router = express.Router();

/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: Test protected route
 *     description: Returns a test message if JWT token is valid
 *     tags:
 *       - Test
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Test route is working
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Test route is working!
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */
router.get("/api/test", auth, (req, res) => {
  res.json({ message: "Test route is working!" });
});

module.exports = router;
