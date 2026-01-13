const Job = require("../models/Job");

exports.getJobs = async (req, res) => {
  res.json(await Job.find());
};

exports.createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json(job);
};
