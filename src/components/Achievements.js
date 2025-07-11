import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { FaTrophy, FaCode, FaGraduationCap, FaMedal } from 'react-icons/fa';

const achievements = [
  {
    icon: <FaCode className="text-3xl" />,
    description: (
      <span>
        Achieved <b>Specialist</b> rating (top 10%) on <b>Codeforces</b> with a peak rating of <b>1431</b>
      </span>
    ),
  },
  {
    icon: <FaTrophy className="text-3xl" />,
    description: (
      <span>
        Secured a <b>Global Rank of 1404</b> among 20,000+ participants in <b>Codeforces Round 996 (Div. 2)</b>
      </span>
    ),
  },
  {
    icon: <FaMedal className="text-3xl" />,
    description: (
      <span>
        Reached top 90 teams (Prototype Round) in <b>HackOn with Amazon – Season 5</b>, a national-level hackathon with 14,971 participating teams
      </span>
    ),
  },
  {
    icon: <FaTrophy className="text-3xl" />,
    description: (
      <span>
        Reached the final round of <b>SparkPlug Summer Internship Challenge 2025</b> by Walmart Global Tech, shortlisted from 19,698 participants
      </span>
    ),
  },
  {
    icon: <FaGraduationCap className="text-3xl" />,
    description: (
      <span>
        Ranked in the top 2% among 1.2 million candidates in <b>JEE Advanced 2022</b>
      </span>
    ),
  },
];

const AchievementCard = ({ achievement, index }) => (
  <div
    className="w-full bg-boxColor border-l-4 border-yellowColor rounded-lg shadow-lg p-6 mb-8 hover:shadow-2xl transition-shadow duration-300"
    data-aos="fade-up"
    data-aos-delay={index * 100}
  >
    <div className="flex items-center gap-4 mb-2">
      <div className="text-yellowColor">
        {achievement.icon}
      </div>
    </div>
    <p className="text-gray-300 text-base leading-relaxed mb-2">
      {achievement.description}
    </p>
  </div>
);

const Achievements = () => {
  useEffect(() => {
    Aos.init({ duration: 800, offset: 120 });
  }, []);

  return (
    <section id="achievements" className="w-full py-20 border-b-[1px] border-b-black bg-bodyColor">
      <div className="flex justify-center items-center text-center mb-12">
        <h1 className="text-4xl font-bold text-white">
          <span className="text-yellowColor">Achievements</span> & Awards
        </h1>
      </div>
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {achievements.map((achievement, index) => (
          <AchievementCard key={index} achievement={achievement} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Achievements;
