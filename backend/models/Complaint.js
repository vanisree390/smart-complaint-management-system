const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  description: String,
  status: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model("Complaint", complaintSchema);