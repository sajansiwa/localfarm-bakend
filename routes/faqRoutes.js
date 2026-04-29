const express = require("express");
const router = express.Router();
const db = require("../models");
const verifyToken = require("../middlewares/authMiddleWare");

/**
 * @swagger
 * /api/faqs:
 *   get:
 *     summary: Get all FAQs
 *     tags: FAQs
 *     responses:
 *       200:
 *         description: List of all FAQs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Faq'
 *       500:
 *         description: Error fetching FAQs
 */
router.get("/api/faqs", async (req, res) => {
  try {
    const faqs = await db.Faq.findAll();
    res.json(faqs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching FAQs" });
  }
});

/**
 * @swagger
 * /api/faqs/{id}:
 *   get:
 *     summary: Get a single FAQ by ID
 *     tags: [FAQs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: FAQ ID
 *     responses:
 *       200:
 *         description: FAQ found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Faq'
 *       404:
 *         description: FAQ not found
 *       500:
 *         description: Error fetching FAQ
 */
router.get("/api/faqs/:id", async (req, res) => {
  try {
    const faq = await db.Faq.findByPk(req.params.id);

    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.json(faq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching FAQ" });
  }
});

/**
 * @swagger
 * /api/faqs:
 *   post:
 *     summary: Create a new FAQ
 *     tags: [FAQs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer
 *             properties:
 *               question:
 *                 type: string
 *                 example: "What is Mad Honey?"
 *               answer:
 *                 type: string
 *                 example: "Mad Honey is a type of honey produced by bees..."
 *     responses:
 *       201:
 *         description: FAQ created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Faq'
 *       400:
 *         description: Question and answer are required
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error creating FAQ
 */
router.post("/api/faqs", verifyToken, async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res
        .status(400)
        .json({ message: "Question and answer are required" });
    }

    const faq = await db.Faq.create({ question, answer });

    res.status(201).json(faq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating FAQ" });
  }
});

/**
 * @swagger
 * /api/faqs/{id}:
 *   put:
 *     summary: Update an existing FAQ
 *     tags: [FAQs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: FAQ ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 example: "What is Mad Honey?"
 *               answer:
 *                 type: string
 *                 example: "Mad Honey is a rare honey from Nepal..."
 *     responses:
 *       200:
 *         description: FAQ updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Faq'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: FAQ not found
 *       500:
 *         description: Error updating FAQ
 */
router.put("/api/faqs/:id", verifyToken, async (req, res) => {
  try {
    const faq = await db.Faq.findByPk(req.params.id);

    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    const { question, answer } = req.body;

    // Only update fields that were actually sent
    await faq.update({
      question: question ?? faq.question,
      answer: answer ?? faq.answer,
    });

    res.json(faq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating FAQ" });
  }
});

/**
 * @swagger
 * /api/faqs/{id}:
 *   delete:
 *     summary: Delete a FAQ
 *     tags: [FAQs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: FAQ ID
 *     responses:
 *       200:
 *         description: FAQ deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: FAQ not found
 *       500:
 *         description: Error deleting FAQ
 */
router.delete("/api/faqs/:id", verifyToken, async (req, res) => {
  try {
    const faq = await db.Faq.findByPk(req.params.id);

    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    await faq.destroy();

    res.json({ message: "FAQ deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting FAQ" });
  }
});

module.exports = router;
