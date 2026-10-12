import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBook, FaSchool } from 'react-icons/fa';

const educationData = [
  {
    category: 'UNIVERSITY',
    period: '2024 - Present',
    degree: 'BS Software Engineering',
    institution: 'Comsats University Islamabad, Lahore Campus',
    icon: <FaGraduationCap className="text-xl text-[#00B4D8]" />,
    side: 'right', // on desktop
  },
  {
    category: 'COLLEGE',
    period: '2022 - 2024',
    degree: 'Intermediate',
    institution: 'Govt Associate College Kot Radha Kishan',
    icon: <FaBook className="text-lg text-[#00B4D8]" />,
    side: 'left', // on desktop
  },
  {
    category: 'SCHOOL',
    period: '2020 - 2022',
    degree: 'Matriculation',
    institution: 'The Educators, Kahnore Campus',
    icon: <FaSchool className="text-lg text-[#00B4D8]" />,
    side: 'right', // on desktop
  },
];

export default function Education() {
  return (
    <section id="education" className="w-full bg-[#000000] py-16 md:py-24 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#00B4D8] uppercase mb-2">
            ACADEMIC JOURNEY
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            My <span className="text-[#00B4D8]">Education</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#00B4D8] to-[#48CAE4] rounded-full mx-auto mt-4 shadow-[0_0_10px_rgba(0,180,216,0.5)]" />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Center Line (Desktop) / Left Line (Mobile) */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-6 md:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#00B4D8] via-[#00B4D8]/60 to-transparent shadow-[0_0_10px_rgba(0,180,216,0.3)]" />

          <div className="space-y-10 md:space-y-16">
            {educationData.map((item, index) => {
              const isRight = item.side === 'right';

              return (
                <div key={index} className="relative flex items-center">
                  {/* Timeline Glowing Node */}
                  <div className="absolute left-4 sm:left-6 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-[#00B4D8] bg-[#000000] shadow-[0_0_12px_#00B4D8] transition-transform duration-300 hover:scale-125" />
                  </div>

                  {/* Desktop Layout: Alternating Grid */}
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left Column */}
                    <div
                      className={`pl-12 sm:pl-16 md:pl-0 ${
                        isRight ? 'md:invisible md:pointer-events-none' : 'md:text-right'
                      }`}
                    >
                      {!isRight && (
                        <motion.div
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="group relative p-5 sm:p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#00B4D8]/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,180,216,0.15)] md:mr-8"
                        >
                          <div className="flex items-center gap-3.5 mb-3 md:justify-end">
                            <div className="p-2.5 rounded-xl bg-[#00B4D8]/15 border border-[#00B4D8]/30 flex items-center justify-center">
                              {item.icon}
                            </div>
                            <div className="text-left md:text-right">
                              <span className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">
                                {item.category}
                              </span>
                              <p className="text-xs text-white/50 font-medium">{item.period}</p>
                            </div>
                          </div>

                          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#00B4D8] transition-colors leading-snug">
                            {item.degree}
                          </h3>
                          <p className="text-sm text-white/70 mt-1.5 leading-relaxed">{item.institution}</p>
                        </motion.div>
                      )}

                      {/* On mobile, if this item is right on desktop, render it here on mobile */}
                      {isRight && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="md:hidden group relative p-5 sm:p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#00B4D8]/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,180,216,0.15)]"
                        >
                          <div className="flex items-center gap-3.5 mb-3">
                            <div className="p-2.5 rounded-xl bg-[#00B4D8]/15 border border-[#00B4D8]/30 flex items-center justify-center">
                              {item.icon}
                            </div>
                            <div>
                              <span className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">
                                {item.category}
                              </span>
                              <p className="text-xs text-white/50 font-medium">{item.period}</p>
                            </div>
                          </div>

                          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#00B4D8] transition-colors leading-snug">
                            {item.degree}
                          </h3>
                          <p className="text-sm text-white/70 mt-1.5 leading-relaxed">{item.institution}</p>
                        </motion.div>
                      )}
                    </div>

                    {/* Right Column (Desktop) */}
                    <div
                      className={`hidden md:block ${
                        !isRight ? 'invisible pointer-events-none' : 'text-left'
                      }`}
                    >
                      {isRight && (
                        <motion.div
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="group relative p-5 sm:p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#00B4D8]/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,180,216,0.15)] md:ml-8"
                        >
                          <div className="flex items-center gap-3.5 mb-3">
                            <div className="p-2.5 rounded-xl bg-[#00B4D8]/15 border border-[#00B4D8]/30 flex items-center justify-center">
                              {item.icon}
                            </div>
                            <div>
                              <span className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">
                                {item.category}
                              </span>
                              <p className="text-xs text-white/50 font-medium">{item.period}</p>
                            </div>
                          </div>

                          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#00B4D8] transition-colors leading-snug">
                            {item.degree}
                          </h3>
                          <p className="text-sm text-white/70 mt-1.5 leading-relaxed">{item.institution}</p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
