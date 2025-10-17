import React, { useRef, useState, useEffect } from 'react';
import { FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import Aos from 'aos';
import 'aos/dist/aos.css';

const SERVICE_ID = 'service_xd3yji8';
const TEMPLATE_ID = 'template_iqd9xol';
const PUBLIC_KEY = 'K79mtYKSKJ6NwoScb';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomOperator() {
  const ops = ['+', '-', '*'];
  return ops[getRandomInt(0, ops.length - 1)];
}

function computeAnswer(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    default: return 0;
  }
}

const Contact = () => {
  const form = useRef();
  const globeCanvasRef = useRef(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [op, setOp] = useState('+');
  const [userAnswer, setUserAnswer] = useState('');
  const [mathError, setMathError] = useState('');
  const RESUME_URL = 'https://drive.google.com/uc?export=download&id=1QOaozCfTkswcTskq7281NsWMTXmIKnTH';

  useEffect(() => {
    Aos.init({ duration: 800, offset: 120 });
    generateNewQuestion();
    // eslint-disable-next-line
  }, []);

  // Interactive draggable globe (canvas-based, lightweight)
  useEffect(() => {
    const canvas = globeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0, height = 0, radius = 0;
    let running = true;
    let rotY = 0; // yaw
    let rotX = 0; // pitch
    let velY = 0.003; // idle spin
    let velX = 0;
    let dragging = false; let lastX = 0; let lastY = 0;

    function resize() {
      const size = Math.min(380, Math.floor((canvas.parentElement?.clientWidth || 360)));
      width = size; height = size;
      canvas.width = Math.floor(size * DPR);
      canvas.height = Math.floor(size * DPR);
      canvas.style.width = size + 'px';
      canvas.style.height = size + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      radius = size * 0.45;
    }

    // Predefine SDE hubs (lat/lon in degrees)
    const hubsDeg = [
      { name:'SF', lat: 37.7749, lon: -122.4194 },
      { name:'NYC', lat: 40.7128, lon: -74.0060 },
      { name:'LDN', lat: 51.5074, lon: -0.1278 },
      { name:'BLR', lat: 12.9716, lon: 77.5946 },
      { name:'SIN', lat: 1.3521, lon: 103.8198 },
      { name:'TKY', lat: 35.6762, lon: 139.6503 },
      { name:'SYD', lat: -33.8688, lon: 151.2093 },
      { name:'BER', lat: 52.5200, lon: 13.4050 },
      { name:'DXB', lat: 25.2048, lon: 55.2708 },
    ];
    const hubs = hubsDeg.map(h => ({ ...h, lat:(h.lat*Math.PI)/180, lon:(h.lon*Math.PI)/180 }));

    function project(lat, lon) {
      // rotate around X then Y
      const cl = Math.cos(lat); const sl = Math.sin(lat);
      const co = Math.cos(lon + rotY); const so = Math.sin(lon + rotY);
      // base sphere coords
      let x = cl * co;
      let y = sl;
      let z = cl * so;
      // pitch rotation (around X)
      const cx = Math.cos(rotX), sx = Math.sin(rotX);
      const y2 = y * cx - z * sx;
      const z2 = y * sx + z * cx;
      const scale = radius * 0.9;
      const perspective = 0.9 + 0.1 * (z2 + 1); // slight perspective
      return { x: width / 2 + x * scale * perspective, y: height / 2 + y2 * scale * perspective, z: z2 };
    }

    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      // sphere body (opaque)
      ctx.fillStyle = '#0a1d5a';
      ctx.beginPath(); ctx.arc(width/2, height/2, radius, 0, Math.PI*2); ctx.fill();
      // soft vignette on top-left
      const core = ctx.createRadialGradient(width/2 - radius*0.35, height/2 - radius*0.35, radius*0.1, width/2, height/2, radius);
      core.addColorStop(0, 'rgba(59,130,246,0.15)');
      core.addColorStop(1, 'rgba(59,130,246,0)');
      ctx.fillStyle = core; ctx.beginPath(); ctx.arc(width/2, height/2, radius, 0, Math.PI*2); ctx.fill();

      // rim highlight
      ctx.strokeStyle = 'rgba(99,102,241,0.25)';
      ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(width/2, height/2, radius, 0, Math.PI*2); ctx.stroke();

      // flowing dotted bands that rotate with the globe (clean look)
      for (let lon = 0; lon < Math.PI*2; lon += Math.PI/36) {
        for (let lat = -Math.PI/2; lat <= Math.PI/2; lat += Math.PI/36) {
          const wave = Math.sin(3*lon + rotY*2) * Math.cos(2*lat + rotX*1.5);
          if (wave > 0.3) {
            const p = project(lat, lon);
            if (p.z < 0) continue;
            const rdot = 0.7 + 0.8*p.z;
            ctx.fillStyle = `rgba(147,197,253,${0.15 + 0.25*p.z})`;
            ctx.beginPath(); ctx.arc(p.x, p.y, rdot, 0, Math.PI*2); ctx.fill();
          }
        }
      }

      // thin latitude rings for depth
      ctx.strokeStyle = 'rgba(147,197,253,0.12)';
      for (let latg = -Math.PI/3; latg <= Math.PI/3; latg += Math.PI/6) {
        ctx.beginPath();
        for (let t = 0; t <= Math.PI*2+0.01; t += Math.PI/60) {
          const p = project(latg, t);
          if (p.z < -0.2) continue;
          if (t === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // Large SG letters in yellow - fixed overlay (does not rotate)
      ctx.save();
      ctx.fillStyle = '#facc15';
      ctx.shadowColor = 'rgba(250,204,21,0.35)'; ctx.shadowBlur = 18;
      ctx.font = `bold ${Math.floor(radius*0.9)}px Poppins, sans-serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('S', width/2 - radius*0.45, height/2);
      ctx.fillText('G', width/2 + radius*0.45, height/2);
      ctx.restore();

      // idle spin and inertia
      rotY += velY;
      rotX += velX;
      velY *= 0.99; velX *= 0.99;
      animation = requestAnimationFrame(draw);
    }

    function onDown(e) { dragging = true; lastX = e.clientX || e.touches?.[0]?.clientX || 0; lastY = e.clientY || e.touches?.[0]?.clientY || 0; canvas.style.cursor='grabbing'; }
    function onMove(e) {
      if (!dragging) return;
      const x = e.clientX || e.touches?.[0]?.clientX || 0; const y = e.clientY || e.touches?.[0]?.clientY || 0;
      const dx = x - lastX; const dy = y - lastY;
      lastX = x; lastY = y;
      velY = dx * 0.0025;
      velX = dy * 0.0025;
      rotY += velY; rotX += velX;
    }
    function onUp() { dragging = false; canvas.style.cursor='grab'; }

    let animation = 0;
    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousedown', onDown); canvas.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp);
    canvas.addEventListener('touchstart', onDown, { passive: true }); canvas.addEventListener('touchmove', onMove, { passive: true }); window.addEventListener('touchend', onUp);
    draw();

    return () => {
      running = false; cancelAnimationFrame(animation);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousedown', onDown); canvas.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('touchstart', onDown); canvas.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onUp);
    };
  }, []);

  const generateNewQuestion = () => {
    const num1 = getRandomInt(1, 20);
    const num2 = getRandomInt(1, 20);
    const operator = getRandomOperator();
    setA(num1);
    setB(num2);
    setOp(operator);
    setUserAnswer('');
    setMathError('');
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);
    setMathError('');

    const correct = computeAnswer(a, b, op);
    if (parseInt(userAnswer, 10) !== correct) {
      setMathError('Incorrect answer. Please try again.');
      setLoading(false);
      generateNewQuestion();
      return;
    }

    // Ensure additional fields reach EmailJS template
    const ensureHiddenField = (name, value) => {
      if (!form.current) return;
      let input = form.current.querySelector(`input[name="${name}"]`);
      if (!input) {
        input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        form.current.appendChild(input);
      }
      input.value = value ?? '';
    };
    try {
      const nameInput = form.current.querySelector('input[name="user_name"]');
      const emailInput = form.current.querySelector('input[name="user_email"]');
      const msgInput = form.current.querySelector('textarea[name="user_message"]');
      const nameVal = nameInput?.value || '';
      const emailVal = emailInput?.value || '';
      const originalMessage = msgInput?.value || '';
      const subject = `New portfolio contact from ${nameVal || 'Visitor'}`;
      ensureHiddenField('subject', subject);
      // many email services use reply_to to set the reply address
      ensureHiddenField('reply_to', emailVal);
      ensureHiddenField('page_url', window.location.href);
      // include math captcha for reference
      ensureHiddenField('captcha_question', `${a} ${op} ${b}`);
      ensureHiddenField('captcha_answer', String(correct));
      // Provide a rich, formatted block so emails always contain all fields
      const composed = `New contact on portfolio\n\nName: ${nameVal}\nEmail: ${emailVal}\nPage: ${window.location.href}\n\nMessage:\n${originalMessage}\n\nCaptcha: ${a} ${op} ${b} = ${correct}`;
      ensureHiddenField('message', originalMessage);
      ensureHiddenField('original_message', originalMessage);
      ensureHiddenField('formatted_message', composed);
    } catch (_) {
      // ignore mapping errors gracefully
    }

    // Construct explicit params as fallback for templates that don't map hidden fields
    const nameValP = form.current?.querySelector('input[name="user_name"]')?.value || '';
    const emailValP = form.current?.querySelector('input[name="user_email"]')?.value || '';
    const userMsgValP = form.current?.querySelector('textarea[name="user_message"]')?.value || '';
    const composedP = `New contact on portfolio\n\nName: ${nameValP}\nEmail: ${emailValP}\nPage: ${window.location.href}\n\nMessage:\n${userMsgValP}\n\nCaptcha: ${a} ${op} ${b} = ${correct}`;

    const params = {
      user_name: nameValP,
      user_email: emailValP,
      user_message: userMsgValP,
      message: composedP, // ensure most templates show full information
      subject: `Contact Us - ${nameValP || 'Visitor'}`,
      reply_to: emailValP,
      page_url: window.location.href,
      captcha_question: `${a} ${op} ${b}`,
      captcha_answer: String(correct),
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY)
      .then(
        (result) => {
          setStatus('Message sent successfully!');
          setLoading(false);
          form.current.reset();
          generateNewQuestion();
        },
        (error) => {
          setStatus('Failed to send message. Please try again.');
          setLoading(false);
        }
      );
  };

  return (
    <section id="get-in-touch" className="w-full py-24 flex flex-col items-center justify-center bg-black border-t-[1px] border-t-gray-800">
      <h2
        className="text-4xl md:text-5xl font-extrabold text-white mb-4 text-center"
        data-aos="fade-up"
        data-aos-delay="0"
      >
        Get in Touch
      </h2>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="flex items-center justify-center md:justify-end" data-aos="fade-up" data-aos-delay="80">
          <div className="relative" style={{ width: '100%', maxWidth: 420 }}>
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(closest-side, rgba(59,130,246,0.18), rgba(59,130,246,0))',
              filter: 'blur(10px)'
            }} />
            <canvas
              ref={globeCanvasRef}
              className="relative"
              style={{ cursor: 'grab', borderRadius: '9999px', background: 'transparent', filter: 'drop-shadow(0 14px 40px rgba(0,0,0,0.45))' }}
            />
            <div className="mt-6 flex justify-center">
              <a
                href={RESUME_URL}
                download="Sanyam Resume.pdf"
                aria-label="Download Resume"
                className="resume-cta relative w-full max-w-lg overflow-hidden rounded-3xl text-white shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
              >
                <span className="absolute inset-[-2px] rounded-3xl bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 opacity-80" />
                <span className="relative block rounded-3xl bg-black/65 px-9 py-6 backdrop-blur-md">
                  <span className="flex items-center justify-center gap-4">
                    <span className="relative inline-flex h-12 w-12 items-center justify-center">
                      <span className="absolute inset-0 rounded-full bg-sky-400/30 blur-md animate-pulse" />
                      <span className="relative text-3xl">↓</span>
                    </span>
                    <span className="text-2xl md:text-3xl font-extrabold tracking-wide">Download Resume</span>
                  </span>
                  <span className="block pt-2 text-center text-sm text-sky-300/90">One click • PDF • Updated</span>
                </span>
                <span className="resume-shine" />
                <span className="resume-orb resume-orb-1" />
                <span className="resume-orb resume-orb-2" />
              </a>
            </div>
          </div>
        </div>
        <div className="md:pl-4" data-aos="fade-up" data-aos-delay="120">
          <p
            className="text-gray-400 text-lg mb-8 max-w-xl text-center md:text-left"
        data-aos="fade-up"
        data-aos-delay="100"
      >
            Whether you have an opportunity, a question, or just want to say hi, my inbox is always open. Drag the globe to roll it while you type!
      </p>
          
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-blue-500/30 via-indigo-500/20 to-emerald-400/30 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
      <form
        ref={form}
        onSubmit={sendEmail}
          className="w-full max-w-lg rounded-2xl bg-gray-900/80 border border-gray-800 p-8 flex flex-col gap-6 backdrop-blur-md"
      >
          <label className="text-sm text-gray-400">Your Name</label>
        <input
          type="text"
          name="user_name"
            placeholder="Sanyam Garg"
          required
            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-transparent transition"
        />
          <label className="text-sm text-gray-400">Your Email</label>
        <input
          type="email"
          name="user_email"
            placeholder="sanyam22448@iiitd.ac.in"
          required
            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-transparent transition"
        />
          <label className="text-sm text-gray-400">Your Message</label>
        <textarea
            name="user_message"
            placeholder="Say hello..."
          required
          rows={5}
            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-transparent transition resize-none"
          />
        {/* Math CAPTCHA */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-mono">Solve: {a} {op} {b} = ?</label>
          <input
            type="number"
            value={userAnswer}
            onChange={e => setUserAnswer(e.target.value)}
            className="w-32 px-3 py-2 rounded bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition"
            required
          />
          {mathError && <span className="text-red-400 text-sm">{mathError}</span>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="relative w-full py-3 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 transition disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
        >
          <span className={loading ? 'opacity-0' : 'opacity-100'}>Send</span>
          {loading && (
            <span className="absolute inset-0 flex items-center justify-center gap-2">
              <span className="w-4 h-4 rounded-full bg-white/90 animate-bounce [animation-delay:-0.2s]"></span>
              <span className="w-4 h-4 rounded-full bg-white/80 animate-bounce"></span>
              <span className="w-4 h-4 rounded-full bg-white/70 animate-bounce [animation-delay:0.2s]"></span>
            </span>
          )}
        </button>
        {status && (
          <div className={`text-center mt-2 ${status.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
            {status}
          </div>
        )}
      </form>
      </div>
        </div>
      </div>
      <style>{`.resume-cta{transition:transform .25s ease, box-shadow .25s ease}.resume-cta:hover{transform:translateY(-4px); box-shadow:0 28px 80px rgba(56,189,248,.28)}.resume-cta .resume-shine{position:absolute; top:0; left:-120%; width:45%; height:100%; background:linear-gradient(120deg, transparent, rgba(255,255,255,.4), transparent); transform:skewX(-20deg); transition:left .7s ease}.resume-cta:hover .resume-shine{left:130%}.resume-orb{position:absolute; width:120px; height:120px; border-radius:9999px; filter:blur(32px); opacity:.35; pointer-events:none}.resume-orb-1{top:-20px; right:-20px; background:#38bdf8}.resume-orb-2{bottom:-20px; left:-20px; background:#a78bfa}`}</style>
      <a
        href="mailto:sanyam22448@iiitd.ac.in"
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-800 text-white border border-blue-400 hover:bg-blue-400 hover:text-black font-mono transition mb-6"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <FaEnvelope /> sanyam22448@iiitd.ac.in
      </a>
      <div className="flex gap-6 mt-2" data-aos="fade-up" data-aos-delay="400">
        <a href="https://linkedin.com/in/sanyam-garg-133179250/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white text-3xl">
          <FaLinkedinIn />
        </a>
        <a href="https://github.com/SanyamGarg12" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white text-3xl">
          <FaGithub />
        </a>
      </div>
    </section>
  );
};

export default Contact;
