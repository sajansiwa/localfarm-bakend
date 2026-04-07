const express = require("express");
const router = express.Router();
const db = require("../models");
const { where } = require("sequelize");

/**
 * @swagger
 * /api/upcomingevents:
 *   get:
 *     summary: Get upcoming events
 *     description: Retrieve a list of all upcoming events
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: List of events
 *       500:
 *         description: Server error
 */
router.get("/api/upcomingevents", async (req, res) => {
  try {
    const events = await db.Event.findAll({
      where: {
        isUpcoming: true,
      },
      include: [{ model: db.EventPhoto, as: "photos" }],
    });
    console.log(events);
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching events" });
  }
});

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     description: Retrieve a list of all events
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: List of events
 *       500:
 *         description: Server error
 */
router.get("/api/events", async (req, res) => {
  try {
    const events = await db.Event.findAll({
      include: [{ model: db.EventPhoto, as: "photos" }],
    });
    console.log(events);
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching events" });
  }
});

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get event by ID
 *     description: Retrieve a single event using its ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event found
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.get("/api/events/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const event = await db.Event.findByPk(id, {
      include: [{ model: db.EventPhoto, as: "photos" }],
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching event" });
  }
});

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     description: Creates an event along with a single associated photo.
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventTitle
 *               - eventDescription
 *               - date
 *               - isUpcoming
 *               - image
 *             properties:
 *               eventTitle:
 *                 type: string
 *                 example: Coffee Tasting Event
 *               eventDescription:
 *                 type: string
 *                 example: Explore different coffee beans and flavors
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-03-20
 *               isUpcoming:
 *                 type: boolean
 *                 example: true
 *               image:
 *                 type: string
 *                 example: uploads/events/coffee1.jpg
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             example:
 *               event:
 *                 id: 1
 *                 eventTitle: Coffee Tasting Event
 *                 eventDescription: Explore different coffee beans
 *                 date: 2026-03-20
 *                 isUpcoming: true
 *               photo:
 *                 id: 1
 *                 eventId: 1
 *                 imagePath: uploads/events/coffee1.jpg
 *       500:
 *         description: Error creating event
 */
router.post("/api/events", async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const { eventTitle, eventDescription, date, isUpcoming, image } = req.body;

    // Create Event
    const newEvent = await db.Event.create(
      {
        eventTitle,
        eventDescription,
        date,
        isUpcoming,
      },
      { transaction },
    );

    // Create Event Photo
    const eventPhoto = await db.EventPhoto.create(
      {
        eventId: newEvent.id,
        imagePath: image,
      },
      { transaction },
    );

    await transaction.commit();

    res.status(201).json({
      event: newEvent,
      photo: eventPhoto,
    });
  } catch (error) {
    await transaction.rollback();

    console.error(error);
    res.status(500).json({ error: "Error creating event" });
  }
});

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Update an existing event
 *     description: Updates an event along with its associated photo.
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventTitle
 *               - eventDescription
 *               - isUpcoming
 *               - image
 *             properties:
 *               eventTitle:
 *                 type: string
 *                 example: Coffee Tasting Event
 *               eventDescription:
 *                 type: string
 *                 example: Updated description
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-03-20
 *               isUpcoming:
 *                 type: boolean
 *                 example: true
 *               image:
 *                 type: string
 *                 example: uploads/events/coffee1.jpg
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.put("/api/events/:id", async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    console.log("Request body:", req.body);
    const { id } = req.params;
    const { eventTitle, eventDescription, date, isUpcoming, image } = req.body;

    // Check if event exists
    const event = await db.Event.findByPk(id);
    if (!event) {
      await transaction.rollback();
      return res.status(404).json({ message: "Event not found" });
    }

    // Update Event
    await db.Event.update(
      {
        eventTitle,
        eventDescription,
        date,
        isUpcoming,
      },
      {
        where: { id },
        transaction,
      },
    );

    // Update Photo
    await db.EventPhoto.update(
      {
        imagePath: image,
      },
      {
        where: { eventId: id },
        transaction,
      },
    );

    await transaction.commit();

    res.status(200).json({
      message: "Event updated successfully",
    });
  } catch (error) {
    await transaction.rollback();

    console.error(error);
    res.status(500).json({ error: "Error updating event" });
  }
});

module.exports = router;
