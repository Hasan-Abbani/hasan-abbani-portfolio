import { Link } from "react-router-dom";
import { posts } from "../posts";

export default function Writing() {
  return (
    <section id="writing" className="page-section writing-section">
      <div className="section-label light"><span>06</span><p>Writing</p></div>
      <div className="section-heading split"><h2><em>Writings and contemplations.</em></h2></div>
      <div className="writing-grid">
        {posts.map((post, index) => <Link to={`/writing/${post.slug}`} className="writing-card" key={post.slug} onClick={() => window.sessionStorage.setItem("portfolio-scroll-position", String(window.scrollY))}><div><span>0{index + 1}</span><span>Coming soon</span></div><h3>{post.title}</h3><p>{post.excerpt}</p><span className="writing-arrow">↗</span></Link>)}
      </div>
    </section>
  );
}
