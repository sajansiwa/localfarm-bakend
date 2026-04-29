const express = require("express");
const router = express.Router();
const db = require("../models");
const authMiddleware = require("../middlewares/authMiddleWare");
const upload = require("../middlewares/upload");
const authMiddleWare = require("../middlewares/authMiddleWare");

/**
 * @swagger
 * /api/staff:
 *   get:
 *     summary: Get all staff members
 *     tags: [Staff]
 *     responses:
 *       200:
 *         description: List of all staff members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Staff'
 *       500:
 *         description: Error fetching staff
 */
router.get("/api/staff", async (req, res) => {
  try {
    const staff = await db.Staff.findAll();
    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching staff" });
  }
});

/**
 * @swagger
 * /api/staff/{id}:
 *   get:
 *     summary: Get a single staff member by ID
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Staff member ID
 *     responses:
 *       200:
 *         description: Staff member found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       404:
 *         description: Staff member not found
 *       500:
 *         description: Error fetching staff member
 */
router.get("/api/staff/:id", async (req, res) => {
  try {
    const staff = await db.Staff.findByPk(req.params.id);

    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching staff member" });
  }
});

/**
 * @swagger
 * /api/staff:
 *   post:
 *     summary: Create a new staff member
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - position
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ram Bahadur"
 *               position:
 *                 type: string
 *                 example: "Farm Manager"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Staff member created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       400:
 *         description: Name and position are required
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error creating staff member
 */
router.post(
  "/api/staff",
  authMiddleware,
  (req, res, next) => {
    req.uploadFolder = "uploads/staff/";
    next();
  },
  upload.single("image"), // matches the swagger doc field name
  async (req, res) => {
    try {
      const { name, position } = req.body;

      if (!name || !position) {
        return res
          .status(400)
          .json({ message: "Name and position are required" });
      }

      const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : null;

      const staff = await db.Staff.create({ name, position, imagePath });

      res.status(201).json(staff);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating staff member" });
    }
  },
);

/**
 * @swagger
 * /api/staff/{id}:
 *   put:
 *     summary: Update a staff member
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Staff member ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ram Bahadur"
 *               position:
 *                 type: string
 *                 example: "Senior Farm Manager"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Staff member updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Staff member not found
 *       500:
 *         description: Error updating staff member
 */
router.put(
  "/api/staff/:id",
  authMiddleware,
  (req, res, next) => {
    req.uploadFolder = "uploads/staff/";
    next();
  },
  upload.single("image"),
  async (req, res) => {
    try {
      const staff = await db.Staff.findByPk(req.params.id);

      if (!staff) {
        return res.status(404).json({ message: "Staff member not found" });
      }

      const { name, position } = req.body;

      const imagePath = req.file
        ? req.file.path.replace(/\\/g, "/")
        : staff.imagePath;

      await staff.update({ name, position, imagePath });

      res.json(staff);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating staff member" });
    }
  },
);

/**
 * @swagger
 * /api/staff/{id}:
 *   delete:
 *     summary: Delete a staff member
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Staff member ID
 *     responses:
 *       200:
 *         description: Staff member deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Staff member deleted successfully"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Staff member not found
 *       500:
 *         description: Error deleting staff member
 */
router.delete("/api/staff/:id", authMiddleware, async (req, res) => {
  try {
    const staff = await db.Staff.findByPk(req.params.id);

    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    await staff.destroy();

    res.json({ message: "Staff member deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting staff member" });
  }
});

module.exports = router;
