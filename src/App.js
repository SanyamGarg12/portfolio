import React from "react";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Experience from "./components/CurrWork";
import { CssBaseline, Container, ThemeProvider, createTheme } from "@mui/material";
import { motion } from "framer-motion";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563eb", // Vibrant blue
      light: "#60a5fa",
      dark: "#1e40af",
    },
    secondary: {
      main: "#7c3aed", // Vibrant purple
      light: "#a78bfa",
      dark: "#5b21b6",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#475569",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    h1: { 
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h2: { 
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h3: { 
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.7,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "8px 16px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        },
      },
    },
  },
});

const MotionContainer = motion(Container);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <MotionContainer 
        maxWidth="lg" 
        sx={{ mt: 4, mb: 4 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <About />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </MotionContainer>
    </ThemeProvider>
  );
}

export default App;
