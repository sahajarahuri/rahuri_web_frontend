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
      className="section-min-height py-20 flex items-center bg-background"
      id="about"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-primary mb-4">
            The Path to Self-Realization
          </h2>
          <p className="text-xl text-secondary-foreground max-w-2xl mx-auto">
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
            <Card className="bg-gradient-to-br from-secondary to-background">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary rounded-full mb-6 flex items-center justify-center">
                  <SelfImprovement className="text-primary-foreground text-3xl" />
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-4">
                  Inner Peace
                </h3>
                <p className="text-secondary-foreground text-lg">
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
            <Card className="bg-gradient-to-br from-secondary to-background">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary rounded-full mb-6 flex items-center justify-center">
                  <Spa className="text-primary-foreground text-3xl" />
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-4">
                  Spiritual Balance
                </h3>
                <p className="text-secondary-foreground text-lg">
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
            <Card className="bg-gradient-to-br from-secondary to-background">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary rounded-full mb-6 flex items-center justify-center">
                  <Groups className="text-primary-foreground text-3xl" />
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-4">
                  Global Sangha
                </h3>
                <p className="text-secondary-foreground text-lg">
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
