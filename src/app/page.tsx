import Link from 'next/link';
import { FadeUp, StaggerContainer, StaggerItem } from '../components/Animate';
import { getBlogs } from '../lib/api';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const latestPosts = (await getBlogs()).slice(0, 3);

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero" id="top">
        <div className="wrap">
          <StaggerContainer className="hero-grid">
            <div className="hero-copy">
              <StaggerItem>
                <h1 className="hero-title">
                  Your People Business Partner.
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="hero-sub">
                  We are a productivity and performance firm. We find where performance is being lost inside your workforce, build the systems that restore it, and operate the people function on your behalf.
                </p>
              </StaggerItem>
              <StaggerItem className="hero-actions">
                <Link href="/contact" className="btn btn-primary">
                  Book a Strategy Call
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <a href="/Bridgemead-Advisory-Company-Profile.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">See How We Work</a>
              </StaggerItem>
            </div>
            <StaggerItem className="hero-media">
              <img src="/hero.jpg" alt="Bridgemead Advisory Team" />
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* THREE TIERS */}
      <section id="modes" className="section section--cream">
        <FadeUp>
          <div className="wrap">
            <div className="head-block">
              <span className="eyebrow">How we work with you</span>
              <h2 className="h2">Three Tiers. One question.</h2>
              <p className="lede">Where is performance being lost? Engage one Tier, or move through all three. The right Tier depends on where the problem sits and how deep the recovery needs to go.</p>
            </div>
            <StaggerContainer className="modes">
              <StaggerItem className="mode">
                <div className="mode-top">
                  <span className="mode-num">01</span>
                  <span className="mode-verb">Diagnose</span>
                </div>
                <div className="rule"></div>
                <h3>Performance Diagnostics and Advisory</h3>
                <p>Find exactly where performance is leaking before you spend on fixes. The output is clarity, not paperwork.</p>
              </StaggerItem>
              <StaggerItem className="mode">
                <div className="mode-top">
                  <span className="mode-num">02</span>
                  <span className="mode-verb">Design and build</span>
                </div>
                <div className="rule"></div>
                <h3>Performance Systems Design and Build</h3>
                <p>Build the fix and embed it: systems, structures, pipelines, reward, capability. We stay until it is in use.</p>
              </StaggerItem>
              <StaggerItem className="mode">
                <div className="mode-top">
                  <span className="mode-num">03</span>
                  <span className="mode-verb">Operate</span>
                </div>
                <div className="rule"></div>
                <h3>Managed Workforce Services</h3>
                <p>Step into the people machinery, fully or in part, and run it to a higher standard than you can internally.</p>
              </StaggerItem>
            </StaggerContainer>

            <p className="modes-note"><span>&#9656;</span> One question runs through every engagement: where is this organisation losing productivity, and how do we restore it through the workforce?</p>
          </div>
        </FadeUp>
      </section>

      {/* RESULTS / STATS */}
      <section id="results" className="section section--deep">
        <FadeUp>
          <div className="wrap">
            <div className="head-block">
              <span className="eyebrow">The Impact</span>
              <h2 className="h2">We don't hand over framework. We deliver outcomes you can measure.</h2>
            </div>
            <StaggerContainer className="stats">
              <StaggerItem className="stat">
                <div className="num"><span className="pre">₦</span>500<small>M+</small></div>
                <p className="label">in Client Cost Savings Identified through structural workforce audits.</p>
              </StaggerItem>
              <StaggerItem className="stat">
                <div className="num"><span className="pre">₦</span>200<small>M+</small></div>
                <p className="label">in Client Revenue Growth Supported via aligned performance systems.</p>
              </StaggerItem>
              <StaggerItem className="stat">
                <div className="num">95<small>%</small></div>
                <p className="label">Client Retention Rate, reflecting our commitment to long-term partnerships.</p>
              </StaggerItem>
            </StaggerContainer>

            <StaggerContainer className="clients" id="clients">
              <span className="eyebrow">Trusted By Leaders In</span>
              <div className="ind-grid">
                <StaggerItem className="ind"><span className="ix">01</span> Financial Services & Fintech</StaggerItem>
                <StaggerItem className="ind"><span className="ix">02</span> Oil & Gas / Energy</StaggerItem>
                <StaggerItem className="ind"><span className="ix">03</span> Agribusiness</StaggerItem>
                <StaggerItem className="ind"><span className="ix">04</span> Industrial Manufacturing</StaggerItem>
                <StaggerItem className="ind"><span className="ix">05</span> ICT & Telecoms</StaggerItem>
                <StaggerItem className="ind"><span className="ix">06</span> Healthcare and Pharma</StaggerItem>
                <StaggerItem className="ind"><span className="ix">07</span> Construction & Infrastructure</StaggerItem>
              </div>
            </StaggerContainer>
          </div>
        </FadeUp>
      </section>

      {/* LEADERSHIP PREVIEW */}
      <section id="team" className="section section--navy">
        <FadeUp>
          <div className="wrap">
            <div className="head-block">
              <span className="eyebrow">Leadership</span>
              <h2 className="h2">Guided by deep cross-sector expertise.</h2>
              <p className="lede">Meet the minds helping Nigerian enterprises bridge the performance gap.</p>
            </div>

            <StaggerContainer className="lead-card">
              <StaggerItem className="lead-photo">
                <img src="/md.png" alt="Oluremi Onibudo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </StaggerItem>
              <div className="lead-body">
                <StaggerItem>
                  <h3>Oluremi Onibudo</h3>
                  <p className="role">Managing Director</p>
                </StaggerItem>
                <StaggerItem>
                  <p>Oluremi leads Bridgemead with a singular focus on aligning workforce output with corporate strategy. She brings extensive experience in diagnosing structural inefficiencies and building high-performance cultures across major Nigerian sectors.</p>
                </StaggerItem>
                <StaggerItem style={{ marginTop: '1.5rem' }}>
                  <Link href="/team" className="btn btn-ghost">Meet the Entire Team & Advisory Board →</Link>
                </StaggerItem>
              </div>
            </StaggerContainer>
          </div>
        </FadeUp>
      </section>

      {/* OUR CLIENTS */}
      <section className="section section--cream" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <FadeUp>
          <div className="wrap">
            <div className="head-block" style={{ marginBottom: '2rem' }}>
              <span className="eyebrow">Our Clients</span>
              <h2 className="h2">Trusted by industry leaders.</h2>
            </div>
            <StaggerContainer>
              <StaggerItem>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
                  <img src="/number%201.png" alt="Client 1" style={{ maxHeight: '50px', maxWidth: '18%', objectFit: 'contain' }} />
                  <img src="/number%202.png" alt="Client 2" style={{ maxHeight: '50px', maxWidth: '18%', objectFit: 'contain' }} />
                  <img src="/number%203.png" alt="Client 3" style={{ maxHeight: '50px', maxWidth: '18%', objectFit: 'contain' }} />
                  <img src="/number%204.png" alt="Client 4" style={{ maxHeight: '50px', maxWidth: '18%', objectFit: 'contain' }} />
                  <img src="/number%205.png" alt="Client 5" style={{ maxHeight: '50px', maxWidth: '18%', objectFit: 'contain' }} />
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </FadeUp>
      </section>

      {/* INSIGHTS PREVIEW */}
      {latestPosts.length > 0 && (
      <section className="section section--paper">
        <FadeUp>
          <div className="wrap">
            <div className="head-block" style={{ marginBottom: '2rem' }}>
              <span className="eyebrow">Insights</span>
              <h2 className="h2">Latest thinking on performance & productivity.</h2>
            </div>
            <StaggerContainer className="board-grid">
              {latestPosts.map((post) => (
                <StaggerItem className="bcard" key={post.slug}>
                  <div className="bcard-photo">
                    <img src={post.coverImage || 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop'} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="bcard-body">
                    <h3>{post.title}</h3>
                    <p className="role">{[post.createdAt && new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }), post.readTime].filter(Boolean).join(' • ')}</p>
                    {post.excerpt && <p>{post.excerpt}</p>}
                    <div style={{ marginTop: '1rem' }}>
                      <Link href={`/blog/${post.slug}`} style={{ color: 'var(--navy)', fontWeight: 'bold', fontSize: '0.9rem' }}>Read Article →</Link>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Link href="/blog" className="btn btn-ghost" style={{ color: 'var(--ink)', borderColor: 'var(--line-light)' }}>View All Articles & Insights →</Link>
            </div>
          </div>
        </FadeUp>
      </section>
      )}
    </>
  );
}
