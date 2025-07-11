import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { FaGithub } from 'react-icons/fa';

const experiences = [
  {
    title: "Full-Stack Web Developer Intern",
    company: "CRF, Indian Institute of Technology (IIT) Ropar",
    techStack: ["React.js", "Node.js", "Express.js", "JWT", "bcrypt", "Multer"],
    points: [
      "Architected a full-stack web application using <b>React.js</b>, <b>Node.js</b>, and <b>Express.js</b> for centralized research facility management",
      "Implemented secure authentication using <b>JWT</b> and <b>bcrypt</b>, with support for role-based access control",
      "Designed and built RESTful APIs for managing facility bookings, publications, and content updates",
      "Developed a dynamic admin dashboard with support for two admin roles; enabled real-time editing of website components through the panel",
      "Integrated <b>Multer</b> for efficient file upload and management in the backend"
    ],
    github: "https://github.com/SanyamGarg12/IIT-Ropar-Central-Research-Facilities"
  },
  {
    title: "Software Development Engineer Intern",
    company: "Velmenni Research & Development",
    techStack: ["UI/UX", "CLI Tools", "Web Development", "C", "Python", "Bash", "Java"],
    points: [
      "Worked on Velmenni’s proprietary SDK, including the main Spirit Config Tool (<b>Java</b>) and helper tools",
      "Contributed to a web-based interface built using <b>HTML</b>, <b>CSS</b>, <b>JavaScript</b>, connected to a firmware-based backend written in <b>C</b> and <b>Python</b>",
      "Used bash scripting to automate compilation of .c, .py, .txt, and frontend files into a single <b>.ftp</b> package, which was flashed to hardware for real-time updates",
      "Integrated Java-based logic and variables from the config tool into the frontend for better consistency and functionality",
      "Improved UI/UX design and implemented new features, while also fixing existing issues in the web platform",
      "Gained hands-on experience with <b>embedded systems</b>, firmware flashing, and cross-language integration across <b>Java</b>, <b>C</b>, <b>Python</b>, <b>Bash</b>, and Web technologies"
    ]
  }
];

const ExperienceCard = ({ experience, index }) => (
  <div
    className="w-full bg-boxColor border-l-4 border-yellowColor rounded-lg shadow-lg p-6 mb-8 hover:shadow-2xl transition-shadow duration-300"
    data-aos="fade-up"
    data-aos-delay={index * 100}
  >
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
      <div>
        <h3 className="text-2xl font-bold text-white mb-1">{experience.title}</h3>
        <p className="text-yellowColor font-semibold mb-2">{experience.company}</p>
      </div>
      {experience.github && (
        <a
          href={experience.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellowColor hover:text-white text-2xl mt-2 md:mt-0 transition-colors duration-300"
        >
          <FaGithub />
        </a>
      )}
    </div>
    <div className="flex flex-wrap gap-2 mb-4">
      {experience.techStack.map((tech, techIndex) => (
        <span
          key={techIndex}
          className="text-xs md:text-sm text-yellowColor border border-yellowColor rounded-full px-2 py-1 bg-black bg-opacity-30"
        >
          {tech}
        </span>
      ))}
    </div>
    <ul className="list-disc pl-5 space-y-2">
      {experience.points.map((point, idx) => (
        <li key={idx} className="text-gray-300 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: point }} />
      ))}
    </ul>
  </div>
);

const Experience = () => {
  useEffect(() => {
    Aos.init({ duration: 800, offset: 120 });
  }, []);

  return (
    <section id="experience" className="w-full py-20 border-b-[1px] border-b-black bg-bodyColor">
      <div className="flex justify-center items-center text-center mb-12">
        <h1 className="text-4xl font-bold text-white">
          Work <span className="text-yellowColor">Experience</span>
        </h1>
      </div>
      <div className="w-full max-w-4xl mx-auto">
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Experience;