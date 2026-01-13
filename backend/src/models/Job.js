const mongoose = require("mongoose");

module.exports = mongoose.model("Job", new mongoose.Schema({
  title: String,
  description: String,
  company: String,
  createdAt: { type: Date, default: Date.now }
}));
