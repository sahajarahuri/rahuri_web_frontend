"use client";

import { motion } from "framer-motion";
import { useSettings } from "@/hooks/use-settings";

export default function Welcome() {
  const { settings } = useSettings();

  return (
    <section className="relative py-20 md:py-28 text-center overflow-hidden">
      {/* A single, slow-breathing halo behind the words */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none breath"
        style={{
          width: 620,
          height: 620,
          maxWidth: "120vw",
          background:
            "radial-gradient(circle, hsl(var(--brass) / 0.16) 0%, transparent 62%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-2xl mx-auto px-5 sm:px-6"
      >
        <div className="eyebrow mb-7">
          Free · Since 1970
          <span className="marathi normal-case tracking-normal"> · मोफत · १९७० पासून</span>
        </div>

        <h1 className="text-[34px] md:text-[56px] font-normal italic leading-[1.1] tracking-tight text-primary">
          A place to come home.
        </h1>
        <h2 className="marathi text-[24px] md:text-[34px] font-medium leading-[1.35] text-primary mt-3 not-italic">
          घरी आल्यासारखे वाटणारे ठिकाण.
        </h2>

        <div className="diya my-8 max-w-[220px] mx-auto">
          <span className="diya-mark" aria-hidden />
        </div>

        <p className="text-[15px] md:text-[17px] italic text-muted-foreground leading-relaxed">
          Sahaja Yoga meditation, freely given.
          <br />
          By the banks of Rahuri.
        </p>
        <p className="marathi mt-3 text-[15px] md:text-[17px] text-muted-foreground not-italic leading-relaxed">
          सहज योग ध्यान, विनामूल्य दिले जाते.
          <br />
          राहुरीच्या काठावर.
        </p>

        {settings.selfRealisationVideoUrl && (
          <motion.a
            href={settings.selfRealisationVideoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brass mt-10 flex-col gap-1"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.8 }}
          >
            <span className="italic">Experience self-realisation, freely given</span>
            <span className="marathi not-italic text-[12px] opacity-80">
              आत्मसाक्षात्कार अनुभवा, विनामूल्य
            </span>
          </motion.a>
        )}
      </motion.div>
    </section>
  );
}
