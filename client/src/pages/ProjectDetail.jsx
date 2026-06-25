import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProject } from '../lib/api';

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProject(slug)
      .then(setProject)
      .catch((err) => {
        if (err.message?.includes('404') || err.message?.includes('not found')) {
          setError('404');
        } else {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <DetailSkeleton />;

  if (error === '404') {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          paddingTop: '68px',
          background: 'var(--bg-primary)',
          color: '#FFFFFF'
        }}
      >
        <span style={{ fontSize: '4rem' }}>🔍</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>Project not found</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>
          The project <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>{slug}</code> doesn't exist.
        </p>
        <Link to="/" className="btn btn-primary" style={{ borderRadius: '4px', marginTop: '12px' }}>
          ← Back home
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', paddingTop: '68px', background: 'var(--bg-primary)', color: '#FFFFFF' }}>
        <p style={{ color: '#EF4444', fontWeight: 600 }}>Error loading project: {error}</p>
        <button className="btn btn-ghost" style={{ color: '#FFFFFF' }} onClick={() => navigate(-1)}>← Go back</button>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={slug}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ paddingTop: '100px', paddingBottom: '100px', background: 'var(--bg-primary)', minHeight: '100vh', color: '#FFFFFF' }}
        className="block-green"
      >
        {/* Back link */}
        <div className="container" style={{ maxWidth: '800px' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              marginBottom: '40px',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Case Archive
          </Link>

          {/* Context label */}
          <p
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.85)',
              marginBottom: '12px',
            }}
          >
            {project.context}
          </p>

          {/* Title */}
          <h1 style={{ marginBottom: '32px', lineHeight: 1.05, fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{project.title}</h1>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '56px', flexWrap: 'wrap' }}>
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ borderRadius: '4px', height: '42px', padding: '0 20px', fontSize: '0.85rem' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ marginRight: '6px' }}>
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Launch Live Site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ borderRadius: '4px', height: '42px', padding: '0 20px', fontSize: '0.85rem' }}
                aria-label="View source on GitHub"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                Source Repository
              </a>
            )}
          </div>

          {/* Case study banner image */}
          {project.bannerImage && (
            <div
              style={{
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '64px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={project.bannerImage}
                alt={`${project.title} banner`}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              {/* Fallback code graphic placeholder */}
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🖼️</div>
                <p style={{ fontSize: '0.85rem', margin: 0, fontFamily: 'monospace' }}>CASE_STUDY_BANNER.PNG</p>
              </div>
            </div>
          )}

          {/* Narrative Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            <ContentSection title="Overview" content={project.overview} />
            <ContentSection title="The Problem" content={project.problem} />
            <ContentSection title="The Solution" content={project.solution} />

            {/* Tech Stack Pills */}
            {project.techStack?.length > 0 && (
              <div>
                <SectionHeading>Tech Stack</SectionHeading>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tag" style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF', borderColor: 'var(--border-color)' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <ContentSection title="My Role" content={project.myRole} />
            <ContentSection title="Results" content={project.results} />
          </div>

          {/* Screenshot gallery */}
          {project.screenshots?.length > 0 && (
            <div style={{ marginTop: '64px' }}>
              <SectionHeading>Technical Walkthroughs</SectionHeading>
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  overflowX: 'auto',
                  scrollSnapType: 'x mandatory',
                  paddingBottom: '16px',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {project.screenshots.map((src, i) => (
                  <div
                    key={i}
                    style={{
                      flexShrink: 0,
                      width: '360px',
                      aspectRatio: '16/10',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1px solid var(--border-color)',
                      scrollSnapAlign: 'start',
                      background: 'rgba(255,255,255,0.06)',
                    }}
                  >
                    <img
                      src={src}
                      alt={`${project.title} screen ${i + 1}`}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.style.opacity = '0'; }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.main>
    </AnimatePresence>
  );
}

function SectionHeading({ children }) {
  return (
    <h3
      style={{
        fontSize: '1.15rem',
        fontWeight: 800,
        color: '#FFFFFF',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontFamily: 'var(--font-display)'
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: '3px',
          height: '1.1em',
          background: '#FFFFFF',
          borderRadius: '2px',
          flexShrink: 0,
        }}
      />
      {children}
    </h3>
  );
}

function ContentSection({ title, content }) {
  if (!content) return null;
  return (
    <div>
      <SectionHeading>{title}</SectionHeading>
      <p style={{ lineHeight: '1.8', fontSize: '1.02rem', color: 'rgba(255,255,255,0.85)' }}>{content}</p>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ width: '80px', height: '14px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', marginBottom: '40px' }} />
        <div style={{ width: '40%', height: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', marginBottom: '12px' }} />
        <div style={{ width: '70%', height: '44px', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', marginBottom: '24px' }} />
        <div style={{ display: 'flex', gap: '12px', marginBottom: '48px' }}>
          <div style={{ width: '120px', height: '42px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }} />
          <div style={{ width: '100px', height: '42px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }} />
        </div>
        <div style={{ width: '100%', aspectRatio: '16/9', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', marginBottom: '64px', border: '1px solid var(--border-color)' }} />
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ marginBottom: '32px' }}>
            <div style={{ width: '120px', height: '14px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', marginBottom: '12px' }} />
            <div style={{ width: '100%', height: '80px', background: 'rgba(255,255,255,0.06)', borderRadius: '8px' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
