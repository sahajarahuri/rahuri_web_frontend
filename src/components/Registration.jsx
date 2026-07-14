"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const FIELDS = [
  { labelEn: "Account", labelMr: "खाते", value: "Rahuri Sahajyog Welfare Society", copy: false },
  { labelEn: "A/c No", labelMr: "खाते क्र.", value: "50100760322286", copy: true },
  { labelEn: "IFSC", labelMr: "आयएफएससी", value: "HDFC0004295", note: "Ahmednagar", copy: true },
];

export default function Registration() {
  const [copied, setCopied] = useState(null);

  const copy = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* Clipboard unavailable — the number is still on screen to read. */
    }
  };

  return (
    <section id="register" className="relative py-24 md:py-32">
      <div className="thread max-w-4xl mx-auto mb-24 md:mb-32" aria-hidden />

      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrowEn="Contribute"
          eyebrowMr="योगदान द्या"
          titleEn="Towards self-discovery"
          titleMr="आत्मशोधाच्या दिशेने"
          leadEn="Your contribution helps a sacred space serve meditation, prayer and peace for all seekers."
          leadMr="तुमचे योगदान या पवित्र स्थळाला सर्व साधकांसाठी ध्यान, प्रार्थना व शांती प्रदान करण्यास मदत करते."
          className="mb-14"
        />

        <motion.div
          id="donate-details"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.95, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="leaf max-w-2xl mx-auto p-7 md:p-10"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
            {/* QR, framed in brass */}
            <div className="shrink-0">
              <div
                className="p-2 bg-white"
                style={{ border: "1px solid hsl(var(--brass) / 0.5)", borderRadius: 2 }}
              >
                <Image
                  src="/images/QR.jpg"
                  alt="UPI donation QR code for Rahuri Sahajyog Welfare Society"
                  width={200}
                  height={200}
                  className="block object-contain"
                  style={{ width: 160, height: 160 }}
                />
              </div>
              <p className="text-center italic text-[11px] tracking-[0.16em] uppercase text-[hsl(var(--brass-deep))] mt-3">
                Scan to give
              </p>
            </div>

            {/* Bank details */}
            <dl className="w-full space-y-4 text-center md:text-left m-0">
              {FIELDS.map((f) => (
                <div
                  key={f.labelEn}
                  className="pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    <span className="italic normal-case tracking-[0.18em]">{f.labelEn}</span>
                    <span className="marathi normal-case tracking-normal"> · {f.labelMr}</span>
                  </dt>
                  <dd className="mt-1.5 flex items-center justify-center md:justify-start gap-2.5 m-0">
                    <span
                      className="text-[15px] md:text-[16px] text-foreground"
                      style={f.copy ? { fontVariantNumeric: "tabular-nums", letterSpacing: "0.03em" } : undefined}
                    >
                      {f.value}
                    </span>
                    {f.note && (
                      <span className="italic text-[13px] text-muted-foreground">· {f.note}</span>
                    )}
                    {f.copy && (
                      <button
                        onClick={() => copy(f.value)}
                        className="grid place-items-center h-7 w-7 shrink-0 text-[hsl(var(--brass-deep))] hover:text-primary transition-colors"
                        style={{ border: "1px solid hsl(var(--brass) / 0.35)", borderRadius: 2 }}
                        aria-label={`Copy ${f.labelEn}`}
                      >
                        {copied === f.value ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    )}
                  </dd>
                  {copied === f.value && (
                    <p className="text-[11px] italic text-[hsl(var(--brass-deep))] mt-1">
                      Copied
                    </p>
                  )}
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="italic text-[13px] text-muted-foreground">
              Scan the QR with any UPI app, or transfer directly.
            </p>
            <p className="marathi not-italic text-[13px] text-muted-foreground mt-1">
              कोणत्याही UPI अ‍ॅपने QR स्कॅन करा, किंवा थेट रक्कम पाठवा.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
