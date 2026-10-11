import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub,
  FaInstagram,
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaComment,
  FaMapMarkerAlt,
  FaCog
} from 'react-icons/fa';
import { SiLinkedin } from 'react-icons/si';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';
import { useAdmin } from '../contexts/AdminContext';
import apiService from '../services/api';

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const { isAuthenticated } = useAdmin();

  // Handle contact form submission
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
      color: 'from-gray-600 to-gray-800',
      hoverColor: 'hover:shadow-gray-500/25'
    },
    {
      name: 'LinkedIn',
      icon: <SiLinkedin />,
      url: 'https://www.linkedin.com/in/muhammad-zeeshan-khalid-665b3a327/',
      color: 'from-blue-600 to-cyan-700',
      hoverColor: 'hover:shadow-blue-500/25'
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 pb-32 relative overflow-hidden min-h-screen">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-transparent"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 relative"
        >
          <h2 className="text-5xl md:text-6xl font-bold font-moderniz mb-4">
            <span className="dark:bg-gradient-to-r dark:from-cyan-400 dark:via-emerald-400 dark:to-cyan-600 dark:bg-clip-text dark:text-transparent text-cyan-600">
              GET IN
            </span>
            {' '}
            <span className="dark:text-white text-slate-800">TOUCH</span>
          </h2>
          <p className="text-xl dark:text-slate-400 text-slate-600 font-cascadia">
            Have an idea or opportunity? Let's connect and build something extraordinary!
          </p>

          {/* Admin Access Button */}
          <button
            onClick={() => {
              if (isAuthenticated) {
                setIsAdminOpen(true);
              } else {
                setIsLoginOpen(true);
              }
            }}
            className="absolute top-0 right-0 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm p-3 rounded-full border border-slate-600/50 hover:border-cyan-400/50 transition-all duration-300 group"
            title={isAuthenticated ? "Admin Panel" : "Admin Login"}
          >
            <FaCog className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-300 group-hover:rotate-90" />
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 hidden dark:block"></div>
              <div className="relative dark:bg-slate-900/80 bg-white backdrop-blur-xl rounded-3xl p-8 border dark:border-slate-700/50 border-slate-100 dark:shadow-none shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 dark:bg-gradient-to-r dark:from-cyan-600 dark:to-emerald-600 bg-cyan-600 rounded-full">
                    <FaPaperPlane className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold dark:text-white text-slate-900">Send a Message</h3>
                    <p className="dark:text-slate-400 text-slate-600">I'll get back to you as soon as possible</p>
                  </div>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold dark:text-slate-300 text-slate-700 mb-2 flex items-center gap-2">
                      <FaUser className="text-cyan-400" />
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-3.5 dark:bg-slate-800/50 bg-slate-50 border dark:border-slate-600/50 border-slate-200 rounded-xl dark:text-white text-slate-900 dark:placeholder-slate-400 placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold dark:text-slate-300 text-slate-700 mb-2 flex items-center gap-2">
                      <FaEnvelope className="text-cyan-400" />
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-4 py-3.5 dark:bg-slate-800/50 bg-slate-50 border dark:border-slate-600/50 border-slate-200 rounded-xl dark:text-white text-slate-900 dark:placeholder-slate-400 placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold dark:text-slate-300 text-slate-700 mb-2 flex items-center gap-2">
                      <FaComment className="text-cyan-400" />
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Project Inquiry / Job Opportunity"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-4 py-3.5 dark:bg-slate-800/50 bg-slate-50 border dark:border-slate-600/50 border-slate-200 rounded-xl dark:text-white text-slate-900 dark:placeholder-slate-400 placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold dark:text-slate-300 text-slate-700 mb-2 flex items-center gap-2">
                      <FaPaperPlane className="text-cyan-400" />
                      Message
                    </label>
                    <textarea
                      placeholder="Write your message here..."
                      rows="4"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-3.5 dark:bg-slate-800/50 bg-slate-50 border dark:border-slate-600/50 border-slate-200 rounded-xl dark:text-white text-slate-900 dark:placeholder-slate-400 placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                      required
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmittingContact}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full dark:bg-gradient-to-r dark:from-cyan-600 dark:to-emerald-600 dark:hover:from-cyan-500 dark:hover:to-emerald-500 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50"
                  >
                    {isSubmittingContact ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <FaPaperPlane />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Direct Contact Info & Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 flex flex-col justify-between"
          >
            <div className="dark:bg-slate-900/80 bg-white backdrop-blur-xl rounded-3xl p-8 border dark:border-slate-700/50 border-slate-100 shadow-xl space-y-6">
              <h3 className="text-2xl font-bold dark:text-white text-slate-900">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl dark:bg-slate-800/50 bg-slate-50">
                  <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs dark:text-slate-400 text-slate-500 font-semibold uppercase">Email</p>
                    <a href="mailto:zeeshan@comsats.edu.pk" className="dark:text-white text-slate-800 font-medium hover:text-cyan-400 transition-colors">
                      zeeshan@comsats.edu.pk
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl dark:bg-slate-800/50 bg-slate-50">
                  <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs dark:text-slate-400 text-slate-500 font-semibold uppercase">Location</p>
                    <p className="dark:text-white text-slate-800 font-medium">COMSATS University, Lahore, Pakistan</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold dark:text-white text-slate-900 mb-4">Connect with me</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 p-4 bg-gradient-to-r ${social.color} rounded-2xl text-white transition-all duration-300 ${social.hoverColor} hover:shadow-xl hover:-translate-y-1`}
                    >
                      <div className="text-2xl">{social.icon}</div>
                      <span className="font-semibold">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Admin Dashboard & Login Modals */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminDashboard
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
          />
        )}
        {isLoginOpen && (
          <AdminLogin
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onSuccess={() => {
              setIsLoginOpen(false);
              setIsAdminOpen(true);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;