const Event = require("../models/Event");

// GET ALL EVENTS
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });

    res.json(events);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// CREATE EVENT
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.status(201).json({
      message: "Event Created",
      event,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE EVENT
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);

    res.json({
      message: "Event Deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// INTERESTED BUTTON
exports.interested = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    event.interested += 1;

    await event.save();

    res.json(event);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
