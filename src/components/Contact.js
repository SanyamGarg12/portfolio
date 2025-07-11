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
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [op, setOp] = useState('+');
  const [userAnswer, setUserAnswer] = useState('');
  const [mathError, setMathError] = useState('');

  useEffect(() => {
    Aos.init({ duration: 800, offset: 120 });
    generateNewQuestion();
    // eslint-disable-next-line
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

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
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
      <p
        className="text-gray-400 text-lg mb-8 max-w-xl text-center"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Whether you have an opportunity, a question, or just want to say hi, my inbox is always open. I'll try my best to get back to you!
      </p>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="w-full max-w-lg bg-gray-900/80 border border-gray-800 rounded-xl shadow-lg p-8 mb-8 flex flex-col gap-6"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <input
          type="text"
          name="user_name"
          placeholder="Your Name"
          required
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition"
        />
        <input
          type="email"
          name="user_email"
          placeholder="Your Email"
          required
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition resize-none"
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
          className="w-full py-3 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
        {status && <div className={`text-center mt-2 ${status.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{status}</div>}
      </form>
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
