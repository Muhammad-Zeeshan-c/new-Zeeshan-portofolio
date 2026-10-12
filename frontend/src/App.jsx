import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import { NavbarProvider } from './contexts/NavbarContext';
import { AdminProvider } from './contexts/AdminContext';

// Pages — code-split so each page loads only when visited
const Home = lazy(() => import('./pages/Home'));
const Gallery = lazy(() => import('./pages/Gallery'));

function App() {
  const location = useLocation();

  return (
    <AdminProvider>
      <NavbarProvider>
        <div className="relative min-h-screen bg-[#000000] text-white selection:bg-[#00B4D8]/30 selection:text-white">
          <Header />

          {/* Page Routing with Transitions */}
          <AnimatePresence mode="wait">
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#00B4D8] font-medium">Loading...</div>}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </div>
      </NavbarProvider>
    </AdminProvider>
  );
}

export default App;