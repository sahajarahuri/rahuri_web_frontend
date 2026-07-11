"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function MatajiQuote() {
  return (
    <section className="py-24 md:py-32 bg-card border-y border-border">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.1 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 md:mb-10 rounded-full overflow-hidden ring-1 ring-accent/40 shadow-[0_0_0_8px_hsl(var(--card)),0_0_0_9px_hsl(38_40%_54%/0.35),0_6px_40px_hsl(30_20%_14%/0.08)]">
          <Image
            src="/images/4.jpg"
            alt="Shri Mataji Nirmala Devi"
            width={320}
            height={320}
            className="w-full h-full object-cover"
            priority={false}
          />
        </div>

        <blockquote className="italic text-2xl md:text-3xl text-primary leading-relaxed font-normal">
          <span className="text-accent font-serif" style={{ fontFamily: "Georgia, serif" }}>&ldquo;</span>
          &nbsp;You cannot know the meaning of your life until you are connected
          to the power that created you.&nbsp;
          <span className="text-accent font-serif" style={{ fontFamily: "Georgia, serif" }}>&rdquo;</span>
        </blockquote>
        <p className="marathi not-italic text-base md:text-lg text-primary/80 leading-relaxed mt-4">
          &ldquo;जोपर्यंत तुम्ही तुम्हाला निर्माण करणाऱ्या शक्तीशी जोडले जात
          नाही, तोपर्यंत तुमच्या जीवनाचा अर्थ तुम्हाला कळू शकत नाही.&rdquo;
        </p>

        <div className="mt-7 text-foreground text-sm md:text-base">
          H.H. Shri Mataji Nirmala Devi
          <span className="marathi text-muted-foreground"> · प.पू. श्री माताजी निर्मला देवी</span>
        </div>
        <div className="italic text-xs md:text-sm text-muted-foreground mt-1">
          Founder of Sahaja Yoga · 1923 – 2011
        </div>
        <div className="marathi not-italic text-xs md:text-sm text-muted-foreground">
          सहज योगाच्या संस्थापिका · १९२३ – २०११
        </div>
      </motion.div>
    </section>
  );
}
