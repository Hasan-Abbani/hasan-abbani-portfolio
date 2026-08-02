import { useEffect, useState } from "react";
import "../styles/loading-animation.css";

export default function LoadingAnimation({ onComplete }) {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setIsLeaving(true), 950);
    const completeTimer = window.setTimeout(onComplete, 1450);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`loading-screen ${isLeaving ? "is-leaving" : ""}`} role="status" aria-label="Loading Hasan Abbani's portfolio">
      <div className="loading-mark" aria-hidden="true">
        <span>HA</span>
        <i />
      </div>
      <p>Hasan Abbani</p>
      <div className="loading-track" aria-hidden="true"><span /></div>
    </div>
  );
}
