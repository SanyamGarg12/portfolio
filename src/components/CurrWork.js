import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorageIcon from '@mui/icons-material/Storage';

const MotionCard = motion(Card);

const experiences = [
  {
    title: "Full-Stack Web Developer Intern",
    company: "CRF, Indian Institute of Technology (IIT) Ropar",
    techStack: ["React.js", "Node.js", "Express.js", "JWT", "bcrypt", "Multer"],
    points: [
      {
        icon: <CodeIcon />,
        text: "Architected full-stack web app using React.js, Node.js, and Express.js, improving user engagement by 40%"
      },
      {
        icon: <SecurityIcon />,
        text: "Engineered secure auth system using JWT and bcrypt, reducing unauthorized access"
      },
      {
        icon: <StorageIcon />,
        text: "Developed RESTful APIs for facility bookings and publications"
      },
      {
        icon: <DashboardIcon />,
        text: "Built a role-based admin dashboard with 10+ functional tabs; restricted access for sub-admins and enabled full content control for main admins"
      }
    ],
    github: "https://github.com/SanyamGarg12/IIT-Ropar-Central-Research-Facilities"
  },
  {
    title: "Software Development Engineer Intern",
    company: "Velmenni Research & Development",
    techStack: ["UI/UX", "CLI Tools", "Web Development"],
    points: [
      {
        icon: <DashboardIcon />,
        text: "Enhanced UI/UX of Li-Fi network config dashboard, improving user interaction and data visualization"
      },
      {
        icon: <CodeIcon />,
        text: "Developed CLI tools for network management, integrating with main application software"
      },
      {
        icon: <WorkIcon />,
        text: "Extended website functionality by implementing features from main software"
      }
    ]
  }
];

const ExperienceCard = ({ experience, index }) => (
  <MotionCard
    elevation={3}
    sx={{
      mb: 4,
      borderRadius: 4,
      overflow: 'hidden',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-8px)',
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
        {experience.title}
      </Typography>
      
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mb: 2, fontWeight: 500 }}
      >
        {experience.company}
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {experience.techStack.map((tech) => (
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

      <Box sx={{ pl: 2 }}>
        {experience.points.map((point, idx) => (
          <Box
            key={idx}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              mb: 2,
              '&:last-child': { mb: 0 }
            }}
          >
            <Box
              sx={{
                color: 'primary.main',
                mr: 2,
                mt: 0.5
              }}
            >
              {point.icon}
            </Box>
            <Typography variant="body1" color="text.secondary">
              {point.text}
            </Typography>
          </Box>
        ))}
      </Box>

      {experience.github && (
        <Box sx={{ mt: 2, textAlign: 'right' }}>
          <Typography
            component="a"
            href={experience.github}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            View on GitHub →
          </Typography>
        </Box>
      )}
    </CardContent>
  </MotionCard>
);

const Experience = () => {
  return (
    <Box id="experience" sx={{ mb: 6 }}>
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
        Work Experience
      </Typography>

      <Grid container spacing={3}>
        {experiences.map((experience, index) => (
          <Grid item xs={12} key={index}>
            <ExperienceCard experience={experience} index={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Experience;