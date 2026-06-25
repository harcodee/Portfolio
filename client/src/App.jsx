import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import CustomCursor from './components/CustomCursor';

function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 2000;
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const nextProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(nextProgress);
      if (nextProgress >= 100) {
        clearInterval(timer);
        setTimeout(onComplete, 600);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg-primary)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px 60px',
        color: 'var(--text-on-green)',
      }}
    >
      {/* Top branding */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: 'var(--text-on-green)' }}>
          HARINE T<span style={{ color: 'var(--bg-accent)' }}>.</span>
        </span>
      </div>

      {/* Middle Text Reveal */}
      <div style={{ maxWidth: '850px' }}>
        <div style={{ overflow: 'hidden', marginBottom: '12px' }}>
          <motion.p
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--bg-accent)' }}
          >
            AI&ML and Full Stack Engineer
          </motion.p>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <motion.h2
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, color: 'var(--text-on-green)' }}
          >
            Engineering Intelligent Systems.<br />Designing Exceptional Products.
          </motion.h2>
        </div>
      </div>

      {/* Bottom Progress bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '30px' }}>
        <div style={{ width: '200px', height: '2px', background: 'rgba(167, 121, 94, 0.2)', position: 'relative', marginBottom: '20px' }}>
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              background: 'var(--bg-accent)',
              width: `${progress}%`,
            }}
          />
        </div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(5rem, 12vw, 10rem)',
          lineHeight: 0.75,
          color: 'var(--text-on-green)',
          fontFeatureSettings: '"tnum" 1'
        }}>
          {progress}
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        paddingTop: '80px',
        textAlign: 'center',
        background: 'var(--bg-primary)',
        color: 'var(--text-on-green)'
      }}
    >
      <span style={{ fontSize: '6rem', fontWeight: 900, color: 'var(--text-on-green)', fontFamily: 'var(--font-display)' }}>404</span>
      <h2 style={{ color: 'var(--text-on-green)', fontFamily: 'var(--font-display)', fontSize: '2rem' }}>Page not found</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a href="/" className="btn btn-primary" style={{ marginTop: '10px' }}>
        ← Back home
      </a>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <BrowserRouter>
      {/* Global Haven Noise */}
      <div className="noise-overlay" />

      {/* Ambient Scroll Progress */}
      {!loading && <motion.div className="progress-bar" style={{ scaleX }} />}

      {/* Custom Precision Cursor */}
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Navbar />
            <AnimatedRoutes />
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}
