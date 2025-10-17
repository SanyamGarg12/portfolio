import React, { useRef, useState } from 'react';
import { AiOutlineHome, AiOutlineUser, AiOutlineTrophy, AiOutlineMail } from 'react-icons/ai';
import { MdWorkOutline } from 'react-icons/md';
import { FiBox } from 'react-icons/fi';
import { MdClose } from "react-icons/md";
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-scroll';

const navItems = [
  { label: "Home", href: "home", icon: <AiOutlineHome /> },
  { label: "About Me", href: "about", icon: <AiOutlineUser /> },
  { label: "Projects", href: "projects", icon: <FiBox /> },
  { label: "Research Driven Web", href: "deployed-websites", icon: <FiBox /> },
  { label: "Experience", href: "experience", icon: <MdWorkOutline /> },
  { label: "Achievements", href: "achievements", icon: <AiOutlineTrophy /> },
  { label: "Contact Me", href: "get-in-touch", icon: <AiOutlineMail /> },
];

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const [indicatorVisible, setIndicatorVisible] = useState(false);

  const moveIndicatorTo = (targetEl) => {
    const container = navRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator || !targetEl) return;
    const cRect = container.getBoundingClientRect();
    const tRect = targetEl.getBoundingClientRect();
    const left = tRect.left - cRect.left - 12; // padding
    const width = tRect.width + 24;
    indicator.style.transform = `translateX(${left}px)`;
    indicator.style.width = `${width}px`;
  };

  return (
    <div
      className='w-full h-20 mx-auto flex justify-center items-center sticky top-0 z-50'
      style={{
        background: 'rgba(2,6,23,0.25)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}
      onMouseMove={(e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const midX = rect.width / 2;
        const midY = rect.height / 2;
        const tx = ((x - midX) / midX) * 6;
        const ty = ((y - midY) / midY) * 4;
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate3d(0,0,0)';
      }}
    >
      <div>
        <ul ref={navRef} className='hidden sml:flex items-center gap-8 relative px-6 py-3 rounded-full'
          style={{
            border: '1px solid rgba(148,163,184,0.2)',
            background: 'linear-gradient(180deg, rgba(17,24,39,0.65), rgba(17,24,39,0.35))',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 10px 30px rgba(0,0,0,0.35)'
          }}
        >
          <div
            ref={indicatorRef}
            style={{
              position: 'absolute',
              height: 3,
              left: 12,
              right: 12,
              bottom: 6,
              borderRadius: 9999,
              background: 'linear-gradient(90deg, #22d3ee, #60a5fa)',
              transform: 'translateX(0px)',
              width: 80,
              transition: 'transform 280ms cubic-bezier(.2,.8,.2,1), width 280ms cubic-bezier(.2,.8,.2,1)',
              opacity: indicatorVisible ? 1 : 0,
              pointerEvents: 'none'
            }}
          />
          {navItems.map((item) => (
            <li 
              className="text-base font-normal text-gray-100 tracking-wide cursor-pointer relative"
              key={item.label}
              onMouseEnter={(e) => { setIndicatorVisible(true); moveIndicatorTo(e.currentTarget); }}
              onMouseMove={(e) => moveIndicatorTo(e.currentTarget)}
              onMouseLeave={() => setIndicatorVisible(false)}
            >
              <Link
                activeClass="active"
                to={item.href}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <span className="px-3 py-1 inline-flex items-center gap-2" style={{ position: 'relative', zIndex: 1 }}>
                  <span className="text-white/80 text-xl">{item.icon}</span>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        
        <span 
          onClick={() => setShowMenu(!showMenu)} 
          className="absolute sml:hidden top-4 right-4 text-textColor hover:text-yellowColor duration-300 text-2xl cursor-pointer"
        >
          <FiMenu />
        </span>
        
        {showMenu && (
          <div className="w-[80%] h-screen overflow-scroll absolute top-2 left-2 p-4 scrollbar-hide"
            style={{
              background: 'rgba(17,24,39,0.9)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.45)',
              border: '1px solid rgba(75,85,99,0.4)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <div>
              <ul className='mt-10 flex flex-col gap-10'>
                {navItems.map((item) => (
                  <li 
                    className="text-base font-normal text-gray-400 tracking-wide cursor-pointer hover:text-yellowColor duration-300"
                    key={item.label}
                  >
                    <Link
                      activeClass="active"
                      to={item.href}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      onClick={() => setShowMenu(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <span
              onClick={() => setShowMenu(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-yellowColor duration-300 text-2xl cursor-pointer"
            >
              <MdClose />
            </span>
          </div>
        )}
      </div>
      <style>{`
        .active { color: #e5e7eb; }
        .active span { text-shadow: 0 0 18px rgba(96,165,250,0.55); }
        @media (hover: hover) {
          li:hover span { color: #f8fafc; text-shadow: 0 0 18px rgba(96,165,250,0.5); }
        }
      `}</style>
    </div>
  );
};

export default Header;
