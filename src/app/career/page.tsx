import Link from 'next/link';

export default function Career() {
  return (
    <>
      <div className="hero" style={{ paddingTop: '8rem', paddingBottom: '4rem', minHeight: 'auto' }}>
        <div className="wrap">
          <span className="eyebrow">Careers at Bridgemead</span>
          <h1 className="hero-title">Join a Team of Performance Builders.</h1>
          <p className="hero-sub">We are always looking for exceptional talent to join our mission of restoring performance in Nigerian organizations.</p>
          <div className="hero-actions" style={{ marginTop: '1.5rem' }}>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScFg3N0meYcegSSCYnYCWNrNLoimX9sJZd-YRtiqH3d4cxAhQ/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Talent Pool
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" style={{ width: '18px', height: '18px', marginLeft: '0.5rem' }}>
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <section className="section section--paper">
        <div className="wrap">
          <div className="head-block">
            <span className="eyebrow">Open Positions</span>
            <h2 className="h2">Build the future of workforce performance.</h2>
          </div>
          
          <div style={{ marginTop: '2rem' }}>
            <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              There are currently no open positions. Please check back later, or submit your profile to our talent pool so we can reach out when a suitable role opens up.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScFg3N0meYcegSSCYnYCWNrNLoimX9sJZd-YRtiqH3d4cxAhQ/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Talent Pool
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" style={{ width: '18px', height: '18px', marginLeft: '0.5rem' }}>
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
