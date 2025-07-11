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
    className="w-full bg-boxColor border-l-4 border-yellowColor rounded-lg shadow-lg p-6 mb-8 hover:shadow-2xl transition-shadow duration-300"
    data-aos="fade-up"
    data-aos-delay={index * 100}
  >
    <div className="flex flex-col xl:flex-row gap-4 xl:gap-0 justify-between mb-2">
      <div>
        <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
        {project.subtitle && (
          <p className="text-yellowColor font-semibold mb-2">{project.subtitle}</p>
        )}
      </div>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellowColor hover:text-white text-2xl mt-2 xl:mt-0 transition-colors duration-300"
        >
          <FaGithub />
        </a>
      )}
    </div>
    <div className="flex flex-wrap gap-2 mb-4">
      {project.techStack.map((tech, techIndex) => (
        <span
          key={techIndex}
          className="text-xs md:text-sm text-yellowColor border border-yellowColor rounded-full px-2 py-1 bg-black bg-opacity-30"
        >
          {tech}
        </span>
      ))}
    </div>
    <p className="text-gray-300 text-base leading-relaxed">
      {project.description}
    </p>
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
