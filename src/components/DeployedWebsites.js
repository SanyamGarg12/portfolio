import React from 'react';
import { FaGlobe, FaGithub, FaSpinner } from 'react-icons/fa';

const deployedWebsites = [
  {
    title: 'TCR-ESM Web Server',
    description:
      'Built and deployed the TCR-ESM web server (XAMPP, DL model fine-tuning), addressing a significant challenge in T-cell therapy development.',
    links: [
      { label: 'Live Website', url: 'https://webs.iiitd.edu.in/dhanjal/tcresm/', icon: <FaGlobe />, color: 'text-pink-400' },
      { label: 'GitHub', url: 'https://github.com/SanyamGarg12/tcr-esm', icon: <FaGithub />, color: 'text-pink-400' },
    ],
    status: { label: 'Live', color: 'bg-green-600' },
  },
  {
    title: 'Diabetes Pathways Knowledge Graph Tool',
    description:
      'Built a website for a knowledge graph–based tool for diabetes pathways using Neo4j and deployed backend logic; project done under the Translational Biology Lab, IIIT Delhi.',
    links: [
      { label: 'GitHub', url: 'https://github.com/SanyamGarg12/Diabetes-Knowledge-Graph---The-Translational-Biology-Lab', icon: <FaGithub />, color: 'text-pink-400' },
    ],
    status: { label: 'Deployment in progress', color: 'bg-yellow-500', icon: <FaSpinner className="animate-spin inline-block mr-1" /> },
  },
];

const DeployedWebsites = () => (
  <section id="deployed-websites" className="w-full py-20 border-b-[1px] border-b-black bg-bodyColor">
    <div className="flex justify-center items-center text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-bold text-white">
        Research-Associated Websites
      </h1>
    </div>
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {deployedWebsites.map((site, idx) => (
        <div
          key={site.title}
          className="bg-boxColor border-l-4 border-pink-400 rounded-lg shadow-lg p-6 flex flex-col gap-4 hover:shadow-2xl transition-shadow duration-300"
          data-aos="fade-up"
          data-aos-delay={idx * 100}
        >
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-bold text-white">{site.title}</h2>
            <span className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1 ${site.status.color}`}>
              {site.status.icon}
              {site.status.label}
            </span>
          </div>
          <p className="text-gray-300 text-base mb-2">{site.description}</p>
          <div className="flex gap-4 mt-auto">
            {site.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 font-semibold ${link.color} hover:underline`}
              >
                {link.icon} {link.label}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default DeployedWebsites; 