import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import DeployedWebsites from "./components/DeployedWebsites";
import Contact from "./components/Contact";
import Experience from "./components/CurrWork";

function App() {
  return (
    <div className="w-full h-auto bg-bodyColor text-greyColor overflow-x-clip">
      <Header />
      <div className="max-w-screen-2xl mx-auto px-16">
        <Home />
        <About />
        <Experience />
        <Projects />
        <DeployedWebsites />
        <Achievements />
        <Contact />
      </div>
    </div>
  );
}

export default App;
