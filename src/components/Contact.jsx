"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

const Contact = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "ekadashrudramusalvadi@gmail.com",
    },
    {
      icon: Phone,
      title: "Contact Numbers",
      content: [
        "+91 98228 91717",
        "+91 99221 27980",
        "+91 96049 44096",
        "+91 87885 59776",
        "+91 81495 51970",
        "+91 99750 91525",
      ],
    },
    {
      icon: MapPin,
      title: "Address",
      content:
        "International Sahaja Yoga Meditation Center, Shri Swayambhu Ekadash Rudra Bhumi, Musalwadi, Near Rahuri Lake, Musalwadi",
      link: "https://maps.app.goo.gl/Wxr2HVuQFtir4Dy9A",
    },
  ];

  return (
    <section
      className="min-h-screen py-20 bg-gradient-to-b from-background to-secondary/20"
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

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-r from-background to-secondary"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <item.icon className="text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-medium text-primary mb-2">
                          {item.title}
                        </h4>
                        {Array.isArray(item.content) ? (
                          <div className="grid grid-cols-2 gap-2">
                            {item.content.map((number, idx) => (
                              <a
                                key={idx}
                                href={`tel:${number}`}
                                className="text-secondary-foreground hover:text-primary transition-colors"
                              >
                                {number}
                              </a>
                            ))}
                          </div>
                        ) : (
                          <div className="text-secondary-foreground">
                            {item.content}
                            {item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center mt-2 text-primary hover:text-primary/80 transition-colors"
                              >
                                View on Maps{" "}
                                <ExternalLink className="ml-2 w-4 h-4" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
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
            <Card className="bg-gradient-to-tr from-background to-secondary">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-primary mb-6">
                  Send us a Message
                </h3>
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      className="w-full bg-background/50"
                    />
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
                      className="w-full bg-background/50"
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
                      className="w-full bg-background/50"
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
                      className="w-full bg-background/50"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-white hover:bg-primary/90 transition-colors"
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
