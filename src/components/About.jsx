"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  SmileIcon as SelfImprovement,
  SpadeIcon as Spa,
  GroupIcon as Groups,
} from "lucide-react";

const About = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      className="section-min-height py-20 flex items-center bg-gradient-to-b from-background to-secondary/20"
      id="about"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-5xl font-extrabold text-primary mb-4 tracking-wide">
            The Path to Self-Realization
          </h2>
          <p className="text-xl text-secondary-foreground max-w-2xl mx-auto leading-relaxed">
            Discover the ancient practice of Kundalini awakening through Sahaja
            Yoga meditation.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-12">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="bg-gradient-to-br from-secondary to-background shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-8">
                <motion.div
                  className="w-16 h-16 bg-primary rounded-full mb-6 flex items-center justify-center"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <SelfImprovement className="text-primary-foreground text-3xl" />
                </motion.div>
                <h3 className="text-3xl font-semibold text-primary mb-4">
                  Inner Peace
                </h3>
                <p className="text-secondary-foreground text-lg leading-relaxed">
                  Experience the divine energy within through awakening of the
                  Kundalini Shakti.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-secondary to-background shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-8">
                <motion.div
                  className="w-16 h-16 bg-primary rounded-full mb-6 flex items-center justify-center"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <Spa className="text-primary-foreground text-3xl" />
                </motion.div>
                <h3 className="text-3xl font-semibold text-primary mb-4">
                  Spiritual Balance
                </h3>
                <p className="text-secondary-foreground text-lg leading-relaxed">
                  Align your chakras and achieve harmony through ancient
                  meditation practices.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-secondary to-background shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-8">
                <motion.div
                  className="w-16 h-16 bg-primary rounded-full mb-6 flex items-center justify-center"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <Groups className="text-primary-foreground text-3xl" />
                </motion.div>
                <h3 className="text-3xl font-semibold text-primary mb-4">
                  Global Sangha
                </h3>
                <p className="text-secondary-foreground text-lg leading-relaxed">
                  Join our worldwide community of seekers and experience
                  collective consciousness.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
