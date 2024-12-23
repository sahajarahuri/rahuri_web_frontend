"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "Sahaja Yoga has transformed my life, bringing peace and self-realization.",
    author: "Shri Mataji Nirmala Devi",
    image: "/images/sahaja.webp",
  },
  {
    quote:
      "Through Sahaja Yoga, I've discovered a profound connection to my inner self.",
    author: "Shri Mataji Nirmala Devi",
    image: "/images/sahaja.webp",
  },
  {
    quote:
      "The practice of Sahaja Yoga has opened doors to spiritual growth I never knew existed.",
    author: "Shri Mataji Nirmala Devi",
    image: "/images/sahaja.webp",
  },
];

const Testimonial = () => {
  return (
    <section className="py-20 bg-secondary" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-primary mb-4">Testimonials</h2>
          <p className="text-xl text-secondary-foreground max-w-2xl mx-auto">
            Hear from those who have experienced the transformative power of
            Sahaja Yoga
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full flex flex-col">
                <CardContent className="flex-grow flex flex-col justify-between p-6">
                  <div>
                    <p className="text-secondary-foreground mb-4">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <p className="text-primary font-semibold">
                      {testimonial.author}
                    </p>
                  </div>
                  <div className="mt-6">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      width={300}
                      height={400}
                      className="rounded-lg object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
