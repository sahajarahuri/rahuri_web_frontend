"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      className="section-min-height py-20 flex items-center bg-background"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-secondary-foreground text-xl mb-2">
            ॥ संपर्क ॥
          </div>
          <h2 className="text-4xl font-bold text-primary mb-4">
            Connect With Us
          </h2>
          <p className="text-xl text-secondary-foreground max-w-2xl mx-auto">
            Begin your spiritual journey towards self-realization
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <h3 className="text-3xl font-semibold text-primary">
              Start Your Journey
            </h3>
            <p className="text-xl text-secondary-foreground">
              Embark on the path of spiritual awakening with Sahaja Yoga
              meditation. Join our free sessions or visit our meditation
              centers.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: Phone,
                  title: "Phone",
                  content: "1800 2700 800 (Toll Free)",
                },
                { icon: Mail, title: "Email", content: "info@sahajayoga.org" },
                {
                  icon: MapPin,
                  title: "Ashrams",
                  content: "Centers worldwide",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-r from-background to-secondary"
                >
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="text-xl font-medium text-primary">
                        {item.title}
                      </h4>
                      <p className="text-secondary-foreground">
                        {item.content}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-secondary to-background">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      Full Name
                    </label>
                    <Input id="name" name="name" required className="w-full" />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-white hover:bg-primary/90"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
