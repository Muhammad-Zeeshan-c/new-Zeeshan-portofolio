import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaShieldAlt } from 'react-icons/fa';
import bangzenLogo from '../assets/images/BGZENBGIJObulat.png';
import { useNavbar } from '../contexts/NavbarContext';
import { useAdmin } from '../contexts/AdminContext';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import { StaggeredMenu } from './StaggeredMenu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  const { isNavbarVisible, hideNavbar, showNavbar, isMenuOpen, setIsMenuOpen } = useNavbar();
  const { isAuthenticated, logout } = useAdmin();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to hash on location change if on home
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (location.pathname === '/' && !location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const handleAdminAccess = () => {
    if (isAuthenticated) {
      setShowAdminDashboard(true);
      hideNavbar();
    } else {
      setShowAdminLogin(true);
      hideNavbar();
    }
  };

  const handleLoginSuccess = () => {
    setShowAdminLogin(false);
    setShowAdminDashboard(true);
    hideNavbar();
  };

  const handleAdminLogout = () => {
    logout();
    setShowAdminDashboard(false);
    showNavbar();
  };

  const handleCloseAdminDashboard = () => {
    setShowAdminDashboard(false);
    showNavbar();
  };

  const handleCloseAdminLogin = () => {
    setShowAdminLogin(false);
    showNavbar();
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (href.startsWith('#')) {
      if (location.pathname === '/') {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        }
      } else {
        navigate('/' + href);
      }
    } else {
      navigate(href);
    }
  };

  const NavLink = ({ href, children, isGallery }) => {
    const isActive = isGallery
      ? location.pathname === '/gallery'
      : location.pathname === '/' && location.hash === href;

    return (
      <li>
        <a
          href={href}
          onClick={(e) => handleNavClick(e, href)}
          className={`relative block text-white/80 hover:text-white font-medium text-sm lg:text-base tracking-wide py-2 transition-colors duration-300 group ${isActive ? 'text-[#00B4D8]' : ''}`}
        >
          {children}
          <span className={`absolute bottom-1 left-0 block h-[2px] w-0 bg-[#00B4D8] transition-all duration-300 group-hover:w-full ${isActive ? 'w-full' : ''}`}></span>
        </a>
      </li>
    );
  };

  return (
    <>
      <AnimatePresence>
        {isNavbarVisible && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full z-50"
          >
            {/* Navbar */}
            <header
              className={`w-full py-4 transition-all duration-300 ${
                isScrolled
                  ? "bg-[#000000]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/50"
                  : "bg-[#000000] border-b border-white/5"
              }`}
            >
              <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8">
                {/* --- MOBILE HEADER --- */}
                <div className="w-full flex items-center justify-between md:hidden">
                  <a href="/" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-3">
                    <img src={bangzenLogo} alt="Logo" className="h-10 w-10 flex-shrink-0" />
                    <span className="font-bold text-base text-white">
                      Zeeshan <span className="text-[#00B4D8]">Khalid</span>
                    </span>
                  </a>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-white hover:text-[#00B4D8] text-2xl transition-colors p-1"
                    aria-label="Toggle Menu"
                  >
                    &#9776;
                  </button>
                </div>

                {/* --- DESKTOP HEADER --- */}
                <div className="hidden w-full md:grid grid-cols-3 items-center">
                  {/* Left Navigation */}
                  <ul className="justify-self-start flex items-center list-none gap-8">
                    <NavLink href="#home">Home</NavLink>
                    <NavLink href="#projects">Projects</NavLink>
                    <NavLink href="/gallery" isGallery>Gallery</NavLink>
                  </ul>

                  {/* Center Brand */}
                  <a
                    href="/"
                    onClick={(e) => handleNavClick(e, '#home')}
                    className="justify-self-center flex items-center gap-3 group"
                  >
                    <img src={bangzenLogo} alt="Logo" className="h-10 w-10 group-hover:scale-105 transition-transform" />
                    <span className="font-bold text-lg text-white">
                      Zeeshan <span className="text-[#00B4D8]">Khalid</span>
                    </span>
                  </a>

                  {/* Right Navigation & Admin Access */}
                  <div className="justify-self-end flex items-center gap-8">
                    <ul className="flex items-center list-none gap-8">
                      <NavLink href="#about">About</NavLink>
                      <NavLink href="#contact">Contact</NavLink>
                    </ul>
                    <button
                      onClick={handleAdminAccess}
                      className="flex items-center gap-2 text-white/50 hover:text-[#00B4D8] transition-colors duration-300"
                      title={isAuthenticated ? "Admin Dashboard" : "Admin Login"}
                    >
                      <FaShieldAlt className={`text-lg ${isAuthenticated ? 'text-emerald-400' : 'currentColor'}`} />
                    </button>
                  </div>
                </div>
              </nav>
            </header>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- STAGGERED MENU --- */}
      <StaggeredMenu
        isOpen={isMenuOpen}
        onMenuClose={() => setIsMenuOpen(false)}
        items={[
          { label: 'Home', link: '#home', onClick: (e) => handleNavClick(e, '#home') },
          { label: 'Projects', link: '#projects', onClick: (e) => handleNavClick(e, '#projects') },
          { label: 'Gallery', link: '/gallery', onClick: (e) => handleNavClick(e, '/gallery') },
          { label: 'About', link: '#about', onClick: (e) => handleNavClick(e, '#about') },
          { label: 'Contact', link: '#contact', onClick: (e) => handleNavClick(e, '#contact') },
        ]}
        socialItems={[
          { label: 'Admin', link: '#', onClick: (e) => { e.preventDefault(); handleAdminAccess(); } }
        ]}
        displaySocials={true}
        displayItemNumbering={true}
        colors={['#000000', '#0a0a0a', '#111111']}
        accentColor="#00B4D8"
      />

      {/* Admin Login Modal */}
      <AdminLogin
        isOpen={showAdminLogin}
        onClose={handleCloseAdminLogin}
        onSuccess={handleLoginSuccess}
      />

      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={showAdminDashboard}
        onClose={handleCloseAdminDashboard}
      />
    </>
  );
};

export default Header;
