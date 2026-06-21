const interests = [
  { emoji: "📷", title: "Photography", text: "Finding entire landscapes in tiny details.", href: "https://500px.com/p/hsnabbani" },
  { emoji: "🎻", title: "Classical music", text: "Bach, Vivaldi, and Handel." },
  { emoji: "🌱", title: "Agriculture", text: "Farming, growing, and working with the soil." },
  { emoji: "🌿", title: "Nature", text: "The outdoors is my preferred reset button." },
  { emoji: "🎹", title: "Piano", text: "Currently learning, one piece at a time." },
  { emoji: "📚", title: "Reading", text: "Science, neuroscience, physics, philosophy, and evolution." },
  { emoji: "✍️", title: "Writing", text: "Science, existence, human nature, and evolution." },
  { emoji: "🏊", title: "Sports", text: "Swimming, ping-pong, and the gym." },
  { emoji: "🔬", title: "Research", text: "Following good questions wherever they lead." },
];

export default function Interests() {
  return (
    <section id="interests" className="page-section interests-section">
      <div className="section-label"><span>05</span><p>Personal interests</p></div>
      <div className="personal-section">
        <div className="interests-panel">
          <div className="interests-header"><span>Off the clock</span><h2>Things I care about.</h2></div>
          <div className="interest-boxes" role="list">
            {interests.map((interest) => {
              const content = <><span className="interest-emoji" aria-hidden="true">{interest.emoji}</span><h3>{interest.title}</h3><p>{interest.text}</p>{interest.href && <span className="interest-link">View 500px ↗</span>}</>;
              return interest.href ? (
                <a key={interest.title} className="interest-box" href={interest.href} target="_blank" rel="noreferrer" role="listitem">{content}</a>
              ) : (
                <article key={interest.title} className="interest-box" role="listitem">{content}</article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
