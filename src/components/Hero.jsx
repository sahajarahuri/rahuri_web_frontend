"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const GALLERY = [
  "/images/main.jpg",
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
];

const SLIDE_SECONDS = 6;

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [index, setIndex] = useState(0);

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
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % GALLERY.length);
    }, SLIDE_SECONDS * 1000);
    return () => clearInterval(t);
  }, []);

  const parallax = scrollY < 900 ? scrollY * 0.15 : 135;

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-[#2a1a10]"
      style={{ height: "clamp(400px, 68vh, 640px)" }}
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translateY(${parallax}px) scale(1.05)`,
          transition: "transform 300ms ease-out",
        }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={GALLERY[index]}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            <Image
              src={GALLERY[index]}
              alt="Rahuri Sahaja Yoga gallery"
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Soft bottom vignette, just enough for the dots to sit on */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />

      {/* Gallery indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {GALLERY.map((src, i) => (
          <button
            key={src}
            onClick={() => setIndex(i)}
            aria-label={`Show gallery image ${i + 1}`}
            className="p-1"
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: i === index ? 20 : 6,
                height: 6,
                background: i === index ? "#f9f0d8" : "rgba(249,240,216,0.5)",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
