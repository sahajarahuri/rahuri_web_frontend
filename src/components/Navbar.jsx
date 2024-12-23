"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      className="bg-background/80 backdrop-blur-md shadow-sm fixed w-full z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-3xl font-bold text-primary">
              ॥ Sahaja Yoga ॥
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#home"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="#about"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="#schedule"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Schedule
            </Link>
            <Link
              href="#contact"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
