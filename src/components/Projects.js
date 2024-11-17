import React from "react";

const Projects = () => {
  return (
    <section id="projects">
      <h2>Projects</h2>
      <ul>
        <li>
          <strong>Real-Time Weather Data Processing System:</strong>
          <ul>
            <li><strong>Tech Stack:</strong> Python, MySQL</li>
            <li><strong>Description:</strong> Developed a real-time weather monitoring system for data ingestion, aggregation, and visualization across five cities. Automated data rollups, saving 10 hours of manual processing weekly, improving data retrieval and analysis efficiency.</li>
            <li><strong>GitHub:</strong> <a href="https://github.com/SanyamGarg12/Real-Time-Data-Processing-System-for-Weather-Monitoring-with-Rollups-and-Aggregates">GitHub</a></li>
          </ul>
        </li>
        <li>
          <strong>Rule Engine with AST:</strong>
          <ul>
            <li><strong>Tech Stack:</strong> PostgreSQL, FastAPI, Docker</li>
            <li><strong>Description:</strong> Developed a 3-tier rule engine application using PostgreSQL, FastAPI, and a frontend. Implemented an Abstract Syntax Tree (AST) for dynamic rule creation and modification to check user eligibility. Deployed using Docker for enhanced scalability and portability.</li>
            <li><strong>GitHub:</strong> <a href="https://github.com/SanyamGarg12/Rule-Engine-with-AST">GitHub</a></li>
          </ul>
        </li>
        <li>
          <strong>Codeforces CLI:</strong>
          <ul>
            <li><strong>Tech Stack:</strong> Python, Shell Scripting, API Integration</li>
            <li><strong>Description:</strong> Developed a suite of functionalities for managing Codeforces accounts from the Linux shell. Reduced the time taken to access account information by 40%, resulting in faster user response times.</li>
            <li><strong>GitHub:</strong> <a href="https://github.com/SanyamGarg12/Codeforces-CLI">GitHub</a></li>
          </ul>
        </li>
        <li>
          <strong>Census Income Prediction:</strong>
          <ul>
            <li><strong>Tech Stack:</strong> Python, Scikit-learn, Random Forest</li>
            <li><strong>Description:</strong> Utilized advanced supervised learning techniques to predict individuals' income with 99% accuracy. Implemented Random Forest algorithms with personalized feature engineering for high-accuracy predictions. Provided valuable insights to non-profit organizations for prioritizing donation requests based on income predictions.</li>
            <li><strong>GitHub:</strong> <a href="https://github.com/SanyamGarg12/Census-Income-Prediction">GitHub</a></li>
          </ul>
        </li>
        <li>
          <strong>INSight-Diabetes:</strong>
          <ul>
            <li><strong>Tech Stack:</strong> Python, Scikit-learn, Needleman-Wunsch</li>
            <li><strong>Description:</strong> Developed machine learning algorithms achieving over 95% accuracy in identifying diabetic patients. Analyzed genomic sequences using Needleman Wunsch and other algorithms on a dataset of 2,500+ entries.</li>
            <li><strong>GitHub:</strong> <a href="https://github.com/SanyamGarg12/Diabetes-Prediction">GitHub</a></li>
          </ul>
        </li>
      </ul>
    </section>
  );
};

export default Projects;
