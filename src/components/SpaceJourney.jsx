import { useEffect, useRef } from "react";

const STAR_COUNT = 110;
const stars = Array.from({ length: STAR_COUNT }, (_, index) => {
  const angle = ((index * 137.508) % 360) * (Math.PI / 180);
  const radius = 0.12 + (((index * 47) % 97) / 97) * 1.28;
  return {
    id: index,
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    depth: 70 + ((index * 83) % 1130),
    brightness: 0.55 + ((index * 29) % 45) / 100,
  };
});

export default function SpaceJourney() {
  const fieldRef = useRef(null);
  const planetRef = useRef(null);
  const moonRef = useRef(null);
  const nebulaRef = useRef(null);

  useEffect(() => {
    const field = fieldRef.current;
    const starNodes = field ? Array.from(field.children) : [];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let targetScroll = window.scrollY;
    let renderedScroll = targetScroll;

    const render = (scrollPosition) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - height);
      const progress = Math.min(1, scrollPosition / maxScroll);
      const travel = reduceMotion ? 0 : scrollPosition * 0.72;

      starNodes.forEach((node, index) => {
        const star = stars[index];
        const depth = ((star.depth - travel) % 1200 + 1200) % 1200 + 28;
        const projection = 235 / depth;
        const x = star.x * width * projection;
        const y = star.y * height * projection;
        const size = Math.min(5.5, 0.55 + projection * 1.25);
        const opacity = Math.min(1, (1 - depth / 1250) * star.brightness + 0.08);
        const stretch = Math.min(7, 1 + projection * 1.5);
        node.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${Math.atan2(y, x)}rad) scaleX(${stretch}) scaleY(${size})`;
        node.style.opacity = opacity;
      });

      if (planetRef.current) {
        const x = 118 - progress * 165;
        const y = 68 - Math.sin(progress * Math.PI) * 42;
        const scale = 0.55 + progress * 1.05;
        planetRef.current.style.transform = `translate3d(${x}vw, ${y}vh, 0) scale(${scale})`;
        planetRef.current.style.opacity = Math.sin(progress * Math.PI) * 0.88;
      }
      if (moonRef.current) {
        const phase = Math.max(0, Math.min(1, (progress - 0.36) / 0.54));
        moonRef.current.style.transform = `translate3d(${8 + phase * 74}vw, ${86 - phase * 72}vh, 0) scale(${0.4 + phase * 0.75})`;
        moonRef.current.style.opacity = Math.sin(phase * Math.PI) * 0.72;
      }
      if (nebulaRef.current) {
        nebulaRef.current.style.transform = `translate3d(${35 - progress * 58}vw, ${20 + progress * 20}vh, 0) rotate(${progress * 24}deg) scale(${0.8 + progress * 0.5})`;
        nebulaRef.current.style.opacity = 0.12 + Math.sin(progress * Math.PI) * 0.2;
      }
    };

    const tick = () => {
      const distance = targetScroll - renderedScroll;
      renderedScroll += distance * 0.13;
      if (Math.abs(distance) < 0.2) renderedScroll = targetScroll;
      render(renderedScroll);
      if (renderedScroll !== targetScroll) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    };

    const schedule = () => {
      targetScroll = window.scrollY;
      if (reduceMotion) {
        renderedScroll = targetScroll;
        render(renderedScroll);
      } else if (!frame) {
        frame = requestAnimationFrame(tick);
      }
    };

    const handleResize = () => {
      targetScroll = window.scrollY;
      renderedScroll = targetScroll;
      render(renderedScroll);
    };

    render(renderedScroll);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="space-journey" aria-hidden="true">
        <div className="warp-field" ref={fieldRef}>
          {stars.map((star) => <i key={star.id} />)}
        </div>
        <div className="space-nebula" ref={nebulaRef} />
        <div className="space-planet" ref={planetRef}><span /></div>
        <div className="space-moon" ref={moonRef} />
        <div className="rocket-window" />
      </div>
    </>
  );
}
