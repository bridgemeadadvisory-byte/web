import Link from 'next/link';

export default function Services() {
  return (
    <>
      <div className="hero" style={{ paddingTop: '8rem', paddingBottom: '4rem', minHeight: 'auto' }}>
        <div className="wrap">
          <span className="eyebrow">Products and services bouquet</span>
          <h1 className="hero-title">Services built around one sequence: diagnose, build, operate.</h1>
          <p className="hero-sub">Advisory delivers clarity. Consultancy delivers systems. Workforce Services deliver operational performance. Partnership keeps the gain.</p>
        </div>
      </div>

      <section className="section section--paper">
        <div className="wrap">
          
          {/* TIER 1 */}
          <div className="tier">
            <div className="tier-head">
              <div>
                <div className="tier-tag"><b>Tier 01</b> &middot; <span className="verb">Diagnose</span></div>
                <h3>Performance Diagnostics and Advisory</h3>
              </div>
              <p className="tier-for">For leadership that needs to know exactly where performance is being lost before spending to fix it.</p>
              <div className="tier-note">&#9733; Every advisory engagement starts with the Productivity and Performance Diagnostic, the compulsory entry point.</div>
            </div>
            <div className="svc-grid">
              <div className="svc">
                <div className="svc-name"><span className="star">&#9733;</span> Productivity and Performance Diagnostic</div>
                <div className="svc-desc">Evidence on where you trail peers, industry and your own baseline.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Enterprise, Team and Individual Review</div>
                <div className="svc-desc">Separates leadership issues from team issues from individual capability, so you intervene at the right level.</div>
              </div>
              <div className="svc">
                <div className="svc-name">KPI and Scorecard Alignment Review</div>
                <div className="svc-desc">Confirms your metrics drive the strategy, and flags the ones distorting behaviour.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Performance Governance Review</div>
                <div className="svc-desc">Shows why problems persist for months before anyone acts on them.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Incentive and Reward Alignment Review</div>
                <div className="svc-desc">Reveals whether you pay for the behaviours your strategy needs, or against them.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Continuous Performance Monitoring</div>
                <div className="svc-desc">Read and act on performance signals all year, not at year end.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Change and Transition Advisory</div>
                <div className="svc-desc">Workforce due diligence for mergers, acquisitions, restructures and transformation.</div>
              </div>
            </div>
            <div style={{ marginTop: '2.5rem' }}>
              <Link href="/contact" className="btn btn-primary">Discuss Tier 01</Link>
            </div>
          </div>

          {/* TIER 2 */}
          <div className="tier">
            <div className="tier-head">
              <div>
                <div className="tier-tag"><b>Tier 02</b> &middot; <span className="verb">Design and build</span></div>
                <h3>Performance Systems Design and Build</h3>
              </div>
              <p className="tier-for">For organisations that know what is broken and need someone to build the fix and embed it.</p>
            </div>
            
            <p className="subgroup">Performance, Reward and Capability</p>
            <div className="svc-grid">
              <div className="svc">
                <div className="svc-name">Performance Management System Rollout</div>
                <div className="svc-desc">A framework managers actually use, with visible accountability across the organisation.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Workforce Strategy and Competency Framework</div>
                <div className="svc-desc">A role based map of the capabilities your strategy requires.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Succession Planning and Leadership Pipeline</div>
                <div className="svc-desc">Ready successors for critical roles, protecting continuity at the top.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Rewards, Benchmarking and Incentive Design</div>
                <div className="svc-desc">Pay that retains the people you need and rewards the right outcomes.</div>
              </div>
            </div>

            <p className="subgroup">Leadership and Development</p>
            <div className="svc-grid">
              <div className="svc">
                <div className="svc-name">Leadership and Management Development</div>
                <div className="svc-desc">Strengthens the management layer you depend on to execute.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Executive Coaching and Mentorship</div>
                <div className="svc-desc">Lifts senior and high potential performance where it matters most.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Digital Learning Content Development</div>
                <div className="svc-desc">Scalable capability across distributed teams, without the cost of in person delivery.</div>
              </div>
            </div>

            <p className="subgroup">Talent and Workforce Architecture</p>
            <div className="svc-grid">
              <div className="svc">
                <div className="svc-name">Workforce Planning and Organisational Design</div>
                <div className="svc-desc">A structure aligned to strategy, with overlap and redundancy removed.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Recruitment Process Outsourcing Design</div>
                <div className="svc-desc">A managed model that cuts time to fill and lifts quality of hire.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Onboarding and Reintegration Design</div>
                <div className="svc-desc">Gets new hires productive faster and reintegrates returning staff cleanly.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Graduate Trainee Programme</div>
                <div className="svc-desc">A reliable, lower cost pipeline for long term capability.</div>
              </div>
            </div>
            <div style={{ marginTop: '2.5rem' }}>
              <Link href="/contact" className="btn btn-primary">Discuss Tier 02</Link>
            </div>
          </div>

          {/* TIER 3 */}
          <div className="tier">
            <div className="tier-head">
              <div>
                <div className="tier-tag"><b>Tier 03</b> &middot; <span className="verb">Operate</span></div>
                <h3>Managed Workforce Services</h3>
              </div>
              <p className="tier-for">For organisations whose internal people operations are a constraint on performance, not an enabler.</p>
              <div className="tier-note">&#9733; Every engagement starts with an assessment of your existing capability, so our scope fits the gap precisely.</div>
            </div>

            <p className="subgroup">Workforce Operations and Outsourcing</p>
            <div className="svc-grid">
              <div className="svc">
                <div className="svc-name">End to End Workforce Outsourcing</div>
                <div className="svc-desc">A fully managed people function delivered on your behalf.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Interim Managers and Contract Staffing</div>
                <div className="svc-desc">Experienced cover for transitions and restructures, without permanent cost.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Employee Data and Records Management</div>
                <div className="svc-desc">Clean, organised, compliant records that every people decision can rely on.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Process Documentation and Optimisation</div>
                <div className="svc-desc">Repeatable processes that reduce dependency on key people.</div>
              </div>
            </div>

            <p className="subgroup">Talent Acquisition</p>
            <div className="svc-grid">
              <div className="svc">
                <div className="svc-name">Executive Search and Headhunting</div>
                <div className="svc-desc">Discreet recruitment for senior and mission critical roles.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Onboarding and Reintegration Delivery</div>
                <div className="svc-desc">Operational delivery that speeds time to productive performance.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Workforce Audits, Compliance and Review</div>
                <div className="svc-desc">A clean, defensible view of your workforce and its compliance position.</div>
              </div>
            </div>
            <div style={{ marginTop: '2.5rem' }}>
              <Link href="/contact" className="btn btn-primary">Discuss Tier 03</Link>
            </div>
          </div>

          {/* TIER 4 */}
          <div className="tier">
            <div className="tier-head">
              <div>
                <div className="tier-tag"><b>Tier 04</b> &middot; <span className="verb">Partner</span></div>
                <h3>Ongoing Partnership and Insight</h3>
              </div>
              <p className="tier-for">For organisations that want continuous access to our diagnostic, advisory and operational capability.</p>
            </div>

            <p className="subgroup">Retainer and Managed Service Models</p>
            <div className="svc-grid">
              <div className="svc">
                <div className="svc-name">Advisory Retainer</div>
                <div className="svc-desc">Expert insight on call, before problems escalate.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Productivity and Performance Retainer</div>
                <div className="svc-desc">Structured check ins that catch performance drift before it becomes loss.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Fractional People Leadership</div>
                <div className="svc-desc">Executive grade people leadership without a full time cost. The Office of the People Lead.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Training and Coaching Retainer</div>
                <div className="svc-desc">Continuous development across leadership and operational teams.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Outsourcing and Managed Services Retainer</div>
                <div className="svc-desc">Long term delivery with defined service levels and continuous improvement.</div>
              </div>
            </div>

            <p className="subgroup">Add On Insight Services</p>
            <div className="svc-grid">
              <div className="svc">
                <div className="svc-name">Whitepaper Publications</div>
                <div className="svc-desc">Research that sharpens leadership&rsquo;s view of emerging issues.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Industry and Sector Insight Reports</div>
                <div className="svc-desc">Sector intelligence to inform leadership decisions.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Productivity and Workforce Benchmarks</div>
                <div className="svc-desc">Comparative data you cannot easily source internally.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Salary and Talent Market Intelligence</div>
                <div className="svc-desc">Compensation and availability data for hiring and retention.</div>
              </div>
              <div className="svc">
                <div className="svc-name">Client Branded Insight Publications</div>
                <div className="svc-desc">Thought leadership produced under your own brand.</div>
              </div>
            </div>
            <div style={{ marginTop: '2.5rem' }}>
              <Link href="/contact" className="btn btn-primary">Discuss Tier 04</Link>
            </div>
          </div>

          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <Link href="/contact" className="btn btn-primary">Discuss Your Needs With Us</Link>
          </div>

        </div>
      </section>
    </>
  );
}
