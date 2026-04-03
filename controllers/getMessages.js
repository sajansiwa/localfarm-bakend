const db = require("../models");

exports.getMessages = async (req, res) => {
  try {
    const messages = await db.Contact.findAll();
    console.log("Retrieved messages:", messages);
    res.json(messages);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ error: error.message });
  }
};
