"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  MapPin,
  Heart,
  Gift,
  Building,
  Copy,
} from "lucide-react";

const Registration = () => {
  return (
    <section className="py-24 bg-card" id="register">
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

        <div className="grid lg:grid-cols-4 gap-8 items-start">
          {/* Registration Card */}
          <motion.div
            className="lg:col-span-2"
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

                <div className="bg-primary/5 rounded-lg p-6 text-center mt-6">
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
                  Join hundreds of others who have discovered inner peace
                  through Sahaja Yoga
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Donation Card */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-2 border-primary/10 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  Donations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center p-2 bg-primary/5 rounded-lg">
                  <img
                    src="/images/QR.jpg"
                    alt="Donation QR Code"
                    className="w-64 h-64 object-contain"
                  />
                </div>

                <div className="bg-primary/5 rounded-lg">
                  <div className="flex flex-col bg-secondary/50 p-3 rounded-sm font-semibold">
                    <p>
                      <span className="text-primary">Account Name:</span> Rahuri
                      Sahajyog Welfare Society
                    </p>
                    <p>
                      <span className="text-primary">Account No.:</span>{" "}
                      50100760322286
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm p-3">
                    <p>
                      <span className="text-primary">IFSC:</span> HDFC0004295
                    </p>
                    <p>
                      <span className="text-primary">Branch:</span> Ahmednagar
                    </p>
                    <p>
                      <span className="text-primary">MICR:</span> 414240006
                    </p>
                    <p>
                      <span className="text-primary">Code:</span> 04295
                    </p>
                  </div>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  Your contribution helps maintain our centers and spread free
                  meditation programs
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
