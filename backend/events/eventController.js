const Event = require("../models/Event");

/*
========================================
GET ALL APPROVED EVENTS
GET /api/events
========================================
*/
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: "Approved" })
      .populate("createdBy", "name email")
      .sort({ date: 1 });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
========================================
GET EVENTS BY DATE
GET /api/events/date/:date
========================================
*/
exports.getEventsByDate = async (req, res) => {
  try {
    const selectedDate = new Date(req.params.date);

    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);

    const events = await Event.find({
      status: "Approved",
      date: {
        $gte: selectedDate,
        $lt: nextDate,
      },
    });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
========================================
CREATE EVENT
Club/Admin -> Approved
Student -> Pending
========================================
*/
exports.createEvent = async (req, res) => {
  try {
    const role = req.user.role;

    const event = await Event.create({
      ...req.body,
      createdBy: req.user._id,
      status:
        role === "Student"
          ? "Pending"
          : "Approved",
    });

    res.status(201).json({
      success: true,
      message:
        role === "Student"
          ? "Event request submitted."
          : "Event created successfully.",
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
========================================
APPROVE EVENT
(Admin)
========================================
*/
exports.approveEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        status: "Approved",
      },
      {
        new: true,
      }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      message: "Event approved.",
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
========================================
REJECT EVENT
(Admin)
========================================
*/
exports.rejectEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        status: "Rejected",
      },
      {
        new: true,
      }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      message: "Event rejected.",
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
========================================
MY EVENT REQUESTS
========================================
*/
exports.myRequests = async (req, res) => {
  try {
    const events = await Event.find({
      createdBy: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
========================================
DELETE EVENT
(Admin / Club)
========================================
*/
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    await event.deleteOne();

    res.json({
      success: true,
      message: "Event deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
========================================
INTERESTED BUTTON
========================================
*/
exports.toggleInterested = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const userId = req.user._id.toString();

    const exists = event.interestedUsers.some(
      (id) => id.toString() === userId
    );

    if (exists) {
      event.interestedUsers = event.interestedUsers.filter(
        (id) => id.toString() !== userId
      );
    } else {
      event.interestedUsers.push(userId);
    }

    await event.save();

    res.json({
      success: true,
      interested: !exists,
      interestedCount: event.interestedUsers.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
