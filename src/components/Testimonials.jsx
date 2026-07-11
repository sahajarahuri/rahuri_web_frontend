"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const FALLBACK = [
  {
    _id: "f1",
    quote: "After starting daily meditation I feel completely rejuvenated. I am able to control my anger and balance work with personal life.",
    author: "Neeta",
    location: "Pune",
  },
  {
    _id: "f2",
    quote: "Sahaja Yoga is not just meditation — it is a slow, quiet return to who I already was. I only wish I had come sooner.",
    author: "Rakesh",
    location: "Ahmednagar",
  },
];

export default function Testimonials() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/testimonials");
        const d = await r.json();
        const active = Array.isArray(d) ? d.filter((t) => t.active !== false) : [];
        setItems(active.length > 0 ? active : FALLBACK);
      } catch {
        setItems(FALLBACK);
      }
    })();
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-card border-y border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="text-center mb-12"
        >
          <div className="eyebrow mb-4">Seekers speak</div>
          <h2 className="text-2xl md:text-3xl font-medium text-primary">
            In their own words
          </h2>
        </motion.div>

        <div className={`grid gap-10 md:gap-14 ${items.length === 1 ? "grid-cols-1 max-w-2xl mx-auto" : "grid-cols-1 md:grid-cols-2"}`}>
          {items.slice(0, 4).map((t, i) => (
            <motion.div
              key={t._id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <div className="text-4xl text-accent leading-none mb-4" style={{ fontFamily: "Georgia, serif" }}>
                &ldquo;
              </div>
              <blockquote className="italic text-base md:text-lg leading-relaxed">
                {t.quote}
              </blockquote>
              <div className="text-sm text-muted-foreground mt-4">
                — {t.author}{t.location ? `, ${t.location}` : ""}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
