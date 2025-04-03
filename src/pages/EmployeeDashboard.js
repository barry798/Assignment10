import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  CircularProgress,
  Pagination,
} from "@mui/material";

function EmployeeDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const jobsPerPage = 4;

  useEffect(() => {
    axios.get("http://localhost:5000/jobs").then((res) => {
      setJobs(res.data);
      setLoading(false);
    });
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedJobs = jobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Job Listings
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={2}>
            {paginatedJobs.map((job, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography>{job.company}</Typography>
                    <Typography>{job.description}</Typography>
                    <Typography>${job.salary}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            sx={{ marginTop: 2 }}
          />
        </>
      )}
    </Container>
  );
}

export default EmployeeDashboard;
