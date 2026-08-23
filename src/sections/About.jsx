const capabilities = [
  ["01", "Data & analytics", "Python, R, SQL, Pandas, NumPy, Matplotlib, exploratory analysis, feature engineering, KPI reporting, and data visualization."],
  ["02", "Machine learning", "Scikit-learn and PyTorch for regression, classification, clustering, neural networks, model selection, and evaluation."],
  ["03", "Algorithms & systems", "Optimization, algorithmic graph theory, reinforcement learning, Monte Carlo methods, external data integration, and reproducible pipelines."],
];

export default function About() {
  return (
    <section id="about" className="page-section about-section">
      <div className="section-label"><span>01</span><p>Profile</p></div>
      <div className="about-layout">
        <div><p className="display-copy">About me</p></div>
        <div className="about-body">
          <p>I’m an MSc Computational Science student at AUB with a background in physics and computer science. My work and interests span data science, machine learning, algorithms, and scientific research.</p>
          <p>Beyond technical work, I’m interested in understanding humans and the natural world. I read and write about philosophy, neuroscience, evolution, physics, and existence. The common thread across everything I do is curiosity: looking closely, approaching problems from different perspectives, and following meaningful questions wherever they lead.</p>
        </div>
      </div>
      <div className="capability-grid">
        {capabilities.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </section>
  );
}
