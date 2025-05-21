import React, { useState, useEffect, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import CodeIcon from "@mui/icons-material/Code";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);
const MotionIconButton = motion(IconButton);

const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const numberOfParticles = 50;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          color: `rgba(${Math.random() * 50 + 88}, ${Math.random() * 50 + 28}, ${Math.random() * 50 + 135}, 0.5)`
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Draw connections
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(88, 28, 135, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      // Draw mouse interaction
      if (mousePosition.x && mousePosition.y) {
        particles.forEach(particle => {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const angle = Math.atan2(dy, dx);
            const force = (150 - distance) / 150;
            particle.x -= Math.cos(angle) * force * 2;
            particle.y -= Math.sin(angle) * force * 2;
          }
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();
    createParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
      }}
    />
  );
};

const Header = () => {
  const theme = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <InteractiveBackground />
      <AppBar 
        position="fixed" 
        elevation={scrolled ? 4 : 0}
        sx={{ 
          background: scrolled 
            ? 'rgba(88, 28, 135, 0.95)'
            : 'linear-gradient(45deg, #581c87 30%, #0f766e 90%)',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          transition: 'all 0.3s ease-in-out',
          zIndex: 1200
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 2 }}>
          <MotionTypography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 700, 
              letterSpacing: '-0.5px',
              cursor: 'pointer',
              color: '#fff'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            IIITD
          </MotionTypography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navItems.map((item, index) => (
              <MotionButton
                key={item.label}
                color="inherit"
                href={item.href}
                sx={{ 
                  fontWeight: 500,
                  position: 'relative',
                  color: '#fff',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '0%',
                    height: '2px',
                    bottom: 0,
                    left: '50%',
                    background: '#fff',
                    transition: 'all 0.3s ease-in-out',
                    transform: 'translateX(-50%)'
                  },
                  '&:hover::after': {
                    width: '100%'
                  }
                }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item.label}
              </MotionButton>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box 
        sx={{ 
          background: 'linear-gradient(45deg, #581c87 30%, #0f766e 90%)',
          color: 'white',
          pt: { xs: 20, md: 24 },
          pb: { xs: 12, md: 16 },
          px: 4,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
            animation: 'pulse 8s infinite',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.2)' },
              '100%': { transform: 'scale(1)' }
            }
          }}
        />
        
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MotionTypography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 800,
              mb: 2,
              background: 'linear-gradient(45deg, #fff 30%, #e2e8f0 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            Sanyam Garg
          </MotionTypography>
          
          <MotionTypography 
            variant="h5" 
            sx={{ 
              mb: 4,
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '800px',
              mx: 'auto',
              fontSize: { xs: '1.2rem', md: '1.5rem' }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            SDE@Velmenni, Full stack developer
          </MotionTypography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
            <MotionIconButton 
              href="https://codeforces.com/profile/SanyamGarg12" 
              target="_blank"
              sx={{ 
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': { 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-4px)'
                }
              }}
              whileHover={{ y: -4 }}
              whileTap={{ y: 0 }}
            >
              <CodeIcon />
            </MotionIconButton>
            
            <MotionIconButton 
              href="https://github.com/SanyamGarg12" 
              target="_blank"
              sx={{ 
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': { 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-4px)'
                }
              }}
              whileHover={{ y: -4 }}
              whileTap={{ y: 0 }}
            >
              <GitHubIcon />
            </MotionIconButton>
            
            <MotionIconButton 
              href="https://linkedin.com/in/sanyam-garg-133179250/" 
              target="_blank"
              sx={{ 
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': { 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-4px)'
                }
              }}
              whileHover={{ y: -4 }}
              whileTap={{ y: 0 }}
            >
              <LinkedInIcon />
            </MotionIconButton>
            
            <MotionIconButton 
              href="mailto:sanyam22448@iiitd.ac.in"
              sx={{ 
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': { 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-4px)'
                }
              }}
              whileHover={{ y: -4 }}
              whileTap={{ y: 0 }}
            >
              <EmailIcon />
            </MotionIconButton>
          </Box>

          <MotionTypography
            variant="subtitle1"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CodeIcon sx={{ fontSize: 20 }} />
            Codeforces Specialist (1431)
          </MotionTypography>
        </MotionBox>
      </Box>
    </Box>
  );
};

export default Header;
