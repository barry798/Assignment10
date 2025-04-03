const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company: String,
  title: String,
  description: String,
  salary: Number,
});

module.exports = mongoose.model("Job", jobSchema);