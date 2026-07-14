"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SubtleSystem from "@/components/SubtleSystem";


export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="eyebrow mb-6">
            The practice
            <span className="marathi normal-case tracking-normal"> · साधना</span>
          </div>
          <h2 className="text-[32px] md:text-[42px] font-medium text-primary leading-tight">
            What is Sahaja Yoga?
          </h2>
          <h3 className="marathi text-[24px] md:text-[31px] font-medium text-primary/90 mt-1.5">
            सहज योग म्हणजे काय?
          </h3>
        </motion.div>

        {/* Two-column bilingual text, set as facing manuscript pages */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative mt-12 md:mt-16 grid md:grid-cols-2 gap-x-12 gap-y-8 text-left max-w-4xl mx-auto"
        >
          {/* The gutter thread between the two pages */}
          <span
            aria-hidden
            className="hidden md:block absolute left-1/2 top-2 bottom-2 -translate-x-1/2"
            style={{
              width: 1,
              background:
                "linear-gradient(180deg, transparent, hsl(var(--brass) / 0.32) 15%, hsl(var(--brass) / 0.32) 85%, transparent)",
            }}
          />

          <div className="text-[16px] md:text-[17.5px] text-foreground/90 leading-[1.75] space-y-5">
            <p>
              {/* Versal — the illuminated first letter of the manuscript */}
              <span
                className="float-left mr-3 mt-1 font-medium text-primary select-none"
                style={{ fontSize: "3.6em", lineHeight: 0.78 }}
                aria-hidden
              >
                S
              </span>
              <span className="sr-only">S</span>ahaja means <em>born within</em>. Sahaja
              Yoga is a method of meditation that awakens the dormant spiritual
              energy — the <em>Kundalini</em> — resting at the base of the spine.
            </p>
            <p>
              It rises through the central channel, piercing each of the seven
              chakras in turn — alongside the left channel (past and emotion) and
              the right channel (future and action). This brings inner peace,
              balance, and a state of <em>thoughtless awareness</em>. The
              meditation is always given freely.
            </p>
          </div>

          <div className="marathi text-[16px] md:text-[17.5px] text-foreground/90 leading-[1.9] space-y-5">
            <p>
              सहज म्हणजे उपजत, आतूनच जन्मलेले. सहज योग ही ध्यानाची एक पद्धत आहे जी
              मणक्याच्या तळाशी सुप्त असलेल्या आध्यात्मिक शक्तीला — कुंडलिनीला —
              जागृत करते.
            </p>
            <p>
              ती मध्य नाडीतून वर चढते आणि सातही चक्रांना क्रमाने भेदते —
              त्याचबरोबर डावी नाडी (भूतकाळ व भावना) आणि उजवी नाडी (भविष्य व कृती)
              असतात. यामुळे आंतरिक शांती, समतोल आणि निर्विचार जाणीव प्राप्त होते.
              हे ध्यान नेहमी विनामूल्य दिले जाते.
            </p>
          </div>
        </motion.div>

        {/* The ascent. The traditional chart carries the section and takes
            the larger plate; our diagram sits beside it as the key. */}
        <div className="mt-20 md:mt-24">
          <div className="text-center mb-12">
            <div className="eyebrow">
              The subtle system
              <span className="marathi normal-case tracking-normal"> · सूक्ष्म प्रणाली</span>
            </div>
          </div>

          {/* The chart is the larger plate and leads on the left; our diagram
              sits beside it as the explanatory key. */}
          <div className="grid md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] gap-10 md:gap-14 items-center">
            <motion.figure
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="m-0 order-2 md:order-1"
            >
              <div className="leaf p-3 md:p-5">
                <Image
                  src="/images/Kundalini.jpg"
                  alt="Traditional chart of the Kundalini, the three nadis and the seven chakras"
                  width={830}
                  height={1204}
                  className="w-full h-auto"
                  style={{ borderRadius: 1 }}
                />
              </div>
              <figcaption className="italic text-[12.5px] text-muted-foreground text-center mt-4">
                The traditional chart
                <span className="marathi not-italic"> · पारंपरिक तक्ता</span>
              </figcaption>
            </motion.figure>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 md:order-2"
            >
              <SubtleSystem />
              <p className="italic text-[12.5px] text-muted-foreground text-center mt-6 leading-relaxed max-w-xs mx-auto">
                The Kundalini lies coiled at Mooladhara until awakened, then rises
                through the Sushumna, piercing each chakra in turn, to Sahasrara.
              </p>
              <p className="marathi not-italic text-[12.5px] text-muted-foreground text-center mt-2 leading-relaxed max-w-xs mx-auto">
                कुंडलिनी मूलाधारात वेटोळे घालून असते, जागृत झाल्यावर ती सुषुम्नेतून
                प्रत्येक चक्र भेदत सहस्रारापर्यंत चढते.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
