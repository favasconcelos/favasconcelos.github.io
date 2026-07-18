export default function About() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }}>
      <div className="reveal">
        <h2 className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">About</h2>
      </div>
      <p className="reveal text-text-muted mt-6 text-base leading-relaxed sm:text-lg">
        Senior Software Engineer with 15+ years building full-stack products across mobile, web, and cloud. I lead a team of 3 engineers, co-lead the Frontend Chapter, and own the architecture of a
        micro-frontend platform used across multiple product teams. I build custom AI integrations using MCP tooling that connects engineering systems and accelerates delivery.
      </p>
      <p className="reveal text-text-muted mt-4 text-base leading-relaxed sm:text-lg">
        Born in Recife, Brazil, I bring that same energy to engineering: consistent, persistent, and always aligned with the team.
      </p>
    </section>
  );
}
