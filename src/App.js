import React from "react";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import CurrWork from "./components/CurrWork";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <About />
      <CurrWork />
      <Projects />
      <Achievements />
      <Contact />
    </div>
  );
}

export default App;
