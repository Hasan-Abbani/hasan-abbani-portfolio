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
        <div><p className="display-copy"><em>Practically curious.</em></p></div>
        <div className="about-body">
          <p>I’m an MSc Computational Science student on the Data Analytics track at the American University of Beirut. My work sits where data, machine learning, and scientific thinking meet.</p>
          <p>With a foundation in physics and a minor in computer science, I enjoy turning difficult questions into measurable problems, then building the tools to answer them.</p>
        </div>
      </div>
      <div className="capability-grid">
        {capabilities.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </section>
  );
}
