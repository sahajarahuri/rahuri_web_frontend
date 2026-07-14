"use client";

import { motion } from "framer-motion";

/**
 * The one heading treatment used by every section, so the page reads
 * as a single manuscript rather than a stack of unrelated blocks.
 */
export default function SectionHeading({
  eyebrowEn,
  eyebrowMr,
  titleEn,
  titleMr,
  leadEn,
  leadMr,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`text-center ${className}`}
    >
      {eyebrowEn && (
        <div className="eyebrow mb-6">
          {eyebrowEn}
          {eyebrowMr && (
            <span className="marathi normal-case tracking-normal"> · {eyebrowMr}</span>
          )}
        </div>
      )}

      <h2 className="text-[32px] md:text-[42px] font-medium text-primary leading-tight">
        {titleEn}
      </h2>
      {titleMr && (
        <h3 className="marathi text-[24px] md:text-[31px] font-medium text-primary/90 mt-1.5">
          {titleMr}
        </h3>
      )}

      {(leadEn || leadMr) && (
        <>
          <div className="diya my-7 max-w-[200px] mx-auto">
            <span className="diya-mark" aria-hidden />
          </div>
          {leadEn && (
            <p className="italic text-[15px] md:text-[16.5px] text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {leadEn}
            </p>
          )}
          {leadMr && (
            <p className="marathi not-italic text-[14.5px] md:text-[16px] text-muted-foreground max-w-xl mx-auto leading-relaxed mt-1.5">
              {leadMr}
            </p>
          )}
        </>
      )}
    </motion.div>
  );
}
