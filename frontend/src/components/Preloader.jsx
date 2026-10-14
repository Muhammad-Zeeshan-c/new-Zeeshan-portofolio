import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

const Preloader = ({ onFinished }) => {
  const [typedIndex, setTypedIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const fullText = "zeeshanportfolio-website.vercel.app/";

  // Smooth, uninterrupted typewriter cadence
  useEffect(() => {
    const interval = setInterval(() => {
      setTypedIndex((prev) => {
        if (prev < fullText.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 75);

    return () => clearInterval(interval);
  }, [fullText.length]);

  // Once typing completes 100%, pause 1 second for reading, then smoothly fade out
  useEffect(() => {
    if (typedIndex === fullText.length) {
      const exitTimer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(onFinished, 600);
      }, 1000);
      return () => clearTimeout(exitTimer);
    }
  }, [typedIndex, fullText.length, onFinished]);

  const typedText = fullText.slice(0, typedIndex);

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          exit={{
            opacity: 0,
            scale: 0.98,
            filter: 'blur(8px)',
            transition: { duration: 0.6, ease: 'easeInOut' }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center text-white bg-[#000000] overflow-hidden select-none"
        >
          <div className="text-center relative z-10 p-6 flex flex-col items-center justify-center max-w-lg w-full">
            {/* Glowing Accent Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.03] border border-[#00B4D8]/30 shadow-[0_0_30px_rgba(0,180,216,0.15)]"
            >
              <span className="text-2xl font-bold text-[#00B4D8] font-mono">Z</span>
            </motion.div>

            {/* Name Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
            >
              Muhammad <span className="text-[#00B4D8]">Zeeshan</span>
            </motion.h1>

            {/* Typewriter URL */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 mb-8 font-mono flex items-center justify-center h-8"
            >
              <span>{typedText}</span>
              <span className="animate-blink text-[#00B4D8] font-bold ml-0.5">|</span>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center gap-6"
            >
              <a
                href="https://github.com/Muhammad-Zeeshan-c/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#00B4D8] transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-white/5"
                title="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-zeeshan-khalid-665b3a327/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#00B4D8] transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-white/5"
                title="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </motion.div>
          </div>

          {/* Ambient Background Glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00B4D8]/10 rounded-full blur-[140px]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;