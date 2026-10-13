'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="wrap nav-inner">
          <Link href="/" className="brand">
            <img src="/logo.png" alt="Bridgemead Advisory" style={{ height: '36px', width: 'auto' }} />
          </Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/team">Team</Link></li>
            <li><Link href="/blog">Insights</Link></li>
            <li><Link href="/career">Careers</Link></li>
          </ul>
          <div className="nav-cta">
            <Link href="/contact" className="btn btn-primary">
              Book a Strategy Call
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
          <button 
            className="burger" 
            aria-expanded={mobileMenuOpen} 
            aria-label="Toggle Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
      
      <div className={`mobile-panel ${mobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
          <li><Link href="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link></li>
          <li><Link href="/team" onClick={() => setMobileMenuOpen(false)}>Team</Link></li>
          <li><Link href="/blog" onClick={() => setMobileMenuOpen(false)}>Insights</Link></li>
          <li><Link href="/career" onClick={() => setMobileMenuOpen(false)}>Careers</Link></li>
          <li><Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link></li>
        </ul>
        <Link href="/contact" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>
          Book a Strategy Call
        </Link>
      </div>
    </>
  );
}
