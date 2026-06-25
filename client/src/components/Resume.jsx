import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { getResumeTimeline } from '../lib/api';

export default function Resume() {
  const [data, setData] = useState({ experience: [], education: [], certifications: [] });
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  useEffect(() => {
    getResumeTimeline()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="resume" className="section block-green" ref={ref} style={{ borderBottom: '1px solid var(--border-color)' }}>
      <div className="section-number" style={{ top: '60px', right: '40px' }}>05</div>
      <div className="container">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '80px', textAlign: 'center' }}
        >
          <span className="label" style={{ display: 'block', marginBottom: '16px' }}>Professional History</span>
          <h2 className="display-lg" style={{ color: 'var(--bg-accent)' }}>Academics & Internships.</h2>
        </motion.div>

        {loading ? <Sk /> : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '80px' }} className="resume-grid">

              {/* Experience timeline (left) */}
              <TimelineCol title="Systems Experience" items={data.experience} inView={inView} delay={0.1} />

              {/* Education and certifications (right) */}
              <div>
                <TimelineCol title="Education" items={data.education} inView={inView} delay={0.2} />
                <TimelineCol title="Certifications" items={data.certifications} inView={inView} delay={0.3} style={{ marginTop: '60px' }} />
              </div>
            </div>

            {/* Call to action download button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}
            >
              <a href="/resume.pdf" download="Resume_Harine_T.pdf" aria-label="Download complete resume"
                className="btn btn-primary" style={{ borderRadius: '4px' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ marginRight: '8px' }}>
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Complete Resume
              </a>
            </motion.div>
          </>
        )}
      </div>
      <style>{`@media(max-width:992px){.resume-grid{grid-template-columns:1fr!important;gap:60px!important;}}`}</style>
    </section>
  );
}

function TimelineCol({ title, items, inView, delay, style }) {
  const getYear = (period) => {
    const parts = period.split('–');
    const startPart = parts[0].trim();
    const yearMatch = startPart.match(/\d{4}/);
    return yearMatch ? yearMatch[0] : startPart;
  };

  return (
    <div style={style}>
      <p style={{
        fontSize: '0.8rem',
        fontWeight: 700,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: '#FFFFFF',
        fontFamily: 'var(--font-sans)',
        marginBottom: '40px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        paddingBottom: '12px'
      }}>
        {title}
      </p>
      {items.map((entry, i) => (
        <motion.div key={entry.id}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: delay + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', gap: '28px', paddingBottom: '48px', position: 'relative' }}
        >
          {/* Overlapping Satoshi Date Watermark */}
          <div style={{
            position: 'absolute',
            left: '48px',
            top: '-15px',
            fontFamily: 'var(--font-display)',
            fontSize: '5.5rem',
            fontWeight: 900,
            color: 'rgba(255, 255, 255, 0.05)',
            pointerEvents: 'none',
            lineHeight: 1,
            zIndex: 0,
            userSelect: 'none'
          }}>
            {getYear(entry.period)}
          </div>

          {/* Vertical line nodes */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: '6px', position: 'relative', zIndex: 2 }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#FFFFFF',
              boxShadow: '0 0 10px rgba(255,255,255,0.4)',
              flexShrink: 0,
              zIndex: 1
            }} />
            <div style={{ flex: 1, width: '1px', background: 'rgba(255,255,255,0.15)', marginTop: '8px' }} />
          </div>

          {/* Info Details card */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: 'var(--text-on-green)',
              marginBottom: '6px',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.15
            }}>
              {entry.role}
            </p>
            <p style={{
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 600,
              marginBottom: '4px',
              fontFamily: 'var(--font-sans)'
            }}>
              {entry.company}
            </p>
            <p style={{
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.65)',
              marginBottom: '16px',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.05em'
            }}>
              {entry.period}
            </p>
            <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.8)' }}>
              {entry.summary}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Sk() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
      {[1, 2].map((c) => (
        <div key={c}>
          <div style={{ width: '120px', height: '14px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', marginBottom: '32px' }} />
          {[1, 2].map((i) => (
            <div key={i} style={{ display: 'flex', gap: '24px', marginBottom: '40px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', marginTop: '6px', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ width: '60%', height: '16px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', marginBottom: '10px' }} />
                <div style={{ width: '40%', height: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', marginBottom: '16px' }} />
                <div style={{ width: '90%', height: '30px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
