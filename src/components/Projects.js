import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { FaGithub } from 'react-icons/fa';

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
    description: "Developed advanced ensembled models to accurately predict drug similarity based on molecular target sites, enabling new insights for drug discovery. Leveraged Optuna for hyperparameter optimization and engineered a robust feature set from ChEMBL data. Achieved 97% accuracy and 0.9 AUC across diverse biomedical datasets.",
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
  <div
    className="relative w-full rounded-2xl p-[1px] mb-8 overflow-hidden"
    style={{
      background: 'linear-gradient(135deg, rgba(59,130,246,0.6), rgba(234,179,8,0.5))',
      boxShadow: '0 20px 60px rgba(0,0,0,0.45)'
    }}
    data-aos="fade-up"
    data-aos-delay={index * 100}
  >
    <div
      className="relative rounded-2xl bg-black/60 border border-gray-800 p-6 backdrop-blur-md transition-transform duration-300 h-full flex flex-col"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={(e) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left; const y = e.clientY - r.top;
        const rx = -((y - r.height/2) / (r.height/2)) * 10;
        const ry = ((x - r.width/2) / (r.width/2)) * 10;
        el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1)`;
        const sheen = el.querySelector('.sheen');
        if (sheen) {
          sheen.style.opacity = '0.35';
          sheen.style.transform = `translate(${(x - r.width/2) / 8}px, ${(y - r.height/2) / 8}px)`;
        }
      }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)'; const s=e.currentTarget.querySelector('.sheen'); if(s){s.style.opacity='0'; s.style.transform='translate(0,0)';}}}
    >
      <div className="pointer-events-none sheen absolute inset-[-40%] rounded-[20px]" style={{
        background: 'radial-gradient(600px 200px at 50% 0%, rgba(99,102,241,0.25), rgba(99,102,241,0))',
        transition: 'opacity 200ms ease, transform 200ms ease',
        opacity: 0
      }} />
      <div className="flex flex-col xl:flex-row gap-4 xl:gap-0 justify-between mb-2">
        <div style={{ transform: 'translateZ(25px)' }}>
          <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
        {project.subtitle && (
          <p className="text-sky-300 font-semibold mb-2">{project.subtitle}</p>
        )}
      </div>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
            className="text-sky-300 hover:text-white text-2xl mt-2 xl:mt-0 transition-colors duration-300"
        >
          <FaGithub />
        </a>
      )}
      </div>
      <div className="flex flex-wrap gap-2 mb-4" style={{ transform: 'translateZ(15px)' }}>
      {project.techStack.map((tech, techIndex) => (
        <span
          key={techIndex}
            className="text-xs md:text-sm text-sky-300 border border-sky-400/60 rounded-full px-2 py-1 bg-black/40"
        >
          {tech}
        </span>
      ))}
      </div>
      <p className="text-gray-200 text-base leading-relaxed" style={{ transform: 'translateZ(10px)' }}>
        {project.description}
      </p>
    </div>
  </div>
);

const Projects = () => {
  useEffect(() => {
    Aos.init({ duration: 800, offset: 120 });
  }, []);

  return (
    <section id="projects" className="w-full py-20 border-b-[1px] border-b-black bg-bodyColor">
      <div className="flex justify-center items-center text-center mb-12">
        <h1 className="text-4xl font-bold text-white">
          My <span className="text-yellowColor">Projects</span>
        </h1>
      </div>
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
