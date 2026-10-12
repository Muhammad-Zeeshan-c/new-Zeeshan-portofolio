import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaDownload, FaBriefcase, FaCode, FaCertificate, FaGlobe, FaArrowRight, FaCube } from 'react-icons/fa';
import { AnimatedGradientTextDemo } from '../components/AnimatedGradientTextDemo';
import GradientText from '../components/GradientText';
import TextGenerateEffect from "../components/text-generate-effect";
import Skills from '../components/Skills';
import { VelocityScroll } from '../components/VelocityScroll';
import { ButtonMovingBorder } from '../components/MovingBorderButton';
import ParticlesBackground from '../components/ParticlesBackground';
import Footer from '../components/Footer';
import apiService from '../services/api';

// Lazy loaded heavy 3D and section components for peak loading performance
const Lanyard = lazy(() => import('../components/Lanyard/Lanyard'));
const Spline = lazy(() => import('@splinetool/react-spline'));
const ProjectSection = lazy(() => import('../components/ProjectSection'));
const Education = lazy(() => import('../components/Education'));
const Contact = lazy(() => import('../components/Contact'));

const Home = () => {
    const [projectCount, setProjectCount] = useState(0);
    const [certificateCount, setCertificateCount] = useState(0);
    const [cvUrl, setCvUrl] = useState('');

    useEffect(() => {
        async function fetchCountsAndCV() {
            try {
                const pCount = await apiService.getProjectCount();
                setProjectCount(pCount);

                const cCount = await apiService.getCertificateCount();
                setCertificateCount(cCount);

                const cv = await apiService.getActiveCV();
                if (cv && cv.pdf_url) {
                    setCvUrl(cv.pdf_url);
                }
            } catch (err) {
                console.error('Error fetching stats/cv:', err);
            }
        }
        fetchCountsAndCV();
    }, []);

    const [is3dEnabled, setIs3dEnabled] = useState(() => {
        if (typeof window !== 'undefined') {
            const isMobilePhone = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && window.innerWidth < 768;
            const canvas = document.createElement('canvas');
            const hasWebGL = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
            return !isMobilePhone && hasWebGL;
        }
        return true;
    });

    const toggle3dAssets = () => {
        setIs3dEnabled(prev => !prev);
    };

    const stats = [
        { icon: <FaCode />, value: projectCount.toString(), title: "TOTAL PROJECTS", description: "Innovative web solutions crafted" },
        { icon: <FaCertificate />, value: certificateCount.toString(), title: "CERTIFICATIONS", description: "Professional skills validated" },
        { icon: <FaGlobe />, value: "1+", title: "YEARS OF EXPERIENCE", description: "Continuous learning journey" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 w-full bg-[#000000] text-white"
        >
            {/* 3D Assets Toggle Button */}
            <button
                onClick={toggle3dAssets}
                title={`Toggle 3D Assets (${is3dEnabled ? 'On' : 'Off'})`}
                className={`fixed top-24 right-4 z-50 p-3 rounded-full border backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-110 ${
                    is3dEnabled
                        ? 'bg-[#00B4D8]/20 border-[#00B4D8] text-[#00B4D8] shadow-[0_0_15px_rgba(0,180,216,0.3)]'
                        : 'bg-black/80 border-white/10 text-white/50 shadow-sm'
                }`}
            >
                <FaCube className="h-5 w-5" />
            </button>

            {/* ======================================================== */}
            {/* SECTION 1: HERO (#home) - Black Background + Particles    */}
            {/* ======================================================== */}
            <section id="home" className="relative w-full bg-[#000000] pt-24 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
                {/* Interactive particle background - only in hero section */}
                <ParticlesBackground />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 space-y-6 pt-12 md:pt-28 order-last md:order-none text-center md:text-left flex flex-col items-center md:items-start">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}>
                            <AnimatedGradientTextDemo />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight select-none tracking-tight"
                        >
                            WELCOME TO MY
                            <span className="block mt-2 text-[#00B4D8]">PORTFOLIO</span>
                        </motion.h1>

                        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}>
                            <GradientText colors={["#00B4D8", "#66d0ef", "#ffffff", "#00B4D8"]} animationSpeed={4} className="font-semibold text-xl lg:text-3xl" />
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}>
                            <TextGenerateEffect words={'I craft responsive and visually engaging websites using React, Tailwind CSS, and modern web technologies.'} />
                        </motion.div>

                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}>
                            <Skills />
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }} className="flex flex-row gap-4 mt-8">
                            <a
                                href="https://github.com/Muhammad-Zeeshan-c/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub Profile"
                                className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:border-[#00B4D8] hover:bg-[#00B4D8]/10 hover:text-[#00B4D8] hover:shadow-[0_0_15px_rgba(0,180,216,0.25)]"
                            >
                                <FaGithub className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/muhammad-zeeshan-khalid-665b3a327/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn Profile"
                                className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:border-[#00B4D8] hover:bg-[#00B4D8]/10 hover:text-[#00B4D8] hover:shadow-[0_0_15px_rgba(0,180,216,0.25)]"
                            >
                                <FaLinkedin className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                            </a>
                        </motion.div>
                    </div>

                    {/* 3D Lanyard Card */}
                    <div className="hidden lg:flex flex-1 justify-center h-[600px] w-full order-first lg:order-none lanyard-wrapper">
                        {is3dEnabled && (
                            <Suspense fallback={<div className="h-[600px] w-full flex items-center justify-center text-white/40">Loading 3D Card...</div>}>
                                <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} fov={18} transparent={true} />
                            </Suspense>
                        )}
                    </div>
                </div>
            </section>

            {/* ======================================================== */}
            {/* SECTION 2: ABOUT (#about) - Black Background             */}
            {/* ======================================================== */}
            <section id="about" className="w-full bg-[#000000] py-16 md:py-24">
                <div className="w-full">
                    {/* Velocity Marquee */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: "easeOut" }} className="text-center">
                        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mb-16">
                            <VelocityScroll defaultVelocity={1.5} numRows={1} className="max-w-full">
                                <span className="font-bold tracking-tight text-[#00B4D8]" style={{ fontSize: "2.25rem", lineHeight: "1.2" }}>
                                    MERN Stack Developer ✦ Aspiring AI engineer ✦ Software Engineering @ COMSATS ✦ Exploring AI &amp; Machine Learning
                                </span>
                            </VelocityScroll>
                            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#000000] to-transparent"></div>
                            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#000000] to-transparent"></div>
                            <VelocityScroll defaultVelocity={-1.5} numRows={1} className="max-w-full mt-2">
                                <span className="font-bold tracking-tight text-[#00B4D8]" style={{ fontSize: "2.25rem", lineHeight: "1.2" }}>
                                    MERN Stack Developer ✦ Aspiring AI engineer ✦ Software Engineering @ COMSATS ✦ Exploring AI &amp; Machine Learning
                                </span>
                            </VelocityScroll>
                        </div>
                        <p className="text-base sm:text-lg text-white/60 mt-2 px-1 mb-16">
                            ✧ Passionate about coding and creative technology ✧
                        </p>
                    </motion.div>

                    {/* About Content */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-8">
                        <div className="flex flex-col min-[951px]:flex-row items-center justify-center gap-10">
                            {is3dEnabled && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                                    className="hidden min-[951px]:flex min-[951px]:w-1/3 justify-center"
                                >
                                    <div className="w-full h-[420px] md:h-[530px] flex items-center justify-center">
                                        <Suspense fallback={<div className="h-[420px] flex items-center justify-center text-white/40">Loading 3D Robot...</div>}>
                                            <Spline scene="https://prod.spline.design/FcZ66SFMX1YbF-0I/scene.splinecode" />
                                        </Suspense>
                                    </div>
                                </motion.div>
                            )}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                                className={`text-white text-center min-[951px]:text-left transition-all duration-700 ${is3dEnabled ? 'min-[951px]:w-2/3 w-full' : 'max-w-4xl mx-auto'}`}
                            >
                                <p className="text-lg sm:text-xl md:text-2xl text-white/60 font-medium">Hello, I'm</p>
                                <h3 className="text-2xl min-[360px]:text-3xl md:text-5xl font-bold text-white my-2 tracking-tight">Zeeshan Khalid</h3>
                                <p className="text-white/80 leading-relaxed mt-4 text-justify text-sm sm:text-base">
                                    I'm a Software Engineering student at COMSATS University Lahore, a MERN Stack Developer, and an aspiring AI Engineer passionate about building modern, scalable, and user-focused applications. With a strong interest in Artificial Intelligence and Machine Learning, I'm exploring ways to integrate intelligent solutions into real-world products.
                                </p>
                                <p className="text-white/80 leading-relaxed mt-4 text-justify text-sm sm:text-base">
                                    I enjoy solving problems, exploring new technologies, and turning ideas into meaningful digital experiences. I'm continuously developing my skills in software engineering and AI to build solutions that make a difference.
                                </p>
                                <p className="text-[#00B4D8] leading-relaxed mt-4 font-semibold text-justify text-sm sm:text-base">
                                    Have an idea, a project, or an opportunity to collaborate? Let's connect and make it happen.
                                </p>
                                <div className="my-6 bg-white/[0.03] border-l-4 border-[#00B4D8] p-3.5 sm:p-4 rounded-r-lg italic text-white/80 border border-white/5 text-sm sm:text-base">
                                    "Whoever strives shall succeed."
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 justify-center min-[951px]:justify-start items-center w-full">
                                    <ButtonMovingBorder 
                                        as="button"
                                        type="button"
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            if (!cvUrl) {
                                                alert('CV will be available soon!');
                                                return;
                                            }
                                            try {
                                                const response = await fetch(cvUrl);
                                                const blob = await response.blob();
                                                const url = URL.createObjectURL(blob);
                                                const link = document.createElement('a');
                                                link.href = url;
                                                link.download = 'Zeeshan_cv.pdf';
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                                URL.revokeObjectURL(url);
                                            } catch {
                                                window.open(cvUrl, '_blank');
                                            }
                                        }}
                                        duration={3000} 
                                        borderRadius="0.75rem" 
                                        className="bg-[#000000] border border-white/10 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:border-[#00B4D8]/50 hover:shadow-[0_0_15px_rgba(0,180,216,0.3)] w-full sm:w-auto px-6 py-3">
                                        <FaDownload /> Download CV
                                    </ButtonMovingBorder>
                                    <ButtonMovingBorder as="a" href="#projects" duration={3000} borderRadius="0.75rem" className="bg-[#000000] border border-white/10 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:border-[#00B4D8]/50 hover:shadow-[0_0_15px_rgba(0,180,216,0.3)] w-full sm:w-auto px-6 py-3">
                                        <FaBriefcase /> View Projects
                                    </ButtonMovingBorder>
                                </div>
                            </motion.div>
                        </div>

                        {/* Stats Cards - Compact mobile horizontal layout, rich desktop grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                            className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 md:gap-8 max-w-5xl mx-auto mt-12 md:mt-16 px-1 sm:px-4 md:px-0"
                        >
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="group relative p-3.5 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00B4D8]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,180,216,0.2)] cursor-pointer"
                                >
                                    {/* Mobile: Compact horizontal row (< sm) */}
                                    <div className="flex items-center justify-between sm:hidden">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#00B4D8]/10 group-hover:border-[#00B4D8]/30 transition-all duration-300 flex-shrink-0">
                                                <div className="text-xl text-[#00B4D8]">{stat.icon}</div>
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="text-xs font-semibold uppercase tracking-wider text-white/80 group-hover:text-white transition-colors truncate">
                                                    {stat.title}
                                                </h3>
                                                <p className="text-[11px] text-white/40 truncate">{stat.description}</p>
                                            </div>
                                        </div>
                                        <p className="text-2xl font-bold text-white transition-colors group-hover:text-[#00B4D8] pl-2 flex-shrink-0">
                                            {stat.value}
                                        </p>
                                    </div>

                                    {/* Tablet & Desktop Layout (sm+) */}
                                    <div className="hidden sm:flex justify-between items-start">
                                        <div className="flex flex-col">
                                            <div className="p-2.5 sm:p-3 mb-3 sm:mb-4 rounded-xl bg-white/5 border border-white/10 w-max group-hover:bg-[#00B4D8]/10 group-hover:border-[#00B4D8]/30 transition-all duration-300">
                                                <div className="text-xl sm:text-2xl text-[#00B4D8]">{stat.icon}</div>
                                            </div>
                                            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/70 group-hover:text-white transition-colors duration-300">
                                                {stat.title}
                                            </h3>
                                            <p className="text-xs text-white/40 mt-1">{stat.description}</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white transition-all duration-300 group-hover:text-[#00B4D8]">
                                                {stat.value}
                                            </p>
                                            <FaArrowRight className="text-white/30 mt-auto group-hover:text-[#00B4D8] transition-all duration-300 -rotate-45" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ======================================================== */}
            {/* SECTION 3: PROJECTS (#projects) - Black Background       */}
            {/* ======================================================== */}
            <section id="projects" className="w-full bg-[#000000] py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <Suspense fallback={<div className="py-20 text-center text-white/40">Loading Projects...</div>}>
                        <ProjectSection />
                    </Suspense>
                </div>
            </section>

            {/* ======================================================== */}
            {/* SECTION 4: EDUCATION (#education) - Black Background      */}
            {/* ======================================================== */}
            <Suspense fallback={<div className="py-20 text-center text-white/40">Loading Education...</div>}>
                <Education />
            </Suspense>

            {/* ======================================================== */}
            {/* SECTION 5: CONTACT (#contact) - Black Background         */}
            {/* ======================================================== */}
            <section id="contact" className="w-full bg-[#000000] py-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <Suspense fallback={<div className="py-20 text-center text-white/40">Loading Contact...</div>}>
                        <Contact />
                    </Suspense>
                </div>
            </section>

            {/* ======================================================== */}
            {/* FOOTER - Full Footer Component                           */}
            {/* ======================================================== */}
            <Footer />
        </motion.div>
    );
};

export default Home;
