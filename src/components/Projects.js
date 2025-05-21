import React from "react";
import { Box, Typography, Card, CardContent, Grid, Chip, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";

const MotionCard = motion(Card);

const projects = [
  {
    title: "Personalized Fitness Trainer",
    techStack: ["FastAPI", "React.js", "Tailwind CSS", "MediaPipe", "OpenPose"],
    description: "Built full-stack app for real-time exercise form correction. Implemented pose estimation using MediaPipe and OpenPose to track 33 body keypoints and calculate joint angles. Engineered real-time feedback system providing specific angle-based corrections with pre-exercise instructions.",
    github: null
  },
  {
    title: "Drug-Drug Similarity Model",
    subtitle: "Translational Biology Lab, IIIT Delhi",
    techStack: ["Machine Learning", "Molecular Descriptors", "ChEMBL"],
    description: "Built drug database by extracting SMILES structures and features from ChEMBL IDs. Engineered feature set using 1829 molecular descriptors and 7 fingerprint types. Developed ML models achieving 97% accuracy and 0.9 AUC across cancer, neurogenesis, and natural compounds datasets.",
    github: null
  },
  {
    title: "Rule Engine with AST",
    techStack: ["FastAPI", "PostgreSQL", "Docker", "Abstract Syntax Tree"],
    description: "Architected microservices-based rule engine using FastAPI and PostgreSQL with 95% test coverage. Implemented Abstract Syntax Tree for dynamic rule parsing, supporting 20+ rule types. Containerized application using Docker, reducing deployment time by 70%.",
    github: "https://github.com/SanyamGarg12/Rule-Engine-with-AST"
  },
  {
    title: "Census Income Prediction System",
    techStack: ["Python", "Scikit-learn", "Random Forest"],
    description: "Designed ML solution predicting income levels with 99% accuracy using 45,000+ entries and 14 features. Optimized Random Forest algorithms through feature engineering, improving accuracy from 84% to 99%. Delivered analytics tool to non-profits, increasing fundraising efficiency by 25%.",
    github: "https://github.com/SanyamGarg12/Census-Income-Prediction"
  },
  {
    title: "Real-Time Weather Data Processing System",
    techStack: ["Python", "MySQL"],
    description: "Developed a real-time weather monitoring system for data ingestion, aggregation, and visualization across five cities. Automated data rollups, saving 10 hours of manual processing weekly, improving data retrieval and analysis efficiency.",
    github: "https://github.com/SanyamGarg12/Real-Time-Data-Processing-System-for-Weather-Monitoring-with-Rollups-and-Aggregates"
  },
  {
    title: "Codeforces CLI",
    techStack: ["Python", "Shell Scripting", "API Integration"],
    description: "Developed a suite of functionalities for managing Codeforces accounts from the Linux shell. Reduced the time taken to access account information by 40%, resulting in faster user response times.",
    github: "https://github.com/SanyamGarg12/Codeforces-CLI"
  }
];

const ProjectCard = ({ project, index }) => (
  <MotionCard
    elevation={3}
    sx={{
      height: '100%',
      borderRadius: 4,
      overflow: 'hidden',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 12px 20px -10px rgba(0,0,0,0.2)',
      }
    }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <CardContent sx={{ p: 4 }}>
      <Typography
        variant="h5"
        component="h3"
        sx={{
          fontWeight: 700,
          mb: 1,
          background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        {project.title}
      </Typography>
      
      {project.subtitle && (
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ mb: 2, fontWeight: 500 }}
        >
          {project.subtitle}
        </Typography>
      )}

      <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {project.techStack.map((tech) => (
          <Chip
            key={tech}
            label={tech}
            size="small"
            sx={{
              backgroundColor: 'primary.light',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.main',
              }
            }}
          />
        ))}
      </Box>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 3, lineHeight: 1.7 }}
      >
        {project.description}
      </Typography>

      {project.github && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.light',
                color: 'white',
              }
            }}
          >
            <GitHubIcon />
          </IconButton>
        </Box>
      )}
    </CardContent>
  </MotionCard>
);

const Projects = () => {
  return (
    <Box id="projects" sx={{ mb: 6 }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: 700,
          mb: 4,
          textAlign: 'center',
          background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Projects
      </Typography>

      <Grid container spacing={3}>
        {projects.map((project, index) => (
          <Grid item xs={12} md={6} key={index}>
            <ProjectCard project={project} index={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Projects;
