"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Heart } from "lucide-react";

const Registration = () => {
  return (
    <section className="py-24 bg-card" id="booking">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-primary mb-4">
            Begin Your Journey of Self-Discovery
          </h2>
          <p className="text-xl text-secondary-foreground max-w-2xl mx-auto">
            Experience the transformative power of Sahaja Yoga meditation in our
            peaceful sanctuary
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-2 border-primary/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary">
                  Join Our Meditation Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center text-secondary-foreground">
                  <CalendarDays className="mr-3 h-5 w-5 text-primary" />
                  <span>Regular sessions available throughout the week</span>
                </div>
                <div className="flex items-center text-secondary-foreground">
                  <MapPin className="mr-3 h-5 w-5 text-primary" />
                  <span>Peaceful location with easy accessibility</span>
                </div>
                <div className="flex items-center text-secondary-foreground">
                  <Heart className="mr-3 h-5 w-5 text-primary" />
                  <span>Guided by experienced practitioners</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col space-y-6"
          >
            <div className="bg-primary/5 rounded-lg p-6 text-center">
              <p className="text-2xl font-bold text-primary mb-2">
                Upcoming Pooja & Havan
              </p>
              <p className="text-sm text-secondary-foreground">
                International Shri Ekadash Rudra Meditation, Pooja and Havan
              </p>
            </div>

            <Button size="lg" className="w-full py-6 text-lg" asChild>
              <a
                href="/registration"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                Register Here
              </a>
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Join hundreds of others who have discovered inner peace through
              Sahaja Yoga
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
