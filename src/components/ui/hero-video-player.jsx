'use client'
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const animationVariants = {
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
};

const HeroVideoPlayer = ({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const selectedAnimation = animationVariants[animationStyle];

  // Convert YouTube URL to embed format
  const getEmbedUrl = (url) => {
    const videoId = url.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/
    );
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url;
  };

  return (
    <div className={cn("relative w-full", className)}>
      <AnimatePresence mode="wait">
        {!isPlaying ? (
          <motion.div
            key="thumbnail"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={selectedAnimation}
            className="relative cursor-pointer group"
            onClick={() => setIsPlaying(true)}
          >
            <img
              src={thumbnailSrc}
              alt={thumbnailAlt}
              width={1920}
              height={1080}
              className="w-full transition-all duration-200 group-hover:brightness-[0.8] ease-out rounded-md shadow-lg border"
            />
            <div className="absolute inset-0 flex items-center justify-center group-hover:scale-100 scale-[0.9] transition-all duration-200 ease-out rounded-2xl">
              <div className="bg-primary/10 flex items-center justify-center rounded-full backdrop-blur-md md:size-28 size-20">
                <div className="flex items-center justify-center bg-gradient-to-b from-primary/30 to-primary shadow-md rounded-full md:size-20 size-14 transition-all ease-out duration-200 relative group-hover:scale-[1.2] scale-100">
                  <Play
                    className="md:size-8 size-6 text-white fill-white group-hover:scale-105 scale-100 transition-transform duration-200 ease-out"
                    style={{
                      filter:
                        "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="video"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={selectedAnimation}
            className="relative w-full aspect-video"
          >
            <motion.button
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 z-10 text-white text-xl bg-neutral-900/50 ring-1 backdrop-blur-md rounded-full p-2 dark:bg-neutral-100/50 dark:text-black"
            >
              <XIcon className="size-5" />
            </motion.button>
            <iframe
              src={getEmbedUrl(videoSrc)}
              className="w-full h-full rounded-2xl border-2 border-white"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default HeroVideoPlayer;
