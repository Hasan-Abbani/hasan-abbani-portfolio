const capabilities = [
  ["01", "Data & analytics", "Python, R, SQL, Power BI, exploratory analysis, KPI reporting and visualization."],
  ["02", "Machine learning", "Scikit-learn, PyTorch, supervised and unsupervised learning, model selection and evaluation."],
  ["03", "Intelligent systems", "Transformers, attention, generative AI concepts, reinforcement learning and optimization."],
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
