import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function CountUp({ to, duration = 1.6, decimals = 0 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseFloat(to);
    if (start === end) return;

    const totalMs = duration * 1000;
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / totalMs, 1);
      const ease = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      const current = start + (end - start) * ease;

      setValue(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setValue(end);
      }
    };

    requestAnimationFrame(update);
  }, [inView, to, duration]);

  return <span ref={ref}>{value.toFixed(decimals)}</span>;
}

export default function TrustIndicators() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-10% 0px' });

  const metrics = [
    { value: "1", label: "Research Copyright", desc: "Registered GOI (SW-3716/2026-CO)", spec: "Solar AI" },
    { value: "1", label: "AI&ML Internship", desc: "Agnikul Cosmos (IIT Madras)", spec: "Systems" },
    { value: "2", label: "Corporate Simulations", desc: "TATA & Deloitte Data Analytics", spec: "GenAI" },
    { value: "8.58", label: "Academic CGPA", desc: "Computer Science (Upto 5th Sem)", spec: "Precision", decs: 2 }
  ];

  return (
    <section
      id="trust"
      ref={containerRef}
      className="section"
      style={{
        borderBottom: '1px solid var(--border-color)',
        background: 'var(--bg-primary)',
        padding: '120px 0'
      }}
    >
      <div className="dot-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.08 }} />

      <div className="container">
        <div style={{ marginBottom: '60px', textAlign: 'left' }}>
          <span className="label" style={{ display: 'block', marginBottom: '16px', color: 'var(--text-on-green)' }}>
            Performance Credentials
          </span>
          <h2 className="display-lg" style={{ lineHeight: 0.95, color: 'var(--bg-accent)' }}>
            Performance Metrics.
          </h2>
        </div>

        {/* Clean, editorial 4-column horizontal grid */}
        <div className="metrics-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '40px 30px',
          alignItems: 'stretch'
        }}>
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                borderLeft: '1px solid var(--border-color)',
                paddingLeft: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                  fontWeight: 900,
                  color: 'var(--text-on-green)',
                  lineHeight: 1,
                  marginBottom: '12px'
                }}>
                  <CountUp to={m.value} decimals={m.decs || 0} />
                </div>

                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--bg-accent)',
                  display: 'block',
                  marginBottom: '10px',
                  fontFamily: 'var(--font-sans)'
                }}>
                  {m.label}
                </span>

                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  margin: 0,
                  lineHeight: 1.45,
                  fontFamily: 'var(--font-sans)'
                }}>
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 50px 30px !important;
          }
        }
        @media (max-width: 576px) {
          .metrics-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
