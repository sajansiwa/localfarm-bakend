const db = require("../models");

exports.updateFollowUp = async (req, res) => {
  try {
    const { id } = req.params;
    const { followUp } = req.body;
    const message = await db.Contact.findByPk(id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    message.followUp = followUp;
    await message.save();
    res.status(200).json({ message: "Follow-up status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
