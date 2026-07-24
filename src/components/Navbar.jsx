import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { posts } from "../posts";

const links = [
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["education", "Education"],
  ["writing", "Writing"],
  ["contact", "Contact"],
];

export default function Navbar({ activeSection }) {
  const [open, setOpen] = useState(false);
  const [writingOpen, setWritingOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        setWritingOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.toggle("menu-is-open", open);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("menu-is-open");
    };
  }, [open]);

  const goTo = (event, id) => {
    setOpen(false);
    setWritingOpen(false);
    if (location.pathname !== "/") {
      event.preventDefault();
      navigate(`/#${id}`);
    }
  };

  return (
    <header className="site-nav">
      <nav className="nav-shell" aria-label="Main navigation">
        <Link to="/" className="wordmark" aria-label="Hasan Abbani home">
          <span>HA</span><i aria-hidden="true" />
        </Link>
        <button ref={menuButtonRef} className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="primary-navigation" aria-label={open ? "Close navigation" : "Open navigation"}>
          <span /><span />
        </button>
        <div id="primary-navigation" className={`nav-menu ${open ? "is-open" : ""}`}>
          {links.map(([id, label]) => id === "writing" ? (
            <div className={`nav-writing ${writingOpen ? "is-open" : ""}`} key={id}>
              <a href="#writing" className={activeSection === id ? "active" : ""} onClick={(e) => goTo(e, id)}>{label}</a>
              <button className="writing-toggle" onClick={() => setWritingOpen(!writingOpen)} aria-label={writingOpen ? "Hide writing links" : "Show writing links"} aria-expanded={writingOpen}>
                <svg viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5 6 6.5l5-5" /></svg>
              </button>
              <div className="writing-dropdown">
                <p>Writing</p>
                {posts.map((post) => (
                  <Link key={post.slug} to={`/writing/${post.slug}`} onClick={() => { setOpen(false); setWritingOpen(false); }}>
                    <span>{post.title}</span><b>↗</b>
                  </Link>
                ))}
                <Link to="/writing" className="all-writing" onClick={() => { setOpen(false); setWritingOpen(false); }}>View all writing →</Link>
              </div>
            </div>
          ) : (
            <a key={id} href={`#${id}`} className={activeSection === id ? "active" : ""} onClick={(e) => goTo(e, id)}>{label}</a>
          ))}
          <a className="nav-resume" href="/resume.pdf" download="Hasan_Abbani_Resume.pdf">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0 5-5m-5 5-5-5M5 20h14" /></svg>
            <span>Download resume</span>
          </a>
        </div>
      </nav>
      {open && <button className="nav-backdrop" aria-label="Close navigation" onClick={() => { setOpen(false); setWritingOpen(false); }} />}
    </header>
  );
}
