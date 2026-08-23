import { useState } from "react";

const projects = [
  { number: "01", title: "Q-TES", subtitle: "Quantum Traffic Enhancer System", type: "Quantum optimization", text: "Designed a QAOA-based system with a team to optimize urban traffic-light scheduling during an AUB challenge organized with CAMS, the AUB Quantum Club, and NYU Abu Dhabi.", href: "https://github.com/Hasan-Abbani/qaoa-traffic-optimization", tags: ["QAOA", "Python", "Graph optimization"] },
  { number: "02", title: "Energy intelligence pipeline", subtitle: "ETL & machine-learning system", type: "Data engineering", text: "Built an end-to-end Python pipeline for external API extraction, cleaning, transformation, weekly KPI generation, visualization, forecasting, and anomaly detection.", href: "https://github.com/Hasan-Abbani/ETL-ML-Pipeline-Prod", tags: ["ETL", "APIs", "Forecasting"] },
  { number: "03", title: "Predicting material properties", subtitle: "Neural network research project", type: "Deep learning", text: "Trained a PyTorch neural network on roughly 11,000 materials to predict bulk modulus from theoretical, experimental, and engineered features, reaching an R² of 0.91.", href: null, tags: ["PyTorch", "Neural networks", "Materials science"] },
  { number: "04", title: "Signals in time series", subtitle: "Candlestick-based analysis", type: "Applied ML", text: "Engineered geometric candlestick features and evaluated machine-learning models to test predictive signal in short-term financial time series.", href: "https://colab.research.google.com/drive/18Ig6K9FJ-_T0bA8UKKpRv_QH4u0f0HSO?usp=sharing", tags: ["Feature engineering", "Time series", "Model evaluation"] },
  { number: "05", title: "The Collatz conjecture", subtitle: "A statistical approach", type: "Statistical analysis", text: "Used statistical analysis and visualization to make predictions about the behavior of numbers in the Collatz conjecture.", href: "https://www.kaggle.com/code/hasanalmojtaba/a-statistical-approach-to-the-collatz-conjecture", tags: ["Statistics", "Visualization", "Kaggle"] },
  { number: "06", title: "Pulsar classification", subtitle: "Classifying pulsar light", type: "Machine learning", text: "Applied advanced machine-learning techniques, visualization, and data augmentation to classify the light of pulsars.", href: "https://colab.research.google.com/drive/1W7WEwiv7jaF7IQZoojjpxyupOjiD9S6n?usp=sharing", tags: ["Classification", "Data augmentation", "Visualization"] },
  { number: "07", title: "Simulating prey-predator systems", subtitle: "Population dynamics", type: "Mathematical modeling", text: "Explained the Lotka-Volterra prey-predator model, and introduced a grid-based simulation approach to address limitations in highly idealized conventional population-growth systems.", href: "https://www.kaggle.com/code/hasanalmojtaba/simulating-prey-predator-system", tags: ["Lotka-Volterra", "Grid simulation", "Kaggle"] },
  { number: "08", title: "Sampling-based estimation of graphs", subtitle: "Bounded vertex cover counting", type: "Randomized algorithms", text: "Studied the problem of estimating how many labeled graphs on n vertices have vertex-cover number at most k, where exact FPT counting becomes impractical for moderate k. Developed BOPO with a teammate to grow random graph samples and stop early once the bound fails.", href: null, tags: ["BOPO", "Monte Carlo", "Graph theory"] },
];

export default function Work() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 4);
  const hiddenProjectCount = projects.length - visibleProjects.length;

  return (
    <section id="projects" className="page-section projects-section">
      <div className="section-label"><span>03</span><p>Selected projects</p></div>
      <div className="section-heading"><h2><em>Tangibles.</em></h2></div>
      <div className="project-grid">
        {visibleProjects.map((project) => <article className="project-card" key={project.number}>
          <div className="project-top"><span>{project.number}</span><p>{project.type}</p>{project.href && <a href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.title}`}>↗</a>}</div>
          <div><p className="project-subtitle">{project.subtitle}</p><h3>{project.title}</h3><p className="project-copy">{project.text}</p></div>
          <div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        </article>)}
      </div>
      {projects.length > 4 && (
        <div className="project-expand">
          <button
            type="button"
            className="project-expand-button"
            onClick={() => setShowAllProjects((isShowing) => !isShowing)}
            aria-expanded={showAllProjects}
          >
            {showAllProjects ? "Show fewer projects" : `Show ${hiddenProjectCount} more projects`}
            <span aria-hidden="true">{showAllProjects ? "↑" : "↓"}</span>
          </button>
        </div>
      )}
    </section>
  );
}
