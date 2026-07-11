"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const LINKS = [
  { href: "#home", label: "Home", labelMr: "मुख्यपृष्ठ" },
  { href: "#about", label: "About", labelMr: "आमच्याविषयी" },
  { href: "#announcements", label: "Announcements", labelMr: "घोषणा" },
  { href: "#schedule", label: "Schedule", labelMr: "वेळापत्रक" },
  { href: "#register", label: "Donate", labelMr: "देणगी" },
  { href: "#contact", label: "Contact", labelMr: "संपर्क" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (e, href) => {
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      className="bg-background/95 backdrop-blur-md border-b border-border fixed w-full z-50"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4 gap-4">
          <Link href="#home" onClick={(e) => scrollTo(e, "#home")} className="block min-w-0">
            <div className="text-left">
              <div className="italic text-[10px] md:text-xs tracking-[0.15em] uppercase text-accent">
                Sahaja Yoga · Rahuri <span className="marathi normal-case tracking-normal">· सहज योग, राहुरी</span>
              </div>
              <h1 className="text-lg md:text-2xl font-medium text-primary tracking-tight marathi leading-tight mt-0.5 truncate">
                ॥ श्री स्वयंभू एकादश रुद्र ॥
              </h1>
            </div>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-secondary transition-colors"
            aria-label="Menu"
          >
            {isOpen ? <X className="h-5 w-5 text-primary" /> : <Menu className="h-5 w-5 text-primary" />}
          </button>

          <div className="hidden lg:flex items-center gap-6">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="text-center leading-tight text-foreground hover:text-primary transition-colors"
              >
                <span className="block text-sm">{link.label}</span>
                <span className="block marathi text-[11px] text-muted-foreground">{link.labelMr}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-3 border-t border-border pt-3">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="flex items-baseline gap-2 text-sm text-foreground hover:text-primary transition-colors py-1"
              >
                <span>{link.label}</span>
                <span className="marathi text-xs text-muted-foreground">{link.labelMr}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
