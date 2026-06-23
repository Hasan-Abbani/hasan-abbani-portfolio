import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SpaceJourney from "./components/SpaceJourney";
import Home from "./sections/Home";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Work from "./sections/Work";
import Education from "./sections/Education";
import Interests from "./sections/Interests";
import Writing from "./sections/Writing";
import Contact from "./sections/Contact";

const BlogPage = lazy(() => import("./components/BlogPage"));
const WritingIndex = lazy(() => import("./components/WritingIndex"));
const NotFound = lazy(() => import("./components/NotFound"));
const sections = ["about", "experience", "projects", "education", "interests", "writing", "contact"];

export default function App() {
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const isBlogRoute = location.pathname.startsWith("/writing/") && location.pathname !== "/writing";

  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      setTimeout(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" }), 80);
    }
  }, [location]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: "-42% 0px -48%" }
    );
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    const root = document.documentElement;
    const updateScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      const progress = available > 0 ? (window.scrollY / available) * 100 : 0;
      root.style.setProperty("--scroll-progress", `${progress}%`);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  useEffect(() => {
    if (location.pathname !== "/" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = document.querySelectorAll(
      ".page-section > .section-label, .page-section > .section-heading, .about-layout, .capability-grid, .experience-list, .project-grid, .education-layout, .education-note, .personal-section, .writing-grid, .contact-layout"
    );
    elements.forEach((element) => element.classList.add("reveal-item"));
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      }),
      { threshold: 0.08, rootMargin: "0px 0px -45px" }
    );
    elements.forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, [location.pathname]);

  return (
    <>
      <div className="sky-background" aria-hidden="true">
        <div className="sky-glow sky-glow-one" />
        <div className="sky-glow sky-glow-two" />
        <div className="shooting-star shooting-star-one" />
        <div className="shooting-star shooting-star-two" />
      </div>
      <SpaceJourney staticMode={isBlogRoute} />
      <Navbar activeSection={activeSection} />
      <main id="main-content">
        <Suspense fallback={<div className="route-loading">Loading…</div>}>
          <Routes>
            <Route path="/" element={<><Home /><About /><Experience /><Work /><Education /><Interests /><Writing /><Contact /></>} />
            <Route path="/writing" element={<WritingIndex />} />
            <Route path="/writing/:slug" element={<BlogPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Analytics />
    </>
  );
}
