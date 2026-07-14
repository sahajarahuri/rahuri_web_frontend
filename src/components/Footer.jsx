"use client";

import { MapPin, Youtube, Facebook, Instagram, Globe, ArrowUp, ArrowUpRight } from "lucide-react";
import { useSettings } from "@/hooks/use-settings";
import { BHUMI } from "@/lib/site";

const NAV = [
  { href: "#about", en: "About", mr: "आमच्याविषयी" },
  { href: "#announcements", en: "Announcements", mr: "घोषणा" },
  { href: "#schedule", en: "Schedule", mr: "वेळापत्रक" },
  { href: "#register", en: "Donate", mr: "देणगी" },
];

const ICONS = {
  YouTube: Youtube,
  Facebook: Facebook,
  Instagram: Instagram,
  "Global Foundation": Globe,
};

/**
 * The colophon — the base plate the page rests on. It goes dark so the
 * document has a visible floor, rather than trailing off into the same
 * ivory it began with.
 */
const Footer = () => {
  const { settings } = useSettings();
  const year = new Date().getFullYear();

  const socials = [
    { url: settings.socialYoutubeUrl, label: "YouTube" },
    { url: settings.socialFacebookUrl, label: "Facebook" },
    { url: settings.socialInstagramUrl, label: "Instagram" },
    { url: "https://www.sahajayoga.org", label: "Global Foundation" },
  ].filter((s) => s.url);

  const toTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="relative mt-auto"
      style={{
        background: "linear-gradient(180deg, hsl(10 40% 16%), hsl(26 32% 9%))",
        color: "rgba(242,226,186,0.9)",
      }}
    >
      <div
        aria-hidden
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, transparent, hsl(37 46% 50% / 0.7) 25%, hsl(37 46% 50% / 0.7) 75%, transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-8">
        {/* The gift — the footer's thesis */}
        <div className="text-center max-w-2xl mx-auto">
          <span
            className="marathi block text-[30px] leading-none flicker"
            style={{ color: "#e2bb6e" }}
            aria-hidden
          >
            ॐ
          </span>
          <p
            className="italic text-[15px] md:text-[16.5px] leading-[1.85] mt-6"
            style={{ color: "rgba(242,226,186,0.82)" }}
          >
            Sahaja Yoga meditation is always given freely — a gift from H.H. Shri
            Mataji Nirmala Devi to humanity.
          </p>
          <p
            className="marathi not-italic text-[14px] md:text-[15px] leading-[1.95] mt-3"
            style={{ color: "rgba(242,226,186,0.6)" }}
          >
            सहज योग ध्यान नेहमी विनामूल्य दिले जाते — प.पू. श्री माताजी निर्मला देवी
            यांनी मानवतेला दिलेली एक अनमोल देणगी.
          </p>
        </div>

        <div
          className="my-12 md:my-14"
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(226,187,110,0.25), transparent)",
          }}
          aria-hidden
        />

        {/* Where · What · Elsewhere */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          <div>
            <h3
              className="text-[11px] uppercase tracking-[0.22em] mb-5"
              style={{ color: "#e2bb6e" }}
            >
              Visit
              <span className="marathi normal-case tracking-normal"> · भेट द्या</span>
            </h3>
            <div className="flex items-start gap-3">
              <MapPin
                className="h-4 w-4 shrink-0 mt-1"
                style={{ color: "rgba(226,187,110,0.75)" }}
                aria-hidden
              />
              <div>
                <address className="not-italic">
                  <span
                    className="block text-[14.5px] leading-relaxed"
                    style={{ color: "rgba(242,226,186,0.9)" }}
                  >
                    {BHUMI.nameEn}
                  </span>
                  <span
                    className="block text-[13.5px] mt-0.5"
                    style={{ color: "rgba(242,226,186,0.6)" }}
                  >
                    {BHUMI.localityEn}
                  </span>
                  <span
                    className="marathi block text-[13.5px] mt-2 leading-[1.8]"
                    style={{ color: "rgba(242,226,186,0.6)" }}
                  >
                    {BHUMI.nameMr},
                    <br />
                    {BHUMI.localityMr}
                  </span>
                </address>

                {/* The one place most visitors actually want: directions. */}
                <a
                  href={BHUMI.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 mt-4 px-3.5 py-2 rounded-sm transition-colors duration-300 hover:bg-white/10"
                  style={{
                    border: "1px solid rgba(226,187,110,0.35)",
                    color: "rgba(242,226,186,0.85)",
                  }}
                >
                  <span className="text-[12.5px] tracking-[0.04em]">
                    Get directions
                  </span>
                  <span className="marathi text-[12px] opacity-70">· दिशा</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3
              className="text-[11px] uppercase tracking-[0.22em] mb-5"
              style={{ color: "#e2bb6e" }}
            >
              Explore
              <span className="marathi normal-case tracking-normal"> · पहा</span>
            </h3>
            <ul className="space-y-3 m-0 p-0 list-none">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex items-baseline gap-2"
                    style={{ color: "rgba(242,226,186,0.78)" }}
                  >
                    <span
                      className="inline-block shrink-0"
                      style={{
                        width: 4,
                        height: 4,
                        transform: "rotate(45deg)",
                        background: "rgba(226,187,110,0.5)",
                      }}
                      aria-hidden
                    />
                    <span className="text-[14.5px] transition-colors duration-300 group-hover:text-[#e2bb6e]">
                      {l.en}
                    </span>
                    <span
                      className="marathi text-[12.5px]"
                      style={{ color: "rgba(242,226,186,0.45)" }}
                    >
                      {l.mr}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="text-[11px] uppercase tracking-[0.22em] mb-5"
              style={{ color: "#e2bb6e" }}
            >
              Elsewhere
              <span className="marathi normal-case tracking-normal"> · इतरत्र</span>
            </h3>
            <ul className="space-y-3 m-0 p-0 list-none">
              {socials.map((s) => {
                const Icon = ICONS[s.label] || Globe;
                return (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3"
                      style={{ color: "rgba(242,226,186,0.78)" }}
                    >
                      <Icon
                        className="h-[15px] w-[15px] shrink-0"
                        style={{ color: "rgba(226,187,110,0.7)" }}
                        aria-hidden
                      />
                      <span className="text-[14.5px] transition-colors duration-300 group-hover:text-[#e2bb6e]">
                        {s.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Colophon bar */}
        <div
          className="mt-14 md:mt-16 pt-7 flex flex-col sm:flex-row items-center justify-between gap-5"
          style={{ borderTop: "1px solid rgba(226,187,110,0.18)" }}
        >
          <div className="text-center sm:text-left">
            <p
              className="text-[11.5px] tracking-[0.12em]"
              style={{ color: "rgba(242,226,186,0.5)" }}
            >
              © {year} · Rahuri Sahaja Yoga Meditation Center
            </p>
            <p
              className="marathi text-[12px] mt-1"
              style={{ color: "rgba(242,226,186,0.38)" }}
            >
              © {year} · राहुरी सहज योग ध्यान केंद्र
            </p>
          </div>

          <a
            href="#home"
            onClick={toTop}
            className="group inline-flex items-center gap-2.5 px-4 py-2"
            style={{
              border: "1px solid rgba(226,187,110,0.35)",
              borderRadius: 2,
              color: "rgba(242,226,186,0.75)",
            }}
          >
            <span className="text-[12px] tracking-[0.1em] uppercase">Back to top</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
