"use client";

import HeroVideoPlayer from "@/components/ui/hero-video-player";
import { motion } from "framer-motion";

export const Video = () => {
  return (
    <section className="py-24 md:py-32 bg-background text-center border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="mb-10"
        >
          <div className="eyebrow mb-4">
            A short film <span className="marathi normal-case tracking-normal">· एक लघुपट</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-1">
            Shri Ekadash Rudra
          </h2>
          <h3 className="marathi text-2xl md:text-3xl font-medium text-primary mb-3">
            श्री एकादश रुद्र
          </h3>
          <p className="italic text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            On the sacred tradition of Rahuri and the Ekadash Rudra ceremony.
          </p>
          <p className="marathi not-italic text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            राहुरीच्या पवित्र परंपरेवर आणि एकादश रुद्र सोहळ्यावर आधारित.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.1 }}
          className="rounded-md overflow-hidden shadow-[0_4px_30px_hsl(30_20%_14%/0.1)] max-w-3xl mx-auto"
        >
          <HeroVideoPlayer
            animationStyle="from-center"
            videoSrc="https://youtu.be/SP1gMYwsjIA?si=gCC3hsP0mESZ68pB"
            thumbnailSrc="/images/tumbnail.jpg"
            thumbnailAlt="Everything about Rahuri & Ekadash Rudra"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Video;
