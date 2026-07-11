"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Registration() {
  const scrollToQr = () => {
    const el = document.getElementById("donate-details");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="register" className="py-24 md:py-32 bg-background border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="eyebrow mb-4">
            Contribute <span className="marathi normal-case tracking-normal">· योगदान द्या</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-1">
            Towards self-discovery
          </h2>
          <h3 className="marathi text-2xl md:text-3xl font-medium text-primary mb-3">
            आत्मशोधाच्या दिशेने
          </h3>
          <p className="italic text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Your contribution helps a sacred space serve meditation, prayer and
            peace for all seekers.
          </p>
          <p className="marathi not-italic text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            तुमचे योगदान या पवित्र स्थळाला सर्व साधकांसाठी ध्यान, प्रार्थना व
            शांती प्रदान करण्यास मदत करते.
          </p>
        </motion.div>

        <motion.div
          id="donate-details"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card border border-border rounded-md p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="w-40 h-40 md:w-44 md:h-44 rounded-md overflow-hidden shrink-0 bg-white p-1 border border-border">
              <Image
                src="/images/QR.jpg"
                alt="Donation QR code"
                width={200}
                height={200}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-sm md:text-base leading-relaxed text-foreground/90 text-center md:text-left">
              <div>
                <span className="italic text-muted-foreground">Account</span>
                <span className="marathi not-italic text-muted-foreground"> / खाते:</span>{" "}
                Rahuri Sahajyog Welfare Society
              </div>
              <div>
                <span className="italic text-muted-foreground">A/c No</span>
                <span className="marathi not-italic text-muted-foreground"> / खाते क्र.:</span>{" "}
                50100760322286
              </div>
              <div>
                <span className="italic text-muted-foreground">IFSC</span>
                <span className="marathi not-italic text-muted-foreground"> / आयएफएससी:</span>{" "}
                HDFC0004295 · Ahmednagar
              </div>
              <div className="italic text-xs text-muted-foreground mt-3">
                Scan the QR with any UPI app, or transfer directly.
              </div>
              <div className="marathi not-italic text-xs text-muted-foreground">
                कोणत्याही UPI अ‍ॅपने QR स्कॅन करा, किंवा थेट रक्कम पाठवा.
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={scrollToQr}
              className="text-link italic text-base bg-transparent border-b border-accent"
              type="button"
            >
              Donate online
              <span className="marathi not-italic"> · ऑनलाइन देणगी द्या</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
