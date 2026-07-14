"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Languages } from "lucide-react";

const COPY = {
  en: {
    title: "Support our mission of light and love",
    lead: "Participate and contribute to the development of Shri Ekadash Rudra, Musalwadi.",
    body: "Your contribution will help realise a sacred purpose. This place will not only become a centre of meditation, prayer and inner peace, but a means of spreading love, compassion and harmony in society.",
    cta: "Donate now",
    foot: "Contribute to this gathering and set out on the journey of self-discovery.",
    toggle: "हिंदी में देखें",
  },
  hi: {
    title: "प्रकाश और प्रेम के हमारे मिशन का समर्थन करें",
    lead: "श्री एकादश रुद्र मुसळवाडी स्थल के विकास में सहभागी बनें और योगदान दें 🙏",
    body: "आपका योगदान एक पवित्र उद्देश्य को साकार करने में सहायक होगा। यह आध्यात्मिक स्थल न केवल ध्यान, प्रार्थना और आत्मिक शांति का केंद्र बनेगा, बल्कि समाज में प्रेम, करुणा और सद्भाव फैलाने का माध्यम भी होगा।",
    cta: "अभी दान करें",
    foot: "इस आध्यात्मिक रूप से समृद्ध कार्यक्रम में योगदान दें और आत्म-अन्वेषण की यात्रा पर निकलें।",
    toggle: "Read in English",
  },
};

export default function RegistrationCard() {
  const [lang, setLang] = useState("en");
  const t = COPY[lang];
  const hi = lang === "hi";

  return (
    <section id="registration" className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden p-8 md:p-12 text-center"
        style={{
          borderRadius: 2,
          background: "linear-gradient(165deg, hsl(10 40% 18%), hsl(26 30% 11%))",
          boxShadow: "var(--shadow-raised)",
        }}
      >
        <span
          aria-hidden
          className="absolute pointer-events-none"
          style={{ inset: 12, border: "1px solid rgba(226,187,110,0.28)" }}
        />

        <div className="relative">
          {/* Language toggle */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setLang(hi ? "en" : "hi")}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-[12.5px] rounded-sm transition-colors hover:bg-white/10 ${hi ? "" : "hindi"}`}
              style={{
                border: "1px solid rgba(226,187,110,0.4)",
                color: "rgba(242,226,186,0.85)",
              }}
            >
              <Languages className="h-3.5 w-3.5" />
              {t.toggle}
            </button>
          </div>

          <span
            className="marathi block text-[26px] leading-none flicker"
            style={{ color: "#e2bb6e" }}
            aria-hidden
          >
            ॐ
          </span>

          <h2
            className={`text-[26px] md:text-[32px] font-medium leading-snug mt-7 max-w-2xl mx-auto ${hi ? "hindi" : ""}`}
            style={{ color: "#f2e2ba" }}
          >
            {t.title}
          </h2>

          <p
            className={`text-[15px] md:text-[16px] leading-relaxed mt-4 max-w-xl mx-auto ${hi ? "hindi" : "italic"}`}
            style={{ color: "rgba(242,226,186,0.78)" }}
          >
            {t.lead}
          </p>

          <div
            className="my-8 mx-auto max-w-[220px]"
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(226,187,110,0.45), transparent)",
            }}
            aria-hidden
          />

          <p
            className={`text-[14.5px] md:text-[15.5px] leading-[1.85] max-w-2xl mx-auto ${hi ? "hindi" : ""}`}
            style={{ color: "rgba(242,226,186,0.66)" }}
          >
            {t.body}
          </p>

          <a
            href="https://form.qfixonline.com/rahuriform"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2.5 mt-10 px-9 py-4 overflow-hidden"
            style={{
              border: "1px solid rgba(226,187,110,0.6)",
              borderRadius: 2,
              color: "#f2e2ba",
            }}
          >
            <span
              aria-hidden
              className="absolute inset-0 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out"
              style={{ background: "#e2bb6e" }}
            />
            <span
              className={`relative text-[15px] tracking-[0.04em] transition-colors duration-300 group-hover:text-[hsl(26_30%_11%)] ${hi ? "hindi" : ""}`}
            >
              {t.cta}
            </span>
            <ArrowUpRight className="relative h-4 w-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[hsl(26_30%_11%)]" />
          </a>

          <p
            className={`text-[13px] leading-relaxed mt-7 max-w-md mx-auto ${hi ? "hindi" : "italic"}`}
            style={{ color: "rgba(242,226,186,0.5)" }}
          >
            {t.foot}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
