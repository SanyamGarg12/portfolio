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
    <section id="about" className='w-full py-20 flex flex-col md:flex-row gap-10'>
      <div className='w-full md:w-2/5 flex justify-center items-center' data-aos="fade-right">
        <h1 className='text-6xl font-extrabold text-white'>
          About <span className='text-yellowColor'>Me</span>
        </h1>
      </div>
      <div className='w-full md:w-3/5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <div className='rounded-xl border border-gray-800 bg-black/50 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)]' onMouseMove={(e)=>{const el=e.currentTarget;const r=el.getBoundingClientRect();const x=e.clientX-r.left;const y=e.clientY-r.top;const rx=-((y-r.height/2)/(r.height/2))*6;const ry=((x-r.width/2)/(r.width/2))*6;el.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`}} onMouseLeave={(e)=>{e.currentTarget.style.transform='perspective(900px) rotateX(0) rotateY(0)'}}>
            <h2 className='text-gray-400 text-sm mb-1'>Name</h2>
            <p className='text-white text-xl font-semibold'>Sanyam Garg</p>
          </div>

          <div className='rounded-xl border border-gray-800 bg-black/50 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)]' onMouseMove={(e)=>{const el=e.currentTarget;const r=el.getBoundingClientRect();const x=e.clientX-r.left;const y=e.clientY-r.top;const rx=-((y-r.height/2)/(r.height/2))*6;const ry=((x-r.width/2)/(r.width/2))*6;el.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`}} onMouseLeave={(e)=>{e.currentTarget.style.transform='perspective(900px) rotateX(0) rotateY(0)'}}>
            <h2 className='text-gray-400 text-sm mb-1'>Date of Birth</h2>
            <p className='text-white text-xl font-semibold'>28 June 2004</p>
          </div>

          <div className='rounded-xl border border-gray-800 bg-black/50 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)]' onMouseMove={(e)=>{const el=e.currentTarget;const r=el.getBoundingClientRect();const x=e.clientX-r.left;const y=e.clientY-r.top;const rx=-((y-r.height/2)/(r.height/2))*6;const ry=((x-r.width/2)/(r.width/2))*6;el.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`}} onMouseLeave={(e)=>{e.currentTarget.style.transform='perspective(900px) rotateX(0) rotateY(0)'}}>
            <h2 className='text-gray-400 text-sm mb-1'>Email</h2>
            <p className='text-white text-xl font-semibold'>sanyam22448@iiitd.ac.in</p>
          </div>

          <div className='rounded-xl border border-gray-800 bg-black/50 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)]' onMouseMove={(e)=>{const el=e.currentTarget;const r=el.getBoundingClientRect();const x=e.clientX-r.left;const y=e.clientY-r.top;const rx=-((y-r.height/2)/(r.height/2))*6;const ry=((x-r.width/2)/(r.width/2))*6;el.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`}} onMouseLeave={(e)=>{e.currentTarget.style.transform='perspective(900px) rotateX(0) rotateY(0)'}}>
            <h2 className='text-gray-400 text-sm mb-1'>College</h2>
            <p className='text-white text-xl font-semibold'>IIIT Delhi</p>
          </div>

          <div className='rounded-xl border border-gray-800 bg-black/50 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)]' onMouseMove={(e)=>{const el=e.currentTarget;const r=el.getBoundingClientRect();const x=e.clientX-r.left;const y=e.clientY-r.top;const rx=-((y-r.height/2)/(r.height/2))*6;const ry=((x-r.width/2)/(r.width/2))*6;el.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`}} onMouseLeave={(e)=>{e.currentTarget.style.transform='perspective(900px) rotateX(0) rotateY(0)'}}>
            <h2 className='text-gray-400 text-sm mb-1'>Branch</h2>
            <p className='text-white text-xl font-semibold'>Computer Science and Biosciences</p>
          </div>

          <div className='rounded-xl border border-gray-800 bg-black/50 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)]' onMouseMove={(e)=>{const el=e.currentTarget;const r=el.getBoundingClientRect();const x=e.clientX-r.left;const y=e.clientY-r.top;const rx=-((y-r.height/2)/(r.height/2))*6;const ry=((x-r.width/2)/(r.width/2))*6;el.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`}} onMouseLeave={(e)=>{e.currentTarget.style.transform='perspective(900px) rotateX(0) rotateY(0)'}}>
            <h2 className='text-gray-400 text-sm mb-1'>Phone</h2>
            <p className='text-white text-xl font-semibold'>8130620064</p>
          </div>
        </div>

        <div className='w-full mt-8 flex'>
          <a href="#get-in-touch" className='mx-auto md:mx-0'>
            <div className='px-6 py-3 bg-yellowColor text-black rounded-xl font-semibold shadow-lg hover:shadow-xl transition'>
              Contact Me
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
