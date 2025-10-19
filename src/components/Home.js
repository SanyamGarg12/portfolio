import React, { useRef, useEffect } from 'react';
import Sanyam from '../assets/Sanyam.jpeg';
import { FaLinkedinIn, FaGithub, FaEnvelope, FaDownload } from 'react-icons/fa';

const codeLines = [
  'struct Developer {',
  '  std::string name = "Sanyam Garg";',
  '  std::string role = "Software Engineer";',
  '  std::string email_id = "sanyam22448@iiitd.ac.in";',
  '  std::vector<std::string> skills = {',
  '    "Full Stack Developer",',
  '    "Machine Learning Engineer",',
  '    "Competitive Programmer"',
  '  };',
  '};',
];

const RESUME_URL = 'https://drive.google.com/uc?export=download&id=1QOaozCfTkswcTskq7281NsWMTXmIKnTH';

const Home = () => {
  const tiltRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const animationRef = React.useRef(0);
  const particlesRef = React.useRef([]);
  const mouseRef = React.useRef({ x: -9999, y: -9999 });
  const lastMouseRef = React.useRef({ x: -9999, y: -9999 });
  const spreadingRef = React.useRef(true);
  const spreadImpulseRef = React.useRef(false);
  const mergeRadiusRef = React.useRef(0);
  const centralDotRadiusRef = React.useRef(0);
  const targetCountRef = React.useRef(0);
  const fireworksRef = React.useRef([]); // transient burst particles
  const lastBurstRef = React.useRef(0);
  const burstIntervalRef = React.useRef(20000); // 20s
  const dirBinsRef = React.useRef({ angles: [], nextIdx: 0 });
  const balanceRef = React.useRef({ last: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      // precompute direction bins for even directional coverage
      const binCount = 16; // 22.5° apart
      dirBinsRef.current.angles = new Array(binCount).fill(0).map((_, i) => (i / binCount) * Math.PI * 2);
      dirBinsRef.current.nextIdx = 0;
      initParticles();
    }

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function initParticles() {
      const densityDivisor = 1600; // denser per square unit
      const particleCount = Math.min(4200, Math.floor((width * height) / densityDivisor));
      targetCountRef.current = particleCount;
      const angles = dirBinsRef.current.angles;
      const jitter = 0.12; // +/- ~7°
      particlesRef.current = new Array(particleCount).fill(0).map((_, i) => {
        const baseSize = rand(1.8, 3.4);
        const speed = rand(0.13, 0.19); // faster motion
        const baseAng = angles[i % angles.length];
        const ang = baseAng + rand(-jitter, jitter);
        return {
          x: rand(0, width),
          y: rand(0, height),
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed,
          speed,
          currSpeed: speed,
          turn: rand(-0.004, 0.004),
          size: baseSize,
          baseSize,
        };
      });
    }

    function spawnFireworksBurst() {
      const corners = [
        { x: 0, y: 0, ox: width, oy: height },
        { x: width, y: 0, ox: 0, oy: height },
        { x: 0, y: height, ox: width, oy: 0 },
        { x: width, y: height, ox: 0, oy: 0 },
      ];
      const perCorner = 180; // number of particles per corner
      for (const c of corners) {
        const baseAngle = Math.atan2(c.oy - c.y, c.ox - c.x); // to opposite corner
        for (let i = 0; i < perCorner; i++) {
          const angle = baseAngle + rand(-0.25, 0.25); // slight spread
          const speed = rand(1.2, 2.6);
          const size = rand(1.6, 3.2);
          fireworksRef.current.push({
            x: c.x,
            y: c.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size,
            alpha: 1,
          });
        }
      }
      lastBurstRef.current = performance.now();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(147, 197, 253, 0.85)'; // tailwind blue-300ish

      const mouse = mouseRef.current;
      const attractRadius = Math.min(Math.max(Math.min(width, height) * 0.32, 180), 420);
      const innerMergeRadius = attractRadius * 0.38;
      mergeRadiusRef.current = innerMergeRadius;
      const steerToward = 0.08; // direction alignment toward pointer
      const steerAwayFar = 0.02; // tiny alignment away when very far (keeps variety)
      const accelLerp = 0.06;   // speed acceleration smoothing

      let mergedCount = 0;

      // continuously top-up particles to maintain dense coverage
      if (particlesRef.current.length < targetCountRef.current) {
        const deficit = targetCountRef.current - particlesRef.current.length;
        const spawnThisFrame = Math.min(40, deficit);
        for (let i = 0; i < spawnThisFrame; i++) {
          const baseSize = rand(1.8, 3.4);
          const speed = rand(0.13, 0.19);
          const { angles } = dirBinsRef.current;
          const idx = dirBinsRef.current.nextIdx % angles.length;
          dirBinsRef.current.nextIdx = idx + 1;
          const baseAng = angles[idx];
          const ang = baseAng + rand(-0.12, 0.12);
          particlesRef.current.push({
            x: rand(0, width),
            y: rand(0, height),
            vx: Math.cos(ang) * speed,
            vy: Math.sin(ang) * speed,
            speed,
            currSpeed: speed,
            turn: rand(-0.004, 0.004),
            size: baseSize,
            baseSize,
          });
        }
      }

      for (const p of particlesRef.current) {
        // gentle attraction towards mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        let dirX = p.vx;
        let dirY = p.vy;
        // normalize current direction
        {
          const d = Math.hypot(dirX, dirY) || 1;
          dirX /= d; dirY /= d;
        }

        let targetSpeed = p.speed; // default
        if (dist < attractRadius) {
          // steer towards mouse
          let tx = dx / (dist || 1);
          let ty = dy / (dist || 1);
          dirX = dirX + (tx - dirX) * steerToward;
          dirY = dirY + (ty - dirY) * steerToward;
          // accelerate when approaching pointer
          targetSpeed = dist < innerMergeRadius ? p.speed * 1.8 : p.speed * 1.3;
          // within inner radius, start coalescing
          if (dist < innerMergeRadius) {
            p.x += dx * 0.006; // very small positional lerp
            p.y += dy * 0.006;
            // only shrink when about to merge (closer than 60% of inner radius)
            if (dist < innerMergeRadius * 0.6) {
              p.size += (p.baseSize * 0.35 - p.size) * 0.08; // shrink towards 35% size
            } else {
              // slight pre-shrink for anticipation
              p.size += (p.baseSize * 0.85 - p.size) * 0.06;
            }
            mergedCount += 1;
          } else {
            // outside inner radius, restore size slowly
            p.size += (p.baseSize - p.size) * 0.02;
          }
        } else if (mouse.x > -5000 && dist > attractRadius * 1.2) {
          // very far from mouse in view: a subtle push away but preserve individuality
          let tx = -dx / (dist || 1);
          let ty = -dy / (dist || 1);
          dirX = dirX + (tx - dirX) * steerAwayFar;
          dirY = dirY + (ty - dirY) * steerAwayFar;
          p.size += (p.baseSize - p.size) * 0.04;
        }

        // smoothly accelerate/decelerate towards targetSpeed
        p.currSpeed += (targetSpeed - p.currSpeed) * accelLerp;
        // add tiny per-frame jitter to preserve directional diversity, with per-particle bias
        const jitter = 0.012;
        const bias = (p.turn || 0);
        const ang = Math.atan2(dirY, dirX) + bias + rand(-jitter, jitter);
        dirX = Math.cos(ang);
        dirY = Math.sin(ang);
        // set constant speed in the steered direction
        {
          const d = Math.hypot(dirX, dirY) || 1;
          p.vx = (dirX / d) * p.currSpeed;
          p.vy = (dirY / d) * p.currSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        // wrap around edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // draw central merged dot if mouse in view
      if (mouse.x > -5000 && mouse.y > -5000) {
        const targetR = Math.min(26, 8 + mergedCount * 0.18);
        centralDotRadiusRef.current += (targetR - centralDotRadiusRef.current) * 0.12;
        if (centralDotRadiusRef.current > 0.1) {
          ctx.beginPath();
          ctx.fillStyle = 'rgba(56, 189, 248, 0.9)'; // cyan-400ish
          ctx.arc(mouse.x, mouse.y, centralDotRadiusRef.current, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'rgba(147, 197, 253, 0.85)'; // reset fill for particles
        }
      } else {
        // pointer off-screen: shrink central dot and trigger one-time spread impulse
        centralDotRadiusRef.current *= 0.85;
        if (spreadingRef.current && spreadImpulseRef.current) {
          const lm = lastMouseRef.current;
          for (const p of particlesRef.current) {
            // send each particle 180° opposite of where it approached (from last mouse position)
            const dx = p.x - lm.x;
            const dy = p.y - lm.y;
            const d = Math.hypot(dx, dy) || 1;
            const ox = dx / d;
            const oy = dy / d;
            // brief speed boost then ease back in subsequent frames
            p.currSpeed = p.speed * 1.4;
            p.vx = ox * p.currSpeed;
            p.vy = oy * p.currSpeed;
            // restore size smoothly after merge
            p.size += (p.baseSize - p.size) * 0.15;
          }
          spreadImpulseRef.current = false;
        } else if (spreadingRef.current) {
          // continue restoring size while spreading naturally
          for (const p of particlesRef.current) {
            p.currSpeed += (p.speed - p.currSpeed) * 0.05;
            p.size += (p.baseSize - p.size) * 0.06;
          }
        }
      }

      // periodic fireworks bursts from corners
      const now = performance.now();
      if (now - lastBurstRef.current > burstIntervalRef.current) {
        spawnFireworksBurst();
      }

      // periodic spatial balancing to prevent empty regions
      if (now - balanceRef.current.last > 900) {
        const cols = 12;
        const rows = 7;
        const minPerCell = Math.max(6, Math.floor(targetCountRef.current / (cols * rows * 5)));
        const cellW = width / cols;
        const cellH = height / rows;
        const counts = new Array(cols * rows).fill(0);
        for (const p of particlesRef.current) {
          const cx = Math.max(0, Math.min(cols - 1, Math.floor(p.x / cellW)));
          const cy = Math.max(0, Math.min(rows - 1, Math.floor(p.y / cellH)));
          counts[cy * cols + cx]++;
        }
        const { angles } = dirBinsRef.current;
        for (let cy = 0; cy < rows; cy++) {
          for (let cx = 0; cx < cols; cx++) {
            const idx = cy * cols + cx;
            if (counts[idx] < minPerCell) {
              const deficit = minPerCell - counts[idx];
              for (let k = 0; k < deficit; k++) {
                const baseSize = rand(1.8, 3.4);
                const speed = rand(0.13, 0.19);
                const baseAng = angles[(dirBinsRef.current.nextIdx++) % angles.length];
                const ang = baseAng + rand(-0.12, 0.12);
                const x = cx * cellW + rand(0, cellW);
                const y = cy * cellH + rand(0, cellH);
                particlesRef.current.push({
                  x, y,
                  vx: Math.cos(ang) * speed,
                  vy: Math.sin(ang) * speed,
                  speed,
                  currSpeed: speed,
                  turn: rand(-0.004, 0.004),
                  size: baseSize,
                  baseSize,
                });
              }
            }
          }
        }
        balanceRef.current.last = now;
      }

      // update and render fireworks particles
      for (let i = fireworksRef.current.length - 1; i >= 0; i--) {
        const f = fireworksRef.current[i];
        f.x += f.vx;
        f.y += f.vy;
        f.vx *= 0.985;
        f.vy *= 0.985;
        f.size *= 0.992;
        f.alpha *= 0.982;
        if (f.alpha < 0.04 || f.size < 0.3) {
          fireworksRef.current.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(59,130,246,${Math.max(0, Math.min(1, f.alpha))})`;
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    function onMove(e) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      lastMouseRef.current.x = e.clientX;
      lastMouseRef.current.y = e.clientY;
      spreadingRef.current = false;
    }

    function onLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
      spreadingRef.current = true;
      spreadImpulseRef.current = true;
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const handleTilt = (e) => {
    const card = tiltRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateY = ((x - midX) / midX) * 10; // max 10deg
    const rotateX = -((y - midY) / midY) * 10;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
  };

  const resetTilt = () => {
    const card = tiltRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  };

  return (
    <section id="home" className="w-full min-h-[50vh] flex flex-col md:flex-row items-center justify-center bg-black relative overflow-hidden pt-4 pb-8 border-b-[1px] border-b-gray-800">
      {/* Interactive particles background (full page) */}
      <canvas
        ref={canvasRef}
        className="z-0"
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', background: 'transparent' }}
      />
      {/* Left: Image */}
      <div className="w-full md:w-1/2 flex justify-center items-start z-10 mb-8 md:mb-0 -mt-32">
        <div className="relative group">
          {/* Artistic Yellow Frame Layers */}
          <div className="absolute -inset-4 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-3xl blur-sm opacity-60 group-hover:opacity-80 transition-all duration-500"></div>
          <div className="absolute -inset-2 bg-gradient-to-tr from-yellow-300 via-yellow-400 to-yellow-500 rounded-2xl blur-xs opacity-40 group-hover:opacity-60 transition-all duration-500"></div>
          
          {/* Golden Glow Effect */}
          <div className="absolute -inset-6 bg-gradient-to-r from-yellow-200/20 via-yellow-300/30 to-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
          
          {/* Main Photo Container */}
          <div
            ref={tiltRef}
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            className="relative rounded-2xl border-4 border-yellow-400/80 bg-gradient-to-br from-yellow-50/10 to-yellow-100/5 shadow-[0_20px_60px_rgba(251,191,36,0.4)] backdrop-blur-sm"
            style={{ transition: 'transform 150ms ease-out', willChange: 'transform' }}
          >
            {/* Inner Golden Border */}
            <div className="absolute inset-1 rounded-xl border-2 border-yellow-300/60"></div>
            
            {/* Photo with Enhanced Styling */}
            <img
              className="w-64 h-100 md:w-96 md:h-96 rounded-xl object-cover relative z-10"
              src={Sanyam}
              alt="Sanyam Garg"
            />
            
            {/* Floating Golden Particles */}
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce [animation-delay:0s]"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-yellow-300 rounded-full animate-bounce [animation-delay:0.5s]"></div>
            <div className="absolute top-1/2 -right-3 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:1s]"></div>
            
            {/* Artistic Corner Accents */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-l-2 border-t-2 border-yellow-400 rounded-tl-lg"></div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-r-2 border-b-2 border-yellow-400 rounded-br-lg"></div>
          </div>
          
          {/* Outer Artistic Ring */}
          <div className="absolute -inset-8 border border-yellow-300/30 rounded-full animate-spin [animation-duration:20s]"></div>
          <div className="absolute -inset-12 border border-yellow-400/20 rounded-full animate-spin [animation-duration:30s] [animation-direction:reverse]"></div>
        </div>
      </div>
      {/* Right: Intro */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start z-10 px-4 pt-0">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
          Hi, I'm <span className="text-blue-400">Sanyam</span>
        </h1>
        <div className="w-full max-w-xl bg-gray-900/80 border border-gray-800 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-6 mb-6 relative"
             style={{ transformStyle: 'preserve-3d' }}
             onMouseMove={(e) => {
               const el = e.currentTarget;
               const r = el.getBoundingClientRect();
               const x = e.clientX - r.left; const y = e.clientY - r.top;
               const rx = -((y - r.height/2) / (r.height/2)) * 8;
               const ry = ((x - r.width/2) / (r.width/2)) * 8;
               el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
             }}
             onMouseLeave={(e) => { e.currentTarget.style.transform = 'perspective(900px) rotateX(0) rotateY(0)'; }}
        >
          <div style={{ position:'absolute', inset: 0, borderRadius: 12, background:'radial-gradient(600px 120px at 50% 120%, rgba(59,130,246,0.25), rgba(59,130,246,0))', pointerEvents:'none' }} />
          <pre className="font-mono text-green-400 text-base md:text-lg leading-relaxed whitespace-pre-wrap relative z-10">
            {codeLines.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
            <span className="text-white animate-blink">|</span>
          </pre>
        </div>
        
        {/* Terminal Command Display */}
        <div className="w-full max-w-xl bg-black/90 border border-gray-700 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-6 mb-6 relative overflow-hidden"
             style={{ transformStyle: 'preserve-3d' }}
             onMouseMove={(e) => {
               const el = e.currentTarget;
               const r = el.getBoundingClientRect();
               const x = e.clientX - r.left; const y = e.clientY - r.top;
               const rx = -((y - r.height/2) / (r.height/2)) * 6;
               const ry = ((x - r.width/2) / (r.width/2)) * 6;
               el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
             }}
             onMouseLeave={(e) => { e.currentTarget.style.transform = 'perspective(800px) rotateX(0) rotateY(0)'; }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 rounded-xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-gray-400 text-sm font-mono">Terminal</span>
            </div>
            <div className="font-mono text-sm">
              <div className="text-gray-300 mb-2">
                <span className="text-green-400">$</span> Open your terminal and run:
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">npx</span>
                  <span className="text-cyan-300">hello-sanyam</span>
                  <span className="text-white animate-blink">|</span>
                </div>
              </div>
              <div className="text-gray-400 text-xs mt-2 italic">
                # Get to know me through an interactive CLI experience
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fixed Left Side Panel */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <div className="flex flex-col gap-4 bg-gradient-to-b from-yellow-900/80 via-yellow-800/60 to-yellow-900/80 backdrop-blur-xl p-6 pl-8 shadow-[0_4px_20px_rgba(0,0,0,0.3)] border-4 border-yellow-500 hover:border-yellow-400 transition-all duration-300 rounded-l-2xl">
          <a 
            href="https://linkedin.com/in/sanyam-garg-133179250/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-500/30 to-blue-600/20 hover:from-blue-400/50 hover:to-blue-500/40 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_25px_rgba(59,130,246,0.4)]"
            title="LinkedIn"
          >
            <FaLinkedinIn className="text-blue-300 text-2xl" />
          </a>
          <a 
            href="https://github.com/SanyamGarg12" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-gray-500/30 to-gray-600/20 hover:from-gray-400/50 hover:to-gray-500/40 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_25px_rgba(107,114,128,0.4)]"
            title="GitHub"
          >
            <FaGithub className="text-gray-200 text-2xl" />
          </a>
          <a 
            href="#get-in-touch" 
            className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-green-500/30 to-green-600/20 hover:from-green-400/50 hover:to-green-500/40 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_25px_rgba(34,197,94,0.4)]"
            title="Contact"
          >
            <FaEnvelope className="text-green-300 text-2xl" />
          </a>
          <a 
            href={RESUME_URL} 
            download="Sanyam Resume.pdf" 
            className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-purple-500/30 to-purple-600/20 hover:from-purple-400/50 hover:to-purple-500/40 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_25px_rgba(168,85,247,0.4)]"
            title="Download Resume"
          >
            <FaDownload className="text-purple-300 text-2xl" />
          </a>
        </div>
      </div>
      
      {/* Blinking cursor animation and dots keyframes */}
      <style>{`
        .animate-blink { animation: blink 1s steps(2, start) infinite; }
        @keyframes blink { to { visibility: hidden; } }
        .dots-bg {
          background:
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 1.5px) 0 0 / 24px 24px,
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 1.5px) 12px 12px / 24px 24px,
            linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6));
          animation: dotsMove 30s linear infinite;
        }
        @keyframes dotsMove {
          0% { background-position: 0 0, 12px 12px, 0 0; }
          100% { background-position: 240px 240px, 252px 252px, 0 0; }
        }
      `}</style>
    </section>
  );
};

export default Home; 