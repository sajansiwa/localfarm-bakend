const db = require("../models");

exports.createMessage = async (req, res) => {
  try {
    const { name, email, message, followUp } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Name, email, and message are required" });
    }

    const newMessage = await db.Contact.create({
      name,
      email,
      message,
      followUp,
    });

    res.status(201).json({
      message: "Message created successfully",
    });

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating message" });
  }
};
