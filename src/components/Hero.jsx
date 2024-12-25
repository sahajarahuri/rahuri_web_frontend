"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const galleryItems = [
  { image: "/images/main.jpg" },
  { image: "/images/1.jpg" },
  { image: "/images/2.jpg" },
  { image: "/images/3.jpg" },
  { image: "/images/4.jpg" },
  { image: "/images/5.jpg" },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isFirstLoad, setIsFirstLoad] = React.useState(true);
  const [fadeState, setFadeState] = React.useState("in");

  const nextSlide = React.useCallback(() => {
    setFadeState("out");
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
      setFadeState("in");
    }, 500); // Half of the transition duration
  }, []);

  const prevSlide = () => {
    setFadeState("out");
    setTimeout(() => {
      setCurrentIndex(
        (prev) => (prev - 1 + galleryItems.length) % galleryItems.length
      );
      setFadeState("in");
    }, 500);
  };

  const goToSlide = (index) => {
    setFadeState("out");
    setTimeout(() => {
      setCurrentIndex(index);
      setFadeState("in");
    }, 500);
  };

  // Auto-slide functionality with initial 10-second delay
  React.useEffect(() => {
    let interval;

    if (isFirstLoad) {
      // First image stays for 10 seconds
      interval = setTimeout(() => {
        setIsFirstLoad(false);
        nextSlide();
      }, 10000);
    } else {
      // Subsequent images change every 5 seconds
      interval = setInterval(nextSlide, 5000);
    }

    return () => {
      if (isFirstLoad) {
        clearTimeout(interval);
      } else {
        clearInterval(interval);
      }
    };
  }, [nextSlide, isFirstLoad]);

  return (
    <section className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-background">
      <div className="absolute inset-0 pt-20">
        <div className="relative h-full w-full">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                "absolute top-0 left-0 w-full h-full transition-opacity duration-1000",
                currentIndex === index
                  ? fadeState === "in"
                    ? "opacity-100"
                    : "opacity-0"
                  : "opacity-0 pointer-events-none"
              )}
            >
              <Card className="border-0 rounded-none bg-transparent h-full">
                <div className="relative h-full w-full">
                  <Image
                    src={item.image}
                    alt="Gallery image"
                    layout="fill"
                    objectFit="cover"
                    priority={index === 0}
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="absolute top-1/2 w-full flex justify-between px-6 transform -translate-y-1/2">
          <Button
            variant="secondary"
            size="icon"
            className="h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm transition-colors duration-200"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm transition-colors duration-200"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </Button>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {galleryItems.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                currentIndex === index
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/75"
              )}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
