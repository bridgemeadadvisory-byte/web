import Link from 'next/link';

export default function Team() {
  const advisors = [
    {
      name: "Toluwalope O. Ikimalo",
      role: "Director",
      desc: "Toluwalope is an insightful and dynamic Director at Bridgemead, where she leads initiatives that strengthen leadership capability and organizational performance. With over 15 years of experience in cross-functional delivery and business growth as well as a deep expertise in workforce management and occupational psychology, she blends strategic thinking with a people-first approach. Her focus on scaling businesses through purposeful leadership and empowered teams continues to drive meaningful transformation across Africa’s talent ecosystem",
      image: "/toluwalope.png"
    },
    {
      name: "Edim Etim-Inyang",
      role: "Advisor (Oil, Gas & Finance)",
      desc: "Edim is a seasoned and results-driven Director at Bridgemead, bringing over 25 years of leadership experience across the oil, gas, and finance sectors. His career spans multinational corporations and major financial institutions, where he has led complex projects and strategic investments across global markets. At Bridgemead, he leverages his technical depth and global insight to advance growth, strengthen partnerships, and guide the firm’s long-term strategic direction.",
      image: "/edim.png"
    },
    {
      name: "Kossiso Udodi",
      role: "Machine Learning Researcher & AI Practitioner",
      desc: "Kossiso Udodi is a machine learning researcher, AI practitioner, and technology innovator with a strong focus on developing AI systems, data infrastructure, and research ecosystems for Africa. Through his work at Electric Sheep Africa, Kossiso has been actively involved in building machine learning solutions, curating large-scale African datasets, advancing AI research, and creating platforms that enable organisations and researchers to leverage data-driven technologies for real-world impact. His work sits at the intersection of artificial intelligence, data science, research, and technology innovation, with a particular emphasis on ensuring that African contexts, datasets, and challenges are represented in the global AI landscape.",
      image: "/kossiso.PNG"
    },

    // {
    //   name: "Olumide Lala",
    //   role: "Advisor (Sustainable Finance, Capital Markets & ESG)",
    //   desc: "Olumide Lala is a finance, sustainability, and climate transition expert with over three decades of experience across capital markets, banking, investment advisory, and sustainable finance. Throughout his career, he has advised financial institutions, investors, and development organisations on integrating environmental, social, and governance (ESG) principles into investment decisions while supporting the development of climate-resilient and future-focused business strategies. His work has contributed to advancing sustainable finance frameworks, climate risk management practices, and innovative financing solutions across Africa, positioning him as a leading voice on the intersection of finance, policy, and long-term economic transformation.",
    //   image: "/olumide.jpg"
    // },
    {
      name: "Femi Adetayo",
      role: "Director",
      desc: "Femi is a visionary and accomplished Director at Bridgemead, where he spearheads innovative talent acquisition strategies and drives business growth. With a strong background in workforce and recruitment. He is dedicated to revolutionizing the recruitment landscape. Driving innovations and delivering exceptional results.",
      image: "/femi.png"
    }
  ];

  return (
    <>
      <div className="hero" style={{ paddingTop: '8rem', paddingBottom: '4rem', minHeight: 'auto', background: 'var(--navy-900)' }}>
        <div className="wrap">
          <span className="eyebrow" style={{ color: 'var(--teal-bright)' }}>Our People</span>
          <h1 className="hero-title">Leadership & Advisory Board</h1>
          <p className="hero-sub">Guided by deep cross-sector expertise. Meet the minds helping Nigerian enterprises bridge the performance gap.</p>
        </div>
      </div>

      <section className="section section--navy">
        <div className="wrap">
          <h2 className="h2" style={{ marginBottom: '1.5rem', color: 'var(--cream)' }}>Managing Director</h2>

          <div className="lead-card">
            <div className="lead-photo">
              <img src="/md.png" alt="Oluremi Onibudo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="lead-body">
              <h3>Oluremi Onibudo</h3>
              <p className="role">Managing Director</p>
              <p>Oluremi leads Bridgemead with a singular focus on aligning workforce output with corporate strategy. She brings extensive experience in diagnosing structural inefficiencies and building high-performance cultures across major Nigerian sectors.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="wrap">
          <h2 className="h2" style={{ marginBottom: '1.5rem', color: 'var(--ink)' }}>Advisory Board</h2>

          <div className="board-grid">
            {advisors.map((advisor, index) => (
              <div className="bcard" key={index} style={{ background: 'var(--line-light)', borderColor: 'var(--line-light)' }}>
                <div className="bcard-photo">
                  {/* @ts-ignore */}
                  <img src={advisor.image || "/advisor.png"} alt={advisor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="bcard-body">
                  <h3 style={{ color: 'var(--ink)' }}>{advisor.name}</h3>
                  <p className="role" style={{ color: 'var(--teal)' }}>{advisor.role}</p>
                  <p style={{ color: 'var(--muted)' }}>{advisor.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <Link href="/contact" className="btn btn-primary">Speak to an Expert</Link>
          </div>

        </div>
      </section>
    </>
  );
}

// for repush repush repush
