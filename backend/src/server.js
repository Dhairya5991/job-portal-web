require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

/* ===============================
   ROUTES
================================ */
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const applicationRoutes = require("./routes/applications");

const app = express();

/* ===============================
   GLOBAL MIDDLEWARE
================================ */
app.use(cors());
app.use(express.json());

/* ===============================
   DATABASE CONNECTION
================================ */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("? MongoDB connected"))
  .catch(err => {
    console.error("? MongoDB connection failed", err);
    process.exit(1);
  });

/* ===============================
   HEALTH CHECK (DEVOPS REQUIRED)
================================ */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "job-portal-backend",
    environment: process.env.NODE_ENV,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database:
      mongoose.connection.readyState === 1 ? "CONNECTED" : "DISCONNECTED"
  });
});

/* ===============================
   API ROUTES
================================ */
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

/* ===============================
   404 HANDLER
================================ */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ===============================
   ERROR HANDLER
================================ */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

/* ===============================
   SERVER START
================================ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`?? Backend running on port ${PORT}`)
);
