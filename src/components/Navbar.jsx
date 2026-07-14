"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

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
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);

        // Which section is currently in the reading zone?
        let current = "home";
        for (const l of LINKS) {
          const el = document.getElementById(l.href.slice(1));
          if (el && el.getBoundingClientRect().top <= 140) {
            current = l.href.slice(1);
          }
        }
        setActive(current);
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

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
      className="fixed w-full z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: scrolled
          ? "hsl(41 42% 95% / 0.92)"
          : "hsl(41 42% 95% / 0.55)",
        backdropFilter: "blur(14px) saturate(1.1)",
        WebkitBackdropFilter: "blur(14px) saturate(1.1)",
        boxShadow: scrolled
          ? "0 1px 0 hsl(37 46% 50% / 0.28), 0 10px 34px -22px hsl(26 22% 15% / 0.35)"
          : "0 1px 0 hsl(37 46% 50% / 0.12)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className="flex items-center justify-between gap-4 transition-[padding] duration-500"
          style={{ paddingTop: scrolled ? 12 : 18, paddingBottom: scrolled ? 12 : 18 }}
        >
          {/* Mark */}
          <Link
            href="#home"
            onClick={(e) => scrollTo(e, "#home")}
            className="group flex items-center gap-3 min-w-0"
          >
            <span
              className="hidden sm:grid place-items-center shrink-0 rounded-full border transition-colors duration-500"
              style={{
                width: 38,
                height: 38,
                borderColor: "hsl(37 46% 50% / 0.5)",
                background: "hsl(42 48% 98% / 0.7)",
              }}
              aria-hidden
            >
              <span className="marathi text-[15px] leading-none text-primary flicker">ॐ</span>
            </span>
            <span className="min-w-0">
              <span className="block italic text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[hsl(var(--brass-deep))]">
                Sahaja Yoga · Rahuri
                <span className="marathi normal-case tracking-normal"> · सहज योग, राहुरी</span>
              </span>
              <span className="block text-base md:text-xl font-medium text-primary marathi leading-tight mt-0.5 truncate">
                ॥ श्री स्वयंभू एकादश रुद्र ॥
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {LINKS.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="relative px-3 py-1.5 text-center leading-tight transition-colors duration-300"
                  style={{ color: isActive ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.75)" }}
                >
                  <span className="block text-[13px] tracking-wide">{link.label}</span>
                  <span
                    className="block marathi text-[10.5px] transition-colors duration-300"
                    style={{ color: isActive ? "hsl(var(--brass-deep))" : "hsl(var(--muted-foreground))" }}
                  >
                    {link.labelMr}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-flame"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2"
                      style={{
                        width: 5,
                        height: 5,
                        transform: "translateX(-50%) rotate(45deg)",
                        background: "hsl(var(--brass))",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="lg:hidden grid place-items-center h-10 w-10 rounded-sm border border-[hsl(var(--brass)/0.4)] text-primary hover:bg-secondary transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-[hsl(var(--brass)/0.25)] bg-[hsl(41_42%_95%/0.98)]"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
              {LINKS.map((link, i) => {
                const isActive = active === link.href.slice(1);
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.045, duration: 0.35 }}
                    className="flex items-baseline gap-2.5 py-3 border-b border-border/60 last:border-0 transition-colors"
                    style={{ color: isActive ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.85)" }}
                  >
                    <span
                      className="inline-block shrink-0"
                      style={{
                        width: 5,
                        height: 5,
                        transform: "rotate(45deg)",
                        background: isActive ? "hsl(var(--brass))" : "transparent",
                        border: `1px solid hsl(var(--brass) / ${isActive ? 1 : 0.35})`,
                      }}
                      aria-hidden
                    />
                    <span className="text-[15px]">{link.label}</span>
                    <span className="marathi text-xs text-muted-foreground">{link.labelMr}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
