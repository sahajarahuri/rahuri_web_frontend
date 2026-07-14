"use client";

import { motion } from "framer-motion";

/**
 * Closing invocation.
 *
 * The Shanti Mantra that was here is a Vedic verse — beautiful, but it
 * belongs to no one and says nothing about Sahaja Yoga specifically.
 * In its place: Shri Mataji's own words on what Sahaja Yoga *is*, taken
 * from a Puja talk, with the occasion and year attached so the words are
 * anchored to a real moment rather than floating free.
 *
 * The alternates are kept below so the centre can swap the passage
 * without touching the layout.
 */

const PASSAGE = {
  /* Ganesha Puja — on why innocence is the ground of the whole practice. */
  en: [
    "Innocence is the sustenance, is the basis of spirituality.",
    "That&rsquo;s why the first job of Sahaja Yoga is to establish Shri Ganesha within you, to awaken Him. As soon as the Kundalini awakens, you must know that Shri Ganesha comes into being.",
  ],
  attribution: "H.H. Shri Mataji Nirmala Devi",
  attributionMr: "प.पू. श्री माताजी निर्मला देवी",
  occasion: "Shri Ganesha Puja · Nashik, Maharashtra · 21 January 1984",
  occasionMr: "श्री गणेश पूजा · नाशिक, महाराष्ट्र · २१ जानेवारी १९८४",
};

export default function ShantiMantra() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="thread max-w-4xl mx-auto mb-24 md:mb-32" aria-hidden />

      {/* Lamp glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none breath"
        style={{
          width: 560,
          height: 560,
          maxWidth: "120vw",
          background: "radial-gradient(circle, hsl(var(--brass) / 0.14), transparent 60%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-2xl mx-auto px-5 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="marathi text-[40px] md:text-[52px] text-primary leading-none flicker mb-10"
          aria-hidden
        >
          ॐ
        </motion.div>

        <blockquote className="m-0">
          {/* The opening line carries the weight, so it is set larger. */}
          <p
            className="italic text-[22px] md:text-[29px] text-primary leading-[1.5]"
            dangerouslySetInnerHTML={{ __html: PASSAGE.en[0] }}
          />

          <p
            className="italic text-[15.5px] md:text-[17px] text-muted-foreground leading-[1.85] mt-6"
            dangerouslySetInnerHTML={{ __html: PASSAGE.en[1] }}
          />

          <div className="diya my-9 max-w-[200px] mx-auto">
            <span className="diya-mark" aria-hidden />
          </div>

          <footer>
            <div className="text-[14.5px] md:text-[15.5px] text-foreground">
              {PASSAGE.attribution}
            </div>
            <div className="marathi text-[13.5px] text-muted-foreground mt-0.5">
              {PASSAGE.attributionMr}
            </div>

            {/* The occasion and year — the words belong to a real moment. */}
            <cite className="not-italic block text-[12px] md:text-[12.5px] text-[hsl(var(--brass-deep))] tracking-[0.06em] mt-3.5">
              {PASSAGE.occasion}
            </cite>
            <cite className="marathi not-italic block text-[12.5px] text-muted-foreground mt-1">
              {PASSAGE.occasionMr}
            </cite>
          </footer>
        </blockquote>
      </motion.div>
    </section>
  );
}
