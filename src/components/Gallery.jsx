"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const galleryItems = [
  {
    image: "/images/1.jpg",
    title: "The Awakening",
    description:
      "Shri Mataji Nirmala Devi guiding seekers towards self-realization.",
  },
  {
    image: "/images/2.jpg",
    title: "Global Meditation",
    description:
      "Sahaja Yogis meditating together, connecting with the divine energy.",
  },
  {
    image: "/images/3.jpg",
    title: "Spreading Knowledge",
    description:
      "Shri Mataji sharing the ancient wisdom of Sahaja Yoga with the world.",
  },
  {
    image: "/images/4.jpg",
    title: "Inner Peace",
    description:
      "Experience the profound silence of meditation and self-discovery.",
  },
  {
    image: "/images/5.jpg",
    title: "Collective Joy",
    description:
      "Celebrating the unity and joy of collective meditation practices.",
  },
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + galleryItems.length) % galleryItems.length
    );
  };

  // Auto-slide functionality
  React.useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(nextSlide, 3000);
      return () => clearInterval(interval);
    }
  }, [isPaused, nextSlide]);

  // Pause auto-slide on hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPaused(false);
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold tracking-tight text-primary mb-6">
            Walking in the Paths of Sahaja Yoga
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore the journey of self-realization through the teachings of
            Shri Mataji Nirmala Devi
          </p>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {galleryItems.map((item, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Card className="border-0 bg-transparent">
                    <div className="relative h-[600px] w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h3 className="text-3xl font-bold mb-3">
                          {item.title}
                        </h3>
                        <p className="text-lg text-gray-200">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div
            className={cn(
              "absolute top-1/2 w-full flex justify-between px-4 transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <Button
              variant="secondary"
              size="icon"
              className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentIndex === index
                    ? "bg-primary w-6"
                    : "bg-muted hover:bg-primary/50"
                )}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
