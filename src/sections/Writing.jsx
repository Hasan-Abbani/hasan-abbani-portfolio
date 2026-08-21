import { Link } from "react-router-dom";
import { posts } from "../posts";

export default function Writing() {
  const externalLinks = {
    "the-science-of-existence": "https://thescienceofexistence.wordpress.com/",
    mentory: "https://mentoryblog.wordpress.com/",
  };

  return (
    <section id="writing" className="page-section writing-section">
      <div className="section-label light"><span>06</span><p>Writing</p></div>
      <div className="section-heading split"><h2><em>Writings and contemplations.</em></h2></div>
      <div className="writing-grid">
        {posts.map((post, index) => {
          const externalUrl = externalLinks[post.slug];
          const CardLink = externalUrl ? "a" : Link;
          const linkProps = externalUrl
            ? { href: externalUrl, target: "_blank", rel: "noreferrer" }
            : { to: `/writing/${post.slug}` };

          return (
            <CardLink
              {...linkProps}
              className="writing-card"
              key={post.slug}
              onClick={() => window.sessionStorage.setItem("portfolio-scroll-position", String(window.scrollY))}
            >
              <div><span>0{index + 1}</span><span>Coming soon</span></div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="writing-arrow">↗</span>
            </CardLink>
          );
        })}
      </div>
    </section>
  );
}
