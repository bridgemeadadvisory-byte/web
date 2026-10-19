'use client';

import { useState } from 'react';
import { submitContactForm } from '../../lib/api';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      industry: formData.get('industry') as string,
      challenge: formData.get('challenge') as string,
      message: `Phone: ${formData.get('phone')}
Company: ${formData.get('company')}
Industry: ${formData.get('industry')}
Challenge: ${formData.get('challenge')}`
    };

    try {
      await submitContactForm(data);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('idle');
      alert('Failed to submit form. Please try again later.');
    }
  };

  return (
    <>
      <div className="hero" style={{ paddingTop: '8rem', paddingBottom: '4rem', minHeight: 'auto', background: 'var(--navy-900)' }}>
        <div className="wrap">
          <span className="eyebrow" style={{ color: 'var(--teal-bright)' }}>Contact Us</span>
          <h1 className="hero-title">Let's talk about performance.</h1>
          <p className="hero-sub">Schedule a strategy call or send us a message to discuss your organizational challenges.</p>
        </div>
      </div>

      <section className="section section--navy" style={{ paddingTop: '4rem' }}>
        <div className="wrap">
          <div className="contact-grid">
            
            {/* Contact Details */}
            <div>
              <div className="contact-info">
                <p className="body" style={{ color: 'var(--cream-soft)' }}>
                  Whether you're looking to diagnose structural inefficiencies, design better performance systems, or completely manage your people operations, we are here to help.
                </p>
                <div className="contact-details">
                  <div className="cd">
                    <span className="k">Email Us</span>
                    <a href="mailto:Info@bridgemeadadvisory.com" className="v">Info@bridgemeadadvisory.com</a>
                  </div>
                  <div className="cd">
                    <span className="k">Call Us</span>
                    <a href="tel:+2349091769990" className="v">+234 909 176 9990</a>
                  </div>
                  <div className="cd">
                    <span className="k">Visit Our Office</span>
                    <span className="v">3, Kings Court, Keystone Bank Crescent<br/>Off Adeyemo Alakija, Victoria Island<br/>Lagos, Nigeria</span>
                  </div>
                </div>
              </div>

              {/* Map Embed (Dummy for now, using a stylized div or a simple iframe) */}
              <div style={{ marginTop: '3rem', width: '100%', height: '250px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--line-navy)' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.6737578278783!2d3.4137258!3d6.4360334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2b73ebc20b%3A0xc3434de54a323322!2sAdeyemo%20Alakija%20St%2C%20Victoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1690000000000!5m2!1sen!2sng" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bridgemead Advisory Office Location"
                ></iframe>
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="form">
                <h3>Book a Strategy Call</h3>
                
                {status === 'success' ? (
                  <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(39, 168, 158, 0.1)', borderRadius: '8px', border: '1px solid var(--teal)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" style={{ width: '48px', height: '48px', margin: '0 auto 1rem' }}>
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.5rem' }}>Request Received</h4>
                    <p style={{ color: 'var(--cream-soft)', fontSize: '0.95rem' }}>Thank you. A member of our advisory team will be in touch shortly to schedule your call.</p>
                    <button onClick={() => setStatus('idle')} className="btn btn-ghost" style={{ marginTop: '1.5rem', width: 'auto' }}>Submit Another Request</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="field-row">
                      <div className="field">
                        <label>First Name</label>
                        <input type="text" name="firstName" required placeholder="Jane" />
                      </div>
                      <div className="field">
                        <label>Last Name</label>
                        <input type="text" name="lastName" required placeholder="Doe" />
                      </div>
                    </div>
                    <div className="field-row">
                      <div className="field">
                        <label>Work Email</label>
                        <input type="email" name="email" required placeholder="jane@company.com" />
                      </div>
                      <div className="field">
                        <label>Phone Number</label>
                        <input type="tel" name="phone" required placeholder="+234 ..." />
                      </div>
                    </div>
                    <div className="field-row">
                      <div className="field">
                        <label>Company Name</label>
                        <input type="text" name="company" required placeholder="Your Organization" />
                      </div>
                      <div className="field">
                        <label>Industry</label>
                        <select name="industry" required style={{ 
                          fontFamily: 'var(--sans)', fontSize: '1rem', color: 'var(--cream)', 
                          background: 'rgba(255,255,255,.04)', border: '1px solid var(--line-navy)', 
                          borderRadius: '10px', padding: '.8rem .9rem', width: '100%', appearance: 'none'
                        }}>
                          <option value="" disabled selected>Select Industry...</option>
                          <option value="finance">Financial Services & Fintech</option>
                          <option value="energy">Oil & Gas / Energy</option>
                          <option value="agri">Agribusiness</option>
                          <option value="manufacturing">Industrial Manufacturing</option>
                          <option value="ict">ICT & Telecoms</option>
                          <option value="mining">Maritime & Mining</option>
                          <option value="sme">SME</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="field">
                      <label>What performance or workforce challenge are you looking to solve?</label>
                      <textarea name="challenge" required placeholder="Briefly describe your current situation..."></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={status === 'loading'} style={{ opacity: status === 'loading' ? 0.7 : 1 }}>
                      {status === 'loading' ? 'Submitting...' : 'Submit Request'}
                    </button>
                    <p className="form-note">Your information is strictly confidential and protected by our privacy policy.</p>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
