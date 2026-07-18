const SKILL_GROUPS = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java"],
  },
  {
    label: "Frameworks",
    items: ["React", "Node.js", "NestJS", "Bun", "Tailwind CSS"],
  },
  {
    label: "Cloud & Infra",
    items: ["AWS", "Kubernetes", "Docker", "Terraform"],
  },
  {
    label: "CI/CD & Tools",
    items: ["GitHub Actions", "Jenkins", "Vite", "Webpack"],
  },
  {
    label: "AI & Agentic",
    items: ["MCP", "GitHub Copilot", "tree-sitter", "Opencode"],
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
