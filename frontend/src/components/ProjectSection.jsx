// src/components/ProjectSection.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExternalLinkAlt, FaReact, FaNodeJs, FaHtml5, FaCss3Alt,
  FaJsSquare, FaTools, FaFigma, FaGithub, FaTimes, FaDownload
} from 'react-icons/fa';
import {
  SiTailwindcss, SiNextdotjs, SiVercel, SiMongodb,
  SiExpress, SiPostgresql
} from 'react-icons/si';
import { PiCodeBold } from "react-icons/pi";
import { LuBadge } from "react-icons/lu";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { useNavbar } from '../contexts/NavbarContext';
import apiService from '../services/api';

const userCertificates = [];

const techStack = {
  frontend: [
    { name: "React", icon: <FaReact className="text-[#61DAFB]" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
    { name: "JavaScript", icon: <FaJsSquare className="text-[#F7DF1E]" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#38B2AC]" /> },
    { name: "HTML5", icon: <FaHtml5 className="text-[#E34F26]" /> },
    { name: "CSS3", icon: <FaCss3Alt className="text-[#1572B6]" /> },
  ],
  backend: [
    { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
    { name: "Express", icon: <SiExpress className="text-white" /> },
  ],
  database: [
    { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-[#336791]" /> },
  ],
  tools: [
    { name: "Git & GitHub", icon: <FaGithub className="text-white" /> },
    { name: "Vercel", icon: <SiVercel className="text-white" /> },
    { name: "Figma", icon: <FaFigma className="text-[#F24E1E]" /> },
    { name: "Other Tools", icon: <FaTools className="text-gray-400" /> },
  ],
};

// ===================================
// KOMPONEN KARTU SERTIFIKAT
// ===================================
const CertificateCard = ({ cert, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative cursor-pointer"
      whileHover={{ y: -6 }}
      onClick={() => onClick(cert)}
    >
      <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:border-[#00B4D8]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,180,216,0.2)]">
        <div className="absolute inset-0">
          <img src={cert.image} alt={cert.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 group-hover:from-black/90 transition-all duration-300"></div>
        </div>
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div className="flex-1 flex items-start justify-between">
            <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              <span className="text-xs font-semibold text-[#00B4D8] uppercase tracking-wider">{cert.issuer}</span>
            </div>
            <div className="bg-[#00B4D8]/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#00B4D8]/30">
              <span className="text-xs font-bold text-[#00B4D8]">{cert.date}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white line-clamp-2 leading-tight">{cert.title}</h3>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-white/70">
                <FaDownload className="text-sm" />
                <span className="text-sm font-medium">View Certificate</span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-[#00B4D8]/20 backdrop-blur-md p-2 rounded-full border border-[#00B4D8]/30">
                  <FaExternalLinkAlt className="text-[#00B4D8] text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ===================================
// KOMPONEN PREVIEW MODAL PROYEK
// ===================================
const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  const techIcons = {
    "Next.js": <SiNextdotjs />, "React": <FaReact />, "TailwindCSS": <SiTailwindcss />,
    "Framer Motion": "✦", "Node.js": <FaNodeJs />, "Express": <SiExpress />,
    "MongoDB": <SiMongodb />, "JWT": "🔑", "Figma": <FaFigma />, "Storybook": "📚",
    "JavaScript": <FaJsSquare />, "HTML5": <FaHtml5 />, "CSS3": <FaCss3Alt />,
    "PostgreSQL": <SiPostgresql />, "Vercel": <SiVercel />, "Git & GitHub": <FaGithub />
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-w-4xl w-full bg-[#0a0a0a] backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-white/10 backdrop-blur-md p-2.5 rounded-full border border-white/10 transition-colors text-white/70 hover:text-white"
        >
          <FaTimes />
        </button>

        <div className="overflow-y-auto w-full">
          {project.image && (
            <div className="w-full h-64 sm:h-80 relative overflow-hidden bg-black">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
            </div>
          )}

          <div className="p-6 sm:p-10 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-[#00B4D8]/10 border border-[#00B4D8]/30 text-[#00B4D8] text-xs font-semibold tracking-wider uppercase">
                  {project.category || "Project"}
                </span>
                {project.featured && (
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                    ⭐ Featured
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">{project.title}</h2>
            </div>

            <p className="text-white/80 leading-relaxed text-base sm:text-lg">
              {project.description}
            </p>

            {project.tech && project.tech.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/90 text-sm"
                    >
                      {techIcons[t] || null}
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#00B4D8] hover:bg-[#0090ad] text-black font-bold rounded-xl transition-all duration-300 shadow-lg shadow-[#00B4D8]/20"
                >
                  <FaExternalLinkAlt />
                  <span>Live Demo</span>
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all duration-300"
                >
                  <FaGithub className="text-xl" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({ project, onClick }) => {
  const techIcons = {
    "Next.js": <SiNextdotjs />, "React": <FaReact />, "TailwindCSS": <SiTailwindcss />,
    "Framer Motion": "✦", "Node.js": <FaNodeJs />, "Express": <SiExpress />,
    "MongoDB": <SiMongodb />, "JWT": "🔑", "Figma": <FaFigma />, "Storybook": "📚"
  };

  const techList = project.tech || project.tags || [];

  return (
    <div
      onClick={() => onClick(project)}
      className="group relative h-80 sm:h-96 rounded-2xl overflow-hidden transition-all duration-300 border border-white/10 hover:border-[#00B4D8]/50 hover:shadow-[0_0_20px_rgba(0,180,216,0.2)] hover:-translate-y-1.5 cursor-pointer bg-white/[0.03]"
      style={{ background: project.image ? `url('${project.image}') center/contain no-repeat` : undefined }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40 group-hover:from-black/95 transition-colors duration-300"></div>

      <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00B4D8] transition-colors">{project.title}</h3>
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FaExternalLinkAlt className="text-white text-xs" />
            </div>
          </div>
          <p className="text-white/70 mt-2 text-sm line-clamp-3 leading-relaxed">{project.description}</p>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {techList.slice(0, 3).map((t, i) => (
              <span key={i} className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#00B4D8]/10 text-[#00B4D8] border border-[#00B4D8]/20 backdrop-blur-sm">
                {techIcons?.[t] || null}
                <span>{t}</span>
              </span>
            ))}
            {techList.length > 3 && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white/70 border border-white/10">
                +{techList.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ===================================
// KOMPONEN PREVIEW MODAL SERTIFIKAT
// ===================================
const CertificatePreviewModal = ({ certificate, onClose }) => {
  if (!certificate) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-w-4xl w-full bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4 z-20">
          <button onClick={onClose} className="bg-black/60 hover:bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/10 transition-colors group">
            <FaTimes className="text-white/70 group-hover:text-white" />
          </button>
        </div>

        <div className="w-full md:w-3/5 relative min-h-[300px] md:min-h-[500px] bg-black">
          <img src={certificate.image} alt={certificate.title} className="absolute inset-0 w-full h-full object-contain p-4" />
        </div>

        <div className="w-full md:w-2/5 p-8 flex flex-col justify-center bg-[#0a0a0a]">
          <div className="mb-6">
            <div className="inline-block px-3 py-1 rounded-full bg-[#00B4D8]/10 border border-[#00B4D8]/30 text-[#00B4D8] text-xs font-bold tracking-wider mb-4 uppercase">
              {certificate.issuer}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 leading-tight">{certificate.title}</h2>
            <p className="text-white/50 font-mono text-sm">{certificate.date}</p>
          </div>

          <div className="space-y-4 mt-auto">
            <a
              href={certificate.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-[#00B4D8] hover:bg-[#0090ad] text-black font-bold rounded-xl transition-all duration-300 shadow-lg shadow-[#00B4D8]/20"
            >
              <FaDownload />
              <span>Download / View PDF</span>
            </a>

            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 text-white/80 font-semibold rounded-xl border border-white/10 transition-colors"
            >
              Close Preview
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ===================================
// KOMPONEN UTAMA SECTION PROJECT
// ===================================
function ProjectSection() {
  const [activeTab, setActiveTab] = useState('Projects');
  const [previewCertificate, setPreviewCertificate] = useState(null);
  const [previewProject, setPreviewProject] = useState(null);
  const { hideNavbar, showNavbar } = useNavbar();

  const [projectsFromDB, setProjectsFromDB] = useState([]);
  const [certificatesFromDB, setCertificatesFromDB] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingCerts, setLoadingCerts] = useState(true);

  const INITIAL_CERTIFICATES_TO_SHOW = 6;
  const [visibleCertificatesCount, setVisibleCertificatesCount] = useState(INITIAL_CERTIFICATES_TO_SHOW);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoadingProjects(true);
        const data = await apiService.getProjects();
        if (Array.isArray(data)) {
          setProjectsFromDB(data);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoadingProjects(false);
      }
    }
    loadProjects();
  }, []);

  useEffect(() => {
    async function loadCertificates() {
      try {
        setLoadingCerts(true);
        const data = await apiService.getCertificates();
        if (Array.isArray(data)) {
          setCertificatesFromDB(data);
        }
      } catch (err) {
        console.error('Error fetching certificates:', err);
      } finally {
        setLoadingCerts(false);
      }
    }
    loadCertificates();
  }, []);

  useEffect(() => {
    if (previewCertificate || previewProject) {
      hideNavbar();
    } else {
      showNavbar();
    }
    return () => showNavbar();
  }, [previewCertificate, previewProject, hideNavbar, showNavbar]);

  const tabs = [
    { id: 'Projects', label: 'Projects', icon: <PiCodeBold className="text-2xl" /> },
    { id: 'Certificate', label: 'Certifications', icon: <LuBadge className="text-2xl" /> },
    { id: 'Tech Stack', label: 'Tech Stack', icon: <LiaLayerGroupSolid className="text-2xl" /> },
  ];

  const transformedProjects = projectsFromDB.map(p => {
    let techArray = [];
    if (Array.isArray(p.tech_stack)) {
      techArray = p.tech_stack;
    } else if (typeof p.tech_stack === 'string') {
      try {
        techArray = JSON.parse(p.tech_stack);
      } catch {
        techArray = p.tech_stack.split(',').map(s => s.trim());
      }
    }
    return {
      id: p.id,
      title: p.title || 'Untitled Project',
      description: p.description || '',
      image: p.image_url || '',
      link: p.live_url || p.demo_url || '',
      github_url: p.github_url || '',
      tech: techArray,
      category: p.category || 'Web App',
      featured: p.featured || false
    };
  });

  const activeCertificates = certificatesFromDB.length > 0 ? certificatesFromDB : userCertificates;

  const handleShowMore = () => {
    setVisibleCertificatesCount(activeCertificates.length);
  };

  const handleShowLess = () => {
    setVisibleCertificatesCount(INITIAL_CERTIFICATES_TO_SHOW);
  };

  return (
    <div id="project" className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          <span className="text-[#00B4D8]">PORTFOLIO</span>{' '}
          <span className="text-white">SHOWCASE</span>
        </h2>
      </motion.div>

      <div className="w-full">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <motion.div
            layout
            className="inline-flex w-full max-w-2xl rounded-2xl p-1.5 border border-white/10 bg-white/[0.03] backdrop-blur-md"
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-1 flex-col items-center justify-center px-2 py-4 rounded-xl font-semibold text-sm sm:text-base transition-colors duration-300 outline-none ${activeTab === tab.id ? "text-white" : "text-white/50 hover:text-[#00B4D8]"
                  }`}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute inset-0 bg-[#00B4D8]/20 border border-[#00B4D8]/40 rounded-xl"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 flex flex-col items-center gap-1.5">
                  {tab.icon}
                  <span className="font-bold">{tab.label}</span>
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Tab Content Box */}
        <div className="rounded-3xl p-4 sm:p-8 border border-white/10 bg-white/[0.02] backdrop-blur-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Tab 1: Projects */}
              {activeTab === 'Projects' && (
                <>
                  {loadingProjects ? (
                    <div className="flex justify-center py-16">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00B4D8]"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {transformedProjects.length > 0 ? (
                        transformedProjects.map((p, i) => (
                          <ProjectCard
                            key={p.id || i}
                            project={p}
                            onClick={setPreviewProject}
                          />
                        ))
                      ) : (
                        <div className="col-span-full text-center text-white/50 py-16">
                          No projects available yet.
                          <div className="mt-4 text-sm text-[#00B4D8]">
                            Add projects via Admin Dashboard to see them here!
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Tab 2: Certifications */}
              {activeTab === 'Certificate' && (
                <div className="space-y-8">
                  {loadingCerts ? (
                    <div className="flex justify-center py-16">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00B4D8]"></div>
                    </div>
                  ) : (
                    <>
                      {activeCertificates.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                          <AnimatePresence>
                            {activeCertificates.slice(0, visibleCertificatesCount).map((cert, i) => {
                              const certData = {
                                id: cert._id || cert.id || i,
                                title: cert.title || '',
                                issuer: cert.issuer || '',
                                date: cert.issue_date ? new Date(cert.issue_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : (cert.date || ''),
                                link: cert.credential_url || cert.link || cert.pdf_url || '#',
                                image: cert.image_url || cert.image || ''
                              };

                              return <CertificateCard key={cert._id || cert.id || i} cert={certData} onClick={setPreviewCertificate} />;
                            })}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <div className="text-center text-white/50 py-16">
                          No certificates available yet.
                          <div className="mt-4 text-sm text-[#00B4D8]">
                            Add certifications via Admin Dashboard to display them here!
                          </div>
                        </div>
                      )}

                      {activeCertificates.length > INITIAL_CERTIFICATES_TO_SHOW && (
                        <div className="flex justify-center mt-12">
                          {visibleCertificatesCount < activeCertificates.length ? (
                            <motion.button
                              onClick={handleShowMore}
                              className="bg-[#00B4D8] hover:bg-[#0090ad] px-8 py-3 rounded-full text-black font-bold transition-all duration-300 shadow-lg shadow-[#00B4D8]/20"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Show More ({activeCertificates.length - visibleCertificatesCount} more)
                            </motion.button>
                          ) : (
                            <motion.button
                              onClick={handleShowLess}
                              className="bg-white/10 hover:bg-white/20 border border-white/10 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Show Less
                            </motion.button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Tab 3: Tech Stack */}
              {activeTab === 'Tech Stack' && (
                <div className="max-w-4xl mx-auto space-y-8">
                  {Object.entries(techStack).map(([category, techs]) => (
                    <div key={category}>
                      <h3 className="text-lg sm:text-xl font-bold text-[#00B4D8] capitalize mb-4 border-b border-white/10 pb-2">{category}</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                        {techs.map((tech, i) => (
                          <div key={i} className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 transition-all duration-300 hover:border-[#00B4D8]/40 hover:bg-[#00B4D8]/5">
                            <div className="text-4xl">{tech.icon}</div>
                            <p className="text-sm text-white/80 font-medium">{tech.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {previewCertificate && (
          <CertificatePreviewModal
            certificate={previewCertificate}
            onClose={() => setPreviewCertificate(null)}
          />
        )}
        {previewProject && (
          <ProjectDetailModal
            project={previewProject}
            onClose={() => setPreviewProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProjectSection;