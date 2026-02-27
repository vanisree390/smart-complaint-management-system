const Complaint = require("../models/Complaint");

exports.createComplaint = async (req, res) => {
  const complaint = await Complaint.create({
    user: req.user._id,
    title: req.body.title,
    description: req.body.description,
    status: "Pending"
  });

  res.json(complaint);
};

exports.getUserComplaints = async (req, res) => {
  const complaints = await Complaint.find({ user: req.user._id });
  res.json(complaints);
};

exports.getAllComplaints = async (req, res) => {
  const complaints = await Complaint.find().populate("user", "name email");
  res.json(complaints);
};

exports.updateStatus = async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);
  complaint.status = req.body.status;
  await complaint.save();
  res.json(complaint);
};