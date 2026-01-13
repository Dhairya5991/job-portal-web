const AWS = require("aws-sdk");
const Application = require("../models/Application");

const s3 = new AWS.S3({
  endpoint: process.env.S3_ENDPOINT,
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  s3ForcePathStyle: true
});

exports.applyJob = async (req, res) => {
  const key = `resumes/${Date.now()}-${req.file.originalname}`;

  await s3.putObject({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: req.file.buffer
  }).promise();

  const app = await Application.create({
    jobId: req.body.jobId,
    resumeKey: key,
    status: "APPLIED"
  });

  res.status(201).json(app);
};

exports.updateStatus = async (req, res) => {
  const app = await Application.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(app);
};

exports.getResumeDownloadUrl = async (req, res) => {
  const app = await Application.findById(req.params.id);
  if (!app) return res.sendStatus(404);

  const url = s3.getSignedUrl("getObject", {
    Bucket: process.env.S3_BUCKET,
    Key: app.resumeKey,
    Expires: 60 * 5 // 5 minutes
  });

  res.json({ url });
};

const { sendMail } = require("../utils/mailer");

exports.updateStatus = async (req, res) => {
  const app = await Application.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  await sendMail(
    app.userEmail,
    "Application Status Updated",
    `Your application status is now: ${app.status}`
  );

  res.json(app);
};
