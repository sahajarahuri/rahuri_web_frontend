"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function MatajiQuote() {
  return (
    <section className="sanctum relative py-24 md:py-32 overflow-hidden">
      {/* Ambient brass glow behind the portrait */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none breath"
        style={{
          top: "12%",
          width: 480,
          height: 480,
          maxWidth: "120vw",
          background: "radial-gradient(circle, hsl(var(--brass) / 0.14), transparent 62%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center"
      >
        {/* Portrait, framed like a shrine medallion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mb-10 md:mb-12"
          style={{ width: 168, height: 168 }}
        >
          {/* Outer brass ring */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid hsl(var(--brass) / 0.55)" }}
          />
          {/* Inner hairline */}
          <span
            aria-hidden
            className="absolute rounded-full"
            style={{ inset: 7, border: "1px solid hsl(var(--brass) / 0.28)" }}
          />
          <div
            className="absolute overflow-hidden rounded-full"
            style={{
              inset: 12,
              boxShadow: "0 12px 44px -14px hsl(26 22% 15% / 0.4)",
            }}
          >
            {/* The source photo is landscape, so the crop is pulled up to
                keep the face centred inside the circular frame. */}
            <Image
              src="/images/4.jpg"
              alt="H.H. Shri Mataji Nirmala Devi"
              width={360}
              height={360}
              className="w-full h-full object-cover"
              style={{ objectPosition: "50% 22%" }}
            />
          </div>
        </motion.div>

        {/* The quote — the mark is set as a real display glyph, not a stray character */}
        <blockquote className="relative">
          <span
            aria-hidden
            className="block text-center text-[hsl(var(--brass)/0.55)] leading-none select-none mb-1"
            style={{ fontFamily: "Georgia, serif", fontSize: 52 }}
          >
            &ldquo;
          </span>
          <p className="italic text-[22px] md:text-[30px] text-primary leading-[1.5] font-normal max-w-[24ch] md:max-w-none mx-auto">
            You cannot know the meaning of your life until you are connected to
            the power that created you.
          </p>
          <p className="marathi not-italic text-[16px] md:text-[19px] text-primary/75 leading-[1.75] mt-6">
            जोपर्यंत तुम्ही तुम्हाला निर्माण करणाऱ्या शक्तीशी जोडले जात नाही,
            तोपर्यंत तुमच्या जीवनाचा अर्थ तुम्हाला कळू शकत नाही.
          </p>
        </blockquote>

        <div className="diya my-9 max-w-[200px] mx-auto">
          <span className="diya-mark" aria-hidden />
        </div>

        <footer>
          <div className="text-[15px] md:text-[16px] text-foreground">
            H.H. Shri Mataji Nirmala Devi
          </div>
          <div className="marathi text-[14px] text-muted-foreground mt-0.5">
            प.पू. श्री माताजी निर्मला देवी
          </div>
          <div className="italic text-[12px] md:text-[13px] text-muted-foreground mt-3 tracking-[0.06em]">
            Founder of Sahaja Yoga · 1923 – 2011
          </div>
          <div className="marathi not-italic text-[12px] md:text-[13px] text-muted-foreground mt-0.5">
            सहज योगाच्या संस्थापिका · १९२३ – २०११
          </div>
        </footer>
      </motion.div>
    </section>
  );
}
