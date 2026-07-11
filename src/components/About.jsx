"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <div className="eyebrow mb-5">
            The practice <span className="marathi normal-case tracking-normal">· साधना</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-2">
            What is Sahaja Yoga?
          </h2>
          <h3 className="marathi text-2xl md:text-3xl font-medium text-primary mb-8">
            सहज योग म्हणजे काय?
          </h3>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-x-10 gap-y-4 text-left md:text-left">
            <div className="text-base md:text-lg text-foreground/90 leading-relaxed space-y-4">
              <p>
                Sahaja means <em>born within</em>. Sahaja Yoga is a method of
                meditation that awakens the dormant spiritual energy — the{" "}
                <em>Kundalini</em> — resting at the base of the spine.
              </p>
              <p>
                It rises through the central channel, piercing each of the
                seven chakras in turn — alongside the left channel (past and
                emotion) and the right channel (future and action). This
                brings inner peace, balance, and a state of{" "}
                <em>thoughtless awareness</em>. The meditation is always
                given freely.
              </p>
            </div>
            <div className="marathi text-base md:text-lg text-foreground/90 leading-relaxed space-y-4">
              <p>
                सहज म्हणजे उपजत, आतूनच जन्मलेले. सहज योग ही ध्यानाची एक पद्धत
                आहे जी मणक्याच्या तळाशी सुप्त असलेल्या आध्यात्मिक शक्तीला —
                कुंडलिनीला — जागृत करते.
              </p>
              <p>
                ती मध्य नाडीतून वर चढते आणि सातही चक्रांना क्रमाने भेदते —
                त्याचबरोबर डावी नाडी (भूतकाळ व भावना) आणि उजवी नाडी (भविष्य व
                कृती) असतात. यामुळे आंतरिक शांती, समतोल आणि निर्विचार जाणीव
                प्राप्त होते. हे ध्यान नेहमी विनामूल्य दिले जाते.
              </p>
            </div>
          </div>

          <div className="mt-16 mx-auto" style={{ maxWidth: 480 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative rounded-2xl overflow-hidden shadow-sm border border-primary/10"
            >
              <Image
                src="/images/Kundalini.jpg"
                alt="Kundalini rising through the seven chakras"
                width={480}
                height={640}
                className="w-full h-auto"
              />
            </motion.div>
            <div className="italic text-xs text-muted-foreground mt-3 text-center">
              The Kundalini lies coiled at the base until awakened, then
              rises through the central channel, root to crown.
            </div>
            <div className="marathi not-italic text-xs text-muted-foreground mt-1 text-center">
              कुंडलिनी जागृत होईपर्यंत मणक्याच्या तळाशी वेटोळे घालून असते, नंतर
              ती मध्य नाडीतून मूलाधारापासून सहस्रारापर्यंत वर चढते.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
