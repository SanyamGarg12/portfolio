import React, { useRef, useState } from 'react';
import { FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const SERVICE_ID = 'service_xd3yji8';
const TEMPLATE_ID = 'template_iqd9xol';
const PUBLIC_KEY = 'K79mtYKSKJ6NwoScb';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  React.useEffect(() => {
    Aos.init({ duration: 800, offset: 120 });
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);

    if (!executeRecaptcha) {
      setStatus('reCAPTCHA not yet available');
      setLoading(false);
      return;
    }

    try {
      const token = await executeRecaptcha('contact_form');
      // Set the token in a hidden input
      if (form.current) {
        let tokenInput = form.current.querySelector('input[name="recaptcha_token"]');
        if (!tokenInput) {
          tokenInput = document.createElement('input');
          tokenInput.type = 'hidden';
          tokenInput.name = 'recaptcha_token';
          form.current.appendChild(tokenInput);
        }
        tokenInput.value = token;
      }

      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
        .then(
          (result) => {
            setStatus('Message sent successfully!');
            setLoading(false);
            form.current.reset();
          },
          (error) => {
            setStatus('Failed to send message. Please try again.');
            setLoading(false);
          }
        );
    } catch (err) {
      setStatus('reCAPTCHA failed. Please try again.');
      setLoading(false);
    }
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
        {/* Hidden input for reCAPTCHA token will be added dynamically */}
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
