"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="bg-background/95 backdrop-blur-md border-b border-border/40 fixed w-full z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-3 px-4">
          {/* Title Section */}
          <div className="flex items-center justify-between">
            <Link href="/" className="block">
              <div className="text-center lg:text-left">
                <h1 className="text-xl md:text-3xl font-bold text-primary tracking-tight font-sans">
                  ॥ श्री स्वयंभू एकादश रुद्र ॥
                </h1>
                <p className="text-sm md:text-base text-primary/80">
                  Shri Swayambhu Ekadash Rudra Musalwadi, Rahuri (Maharashtra)
                </p>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-accent transition-colors"
            >
              <Menu className="h-6 w-6 text-primary" />
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`${isOpen ? "block" : "hidden"} lg:block mt-4 lg:mt-0`}
          >
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
              {[
                { href: "#home", label: "Home" },
                { href: "#about", label: "About" },
                { href: "#schedule", label: "Schedule" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-primary hover:text-primary/80 transition-colors font-medium group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
