import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Patent', href: '#patent' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Academics', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') return;
    const ids = NAV.map((l) => l.href.slice(1));
    const obs = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: '-40% 0px -50% 0px' }
      );
      o.observe(el);
      return o;
    });
    return () => obs.forEach((o) => o?.disconnect());
  }, [location.pathname]);

  const go = (href) => {
    setOpen(false);
    if (location.pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const textColor = 'var(--text-on-green)';
  const dotColor = 'var(--bg-accent)';
  const borderBottomColor = scrolled ? 'rgba(167, 121, 94, 0.15)' : 'transparent';
  const bgHeader = scrolled ? 'rgba(17, 7, 3, 0.92)' : 'transparent';

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          background: bgHeader,
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: `1px solid ${borderBottomColor}`,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: scrolled ? '64px' : '90px', transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>

          {/* Logo */}
          <Link to="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.4rem', color: textColor, letterSpacing: '-0.03em', textDecoration: 'none', transition: 'color 0.3s' }}>
            Harine<span style={{ color: dotColor }}>.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="nav-desktop" role="navigation" aria-label="Main navigation" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            {NAV.map((l) => (
              <NavItem
                key={l.label}
                link={l}
                active={active === l.href.slice(1)}
                go={go}
                textColor={textColor}
              />
            ))}

            {/* Resume CTA */}
            <a href="/resume.pdf" download="Resume_Harine_T.pdf"
              className="btn"
              style={{
                height: '36px',
                padding: '0 16px',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '4px',
                border: `1px solid rgba(167, 121, 94, 0.45)`,
                color: textColor,
                background: 'transparent',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--text-on-green)';
                e.target.style.color = 'var(--bg-primary)';
                e.target.style.borderColor = 'var(--text-on-green)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = textColor;
                e.target.style.borderColor = 'rgba(167, 121, 94, 0.45)';
              }}
              aria-label="View resume">
              Resume
            </a>
          </nav>

          {/* Hamburger Menu Icon */}
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="nav-burger"
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', padding: '8px', flexDirection: 'column', gap: '6px', zIndex: 1001 }}>
            {[0, 1].map((i) => (
              <motion.span key={i}
                animate={open ? (i === 0 ? { rotate: 45, y: 4 } : { rotate: -45, y: -4 }) : { rotate: 0, y: 0 }}
                style={{ display: 'block', width: '24px', height: '2px', background: 'var(--text-on-green)', transformOrigin: 'center', transition: 'background 0.3s' }}
              />
            ))}
          </button>
        </div>
      </motion.header>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'fixed', inset: 0, background: 'var(--bg-primary)', zIndex: 999, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px' }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'center' }}>
              {NAV.map((l, i) => {
                const isActive = active === l.href.slice(1);
                return (
                  <motion.button key={l.label}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    onClick={() => go(l.href)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '2rem', fontWeight: isActive ? 800 : 400, color: 'var(--text-on-green)', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', position: 'relative' }}>
                    {l.label}
                    {isActive && (
                      <span style={{ position: 'absolute', top: '50%', right: '-20px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--bg-accent)', transform: 'translateY(-50%)' }} />
                    )}
                  </motion.button>
                );
              })}
              <motion.a
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: NAV.length * 0.08 }}
                href="/resume.pdf" download="Resume_Harine_T.pdf"
                className="btn"
                style={{ marginTop: '24px', height: '52px', padding: '0 36px', fontSize: '1rem', width: '200px', background: 'var(--text-on-green)', color: 'var(--bg-primary)', borderColor: 'var(--text-on-green)' }}>
                View Resume
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-burger  { display: flex !important; }
        }
      `}</style>
    </>
  );
}

function NavItem({ link, active, go, textColor }) {
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={() => go(link.href)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-current={active ? 'true' : undefined}
      style={{
        padding: '6px 0', position: 'relative',
        fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
        color: active || hov ? textColor : 'var(--text-secondary)',
        fontFamily: 'var(--font-sans)',
        background: 'none', border: 'none', cursor: 'pointer',
        transition: 'color 0.2s ease',
      }}
    >
      {link.label}
      <span style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1.5px',
        background: 'var(--bg-accent)',
        transform: (active || hov) ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left', transition: 'transform 0.3s ease',
      }} />
    </button>
  );
}
