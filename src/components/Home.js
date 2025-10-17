import React, { useRef, useEffect } from 'react';
import Sanyam from '../assets/Sanyam.jpeg';
import { FaLinkedinIn, FaGithub, FaEnvelope, FaDownload } from 'react-icons/fa';

const codeLines = [
  'struct Developer {',
  '  std::string name = "Sanyam Garg";',
  '  std::string role = "Software Engineer";',
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
    <section id="home" className="w-full min-h-[80vh] flex flex-col md:flex-row items-center justify-center bg-black relative overflow-hidden py-12 border-b-[1px] border-b-gray-800">
      {/* Interactive particles background (full page) */}
      <canvas
        ref={canvasRef}
        className="z-0"
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', background: 'transparent' }}
      />
      {/* Left: Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center z-10 mb-8 md:mb-0">
        <div
          ref={tiltRef}
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
          className="rounded-2xl border-4 border-gray-800 bg-gray-900 shadow-2xl"
          style={{ transition: 'transform 150ms ease-out', willChange: 'transform' }}
        >
          <img
            className="w-56 h-56 md:w-80 md:h-80 rounded-xl object-cover"
            src={Sanyam}
            alt="Sanyam Garg"
          />
        </div>
      </div>
      {/* Right: Intro */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start z-10 px-4">
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
        <div className="w-full max-w-xl mb-6 p-5 rounded-2xl border border-gray-800/70 bg-black/55 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
          <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-5 text-center md:text-left">
            I build scalable web apps, craft ML solutions, and love solving real-world problems with code. Always learning, always building.
          </p>
          <div className="flex flex-col sm:flex-row items-center sm:justify-start gap-4">
            <a
              href="#get-in-touch"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-blue-500/90 hover:bg-blue-400 text-white font-mono shadow-lg transition"
            >
              <FaEnvelope /> Contact Me
            </a>
            <a
              href={RESUME_URL}
              download="Sanyam Resume.pdf"
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-green-400/80 text-green-300 hover:bg-green-400 hover:text-black font-mono transition shadow-lg"
            >
              <FaDownload /> Download Resume
            </a>
            <div className="flex items-center gap-4 ml-0 sm:ml-2">
              <a href="https://linkedin.com/in/sanyam-garg-133179250/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white text-2xl">
                <FaLinkedinIn />
              </a>
              <a href="https://github.com/SanyamGarg12" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white text-2xl">
                <FaGithub />
              </a>
            </div>
          </div>
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