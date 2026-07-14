"use client";

import { useEffect, useState } from "react";

/** A single brass thread across the top, filling as you read down the page. */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = null;
    const update = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(h > 0 ? Math.min(window.scrollY / h, 1) : 0);
        raf = null;
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] pointer-events-none"
      style={{ height: 2 }}
      aria-hidden
    >
      <div
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          background:
            "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--brass)))",
          transition: "width 120ms linear",
        }}
      />
    </div>
  );
}
