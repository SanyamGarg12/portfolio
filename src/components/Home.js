import React from 'react';
import Sanyam from '../assets/Sanyam.jpeg';
import { FaLinkedinIn, FaGithub, FaEnvelope, FaDownload } from 'react-icons/fa';

const codeLines = [
  'struct Developer {',
  '  std::string name = "Sanyam Garg";',
  '  std::string role = "Software Engineer";',
  '  std::vector<std::string> skills = {',
  '    "Full Stack Developer",',
  '    "Machine Learning Engineer",',
  '    "Competitive Programmer"',
  '  };',
  '};',
];

const RESUME_URL = 'https://drive.google.com/uc?export=download&id=1QOaozCfTkswcTskq7281NsWMTXmIKnTH';

const Home = () => {
  return (
    <section id="home" className="w-full min-h-[80vh] flex flex-col md:flex-row items-center justify-center bg-black relative overflow-hidden py-12 border-b-[1px] border-b-gray-800">
      {/* Floating code symbols background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="absolute text-white/10 text-4xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          >
            {'</>'}
          </span>
        ))}
      </div>
      {/* Left: Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center z-10 mb-8 md:mb-0">
        <img
          className="w-56 h-56 md:w-80 md:h-80 rounded-2xl shadow-2xl object-cover border-4 border-gray-800 bg-gray-900"
          src={Sanyam}
          alt="Sanyam Garg"
        />
      </div>
      {/* Right: Intro */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
          Hi, I'm <span className="text-blue-400">Sanyam</span>
        </h1>
        <div className="w-full max-w-xl bg-gray-900/80 border border-gray-800 rounded-xl shadow-lg p-6 mb-6 relative">
          <pre className="font-mono text-green-400 text-base md:text-lg leading-relaxed whitespace-pre-wrap">
            {codeLines.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
            <span className="text-white animate-blink">|</span>
          </pre>
        </div>
        <p className="text-gray-300 text-lg mb-6 max-w-lg text-center md:text-left">
          I build scalable web apps, craft ML solutions, and love solving real-world problems with code. Always learning, always building.
        </p>
        <div className="flex gap-4 mb-6">
          <a
            href="#get-in-touch"
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gray-800 text-white border border-blue-400 hover:bg-blue-400 hover:text-black font-mono transition"
          >
            <FaEnvelope /> Contact Me
          </a>
          <a
            href={RESUME_URL}
            download="Sanyam Resume.pdf"
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gray-800 text-white border border-green-400 hover:bg-green-400 hover:text-black font-mono transition"
          >
            <FaDownload /> Download Resume
          </a>
        </div>
        <div className="flex gap-4">
          <a href="https://linkedin.com/in/sanyam-garg-133179250/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white text-2xl">
            <FaLinkedinIn />
          </a>
          <a href="https://github.com/SanyamGarg12" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white text-2xl">
            <FaGithub />
          </a>
        </div>
      </div>
      {/* Blinking cursor animation */}
      <style>{`
        .animate-blink { animation: blink 1s steps(2, start) infinite; }
        @keyframes blink { to { visibility: hidden; } }
        .animate-float { animation: float 8s ease-in-out infinite alternate; }
        @keyframes float {
          0% { transform: translateY(0); }
          100% { transform: translateY(-40px); }
        }
      `}</style>
    </section>
  );
};

export default Home; 