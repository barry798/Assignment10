const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  const { company, title, description, salary } = req.body;
  try {
    const job = new Job({ company, title, description, salary });
    await job.save();
    res.status(201).json({ msg: "Job created" });
  } catch (err) {
    res.status(500).json({ msg: "Error creating job", error: err });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching jobs", error: err });
  }
};
