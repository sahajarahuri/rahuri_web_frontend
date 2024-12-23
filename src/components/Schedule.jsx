"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { format } from "date-fns";
import { Eclipse, Lightbulb, Bed, Map } from "lucide-react";

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
          <div className="text-secondary-foreground text-xl mb-2">
            ॥ दैनिक ध्यान ॥
          </div>
          <h2 className="text-4xl font-bold text-primary mb-4">
            Daily Meditation Schedule
          </h2>
          <p className="text-xl text-secondary-foreground max-w-2xl mx-auto">
            Join our sacred meditation sessions to awaken your inner divine
            energy.
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
              <Card className="bg-gradient-to-br from-primary to-accent">
                <CardContent className="p-8 text-white">
                  <div className="flex items-center space-x-4 mb-6">
                    <Map className="text-3xl" />
                    <h3 className="text-2xl font-semibold">
                      Join Next Session
                    </h3>
                  </div>
                  <p className="mb-8 text-lg opacity-90">
                    Experience the divine knowledge of self-realization with our
                    enlightened guides
                  </p>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    asChild
                  >
                    <a
                      href={additionalContent.joinNextSessionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Virtual Session
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur">
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
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
