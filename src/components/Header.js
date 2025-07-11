import React, { useState } from 'react';
import { MdClose } from "react-icons/md";
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-scroll';

const navItems = [
  { label: "About", href: "about" },
  { label: "Experience", href: "experience" },
  { label: "Projects", href: "projects" },
  { label: "Other Research and Dev", href: "deployed-websites" },
  { label: "Achievements", href: "achievements" },
  { label: "Contact", href: "get-in-touch" },
];

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='w-full h-20 mx-auto flex justify-center items-center bg-boxColor sticky top-0 z-50'>
      <div>
        <ul className='hidden sml:flex items-center gap-10'>
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
              >
                {item.label}
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
          <div className="w-[80%] h-screen overflow-scroll absolute top-2 left-2 bg-boxColor p-4 scrollbar-hide">
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
    </div>
  );
};

export default Header;
