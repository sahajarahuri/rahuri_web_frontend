"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { format } from "date-fns";
import {
  Eclipse, Lightbulb, Bed, MapPin, CalendarDays, Youtube,
  ExternalLink, ArrowUpRight,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useSettings } from "@/hooks/use-settings";
import { BHUMI } from "@/lib/site";

const ICONS = {
  EclipseIcon: Eclipse,
  LightbulbIcon: Lightbulb,
  BedIcon: Bed,
};

const DEFAULTS = {
  headingEn: "Weekly Meditation Schedule",
  headingHi: "साप्ताहिक ध्यान कार्यक्रम",
  subtitleEn: "Join our sacred meditation sessions every Thursday on YouTube.",
  subtitleHi: "हर गुरुवार यूट्यूब पर हमारे पवित्र ध्यान सत्र में शामिल हों।",
  centerNameEn: "Sahaja Yoga Meditation Center",
  centerNameHi: "सहज योग ध्यान केंद्र",
  addressEn: "Shri Swayambhu Ekadash Rudra Bhumi, Musalwadi, Rahuri",
  addressHi: "श्री स्वयंभू एकादश रुद्र भूमी, मुसळवाडी, राहुरी",
  /* Left blank on purpose: a hardcoded date range goes stale the moment
     the event passes. The plaque only shows this row if the editor sets it. */
  dateRangeEn: "",
  dateRangeHi: "",
  youtubeDescEn: "Live broadcast of Shri Ekadash Rudra meditation session and Puja Havan via YouTube channel",
  youtubeDescHi: "यूट्यूब चैनल के माध्यम से श्री एकादश रुद्र ध्यान सत्र एवं पूजा हवन लाइव प्रसारण",
  joinSessionLink: "",
  bannerTextEn: "International Sahaja Yoga Meditation Center",
  bannerTextHi: "आंतरराष्ट्रीय सहज योग ध्यान केंद्र",
  officialWebsiteUrl: "https://Rahurisahajyoga.com",
  documentaryUrl: "https://youtu.be/SP1gMYwsjIA?si=gCC3hsP0mESZ68pB",
};

const Schedule = () => {
  const { settings } = useSettings();
  const [sessions, setSessions] = useState([]);
  const [additionalContent, setAdditionalContent] = useState({
    joinNextSessionLink: "",
    sacredResources: [],
  });
  const [content, setContent] = useState(DEFAULTS);

  useEffect(() => {
    const load = async (url, set) => {
      try {
        const r = await fetch(url);
        const d = await r.json();
        set(d);
      } catch (e) {
        console.error(`Could not load ${url}`, e);
      }
    };
    load("/api/sessions", (d) => setSessions(Array.isArray(d) ? d : []));
    load("/api/content", setAdditionalContent);
    load("/api/schedule", (d) => setContent({ ...DEFAULTS, ...d }));
  }, []);

  /* "Upcoming" must actually mean upcoming. Previously every session in the
     database rendered here forever, so finished events sat under an
     "Upcoming sessions" heading indefinitely. Anything before today is now
     filtered out, and the remainder is sorted soonest-first. */
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const upcoming = sessions
    .filter((s) => {
      if (!s.date) return true;           // undated notices stay visible
      const d = new Date(s.date);
      return !isNaN(d) && d >= startOfToday;
    })
    .sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(a.date) - new Date(b.date);
    });

  const joinUrl =
    settings.weeklyYoutubeUrl ||
    content.joinSessionLink ||
    additionalContent.joinNextSessionLink;

  return (
    <section id="schedule" className="relative py-24 md:py-32">
      <div className="thread max-w-4xl mx-auto mb-24 md:mb-32" aria-hidden />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrowEn="Every Thursday"
          eyebrowMr="दर गुरुवारी"
          titleEn={content.headingEn}
          titleMr={content.headingHi}
          leadEn={content.subtitleEn}
          leadMr={content.subtitleHi}
          className="mb-16"
        />

        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
          {/* ---------- Sessions ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="leaf p-7 md:p-9"
          >
            <h3 className="text-[24px] md:text-[27px] font-medium text-primary leading-tight">
              Upcoming sessions
            </h3>
            <h4 className="marathi text-[17px] font-medium text-primary/75 mt-1">
              आगामी सत्रे
            </h4>

            <div className="thread my-7" aria-hidden />

            {upcoming.length === 0 ? (
              <p className="italic text-[14.5px] text-muted-foreground leading-relaxed">
                No sessions are listed just now. New dates are posted here as soon
                as they are set — and the weekly broadcast continues every Thursday.
                <span className="marathi not-italic block mt-2">
                  सध्या कोणतीही सत्रे नाहीत. नवीन तारखा येथे लगेच प्रसिद्ध केल्या जातील.
                </span>
              </p>
            ) : (
              <ul className="space-y-5 m-0 p-0 list-none">
                {upcoming.map((session, i) => {
                  const Icon = ICONS[session.icon];
                  return (
                    <motion.li
                      key={session._id}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.08 }}
                      className="group p-5 transition-colors duration-400"
                      style={{
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 2,
                        background: "hsl(var(--background))",
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex items-start gap-4 min-w-0">
                          <span
                            className="grid place-items-center shrink-0 mt-0.5"
                            style={{
                              width: 38,
                              height: 38,
                              border: "1px solid hsl(var(--brass) / 0.45)",
                              borderRadius: 2,
                            }}
                            aria-hidden
                          >
                            {Icon ? (
                              <Icon className="h-[17px] w-[17px] text-[hsl(var(--brass-deep))]" />
                            ) : (
                              <span
                                className="block"
                                style={{
                                  width: 6, height: 6,
                                  transform: "rotate(45deg)",
                                  background: "hsl(var(--brass))",
                                }}
                              />
                            )}
                          </span>
                          <div className="min-w-0">
                            <p className="text-[17px] md:text-[18px] text-primary leading-snug m-0">
                              {session.title}
                            </p>
                            <p className="italic text-[13.5px] text-muted-foreground mt-1 m-0">
                              {session.date &&
                                format(new Date(session.date), "EEEE, d MMMM yyyy")}
                              {session.time && ` · ${session.time}`}
                            </p>
                          </div>
                        </div>

                        {session.links?.length > 0 && (
                          <div className="flex flex-wrap gap-2 shrink-0">
                            {session.links.map((link, idx) => (
                              <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-primary hover:text-primary-foreground hover:bg-primary transition-colors duration-300"
                                style={{
                                  border: "1px solid hsl(var(--brass) / 0.5)",
                                  borderRadius: 2,
                                }}
                              >
                                {link.type}
                                <ArrowUpRight className="h-3 w-3" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>

                      {session.imageUrl && (
                        <div
                          className="mt-4 overflow-hidden"
                          style={{ border: "1px solid hsl(var(--border))", borderRadius: 2 }}
                        >
                          <Image
                            src={session.imageUrl}
                            alt={session.title || ""}
                            width={600}
                            height={300}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            )}
          </motion.div>

          {/* ---------- The centre ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Dark brass plaque — the one place on the page that goes dark,
                so the live broadcast reads as the moment it is */}
            <div
              className="relative overflow-hidden p-7 md:p-9"
              style={{
                borderRadius: 2,
                background:
                  "linear-gradient(165deg, hsl(10 40% 18%), hsl(26 30% 11%))",
                boxShadow: "var(--shadow-raised)",
              }}
            >
              <span
                aria-hidden
                className="absolute pointer-events-none"
                style={{ inset: 10, border: "1px solid rgba(226,187,110,0.28)" }}
              />

              <div className="relative">
                <p className="text-center text-[16px] md:text-[18px] leading-snug" style={{ color: "#f2e2ba" }}>
                  {content.centerNameEn}
                </p>
                <p className="marathi text-center text-[15px] mt-1" style={{ color: "rgba(242,226,186,0.72)" }}>
                  {content.centerNameHi}
                </p>

                <div
                  className="my-7"
                  style={{
                    height: 1,
                    background:
                      "linear-gradient(90deg, transparent, rgba(226,187,110,0.4), transparent)",
                  }}
                  aria-hidden
                />

                <dl className="space-y-5 m-0">
                  <PlaqueRow
                    icon={MapPin}
                    en={content.addressEn}
                    mr={content.addressHi}
                    href={BHUMI.map}
                  />
                  {/* Only shown when the editor has set a current date range. */}
                  {content.dateRangeEn && (
                    <PlaqueRow
                      icon={CalendarDays}
                      en={content.dateRangeEn}
                      mr={content.dateRangeHi}
                    />
                  )}
                  <PlaqueRow icon={Youtube} en={content.youtubeDescEn} mr={content.youtubeDescHi} />
                </dl>

                {joinUrl && (
                  <a
                    href={joinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative mt-8 flex flex-col items-center justify-center gap-1 w-full py-4 overflow-hidden transition-colors duration-300"
                    style={{
                      border: "1px solid rgba(226,187,110,0.6)",
                      borderRadius: 2,
                      color: "#f2e2ba",
                    }}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out"
                      style={{ background: "#e2bb6e" }}
                    />
                    <span className="relative text-[14.5px] tracking-[0.06em] transition-colors duration-300 group-hover:text-[hsl(26_30%_11%)]">
                      Join the live session
                    </span>
                    <span className="marathi relative text-[12.5px] opacity-80 transition-colors duration-300 group-hover:text-[hsl(26_30%_11%)]">
                      व्हर्च्युअल सत्रात सामील व्हा
                    </span>
                  </a>
                )}

                <p
                  className="text-center text-[11px] tracking-[0.14em] uppercase mt-7 pt-5"
                  style={{
                    color: "rgba(242,226,186,0.5)",
                    borderTop: "1px solid rgba(226,187,110,0.2)",
                  }}
                >
                  {content.bannerTextEn}
                  <span className="marathi block normal-case tracking-normal text-[12px] mt-1">
                    {content.bannerTextHi}
                  </span>
                </p>
              </div>
            </div>

            {/* Links */}
            <div className="leaf p-7 md:p-8">
              <h3 className="text-[19px] font-medium text-primary leading-tight">
                Additional links
              </h3>
              <p className="marathi text-[14px] text-muted-foreground mt-0.5">
                अतिरिक्त दुवे
              </p>

              <div className="thread my-5" aria-hidden />

              <div className="space-y-3">
                <LinkRow
                  href={content.officialWebsiteUrl}
                  icon={ExternalLink}
                  en="Official website"
                  mr="अधिकृत संकेतस्थळ"
                />
                <LinkRow
                  href={content.documentaryUrl}
                  icon={Youtube}
                  en="Watch the Ekadash Rudra documentary"
                  mr="एकादश रुद्र लघुपट पहा"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

function PlaqueRow({ icon: Icon, en, mr, href }) {
  /* When a row has somewhere to go — the address does — the whole row
     becomes the target, and says so on hover. */
  const body = (
    <>
      <Icon
        className="h-4 w-4 shrink-0 mt-1"
        style={{ color: "rgba(226,187,110,0.9)" }}
        aria-hidden
      />
      <div className="min-w-0">
        <dd
          className="text-[14.5px] leading-relaxed m-0 transition-colors duration-300"
          style={{ color: "rgba(242,226,186,0.92)" }}
        >
          {en}
          {href && (
            <ArrowUpRight
              className="inline-block h-3.5 w-3.5 ml-1.5 -mt-0.5 transition-transform duration-300 group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5"
              style={{ color: "rgba(226,187,110,0.9)" }}
              aria-hidden
            />
          )}
        </dd>
        <dd
          className="marathi text-[13.5px] leading-[1.8] mt-1 m-0"
          style={{ color: "rgba(242,226,186,0.62)" }}
        >
          {mr}
        </dd>
        {href && (
          <span
            className="block text-[11.5px] italic mt-1.5"
            style={{ color: "rgba(226,187,110,0.75)" }}
          >
            Get directions
          </span>
        )}
      </div>
    </>
  );

  if (!href) {
    return <div className="flex items-start gap-3.5">{body}</div>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/row flex items-start gap-3.5 -mx-2 px-2 py-1.5 rounded-sm transition-colors duration-300 hover:bg-white/5"
    >
      {body}
    </a>
  );
}

function LinkRow({ href, icon: Icon, en, mr }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3.5 p-3.5 transition-colors duration-300 hover:bg-secondary"
      style={{ border: "1px solid hsl(var(--border))", borderRadius: 2 }}
    >
      <Icon className="h-4 w-4 shrink-0 text-[hsl(var(--brass-deep))]" aria-hidden />
      <span className="min-w-0 flex-1">
        <span className="block text-[14.5px] text-foreground leading-snug">{en}</span>
        <span className="block marathi text-[12.5px] text-muted-foreground mt-0.5">{mr}</span>
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
    </a>
  );
}

export default Schedule;
