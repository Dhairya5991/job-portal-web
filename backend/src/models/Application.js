const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Application",
  new mongoose.Schema({
    jobId: String,
    jobTitle: String,
    userEmail: String,
    resumeKey: String,
    status: {
      type: String,
      enum: ["APPLIED", "REVIEWED", "SHORTLISTED", "REJECTED"],
      default: "APPLIED"
    },
    createdAt: { type: Date, default: Date.now }
  })
);
