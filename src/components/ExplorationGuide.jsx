export default function ExplorationGuide({ guide }) {
  if (!guide) {
    return null;
  }

  return (
    <section className="exploration-guide" aria-label="학생 탐구 가이드">
      <div>
        <p className="eyebrow">Student inquiry</p>
        <h3>{guide.title}</h3>
      </div>

      <ol>
        {guide.prompts.map((prompt) => (
          <li key={prompt}>{prompt}</li>
        ))}
      </ol>
    </section>
  );
}
