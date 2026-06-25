import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CONTACTS = [
  {
    label: 'Direct Email',
    value: 'tharine28@gmail.com',
    href: 'mailto:tharine28@gmail.com',
  },
  {
    label: 'Phone',
    value: '+91 8668139980',
    href: 'tel:+918668139980',
  },
];

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/harcodee',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/harine-t-67453b2b4/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      id="contact"
      className="section block-green"
      ref={ref}
      style={{ borderBottom: '1px solid var(--border-color)' }}
    >
      <div className="container" style={{ textAlign: 'center' }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '72px' }}
        >
          <span className="label" style={{ display: 'block', marginBottom: '16px' }}>
            Get in Touch
          </span>
          <h2 className="display-lg" style={{ color: 'var(--bg-accent)' }}>
            Let's build<br />together.
          </h2>
        </motion.div>

        {/* Email + Phone */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            alignItems: 'center',
            marginBottom: '56px',
          }}
        >
          {CONTACTS.map((c) => (
            <div key={c.label}>
              <span style={{
                display: 'block',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
                marginBottom: '6px',
                fontFamily: 'var(--font-sans)',
              }}>
                {c.label}
              </span>
              <a
                href={c.href}
                className="contact-link"
                style={{
                  fontSize: 'clamp(1.4rem, 3vw, 2.4rem)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  transition: 'opacity 0.3s',
                }}
              >
                {c.value}
              </a>
            </div>
          ))}
        </motion.div>

        {/* Social icon buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}
        >
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="social-btn"
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                background: 'rgba(255,255,255,0.06)',
                transition: 'all 0.3s ease',
              }}
            >
              {s.icon}
            </a>
          ))}
        </motion.div>

      </div>

      <style>{`
        .contact-link:hover { opacity: 0.7; }
        .social-btn:hover {
          border-color: #FFFFFF !important;
          background: #FFFFFF !important;
          color: var(--bg-primary) !important;
          transform: translateY(-3px);
        }
      `}</style>
    </section>
  );
}
