const router = require("express").Router();
const multer = require("multer");
const upload = multer();

const auth = require("../middleware/authMiddleware");
const rbac = require("../middleware/rbacMiddleware");

const {
  applyJob,
  updateStatus,
  getResumeDownloadUrl
} = require("../controllers/applicationController");

const Application = require("../models/Application");

/* ===============================
   USER ROUTES
================================ */

// Apply to job (upload resume)
router.post(
  "/apply",
  auth,
  upload.single("resume"),
  applyJob
);

// View own applications
router.get("/my", auth, async (req, res) => {
  const apps = await Application.find({
    userEmail: req.user.email
  }).sort({ createdAt: -1 });

  res.json(apps);
});

/* ===============================
   ADMIN ROUTES
================================ */

// View all applications (pagination + filters)
router.get("/", auth, rbac(["admin"]), async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 5);
  const status = req.query.status;

  const query = status ? { status } : {};

  const applications = await Application.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Application.countDocuments(query);

  res.json({
    data: applications,
    page,
    total,
    pages: Math.ceil(total / limit)
  });
});

// Update application status
router.patch(
  "/:id/status",
  auth,
  rbac(["admin"]),
  updateStatus
);

// Secure resume download (signed URL)
router.get(
  "/:id/resume",
  auth,
  rbac(["admin"]),
  getResumeDownloadUrl
);

module.exports = router;
