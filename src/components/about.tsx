export default function About() {
  return (
    <section
      className="max-w-3xl mx-auto px-6 py-16"
      style={{ contentVisibility: "auto", containIntrinsicSize: "0 500px" }}
    >
      <div className="reveal">
        <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">About</h2>
      </div>
      <p className="reveal mt-6 text-text-muted text-base sm:text-lg leading-relaxed">
        Senior Software Engineer with 15+ years building full-stack products across mobile, web, and
        cloud. I lead a team of 3 engineers, co-lead the Frontend Chapter, and own the architecture
        of a micro-frontend platform used across multiple product teams. I build custom AI
        integrations using MCP tooling that connects engineering systems and accelerates delivery.
      </p>
      <p className="reveal mt-4 text-text-muted text-base sm:text-lg leading-relaxed">
        Born in Recife, Brazil, I bring that same energy to engineering: consistent, persistent, and
        always aligned with the team.
      </p>
    </section>
  );
}
