"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Users, Heart } from "lucide-react";

const RegistrationCard = () => {
  return (
    <section
      className="py-24 w-full"
      id="registration"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-2 border-primary/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary">
                  Event Highlights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* <div className="flex items-center text-muted-foreground">
                  <CalendarDays className="mr-3 h-5 w-5 text-primary" />
                  <span>
                    5-day immersive spiritual experience (Jan 30 - Feb 3, 2025)
                  </span>
                </div> */}
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-3 h-5 w-5 text-primary" />
                  <span>
                    Seminar at Raghunandan Hall & Puja at Swayambhu Ekadash
                    Rudra Bhumi
                  </span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="mr-3 h-5 w-5 text-primary" />
                  <span>Join Sahaja Yogis from around the world</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Heart className="mr-3 h-5 w-5 text-primary" />
                  <span>
                    Deepen your meditation practice and spiritual knowledge
                  </span>
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

            <Button size="lg" className="w-full py-6 text-lg" asChild>
              <a
                href="https://forms.eduqfix.com/rahuwof/add"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                Donate Now
              </a>
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Contibute for this spiritually enriching event and embark
              on a journey of self-discovery
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationCard;
