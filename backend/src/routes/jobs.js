const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const rbac = require("../middleware/rbacMiddleware");
const {
  getJobs,
  createJob
} = require("../controllers/jobController");

/* USER + ADMIN */
router.get("/", auth, getJobs);

/* ADMIN ONLY */
router.post("/", auth, rbac(["admin"]), createJob);

module.exports = router;
