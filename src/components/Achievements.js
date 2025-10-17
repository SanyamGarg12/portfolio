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
    className="relative w-full rounded-2xl p-[1px] mb-8 overflow-hidden"
    style={{
      background: 'linear-gradient(135deg, rgba(234,179,8,0.6), rgba(59,130,246,0.5))',
      boxShadow: '0 20px 60px rgba(0,0,0,0.45)'
    }}
    data-aos="fade-up"
    data-aos-delay={index * 100}
  >
    <div
      className="relative rounded-2xl bg-black/60 border border-gray-800 p-6 backdrop-blur-md transition-transform duration-300"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={(e) => {
        const el = e.currentTarget; const r = el.getBoundingClientRect();
        const x = e.clientX - r.left; const y = e.clientY - r.top;
        const rx = -((y - r.height/2) / (r.height/2)) * 10;
        const ry = ((x - r.width/2) / (r.width/2)) * 10;
        el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1)`;
        const sheen = el.querySelector('.sheen'); if (sheen) { sheen.style.opacity='0.35'; sheen.style.transform=`translate(${(x-r.width/2)/8}px, ${(y-r.height/2)/8}px)`; }
      }}
      onMouseLeave={(e) => { e.currentTarget.style.transform='perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)'; const s=e.currentTarget.querySelector('.sheen'); if(s){s.style.opacity='0'; s.style.transform='translate(0,0)';} }}
    >
      <div className="pointer-events-none sheen absolute inset-[-40%] rounded-[20px]" style={{
        background: 'radial-gradient(600px 200px at 50% 0%, rgba(234,179,8,0.25), rgba(234,179,8,0))',
        transition: 'opacity 200ms ease, transform 200ms ease',
        opacity: 0
      }} />
      <div className="flex items-center gap-4 mb-2" style={{ transform: 'translateZ(20px)' }}>
        <div className="text-yellowColor">
          {achievement.icon}
        </div>
      </div>
      <p className="text-gray-200 text-base leading-relaxed mb-2" style={{ transform: 'translateZ(12px)' }}>
        {achievement.description}
      </p>
    </div>
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
