"use client";

import { motion } from "framer-motion";
import { useSettings } from "@/hooks/use-settings";

export default function Welcome() {
  const { settings } = useSettings();

  return (
    <section className="py-16 md:py-20 bg-background text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9 }}
        className="max-w-2xl mx-auto px-4 sm:px-6"
      >
        <div className="italic text-xs md:text-sm tracking-[0.2em] uppercase mb-5 text-accent">
          Free · Since 1970 <span className="marathi normal-case tracking-normal">· मोफत · १९७० पासून</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-normal italic leading-[1.15] tracking-tight text-primary">
          A place to come home.
        </h1>
        <h2 className="marathi text-2xl md:text-3xl font-medium leading-[1.3] tracking-tight text-primary mt-2 not-italic">
          घरी आल्यासारखे वाटणारे ठिकाण.
        </h2>
        <p className="mt-5 text-sm md:text-base italic text-muted-foreground">
          Sahaja Yoga meditation, freely given.
          <br />
          By the banks of Rahuri.
        </p>
        <p className="marathi mt-2 text-sm md:text-base text-muted-foreground not-italic">
          सहज योग ध्यान, विनामूल्य दिले जाते.
          <br />
          राहुरीच्या काठावर.
        </p>

        {settings.selfRealisationVideoUrl && (
          <a
            href={settings.selfRealisationVideoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link italic text-base mt-8 inline-block"
          >
            Experience self-realisation, freely given
            <span className="marathi not-italic block text-sm mt-0.5">आत्मसाक्षात्कार अनुभवा, विनामूल्य</span>
          </a>
        )}
      </motion.div>
    </section>
  );
}
