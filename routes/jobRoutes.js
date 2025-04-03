const express = require("express");
const { createJob, getJobs } = require("../controllers/jobController");
const router = express.Router();

router.post("/create/job", createJob);
router.get("/jobs", getJobs);

module.exports = router;