"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <header
      className="min-h-screen relative flex items-center mandala-bg"
      id="home"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-accent/50"></div>
      <img
        src="https://img1.wsimg.com/isteam/ip/b36f09d3-50c2-465f-95e7-d2f57c782d42/365%20Diwali%2001.jpg/:/rs=w:1280,h:860"
        alt="Meditation Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 flex items-center">
        <motion.div
          className="max-w-2xl text-left"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-secondary text-xl mb-4">ॐ नमः शिवाय</div>
          <h1 className="text-5xl sm:text-6xl font-bold text-primary-foreground mb-6 font-serif">
            Discover Inner{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
              {" "}
              Peace
            </span>{" "}
            Through Sahaja Yoga
          </h1>
          <p className="text-xl text-secondary mb-8 max-w-xl">
            Experience the ancient wisdom of self-realization through our free
            meditation sessions
          </p>
          <div className="space-x-4">
            <Button variant="default" size="lg" asChild>
              <a href="#schedule">Begin Your Journey</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#about">Learn More</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;
