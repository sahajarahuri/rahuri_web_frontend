"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const GALLERY = [
  "/images/main.jpg",
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
];

const SLIDE_SECONDS = 7;

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % GALLERY.length);
    }, SLIDE_SECONDS * 1000);
    return () => clearInterval(t);
  }, [paused]);

  const go = useCallback((i) => setIndex(i), []);

  const parallax = scrollY < 1000 ? scrollY * 0.18 : 180;
  const veil = Math.min(scrollY / 700, 0.45);

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-[#20130c]"
      style={{ height: "clamp(460px, 78vh, 760px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Image plate */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translateY(${parallax}px) scale(1.06)`,
          transition: "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={GALLERY[index]}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          >
            {/* Blurred bed so portrait photos never leave dead space */}
            <Image
              src={GALLERY[index]}
              alt=""
              fill
              aria-hidden="true"
              sizes="100vw"
              className="object-cover scale-125 blur-3xl opacity-55"
            />
            {/* The photograph itself, uncropped, drifting slowly */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.0 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: SLIDE_SECONDS + 2, ease: "linear" }}
            >
              <Image
                src={GALLERY[index]}
                alt="Shri Swayambhu Ekadash Rudra Bhumi, Rahuri"
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Warm temple grade + reading veil that deepens as you scroll */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 42%, transparent 20%, rgba(24,14,8,0.42) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ background: "rgba(24,14,8,1)", opacity: veil }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-52 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, hsl(41 42% 95%) 2%, rgba(32,19,12,0.55) 55%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(24,14,8,0.5), transparent)" }}
      />

      {/* Brass frame — the manuscript border, drawn on load */}
      <motion.div
        aria-hidden
        className="absolute pointer-events-none hidden md:block"
        style={{ inset: 28, border: "1px solid rgba(226,187,110,0.30)" }}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Invocation, set over the image */}
      <div className="absolute inset-x-0 bottom-0 z-10 pb-20 md:pb-24">
        <motion.div
          className="max-w-3xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="marathi text-[26px] md:text-[34px] leading-tight"
            style={{
              color: "#f6e6bf",
              textShadow: "0 2px 24px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.5)",
            }}
          >
            ॥ श्री स्वयंभू एकादश रुद्र ॥
          </div>
          <div
            className="mt-3 italic text-[11px] md:text-[12px] tracking-[0.34em] uppercase"
            style={{ color: "rgba(238,214,163,0.85)", textShadow: "0 1px 12px rgba(0,0,0,0.7)" }}
          >
            Musalwadi · Rahuri
          </div>
        </motion.div>
      </div>

      {/* Gallery indicators */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
        {GALLERY.map((src, i) => (
          <button
            key={src}
            onClick={() => go(i)}
            aria-label={`Show photograph ${i + 1} of ${GALLERY.length}`}
            aria-current={i === index}
            className="p-1.5 group"
          >
            <span
              className="block transition-all duration-500 ease-out"
              style={{
                width: i === index ? 26 : 6,
                height: 2,
                background: i === index ? "#e9cf95" : "rgba(233,207,149,0.42)",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
