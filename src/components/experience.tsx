const ROLES = [
  {
    company: "adidas",
    title: "Senior Software Engineer · Frontend Chapter Lead",
    period: "Jun 2019 to Present",
    location: "Zaragoza, Spain",
    sections: [
      {
        heading: "Leadership",
        items: [
          "Manage 3 direct reports through regular 1:1s, performance reviews, and career planning",
          "Co-lead the Frontend Chapter as 1 of 3 technical leads, setting architecture standards across the micro-frontend platform",
        ],
      },
      {
        heading: "AI Integration & Tooling",
        items: [
          "Built a custom MCP toolchain integrating Instana, Bitbucket, Jira, Confluence, and GitHub to enable AI-assisted engineering workflows",
          "Ran a one-month AI-accelerated delivery experiment combining GitHub Copilot, Figma AI, and custom MCP tooling",
          "Building an MCP server that indexes multiple repositories into a single queryable knowledge base for AI agents across the department",
        ],
      },
      {
        heading: "Platform Engineering",
        items: [
          "Led legacy system rewrite delivered in 2 months against a 1-year estimate, integrating AI tooling across all engineering disciplines",
          "Designed AWS real-time notification system (CDK, Lambda, DynamoDB, API Gateway) serving ~3,000 concurrent users",
          "Migrated micro-frontend shell from Webpack to Vite; rewrote Jenkins shared-library pipelines in Groovy for cross-team reuse",
          "Led Jest → Vitest migration — achieved 40%+ faster CI execution, benchmarked with Hyperfine across multiple environments",
        ],
      },
    ],
  },
  {
    company: "Stellar Fusion",
    title: "Full-Stack Engineer (Contract)",
    period: "Jun 2021 to Jul 2022",
    location: "Remote",
    highlights: [
      "Led full-stack development as team lead (React + Node.js)",
      "Built an Excel-inspired formula evaluation engine running isomorphically in browser and backend",
    ],
  },
  {
    company: "CESAR · Samsung · Motorola",
    title: "Software Engineer → Technical Lead",
    period: "Dec 2010 to May 2019",
    location: "Recife, Brazil",
    highlights: [
      "Built 20+ Android apps published on the Samsung App Store over five years",
      "Shipped Kids Mode — a sandboxed launcher adopted as a Samsung product",
      "Built scalable AWS infrastructure (CDK, Lambda, SQS, CloudFormation) and real-time web scrapers",
      "Developed React/Java/MySQL dashboards for leadership teams on-site in Chicago",
    ],
  },
] as const;

export default function Experience() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <div className="reveal">
        <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
          Experience
        </h2>
      </div>
      <div className="mt-8 space-y-12">
        {ROLES.map((role, i) => (
          <article
            key={role.company}
            className={i % 2 === 0 ? "reveal-left" : "reveal-right"}
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="text-lg font-semibold text-text">{role.company}</h3>
              <span className="text-sm text-text-muted italic whitespace-nowrap">
                {role.period}
              </span>
            </div>
            <p className="text-sm text-text-muted mt-0.5">
              {role.title} · {role.location}
            </p>

            {"sections" in role && role.sections ? (
              <div className="mt-4 space-y-4">
                {role.sections.map((section) => (
                  <div key={section.heading}>
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-accent/70 mb-1.5">
                      {section.heading}
                    </h4>
                    <ul className="space-y-1.5">
                      {section.items.map((item) => (
                        <HighlightItem key={item} text={item} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="mt-3 space-y-1.5">
                {"highlights" in role &&
                  role.highlights.map((h) => <HighlightItem key={h} text={h} />)}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function HighlightItem({ text }: { text: string }) {
  return (
    <li className="text-sm text-text-muted leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent/40">
      {text}
    </li>
  );
}
