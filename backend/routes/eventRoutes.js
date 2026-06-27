const express = require("express");
const router = express.Router();

const {
  getEvents,
  getEventsByDate,
  createEvent,
  approveEvent,
  rejectEvent,
  myRequests,
  deleteEvent,
  toggleInterested,
} = require("../controllers/eventController");

// Replace these with your team's middleware names
const { protect } = require("../middleware/authMiddleware");
const {
  isAdmin,
  isClubOrAdmin,
} = require("../middleware/roleMiddleware");

/*
=====================================
PUBLIC ROUTES
=====================================
*/

// Get all approved events
router.get("/", getEvents);

// Get events for a selected date
// Example:
// /api/events/date/2026-06-30
router.get("/date/:date", getEventsByDate);

/*
=====================================
LOGGED-IN USER
=====================================
*/

// Student / Club / Admin
// Student -> Pending
// Club/Admin -> Approved
router.post("/", protect, createEvent);

// Logged in user's requests
router.get("/my-requests", protect, myRequests);

// Mark Interested / Remove Interested
router.post("/:id/interested", protect, toggleInterested);

/*
=====================================
ADMIN ONLY
=====================================
*/

// Approve event
router.patch("/:id/approve", protect, isAdmin, approveEvent);

// Reject event
router.patch("/:id/reject", protect, isAdmin, rejectEvent);

/*
=====================================
CLUB / ADMIN
=====================================
*/

// Delete Event
router.delete("/:id", protect, isClubOrAdmin, deleteEvent);

module.exports = router;
