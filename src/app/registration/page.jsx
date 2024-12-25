"use client";

import React from "react";
import {
  Calendar,
  MapPin,
  Users,
  Mail,
  Phone,
  Youtube,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CalendarDays, ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import RegistrationCard from "@/components/RegistrationCard";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const EkadashRudraLanding = () => {
  const contacts = [
    "9822891717",
    "9922127980",
    "9604944096",
    "8788559776",
    "8149551970",
    "9975091525",
  ];

  const scheduleData = [
    {
      date: "January 30, 2025",
      time: "5:00 PM onwards",
      event: "Arrival & Seminar Start",
    },
    {
      date: "January 31, 2025",
      time: "4:00 AM onwards",
      event: "Day 2 Program",
    },
    {
      date: "February 1, 2025",
      time: "4:00 AM onwards",
      event: "Day 3 Program",
    },
    {
      date: "February 2, 2025",
      time: "11:00 AM onwards",
      event: "Shri Ekadash Puja & Havan",
    },
    { date: "February 3, 2025", time: "10:00 AM", event: "Conclusion" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="container mx-auto px-4 py-8"
      >
        {/* Hero Section */}
        <section className="text-center mb-16">
          <motion.h1
            className="text-5xl font-extrabold mb-4 text-primary bg-clip-text  bg-gradient-to-r from-primary to-secondary"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            International Shri Ekadash Rudra Meditation, Pooja and Havan 2025
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join us for a transformative spiritual experience
          </motion.p>
        </section>

        <motion.div
          className="my-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-2 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Register now for Shri Ekadash Rudra Meditation, Pooja and
                    Havan
                  </h3>
                </div>

                <Button size="lg" className=" px-12 py-6 text-lg" asChild>
                  <a
                    href="https://forms.eduqfix.com/rahuwof/add"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    Register Now
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <motion.img
              src="/images/poster.jpg"
              alt="Event Poster"
              className="w-full rounded-lg shadow-xl border mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <VenuesCard />
            <PricingCard />
            <ContactCard contacts={contacts} />
            <ScheduleCard scheduleData={scheduleData} />
          </div>
        </div>

        {/* Registration Section */}
        <RegistrationCard />
      </motion.div>
    </div>
  );
};

const ScheduleCard = ({ scheduleData }) => (
  <Card>
    <CardHeader className="bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-t-lg">
      <CardTitle className="flex items-center gap-2">
        <Calendar className="h-6 w-6" />
        Schedule
      </CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <ScrollArea className="h-[300px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Event</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduleData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.date}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.event}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </CardContent>
  </Card>
);

const VenuesCard = () => (
  <Card>
    <CardHeader className="bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-t-lg">
      <CardTitle className="flex items-center gap-2">
        <MapPin className="h-6 w-6" />
        Venues
      </CardTitle>
    </CardHeader>
    <CardContent className="mt-3">
      <Tabs defaultValue="seminar">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="seminar">Seminar</TabsTrigger>
          <TabsTrigger value="puja">Puja</TabsTrigger>
        </TabsList>
        <TabsContent value="seminar">
          <h3 className="font-semibold mb-2">Seminar Venue</h3>
          <p className="mb-4">
            Raghunandan Hall, Rahuri-Taklimiya Road, Rahuri
          </p>
          <Button variant="outline" asChild>
            <a
              href="https://maps.app.goo.gl/YAdsrUouXRKXMACR6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <MapPin className="mr-2 h-4 w-4" /> View on Maps
            </a>
          </Button>
        </TabsContent>
        <TabsContent value="puja">
          <h3 className="font-semibold mb-2">Puja Venue</h3>
          <p className="mb-4">
            International Sahaja Yoga Meditation Center, Swayambhu Ekadash Rudra
            Bhumi, Near Musalwadi Lake
          </p>
          <Button variant="outline" asChild>
            <a
              href="https://maps.app.goo.gl/E7gKfggAKP5B2fo86"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <MapPin className="mr-2 h-4 w-4" /> View on Maps
            </a>
          </Button>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
);

const PricingCard = () => (
  <Card>
    <CardHeader className="bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-t-lg">
      <CardTitle className="flex items-center gap-2">
        <Users className="h-6 w-6" />
        Registration Fees
      </CardTitle>
    </CardHeader>
    <CardContent className="mt-3">
      <Tabs defaultValue="with-stay">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="with-stay">With Stay</TabsTrigger>
          <TabsTrigger value="without-stay">Without Stay</TabsTrigger>
        </TabsList>
        <TabsContent value="with-stay">
          <h3 className="font-semibold mb-2">4-Day Seminar (With Stay)</h3>
          <ul className="space-y-2">
            <li>Adults: ₹3,500</li>
            <li>Youth: ₹3,000</li>
            <li>Children: ₹2,000</li>
          </ul>
        </TabsContent>
        <TabsContent value="without-stay">
          <h3 className="font-semibold mb-2">4-Day Seminar (Without Stay)</h3>
          <ul className="space-y-2">
            <li>Adults: ₹1,500</li>
            <li>Youth: ₹1,500</li>
            <li>Children: ₹1,000</li>
          </ul>
        </TabsContent>
      </Tabs>
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Puja Day (February 2, 2025)</h3>
        <ul className="space-y-2">
          <li>Adults/Youth: ₹300</li>
          <li>Children: ₹200</li>
        </ul>
      </div>
    </CardContent>
  </Card>
);

const ContactCard = ({ contacts }) => (
  <Card>
    <CardHeader className="bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-t-lg">
      <CardTitle>Contact Information</CardTitle>
    </CardHeader>
    <CardContent className="mt-3">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          <a
            href="mailto:ekadashrudramusalvadi@gmail.com"
            className="text-primary hover:underline"
          >
            ekadashrudramusalvadi@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          <a
            href="mailto:rahurisahajyog.meditation@gmail.com"
            className="text-primary hover:underline"
          >
            rahurisahajyog.meditation@gmail.com
          </a>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <Phone className="h-5 w-5" />
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={`tel:${contact}`}
              className="text-primary hover:underline"
            >
              {contact}
              {index !== contacts.length - 1 ? "," : ""}
            </a>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);




export default EkadashRudraLanding;
