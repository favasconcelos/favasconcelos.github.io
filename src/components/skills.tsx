const SKILL_GROUPS = [
  {
    label: "Languages & Runtimes",
    items: ["JavaScript", "TypeScript", "Python", "Java", "Node.js", "Bun"],
  },
  {
    label: "Frameworks",
    items: ["React", "NestJS", "Tailwind CSS"],
  },
  {
    label: "Build Tools",
    items: ["Vite", "Webpack", "Turbopack", "RSPack"],
  },
  {
    label: "Cloud & Infra",
    items: ["AWS", "Kubernetes", "Docker"],
  },
  {
    label: "CI/CD",
    items: ["GitHub Actions", "Jenkins"],
  },
  {
    label: "AI & Automation",
    items: ["MCP", "GitHub Copilot", "Opencode"],
  },
] as const;

export default function Skills() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <div className="reveal">
        <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
          Skills
        </h2>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {SKILL_GROUPS.map((group) => (
          <div key={group.label} className="reveal">
            <h3 className="text-sm font-medium text-text mb-2">{group.label}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="text-xs font-medium text-text-muted bg-surface border border-border rounded px-2.5 py-1 hover:border-accent/40 hover:text-accent transition-colors duration-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
