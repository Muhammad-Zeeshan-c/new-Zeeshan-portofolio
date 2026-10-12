import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaComment,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import apiService from '../services/api';

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingContact(true);

    try {
      const res = await apiService.sendContactMessage(contactForm);

      if (res.success) {
        alert('Message sent successfully! Thank you for reaching out. 📧');
        setContactForm({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(res.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert(`Failed to send message: ${error.message}`);
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/Muhammad-Zeeshan-c/',
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://www.linkedin.com/in/muhammad-zeeshan-khalid-665b3a327/',
    }
  ];

  return (
    <div id="contact-wrapper" className="w-full relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-[#00B4D8]">GET IN</span>{' '}
            <span className="text-white">TOUCH</span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
            Have an idea or opportunity? Let's connect and build something extraordinary!
          </p>
        </motion.div>

        {/* Contact Form and Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>

            <form onSubmit={handleContactSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-white/70 mb-2 flex items-center gap-2">
                  <FaUser className="text-[#00B4D8]" />
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-3.5 bg-black/60 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/70 mb-2 flex items-center gap-2">
                  <FaEnvelope className="text-[#00B4D8]" />
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-3.5 bg-black/60 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/70 mb-2 flex items-center gap-2">
                  <FaComment className="text-[#00B4D8]" />
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Project Inquiry / Job Opportunity"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="w-full px-4 py-3.5 bg-black/60 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/70 mb-2 flex items-center gap-2">
                  <FaPaperPlane className="text-[#00B4D8]" />
                  Message
                </label>
                <textarea
                  placeholder="Write your message here..."
                  rows="4"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-4 py-3.5 bg-black/60 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8] transition-colors resize-none"
                  required
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmittingContact}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#00B4D8] hover:bg-[#0090ad] text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-[#00B4D8]/20 disabled:opacity-50"
              >
                {isSubmittingContact ? (
                  <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FaPaperPlane />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Right Side - Direct Contact Info & Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8 flex flex-col justify-between"
          >
            <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-white/10 space-y-6">
              <h3 className="text-2xl font-bold text-white">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="p-3 bg-[#00B4D8]/10 text-[#00B4D8] rounded-xl border border-[#00B4D8]/20">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">Email</p>
                    <a href="mailto:zeeshan@comsats.edu.pk" className="text-white font-medium hover:text-[#00B4D8] transition-colors">
                      zeeshan@comsats.edu.pk
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="p-3 bg-[#00B4D8]/10 text-[#00B4D8] rounded-xl border border-[#00B4D8]/20">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">Location</p>
                    <p className="text-white font-medium">COMSATS University, Lahore, Pakistan</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-white/50 mb-4 font-semibold uppercase tracking-wider">Connect on Socials</p>
                <div className="flex gap-4">
                  {socialLinks.map((s, i) => (
                    <a
                      key={i}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-[#00B4D8] hover:border-[#00B4D8]/40 hover:bg-[#00B4D8]/10 transition-all duration-300"
                    >
                      <span className="text-lg">{s.icon}</span>
                      <span className="text-sm font-semibold">{s.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;