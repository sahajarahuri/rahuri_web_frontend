"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { format } from "date-fns";
import { Eclipse, Lightbulb, Bed, Map, ExternalLink, Youtube, ArrowRight, MapPin, Calendar, YoutubeIcon } from "lucide-react";

const Schedule = () => {
  const [sessions, setSessions] = useState([]);
  const [additionalContent, setAdditionalContent] = useState({
    joinNextSessionLink: "",
    sacredResources: [],
  });

  useEffect(() => {
    fetchSessions();
    fetchAdditionalContent();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch("/api/sessions");
      const data = await response.json();
      setSessions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setSessions([]);
    }
  };

  const fetchAdditionalContent = async () => {
    try {
      const response = await fetch("/api/content");
      const data = await response.json();
      setAdditionalContent(data);
    } catch (error) {
      console.error("Error fetching additional content:", error);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Map icon strings to actual components
  const iconComponents = {
    EclipseIcon: Eclipse,
    LightbulbIcon: Lightbulb,
    BedIcon: Bed,
  };

  return (
    <section
      className="section-min-height py-20 flex items-center bg-gradient-to-br from-secondary to-background"
      id="schedule"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-primary mb-4">
            Weekly Meditation Schedule
          </h2>
          <p className="text-xl text-secondary-foreground max-w-2xl mx-auto">
            Join our sacred meditation sessions every Thursday on YouTube.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="bg-white/80 backdrop-blur">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-primary mb-8">
                  Upcoming Sessions
                </h3>
                <div className="space-y-6">
                  {sessions?.map((session) => (
                    <Card
                      key={session._id}
                      className="bg-gradient-to-r from-background to-secondary"
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex items-center space-x-4 mb-4 md:mb-0">
                            {iconComponents[session.icon] ? (
                              React.createElement(
                                iconComponents[session.icon],
                                {
                                  className: "text-primary h-6 w-6",
                                }
                              )
                            ) : (
                              <div className="text-primary h-6 w-6">?</div>
                            )}
                            <div>
                              <p className="text-xl font-medium text-primary">
                                {session.title}
                              </p>
                              <p className="text-primary">
                                {format(new Date(session.date), "MMMM d, yyyy")}{" "}
                                at {session.time}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {session.links?.map((link, index) => (
                              <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-primary text-white px-3 py-1 rounded hover:bg-primary/90 transition-colors text-sm"
                              >
                                {link.type}
                              </a>
                            ))}
                          </div>
                        </div>
                        {session.imageUrl && (
                          <div className="mt-4">
                            <Image
                              src={session.imageUrl}
                              alt={session.title}
                              width={400}
                              height={200}
                              className="rounded-lg object-cover w-full"
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-8">
              <Card className="bg-gradient-to-br from-primary/90 to-accent overflow-hidden hindi">
                <CardContent className="p-6 text-white">
                  {/* Top Banner */}
                  <div className="flex justify-center items-center space-x-3 mb-8 py-3 border-b border-white/20">
                    <Map className="h-6 w-6" />
                    <h3 className="text-xl font-medium">
                      Sahaja Yoga Meditation Center | सहज योग ध्यान केंद्र
                    </h3>
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid gap-4">
                    {/* Address Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                      <div className="flex items-center space-x-2 text-white/80">
                        <MapPin className="h-4 w-4" />
                        <p className="text-lg hindi">
                          श्री स्वयंभू एकादश रुद्र भूमी
                          <p className="text-lg hindi">मुसळवाडी, राहुरी</p>
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 text-white/80">
                        <MapPin className="h-4 w-4" />
                        <p className="text-lg">
                          Shri Swayambhu Ekadash Rudra Bhumi
                          <p className="text-lg">Musalwadi, Rahuri</p>
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 pl-6 md:pl-0"></div>

                    {/* Date Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                      <div className="flex items-center space-x-2 text-white/80">
                        <Calendar className="h-4 w-4" />
                        <p className="text-lg hindi">
                          31 जानेवारी ते 2 फेब्रुवारी 2025
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 text-white/80">
                        <Calendar className="h-4 w-4" />
                        <p className="text-lg">
                          January 31 to February 2, 2025
                        </p>
                      </div>
                    </div>

                    {/* YouTube Broadcast Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <YoutubeIcon className="h-4 w-4" />
                        <p className="text-base hindi">
                          यूट्यूब चैनल के माध्यम से श्री एकादश रुद्र ध्यान सत्र
                          एवं पूजा हवन लाइव प्रसारण
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Youtube className="h-4 w-4" />
                        <p className="text-base">
                          Live broadcast of Shri Ekadash Rudra meditation
                          session and Puja Havan via YouTube channel
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Join Button */}
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full mt-8 transition-colors duration-200"
                    asChild
                  >
                    <a
                      href={additionalContent.joinNextSessionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2"
                    >
                      <span>Join Virtual Session</span>
                    </a>
                  </Button>

                  {/* Bottom Banner */}
                  <div className="mt-8 pt-4 border-t border-white/20 text-center">
                    <p className="text-sm text-white/80">
                      International Sahaja Yoga Meditation Center |
                      आंतरराष्ट्रीय सहज योग ध्यान केंद्र
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* <Card className="bg-white/80 backdrop-blur">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-primary mb-6">
                    Sacred Resources
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {additionalContent.sacredResources?.map(
                      (resource, index) => {
                        const IconComponent = iconComponents[resource.icon];
                        return (
                          <Button
                            key={index}
                            variant="outline"
                            className="flex items-center justify-start space-x-2"
                          >
                            {IconComponent &&
                              React.createElement(IconComponent, {
                                className: "text-primary",
                              })}
                            <span>{resource.title}</span>
                          </Button>
                        );
                      }
                    )}
                  </div>
                </CardContent>
              </Card> */}

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Additional Links</CardTitle>
                </CardHeader>
                <CardContent className="mt-3">
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      asChild
                      className="w-full justify-start"
                    >
                      <a
                        href="https://Rahurisahajyoga.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" /> Official
                        Website
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="w-full justify-start"
                    >
                      <a
                        href="https://youtu.be/SP1gMYwsjIA?si=gCC3hsP0mESZ68pB"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center"
                      >
                        <Youtube className="mr-2 h-4 w-4" /> Watch Ekadash Rudra
                        Documentary
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};



export default Schedule;
