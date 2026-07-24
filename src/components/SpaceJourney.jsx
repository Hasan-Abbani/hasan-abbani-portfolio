import { useEffect, useRef } from "react";

const STAR_COUNT = 80;
const SCROLL_VELOCITY_DECAY_MS = 90;
const POSITION_EPSILON = 0.01;
const VELOCITY_EPSILON = 0.001;

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

export default function SpaceJourney({ staticMode = false }) {
  const canvasRef = useRef(null);
  const nebulaRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let lastFrameTime = 0;
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    let maxScroll = Math.max(1, document.documentElement.scrollHeight - viewportHeight);
    let devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    let targetScroll = window.scrollY;
    let renderedScroll = targetScroll;
    let pendingScrollDelta = 0;
    let scrollVelocity = 0;

    const resizeCanvas = () => {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      maxScroll = Math.max(1, document.documentElement.scrollHeight - viewportHeight);
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(viewportWidth * devicePixelRatio);
      canvas.height = Math.round(viewportHeight * devicePixelRatio);
      canvas.style.width = `${viewportWidth}px`;
      canvas.style.height = `${viewportHeight}px`;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const renderStars = (scrollPosition) => {
      const travel = staticMode || reduceMotion ? 0 : scrollPosition * 0.28;
      const visibleStarCount = viewportWidth < 768 ? 50 : STAR_COUNT;

      context.clearRect(0, 0, viewportWidth, viewportHeight);
      context.save();
      context.translate(viewportWidth / 2, viewportHeight / 2);
      const streakGradient = context.createLinearGradient(0, 0, 10, 0);
      streakGradient.addColorStop(0, "rgba(187, 225, 250, .08)");
      streakGradient.addColorStop(0.78, "#EAF6FF");
      streakGradient.addColorStop(1, "white");

      for (let index = 0; index < visibleStarCount; index += 1) {
        const star = stars[index];
        const depth = ((star.depth - travel) % 1200 + 1200) % 1200 + 28;
        const projection = 235 / depth;
        const x = star.x * viewportWidth * projection;
        const y = star.y * viewportHeight * projection;
        const size = Math.min(5.5, 0.55 + projection * 1.25);
        const opacity = Math.min(1, (1 - depth / 1250) * star.brightness + 0.08);
        const stretch = Math.min(7, 1 + projection * 1.5);
        const angle = Math.atan2(y, x);

        context.save();
        context.translate(x, y);
        context.rotate(angle);
        context.scale(stretch, size);
        context.globalAlpha = opacity;
        context.fillStyle = streakGradient;
        context.shadowColor = "rgba(187, 225, 250, .7)";
        context.shadowBlur = 5;
        context.fillRect(0, -0.5, 10, 1);
        context.restore();
      }

      context.restore();
    };

    const render = (scrollPosition) => {
      const progress = Math.min(1, scrollPosition / maxScroll);
      renderStars(scrollPosition);

      if (nebulaRef.current) {
        nebulaRef.current.style.transform = `translate3d(${35 - progress * 58}vw, ${20 + progress * 20}vh, 0) rotate(${progress * 24}deg) scale(${0.8 + progress * 0.5})`;
        nebulaRef.current.style.opacity = 0.12 + Math.sin(progress * Math.PI) * 0.2;
      }
    };

    const tick = (timestamp) => {
      const deltaTime = lastFrameTime ? timestamp - lastFrameTime : 16.67;
      lastFrameTime = timestamp;

      if (pendingScrollDelta !== 0) {
        if (
          scrollVelocity !== 0 &&
          Math.sign(pendingScrollDelta) !== Math.sign(scrollVelocity)
        ) {
          scrollVelocity = 0;
        }
        scrollVelocity += pendingScrollDelta / SCROLL_VELOCITY_DECAY_MS;
        pendingScrollDelta = 0;
      }

      const decay = Math.exp(-deltaTime / SCROLL_VELOCITY_DECAY_MS);
      const frameTravel =
        scrollVelocity * SCROLL_VELOCITY_DECAY_MS * (1 - decay);
      const distance = targetScroll - renderedScroll;

      if (
        distance === 0 ||
        Math.sign(frameTravel) !== Math.sign(distance) ||
        Math.abs(frameTravel) >= Math.abs(distance)
      ) {
        renderedScroll = targetScroll;
        scrollVelocity = 0;
      } else {
        renderedScroll += frameTravel;
        scrollVelocity *= decay;
      }

      const remainingDistance = targetScroll - renderedScroll;
      if (
        Math.abs(remainingDistance) < POSITION_EPSILON &&
        Math.abs(scrollVelocity) < VELOCITY_EPSILON
      ) {
        renderedScroll = targetScroll;
        scrollVelocity = 0;
      }

      render(renderedScroll);
      if (renderedScroll !== targetScroll || pendingScrollDelta !== 0) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
        lastFrameTime = 0;
      }
    };

    const schedule = () => {
      const nextScroll = window.scrollY;
      pendingScrollDelta += nextScroll - targetScroll;
      targetScroll = nextScroll;
      if (reduceMotion) {
        pendingScrollDelta = 0;
        scrollVelocity = 0;
        renderedScroll = targetScroll;
        render(renderedScroll);
      } else if (!frame) {
        frame = requestAnimationFrame(tick);
      }
    };

    const handleResize = () => {
      resizeCanvas();
      targetScroll = window.scrollY;
      renderedScroll = targetScroll;
      pendingScrollDelta = 0;
      scrollVelocity = 0;
      render(renderedScroll);
    };

    resizeCanvas();

    if (staticMode) {
      render(0);
      return;
    }

    render(renderedScroll);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", handleResize);
    };
  }, [staticMode]);

  return (
    <>
      <div className="space-journey" aria-hidden="true">
        <div className="warp-field">
          <canvas ref={canvasRef} aria-hidden="true" />
        </div>
        <div className="space-nebula" ref={nebulaRef} />
        <div className="rocket-window" />
      </div>
    </>
  );
}
