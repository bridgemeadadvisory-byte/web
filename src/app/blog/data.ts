const basePosts = [
  {
    slug: "rethinking-performance-management",
    title: "Rethinking Performance Management",
    excerpt: "The annual performance review is dead. Here is what modern organizations are replacing it with.",
    date: "Sep 28, 2026",
    author: "Toluwalope O. Ikimalo",
    readTime: "4 min read",
    content: `
For decades, the annual performance review has been the cornerstone of HR management. Yet, studies consistently show that neither managers nor employees find it effective. It is often backward-looking, subjective, and decoupled from actual business results.

### The Shift to Continuous Feedback

High-performing organizations are moving towards continuous performance management. This involves:
- **Frequent check-ins:** Weekly or bi-weekly conversations focused on alignment and coaching.
- **Agile goal setting:** Updating objectives as market conditions change, rather than rigidly adhering to annual goals.
- **Data-driven insights:** Utilizing operational metrics to evaluate performance objectively.

By shifting from evaluation to development, companies can foster a culture of continuous improvement and agility.
    `,
    image: "/blog2.png"
  },
  {
    slug: "closing-strategy-execution-gap",
    title: "Closing the Strategy-Execution Gap in 2026",
    excerpt: "Why most corporate strategies fail at the front line, and how to build the systems that guarantee execution.",
    date: "Oct 12, 2026",
    author: "Oluremi Onibudo",
    readTime: "5 min read",
    content: `
Strategic planning is often treated as an annual event—a retreat where executives draft ambitious goals, followed by a town hall where these goals are announced. But strategy is not an event; it is a hypothesis. And execution is the test of that hypothesis.

### The Breakdown

The gap between strategy and execution usually occurs not because the strategy is flawed, but because the organization lacks the structural alignment to carry it out. Employees at the operational level often do not understand how their daily tasks contribute to the broader objectives.

### Restoring Alignment

To close this gap, organizations must:
1. **Translate strategy into clear KPIs:** Every role must have metrics that directly tie back to the corporate goals.
2. **Build feedback loops:** Leadership needs real-time data on execution roadblocks.
3. **Align rewards:** Compensation must incentivize the behaviors that drive the strategy forward.

By treating the workforce as a highly tuned system rather than a collection of individuals, companies can ensure their strategic vision becomes a daily reality.
    `,
    image: "/blog1.png"
  },

  {
    slug: "esg-corporate-strategy",
    title: "Integrating ESG into Corporate Strategy",
    excerpt: "How forward-thinking Nigerian firms are leveraging ESG frameworks to attract capital and manage risk.",
    date: "Sep 15, 2026",
    author: "Olumide Lala",
    readTime: "6 min read",
    content: `
Environmental, Social, and Governance (ESG) criteria are no longer just a compliance exercise—they are a core component of corporate strategy. As global capital markets increasingly prioritize sustainability, Nigerian firms must adapt to remain competitive.

### The Value Proposition of ESG

Integrating ESG offers several strategic advantages:
- **Access to Capital:** Many institutional investors mandate ESG compliance for their portfolios.
- **Risk Mitigation:** Proactively addressing environmental and social risks prevents future operational disruptions.
- **Brand Equity:** Consumers and top talent are drawn to organizations that demonstrate ethical and sustainable practices.

Firms that embed ESG into their DNA will not only secure funding more easily but will also build resilience against future market shocks.
    `,
    image: "/blog3.png"
  }
];

export const dummyPosts = Array.from({ length: 20 }).map((_, i) => {
  const base = basePosts[i % basePosts.length];
  return {
    ...base,
    slug: `${base.slug}-${i + 1}`,
    title: `${base.title} (Part ${i + 1})`,
  };
});
