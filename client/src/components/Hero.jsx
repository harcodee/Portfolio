import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { getConfig } from '../lib/api';
import { Typewriter } from 'react-simple-typewriter';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const introRef = useRef(null);
  // fires whenever the intro section crosses 25% into the viewport
  const isInView = useInView(introRef, { once: false, amount: 0.25 });

  useEffect(() => {
    getConfig().catch(() => { });
  }, []);

  const toProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      {/* ─────────────────────────────────────────────
          HERO  —  100 vh, no sticky, no scroll magic
          ───────────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          height: '100vh',
          position: 'relative',
          background: 'var(--bg-primary)',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >

        {/* ── Centred headline + CTAs ── */}
        <div
          className="container"
          style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}
        >
          <motion.div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {/* Main oversized headline */}
            <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
              <h1
                className="glowing-text"
                style={{
                  fontSize: 'clamp(100px, 20vw, 200px)',
                  lineHeight: 0.85,
                  fontWeight: 700,
                  fontFamily: "'Playfair Display', serif",
                  margin: 0,
                  cursor: 'pointer',
                  textAlign: 'center',
                  userSelect: 'none',
                }}
              >
                Harine T
              </h1>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp}
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <button
                onMouseEnter={() => setHoveredBtn('work')}
                onMouseLeave={() => setHoveredBtn(null)}
                className="btn btn-primary"
                onClick={toProjects}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  height: '40px',
                  color: '#FFFFFF',
                  padding: '0 22px',
                  fontSize: '0.78rem',
                }}
              >
                <span>Explore Projects</span>
                <motion.span
                  animate={{ x: hoveredBtn === 'work' ? 5 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'inline-block' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.span>
              </button>

              <a
                onMouseEnter={() => setHoveredBtn('resume')}
                onMouseLeave={() => setHoveredBtn(null)}
                href="/resume.pdf"
                download="Resume_Harine_T.pdf"
                className="btn btn-outline"
                aria-label="Read Harine's resume"
                style={{ height: '40px', padding: '0 22px', fontSize: '0.78rem' }}
              >
                <span>Resume</span>
                <motion.span
                  animate={{ y: hoveredBtn === 'resume' ? -3 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'inline-block' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </motion.span>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator — fades in after 2 s so it doesn't compete with the headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            x: '-50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
            }}
          >
            Scroll to explore
          </span>
          <div
            style={{
              width: '2px',
              height: '40px',
              background: 'rgba(167, 121, 94, 0.25)',
              position: 'relative',
              borderRadius: '1px',
              overflow: 'hidden',
            }}
          >
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '100%',
                height: '16px',
                background: 'var(--bg-accent)',
                position: 'absolute',
                top: 0,
                left: 0,
                borderRadius: '1px',
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────────
          INTRO SECTION  —  appears on scroll, no timer
          ───────────────────────────────────────────── */}
      <section
        id="about"
        ref={introRef}
        style={{
          background: '#110703',
          padding: '140px 0',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div className="container">

          {/* Subtitle labels */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '40px' }}
          >
            <span
              style={{
                display: 'block',
                fontFamily: 'Lora, Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
                letterSpacing: '0.04em',
                color: 'var(--text-on-green)',
                marginBottom: '10px',
              }}
            >
              Computer Science Engineering Undergraduate
            </span>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '0.76rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--bg-accent)',
              }}
            >
              AI • Full Stack Developer
            </span>
          </motion.div>

          {/* Thin vertical accent line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '1px',
              height: '50px',
              background: 'var(--bg-accent)',
              margin: '0 auto 40px',
              transformOrigin: 'top',
            }}
          />

          {/* Typewriter headline — starts the moment the section enters view */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              style={{
                fontSize: 'clamp(24px, 4.4vw, 45px)',
                lineHeight: 1.35,
                fontWeight: 400,
                color: 'var(--text-on-green)',
                fontFamily: 'var(--font-display)',
                whiteSpace: 'pre-wrap',
                maxWidth: '850px',
                margin: '0 auto',
                letterSpacing: '-0.02em',
              }}
            >
              {isInView && (
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400,
                    fontSize: 'inherit',
                  }}
                >
                  <Typewriter
                    words={['Engineering ideas\ninto intelligent systems.']}
                    loop={1}
                    cursor
                    cursorStyle="|"
                    typeSpeed={45}
                    deleteSpeed={0}
                    delaySpeed={100000}
                  />
                </span>
              )}
            </h2>
          </motion.div>

        </div>
      </section>
    </>
  );
}