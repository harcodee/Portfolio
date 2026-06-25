export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'var(--bg-primary)', padding: '60px 0', borderTop: '1px solid var(--border-color)', position: 'relative' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        
        {/* Back to top button */}
        <button 
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{ 
            background: 'rgba(255, 255, 255, 0.08)', 
            border: '1px solid var(--border-color)', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            color: '#FFFFFF',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#FFFFFF';
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </button>

        {/* Branding copyright info */}
        <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)', margin: 0, fontFamily: 'var(--font-sans)', textAlign: 'center', letterSpacing: '0.04em' }}>
          © {new Date().getFullYear()} Harine T. Engineered with precision.
        </p>
      </div>
    </footer>
  );
}
