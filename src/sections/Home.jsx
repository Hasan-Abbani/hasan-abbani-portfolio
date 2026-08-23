import portrait from "../assets/hasan-abbani.jpeg";

export default function Home() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Data Scientist &middot; Researcher &middot; Writer</p>
          <h1 id="hero-title" className="interactive-name">
            <span className="name-line name-first">Hi, I’m Hasan</span>
          </h1>
          <p className="hero-lede">
            I'm a knowledge enthusiast, interested in everything data, and a keen interest in algorithms, physics, and understanding humans. With a hobby of approaching problems from different perspectives.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">Explore my work <span className="button-dot" aria-hidden="true" /></a>
            <a className="button text" href="mailto:hsnabbani@gmail.com">Let’s connect <span>→</span></a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="orbit orbit-one"><i /></div>
          <div className="orbit orbit-two"><i /></div>
          <div className="orbit-photo"><img src={portrait} alt="" /></div>
          <p>Beirut, Lebanon</p>
        </div>
      </div>
      <div className="hero-foot">
        <span>MSc Computational Science @ AUB</span>
        <span>Scroll to discover</span>
      </div>
    </section>
  );
}
