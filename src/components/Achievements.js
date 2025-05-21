import React from "react";
import { Card, CardContent, Typography, Box, Grid, Chip, IconButton, Link } from "@mui/material";
import { motion } from "framer-motion";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import WebIcon from '@mui/icons-material/Web';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';

const MotionCard = motion(Card);

const achievements = [
  {
    title: "Specialist on Codeforces",
    description: "Competitive coder with participation in over 20 contests with a rating of 1431.",
    icon: <CodeIcon sx={{ fontSize: 40 }} />,
    color: "#581c87",
    links: [
      {
        icon: <LaunchIcon />,
        url: "https://codeforces.com/profile/Innocent_Garg",
        label: "Codeforces Profile"
      }
    ]
  },
  {
    title: "Global Rank 1391 in Codeforces Round 996",
    description: "Ranked out of 16,000+ global participants",
    icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
    color: "#0f766e"
  },
  {
    title: "Developed TCR-ESM Website and models Fine-Tuning",
    description: "Built and deployed the TCR-ESM web server for computational biology research",
    icon: <WebIcon sx={{ fontSize: 40 }} />,
    color: "#059669",
    links: [
      {
        icon: <LaunchIcon />,
        url: "https://webs.iiitd.edu.in/dhanjal/tcresm/",
        label: "Live Website"
      },
      {
        icon: <GitHubIcon />,
        url: "https://github.com/SanyamGarg12/tcr-esm",
        label: "GitHub"
      }
    ]
  },
  {
    title: "Qualified JEE Advanced 2022",
    description: "Ranked among the top 2.5% of over 1 million candidates nationwide",
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    color: "#dc2626"
  }
];

const AchievementCard = ({ achievement, index }) => (
  <MotionCard
    elevation={3}
    sx={{
      height: '100%',
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
    <CardContent sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          color: achievement.color
        }}
      >
        {achievement.icon}
        <Typography
          variant="h6"
          sx={{
            ml: 2,
            fontWeight: 600,
            background: `linear-gradient(45deg, ${achievement.color} 30%, ${achievement.color}99 90%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {achievement.title}
        </Typography>
      </Box>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ lineHeight: 1.6, mb: achievement.links ? 2 : 0 }}
      >
        {achievement.description}
      </Typography>
      
      {achievement.links && (
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          {achievement.links.map((link, idx) => (
            <Link
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: achievement.color,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              {link.icon}
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {link.label}
              </Typography>
            </Link>
          ))}
        </Box>
      )}
    </CardContent>
  </MotionCard>
);

const Achievements = () => {
  return (
    <Box id="achievements" sx={{ mb: 6 }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: 700,
          mb: 4,
          textAlign: 'center',
          background: 'linear-gradient(45deg, #581c87 30%, #0f766e 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Achievements & Awards
      </Typography>
      
      <Grid container spacing={3}>
        {achievements.map((achievement, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <AchievementCard achievement={achievement} index={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Achievements;
