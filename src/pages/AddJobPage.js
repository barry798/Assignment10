import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Typography, Button } from "@mui/material";

function AddJobPage() {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/create/job", {
        company,
        title,
        description,
        salary: Number(salary),
      });
      alert("Job created successfully");
      setCompany("");
      setTitle("");
      setDescription("");
      setSalary("");
    } catch (err) {
      alert("Error creating job");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Add Job
      </Typography>
      <TextField
        fullWidth
        label="Company"
        margin="normal"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <TextField
        fullWidth
        label="Job Title"
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        fullWidth
        label="Description"
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        fullWidth
        label="Salary"
        type="number"
        margin="normal"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
}

export default AddJobPage;
