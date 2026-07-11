"use client";

import { motion } from "framer-motion";

export default function Stats() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-medium text-primary leading-none">55+</div>
            <div className="italic text-xs md:text-sm text-muted-foreground mt-3 tracking-wide">
              years of practice
            </div>
            <div className="marathi not-italic text-xs md:text-sm text-muted-foreground tracking-wide">
              सरावाची वर्षे
            </div>
          </div>
          <div className="md:border-x border-border md:py-2">
            <div className="text-4xl md:text-5xl font-medium text-primary leading-none">90+</div>
            <div className="italic text-xs md:text-sm text-muted-foreground mt-3 tracking-wide">
              countries
            </div>
            <div className="marathi not-italic text-xs md:text-sm text-muted-foreground tracking-wide">
              देश
            </div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-medium text-primary leading-none">Free</div>
            <div className="italic text-xs md:text-sm text-muted-foreground mt-3 tracking-wide">
              always given freely
            </div>
            <div className="marathi not-italic text-xs md:text-sm text-muted-foreground tracking-wide">
              नेहमी विनामूल्य दिले जाते
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
