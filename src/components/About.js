import React from "react";
import { Card, CardContent, Typography, Box, Grid, Chip } from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const skills = [
  "React", "Node.js", "Python", "Django", "Docker",
  "Machine Learning", "FastAPI", "PostgreSQL", "Git"
];

const About = () => {
  return (
    <Box id="about" sx={{ mb: 6 }}>
      <MotionCard
        elevation={3}
        sx={{ 
          borderRadius: 4,
          bgcolor: "background.paper",
          overflow: "hidden"
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              mb: 3,
              background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            About Me
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ 
                  fontSize: 18,
                  lineHeight: 1.8,
                  mb: 3
                }}
              >
                I am a third-year student at IIITD, pursuing B.Tech. I am currently focused on building scalable web applications and exploring machine learning algorithms for real-world applications. I have proficiency in Django, Node.js, React, Docker, and more.
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  mb: 2,
                  color: 'primary.main'
                }}
              >
                Technical Skills
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
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
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                  borderRadius: 2,
                  p: 3,
                  color: 'white'
                }}
              >
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  Passionate about creating impactful solutions through code
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </MotionCard>
    </Box>
  );
};

export default About;
