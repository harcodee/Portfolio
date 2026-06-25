import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { getProjects } from '../lib/api';

const revealUp = {
  hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  useEffect(() => {
    getProjects(true)
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="section block-green" ref={sectionRef} style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
      <div className="section-number" style={{ top: '60px', right: '40px' }}>02</div>
      <div className="container">

        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '100px' }}
        >
          <span className="label" style={{ display: 'block', marginBottom: '16px' }}>Case Studies</span>
          <h2 className="display-lg" style={{ color: 'var(--bg-accent)' }}>Featured Systems &amp;<br />Digital Products.</h2>
          <p className="body-text" style={{ maxWidth: '600px', marginTop: '20px', color: 'rgba(255, 255, 255, 0.85)' }}>
            A detailed look at engineering solutions, bridging cryptographic authentication protocols, machine learning diagnoses, and full-stack systems architecture.
          </p>
        </motion.div>

        {/* Large Cards List */}
        {loading ? <Skeleton /> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '140px' }}>
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const [hovered, setHovered] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      variants={revealUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="project-large-card"
      style={{
        display: 'grid',
        gridTemplateColumns: isEven ? '1fr 1.1fr' : '1.1fr 1fr',
        gap: '80px',
        alignItems: 'center'
      }}
    >
      {/* Visual Mock-up Column */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          order: isEven ? 1 : 2,
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          background: 'var(--bg-secondary)', /* Deeper green background */
          border: '1px solid var(--border-color)',
          aspectRatio: '1.3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: hovered ? '0 30px 60px rgba(0,0,0,0.15)' : '0 15px 40px rgba(0,0,0,0.05)',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Soft Background Grid */}
        <div className="dot-pattern" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

        {project.liveUrl ? (
          /* Browser Mockup Shell containing the 50%-scale interactive iframe */
          <div style={{
            position: 'absolute',
            inset: '16px',
            background: '#151515',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 2,
            transform: hovered ? 'scale(1.02)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            {/* Mock browser header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 16px',
              background: '#1C1C1C',
              borderBottom: '1px solid #2A2A2A',
              flexShrink: 0
            }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
              </div>
              <span style={{
                fontFamily: 'monospace',
                fontSize: '9px',
                color: 'rgba(255, 255, 255, 0.4)',
                letterSpacing: '0.05em',
                background: '#121212',
                padding: '3px 16px',
                borderRadius: '4px',
                width: '60%',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {project.liveUrl}
              </span>
              <div style={{ width: '36px' }} />
            </div>

            {/* Iframe Viewport */}
            <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%', background: '#151515', overflow: 'hidden' }}>
              <iframe
                src={project.liveUrl}
                title={project.title}
                onLoad={() => setIframeLoaded(true)}
                style={{
                  width: '200%',
                  height: '200%',
                  border: 'none',
                  transform: 'scale(0.5)',
                  transformOrigin: 'top left',
                  pointerEvents: hovered ? 'auto' : 'none',
                  transition: 'opacity 0.6s ease',
                  opacity: iframeLoaded ? 1 : 0
                }}
              />

              {/* Seamless load state displaying target SVG/CSS visual model under live screen */}
              {!iframeLoaded && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#151515',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1
                }}>
                  {/* Custom CSS/SVG Mockup Terminals */}
                  <div style={{ width: '100%', height: '100%', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'monospace' }}>
                    {project.slug === 'proof-lock' ? (
                      <>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                          <div className="biometric-scanner-ring" style={{ position: 'relative', width: '76px', height: '76px', borderRadius: '50%', border: '2px dashed rgba(131, 189, 32, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6ca30d" strokeWidth="1.5">
                              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                              <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 19v4M8 23h8" />
                            </svg>
                            <div style={{
                              position: 'absolute', left: 0, right: 0, height: '2px', background: '#6ca30d',
                              boxShadow: '0 0 8px #6ca30d',
                              animation: 'scan 2.4s ease-in-out infinite'
                            }} />
                          </div>
                          <div style={{ fontSize: '9px', color: '#CCCCCC', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ color: '#10B981' }}>▶ ZK_PROOF INIT</span>
                            <span>▶ KEYGEN ACTIVE...</span>
                            <span style={{ color: '#6ca30d', fontWeight: 'bold' }}>▶ STATE: LOADING LIVE...</span>
                          </div>
                        </div>
                        <div style={{ fontSize: '8px', color: '#555', borderTop: '1px solid #222', paddingTop: '6px', display: 'flex', justifyContent: 'space-between' }}>
                          <span>SUPABASE DB</span>
                          <span>ESTABLISHING IFRAME...</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <svg width="100%" height="70" style={{ borderBottom: '1px solid #222' }}>
                            <line x1="0" y1="35" x2="100%" y2="35" stroke="#222" />
                            <path
                              d="M0 35 L40 35 L48 15 L55 55 L62 5 L70 45 L77 35 L120 35 L128 15 L135 55 L142 5 L150 45 L157 35 L200 35"
                              fill="none"
                              stroke="#6ca30d"
                              strokeWidth="2"
                              style={{
                                strokeDasharray: '600',
                                strokeDashoffset: '600',
                                animation: 'heartbeat 3s linear infinite'
                              }}
                            />
                          </svg>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '9px', color: '#CCCCCC' }}>
                            <span style={{ color: '#6ca30d', fontWeight: 'bold' }}>ECG DIAGNOSIS</span>
                            <span>CONNECTING IFRAME...</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Full Screen Custom Mockup Terminal when no liveUrl is present */
          <div
            className="custom-mockup-terminal"
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '85%',
              height: '80%',
              background: '#151515',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '6px',
              zIndex: 2,
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              overflow: 'hidden'
            }}
          >
            {/* Terminal Title Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid #2A2A2A', background: '#1C1C1C' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#666', letterSpacing: '0.05em' }}>
                {project.slug === 'proof-lock' ? 'ZK_BIO_SECURE_AUTH' : 'ECG_RISK_PREDICT_ML'}
              </span>
            </div>

            {/* Terminal Content */}
            <div style={{ flex: 1, padding: '20px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'monospace' }}>
              {project.slug === 'proof-lock' ? (
                <>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <div className="biometric-scanner-ring" style={{ position: 'relative', width: '90px', height: '90px', borderRadius: '50%', border: '2px dashed rgba(131, 189, 32, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6ca30d" strokeWidth="1.5" style={{ opacity: 0.85 }}>
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                        <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 19v4M8 23h8" />
                      </svg>
                      <div style={{
                        position: 'absolute', left: 0, right: 0, height: '2px', background: '#6ca30d',
                        boxShadow: '0 0 8px #6ca30d',
                        animation: 'scan 2.4s ease-in-out infinite'
                      }} />
                    </div>
                    <div style={{ fontSize: '10px', color: '#CCCCCC', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ color: '#10B981' }}>▶ ZERO-KNOWLEDGE PROOF INITIATED</span>
                      <span>▶ GENERATING SECURE ZK_KEY...</span>
                      <span>▶ BIOMETRIC DATA SHIELDED [OK]</span>
                      <span style={{ color: '#6ca30d', fontWeight: 'bold' }}>▶ MATCH STATUS: VERIFIED 100%</span>
                    </div>
                  </div>
                  <div style={{ fontSize: '9px', color: '#555', borderTop: '1px solid #222', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>SUPABASE PROOF_DB</span>
                    <span>AES-256-ZKP</span>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <svg width="100%" height="80" style={{ borderBottom: '1px solid #222' }}>
                      <line x1="0" y1="40" x2="100%" y2="40" stroke="#222" />
                      <path
                        d="M0 40 L40 40 L48 20 L55 60 L62 5 L70 50 L77 40 L120 40 L128 20 L135 60 L142 5 L150 50 L157 40 L200 40 L208 20 L215 60 L222 5 L230 50 L237 40 L280 40 L288 20 L295 60 L302 5 L310 50 L317 40 L360 40"
                        fill="none"
                        stroke="#6ca30d"
                        strokeWidth="2"
                        style={{
                          strokeDasharray: '600',
                          strokeDashoffset: '600',
                          animation: 'heartbeat 3s linear infinite'
                        }}
                      />
                    </svg>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '10px', color: '#CCCCCC' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '9px', color: '#555' }}>HEART RATE</span>
                        <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 'bold' }}>72 <span style={{ fontSize: '10px', color: '#EF4444' }}>BPM</span></span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <span style={{ fontSize: '9px', color: '#555' }}>HEART DISEASE RISK</span>
                        <span style={{ color: '#10B981', fontSize: '14px', fontWeight: 'bold' }}>LOW RISK (94.2%)</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Text Narrative Column */}
      <div style={{ order: isEven ? 2 : 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

        {/* Context Label */}
        <span className="label" style={{ display: 'block', marginBottom: '16px', color: 'rgba(255, 255, 255, 0.85)' }}>
          {project.context}
        </span>

        {/* Title */}
        <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#FFFFFF', marginBottom: '24px', lineHeight: 1.1, fontFamily: 'var(--font-display)', fontWeight: 900 }}>
          {project.title}
        </h3>

        {/* Narrative Description */}
        <p className="body-text" style={{ fontSize: '1.02rem', marginBottom: '32px', color: 'rgba(255, 255, 255, 0.85)' }}>
          {project.description}
        </p>

        {/* Deep Breakdown Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', marginBottom: '36px' }}>
          <div>
            <h4 style={{ fontSize: '0.825rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#FFFFFF', marginBottom: '8px', fontFamily: 'var(--font-sans)', fontWeight: 800 }}>The Problem</h4>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.5 }}>{project.problem}</p>
          </div>
          <div>
            <h4 style={{ fontSize: '0.825rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#FFFFFF', marginBottom: '8px', fontFamily: 'var(--font-sans)', fontWeight: 800 }}>The Solution</h4>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.5 }}>{project.solution}</p>
          </div>
        </div>

        {/* Tech Stack Capsule Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
          {project.tags.map((t) => (
            <span key={t} className="tag" style={{ fontSize: '0.75rem', padding: '4px 12px', background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' }}>
              {t}
            </span>
          ))}
        </div>

        {/* CTA Actions */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ height: '42px', padding: '0 20px', fontSize: '0.85rem' }}>
              <span>Launch Site</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          )}

          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ height: '42px', padding: '0 20px', fontSize: '0.85rem' }}>
              <span>GitHub</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
          )}
        </div>

      </div>
      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes heartbeat {
          to { strokeDashoffset: 0; }
        }
        @media (max-width: 992px) {
          .project-large-card {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .project-large-card > div { order: unset !important; }
        }
      `}</style>
    </motion.div>
  );
}

function Skeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
      {[1, 2].map((i) => (
        <div key={i} style={{ height: '480px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid var(--border-color)', opacity: 0.5 }} />
      ))}
    </div>
  );
}
