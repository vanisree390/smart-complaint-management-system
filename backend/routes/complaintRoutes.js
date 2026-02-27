const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
  createComplaint,
  getUserComplaints,
  getAllComplaints,
  updateStatus
} = require("../controllers/complaintController");

// Create complaint
router.post("/", authMiddleware, createComplaint);

// Get logged in user complaints
router.get("/my", authMiddleware, getUserComplaints);

// Get all complaints (admin)
router.get("/all", authMiddleware, getAllComplaints);

// Update complaint status (admin)
router.put("/:id", authMiddleware, updateStatus);

module.exports = router;