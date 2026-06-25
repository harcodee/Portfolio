import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { getSkills } from '../lib/api';

export default function Skills() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  useEffect(() => {
    getSkills()
      .then(setGroups)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getCapabilityTitle = (category) => {
    return category;
  };

  return (
    <section id="skills" className="section block-green" ref={ref} style={{ borderBottom: '1px solid var(--border-color)' }}>
      <div className="section-number" style={{ top: '60px', left: '40px' }}>04</div>
      <div className="container">

        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '80px' }}
        >
          <span className="label" style={{ display: 'block', marginBottom: '16px' }}>
            Core Capabilities
          </span>
          <h2 className="display-lg" style={{ color: 'var(--bg-accent)' }}>Technical Skills & Frameworks</h2>
          <p className="body-text" style={{ maxWidth: '600px', marginTop: '20px' }}>
            Structured capabilities engineered to solve enterprise automation challenges, deploy predictive ML models, and build reliable software platforms.
          </p>
        </motion.div>

        {loading ? <Sk /> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }} className="skills-grid">
            {groups.map((g, gi) => (
              <motion.div key={g.category}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: gi * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`editorial-card skills-card-${gi} ${gi % 2 === 1 ? 'stagger-card' : ''}`}
                style={{
                  padding: '40px 36px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
                  transition: 'transform 0.4s ease, border-color 0.4s ease'
                }}
              >
                {/* Capability Header */}
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-display)',
                  borderBottom: '1px solid rgba(255,255,255,0.12)',
                  paddingBottom: '16px'
                }}>
                  {getCapabilityTitle(g.category)}
                </h3>

                {/* Capability Skills vertical list with connected bulletpoints */}
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  paddingLeft: '24px'
                }}>
                  {/* Connecting vertical line */}
                  <div style={{
                    position: 'absolute',
                    left: '9px',
                    top: '14px',
                    bottom: '14px',
                    width: '2px',
                    background: 'rgba(255, 255, 255, 0.15)'
                  }} />
                  {g.skills.map((skill, si) => (
                    <SkillTile key={skill.name} skill={skill} delay={gi * 0.1 + si * 0.04} inView={inView} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <style>{`
        @media (min-width: 992px) {
          .stagger-card {
            transform: translateY(40px);
          }
          .skills-grid {
            padding-bottom: 40px;
          }
        }
      `}</style>
    </section>
  );
}

function SkillTile({ skill, delay, inView }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '4px 0',
        cursor: 'default'
      }}
    >
      {/* Bullet point connected to the vertical line */}
      <div
        style={{
          position: 'absolute',
          left: '-19px',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: hov ? '#FFFFFF' : 'var(--bg-accent)',
          border: '2px solid var(--bg-secondary)',
          boxShadow: hov ? '0 0 8px #FFFFFF' : 'none',
          zIndex: 2,
          transition: 'all 0.3s ease'
        }}
      />
      <span
        style={{
          fontWeight: 600,
          fontSize: '0.95rem',
          color: hov ? '#FFFFFF' : 'var(--text-secondary)',
          transition: 'all 0.3s ease',
          transform: hov ? 'translateX(6px)' : 'translateX(0)',
          display: 'inline-block'
        }}
      >
        {skill.name}
      </span>
    </motion.div>
  );
}

function Sk() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px' }}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} style={{ height: '360px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', opacity: 0.5 }} />
      ))}
    </div>
  );
}
