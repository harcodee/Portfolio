import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { getProjects } from '../lib/api';

export default function MoreWork() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  useEffect(() => {
    getProjects(false)
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="more-work" className="section block-green" ref={ref} style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
      <div className="section-number" style={{ top: '60px', right: '40px' }}>03</div>

      <div className="container">

        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '64px', textAlign: 'center' }}
        >
          <span className="label" style={{ display: 'block', marginBottom: '14px', color: 'rgba(255, 255, 255, 0.85)' }}>Technical Archive</span>
          <h2 className="display-md" style={{ color: 'var(--bg-accent)' }}>Other Projects</h2>
        </motion.div>

        {/* Card Grid */}
        {loading ? <Sk /> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {projects.map((p, i) => (
              <Card key={p.id} p={p} i={i} inView={inView} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Card({ p, i, inView }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="editorial-card"
      style={{
        padding: '36px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        minHeight: '230px',
        background: hov ? 'rgba(255, 255, 255, 0.09)' : 'rgba(255, 255, 255, 0.05)',
        border: '1px solid',
        borderColor: hov ? '#FFFFFF' : 'var(--border-color)',
        borderRadius: '8px',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Card Header: Title + Link */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '1.25rem',
          color: '#FFFFFF',
          lineHeight: 1.25
        }}>
          {p.title}
        </h3>

        {p.githubOnly ? (
          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
            style={{
              color: hov ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
              transition: 'all 0.3s',
              flexShrink: 0,
              marginLeft: '8px',
              display: 'flex',
              alignItems: 'center'
            }}
            aria-label={`View ${p.title} on GitHub`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        ) : (
          <Link to={`/projects/${p.slug}`}
            style={{
              color: hov ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
              fontSize: '1.25rem',
              transition: 'all 0.3s',
              flexShrink: 0,
              marginLeft: '8px',
              textDecoration: 'none'
            }}
            aria-label={`View ${p.title}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        )}
      </div>

      {/* Description */}
      <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }} className="body-text">
        {p.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
        {p.tags.slice(0, 4).map((t) => (
          <span key={t} className="tag" style={{
            fontSize: '0.7rem',
            padding: '2px 10px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderColor: 'var(--border-color)',
            color: '#FFFFFF'
          }}>
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function Sk() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ height: '220px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid var(--border-color)', opacity: 0.5 }} />
      ))}
    </div>
  );
}
