"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "55+", en: "years of practice", mr: "सरावाची वर्षे" },
  { value: "90+", en: "countries", mr: "देश" },
  { value: "Free", en: "always given freely", mr: "नेहमी विनामूल्य दिले जाते" },
];

export default function Stats() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {STATS.map((s, i) => (
            <motion.div
              key={s.en}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-center py-7 md:py-3"
            >
              {/* Brass thread between columns — vertical on desktop, horizontal on mobile */}
              {i > 0 && (
                <>
                  <span
                    aria-hidden
                    className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2"
                    style={{
                      width: 1,
                      height: 56,
                      background:
                        "linear-gradient(180deg, transparent, hsl(var(--brass) / 0.45), transparent)",
                    }}
                  />
                  <span
                    aria-hidden
                    className="md:hidden absolute top-0 left-1/2 -translate-x-1/2"
                    style={{
                      height: 1,
                      width: 90,
                      background:
                        "linear-gradient(90deg, transparent, hsl(var(--brass) / 0.4), transparent)",
                    }}
                  />
                </>
              )}

              <div className="text-[42px] md:text-[54px] font-medium text-primary leading-none tracking-tight">
                {s.value}
              </div>
              <div className="italic text-[12px] md:text-[13px] text-muted-foreground mt-3.5 tracking-[0.08em]">
                {s.en}
              </div>
              <div className="marathi not-italic text-[12px] md:text-[13px] text-muted-foreground mt-0.5">
                {s.mr}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
