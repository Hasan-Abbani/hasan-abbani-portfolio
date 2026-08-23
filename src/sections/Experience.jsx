const roles = [
  { period: "Sep - Dec 2025", role: "Teaching Assistant · Data Science Lab", org: "American University of Beirut", text: "Supported undergraduate Python and R labs, guiding students through exploratory analysis, visualization, model interpretation, and stronger computational workflows." },
  { period: "Sep 2023 - Jun 2024", role: "Research Intern", org: "Materials Science Research Laboratory · BAU", text: "Contributed to research on the dielectric properties of a ferrite nanocomposite while gaining hands-on laboratory and academic writing experience." },
  { period: "Jan 2023 - Jun 2024", role: "Mathematics & Physics Tutor", org: "Private Tutoring", text: "Tutored secondary and undergraduate students in mathematics, physics, and biophysics, translating technical ideas into clear, approachable explanations." },
  { period: "Nov 2021 - Dec 2022", role: "Team Leader", org: "Bariq", text: "Led and coordinated two photography teams of around 40 members, delivered training sessions, and organized participation in community events." },
];

export default function Experience() {
  return (
    <section id="experience" className="page-section experience-section">
      <div className="section-label light"><span>02</span><p>Experience</p></div>
      <div className="section-heading split"><h2>Experience.</h2></div>
      <div className="experience-list">
        {roles.map((item, index) => <article key={item.role}><span className="role-index">0{index + 1}</span><p className="role-period">{item.period}</p><div><h3>{item.role}</h3><h4>{item.org}</h4></div><p className="role-copy">{item.text}</p></article>)}
      </div>
    </section>
  );
}
