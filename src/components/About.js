import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      offset: 300
    });
  }, []);

  return (
    <section id="about" className='w-full h-[700px] pt-10 pb-20 sml:flex'>
      <div className='w-full sml:w-1/2 flex justify-center items-center' data-aos="fade-right">
        <h1 className='text-6xl font-bold text-white mt-15 sml:pr-3 ld:pr-0'>
          About <span className='text-yellowColor capitalize'>Me</span>
        </h1>
      </div>
      <div className='w-full sml:w-1/2 pt-20'>
        <div className='h-[80%] border-l-[6px] border-[#1A1A1A] flex flex-col justify-evenly'>
          <div className='w-full mb-3 sml:mb-0 group flex items-center'>
            <div className='border border-[#1A1A1A] w-10 h-[6px] bgOpacity relative'>
              <span className='absolute w-5 h-5 rounded-full -top-2 -left-3 flex justify-center items-center bg-[#1A1A1A] bg-opacity-60'>
                <span className='w-3 h-3 rounded-full bg-[#1A1A1A] inline-flex group-hover:bg-yellowColor duration-300'></span>
              </span>
            </div>
            <div className='flex pl-2'>
              <h2 className='font-bold text-white'>Name: </h2>
              <span className='pl-2 flex items-center font-medium'>Sanyam Garg</span>
            </div>
          </div>

          <div className='w-full mb-3 sml:mb-0 group flex items-center'>
            <div className='border border-[#1A1A1A] w-10 h-[6px] bgOpacity relative'>
              <span className='absolute w-5 h-5 rounded-full -top-2 -left-3 flex justify-center items-center bg-[#1A1A1A] bg-opacity-60'>
                <span className='w-3 h-3 rounded-full bg-[#1A1A1A] inline-flex group-hover:bg-yellowColor duration-300'></span>
              </span>
            </div>
            <div className='flex pl-2'>
              <h2 className='font-bold text-white'>Date of Birth: </h2>
              <span className='pl-2 flex items-center font-medium'>28 June 2004</span>
            </div>
          </div>

          <div className='w-full mb-3 sml:mb-0 group flex items-center'>
            <div className='border border-[#1A1A1A] w-10 h-[6px] bgOpacity relative'>
              <span className='absolute w-5 h-5 rounded-full -top-2 -left-3 flex justify-center items-center bg-[#1A1A1A] bg-opacity-60'>
                <span className='w-3 h-3 rounded-full bg-[#1A1A1A] inline-flex group-hover:bg-yellowColor duration-300'></span>
              </span>
            </div>
            <div className='flex pl-2'>
              <h2 className='font-bold text-white'>Email: </h2>
              <span className='pl-2 flex items-center font-medium'>sanyam22448@iiitd.ac.in</span>
            </div>
          </div>

          <div className='w-full mb-3 sml:mb-0 group flex items-center'>
            <div className='border border-[#1A1A1A] w-10 h-[6px] bgOpacity relative'>
              <span className='absolute w-5 h-5 rounded-full -top-2 -left-3 flex justify-center items-center bg-[#1A1A1A] bg-opacity-60'>
                <span className='w-3 h-3 rounded-full bg-[#1A1A1A] inline-flex group-hover:bg-yellowColor duration-300'></span>
              </span>
            </div>
            <div className='flex justify-evenly items-center pl-2'>
              <h2 className='font-bold text-white'>College: </h2>
              <span className='pl-2 flex items-center font-medium'>IIIT Delhi</span>
            </div>
          </div>

          <div className='w-full mb-3 sml:mb-0 group flex items-center'>
            <div className='border border-[#1A1A1A] w-10 h-[6px] bgOpacity relative'>
              <span className='absolute w-5 h-5 rounded-full -top-2 -left-3 flex justify-center items-center bg-[#1A1A1A] bg-opacity-60'>
                <span className='w-3 h-3 rounded-full bg-[#1A1A1A] inline-flex group-hover:bg-yellowColor duration-300'></span>
              </span>
            </div>
            <div className='flex pl-2 flex-wrap'>
              <h2 className='font-bold text-white'>Branch: </h2>
              <span className='pl-2 flex items-center font-medium flex-wrap'>Computer Science and Biosciences</span>
            </div>
          </div>

          <div className='w-full mb-3 sml:mb-0 group flex items-center'>
            <div className='border border-[#1A1A1A] w-10 h-[6px] bgOpacity relative'>
              <span className='absolute w-5 h-5 rounded-full -top-2 -left-3 flex justify-center items-center bg-[#1A1A1A] bg-opacity-60'>
                <span className='w-3 h-3 rounded-full bg-[#1A1A1A] inline-flex group-hover:bg-yellowColor duration-300'></span>
              </span>
            </div>
            <div className='flex pl-2'>
              <h2 className='font-bold text-white'>Phone No: </h2>
              <span className='pl-2 flex items-center font-medium'>8130620064</span>
            </div>
          </div>
        </div>

        <div className='w-full mt-6'>
          <a href="#contact">
            <div className='h-[25px] ml-[25px] w-[90%] sml:h-[25px] sml:ml-[55px] sml:w-[40%] mdl:h-[30px] mdl:ml-[55px] mdl:w-[35%] xl:h-[35px] xl:ml-[52px] xl:w-[20%] bg-yellowColor text-black flex items-center justify-center rounded-xl'>
              Contact Me
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
