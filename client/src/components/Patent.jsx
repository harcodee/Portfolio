import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PATENT = {
  title: 'Software Framework for Automated Solar Sunspot Identification and Characterization',
  subtitle: 'Copyright Registered Software Innovation',
  regNo: 'SW-3716/2026-CO',
  year: '2026',
  filedBy: 'Harine T',
  category: 'Computer Program / AI-Based Software Framework',
  description:
    'An AI-driven software framework designed for automated solar sunspot identification and characterization using a hybrid deep learning approach combining YOLO and CNN models. The system focuses on improving detection accuracy, reducing manual errors, and automating the analysis of solar imagery for efficient sunspot classification and monitoring.',
  status: 'Registered',
  previewImage: '/patent/preview.jpg',
  downloadFile: '/patent/patent.pdf',
};

export default function Patent() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section id="patent" className="section block-green" ref={ref} style={{ borderBottom: '1px solid var(--border-color)' }}>
      <div className="section-number" style={{ top: '60px', left: '40px' }}>01</div>
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '80px' }}
        >
          <span className="label" style={{ display: 'block', marginBottom: '16px' }}>
            Intellectual Property
          </span>
          <h2 className="display-lg" style={{ color: 'var(--bg-accent)' }}>
            Research &amp; Copyrights
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="patent-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '0',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          {/* Left: Description */}
          <div style={{ padding: '60px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Status badge */}
              <span className="pill" style={{
                background: 'rgba(255, 255, 255, 0.08)',
                borderColor: 'rgba(255, 255, 255, 0.25)',
                color: '#FFFFFF',
                marginBottom: '32px',
                display: 'inline-flex'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFFFFF', flexShrink: 0 }} />
                {PATENT.status}
              </span>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--text-on-green)', lineHeight: 1.15, marginBottom: '24px', fontWeight: 800 }}>
                {PATENT.title}
              </h3>

              <p className="body-text" style={{ marginBottom: '40px' }}>
                {PATENT.description}
              </p>

              {/* Metadata */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
                {[
                  ['Registration No.', PATENT.regNo],
                  ['Year', PATENT.year],
                  ['Filed by', PATENT.filedBy],
                  ['Category', PATENT.category],
                ].map(([key, val]) => (
                  <div key={key} style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-sans)', minWidth: '150px', flexShrink: 0 }}>{key}</span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-on-green)' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download button */}
            <a
              href={PATENT.downloadFile}
              download
              className="btn btn-primary"
              style={{ alignSelf: 'flex-start', borderRadius: '4px' }}
              aria-label="Download patent documentation PDF"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ marginRight: '8px' }}>
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Certificate
            </a>
          </div>

          {/* Right: Image preview */}
          <div style={{ position: 'relative', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '440px', overflow: 'hidden', padding: '40px' }}>
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              style={{ width: '65%', maxWidth: '300px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <img
                src={PATENT.previewImage}
                alt="Patent document preview"
                loading="lazy"
                style={{ width: '100%', height: 'auto', display: 'block', filter: 'grayscale(15%) contrast(1.05)' }}
                onError={(e) => { e.target.parentElement.style.display = 'none'; document.getElementById('patent-placeholder').style.display = 'flex'; }}
              />
            </motion.div>

            {/* Placeholder when no image */}
            <div id="patent-placeholder" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', pointerEvents: 'none' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 9h6M9 12h6M9 15h4" />
                </svg>
              </div>
              <p className="body-text" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', textAlign: 'center', maxWidth: '180px' }}>
                Copyright Certificate PDF Loaded
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width:992px) {
          .patent-grid { grid-template-columns:1fr!important; }
        }
      `}</style>
    </section>
  );
}
