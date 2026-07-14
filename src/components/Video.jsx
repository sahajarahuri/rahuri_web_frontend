"use client";

import HeroVideoPlayer from "@/components/ui/hero-video-player";
import SectionHeading from "@/components/SectionHeading";
import { motion } from "framer-motion";

export const Video = () => {
  return (
    <section className="sanctum relative py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrowEn="A short film"
          eyebrowMr="एक लघुपट"
          titleEn="Shri Ekadash Rudra"
          titleMr="श्री एकादश रुद्र"
          leadEn="On the sacred tradition of Rahuri and the Ekadash Rudra ceremony."
          leadMr="राहुरीच्या पवित्र परंपरेवर आणि एकादश रुद्र सोहळ्यावर आधारित."
          className="mb-14"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-3xl mx-auto"
        >
          {/* Brass plate the film sits inside */}
          <div
            className="relative p-2 md:p-3"
            style={{
              border: "1px solid hsl(var(--brass) / 0.45)",
              borderRadius: 2,
              background: "hsl(var(--card))",
              boxShadow: "var(--shadow-raised)",
            }}
          >
            <div className="overflow-hidden" style={{ borderRadius: 1 }}>
              <HeroVideoPlayer
                animationStyle="from-center"
                videoSrc="https://youtu.be/SP1gMYwsjIA?si=gCC3hsP0mESZ68pB"
                thumbnailSrc="/images/tumbnail.jpg"
                thumbnailAlt="Everything about Rahuri and Ekadash Rudra"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Video;
