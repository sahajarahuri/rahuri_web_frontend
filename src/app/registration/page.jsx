"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Mail, Phone, ArrowLeft, ArrowUpRight } from "lucide-react";
import RegistrationCard from "@/components/RegistrationCard";
import { BHUMI } from "@/lib/site";

/* All of this content already existed in the page but had been commented
   out, so none of it was reaching visitors. It is restored here. */

/* ---------------------------------------------------------------
   THE EVENT
   Everything date-bound lives here, in one place. When the next
   Ekadash Rudra is announced, edit this block and nothing else.

   `endsOn` is what the page uses to know whether the event has
   passed — so it can never again sit here advertising a date that
   is months gone.
   --------------------------------------------------------------- */
const EVENT = {
  /* PLACEHOLDER — the centre must confirm the real dates.
     Until `endsOn` is a future date, the page shows a "concluded"
     notice instead of a registration button, which is the safe default. */
  year: 2027,
  headlineEn: "31 January – 3 February",
  headlineMr: "३१ जानेवारी – ३ फेब्रुवारी",
  endsOn: "2027-02-03",
};

const SCHEDULE = [
  { date: "30 January",  time: "5:00 pm onwards",  event: "Arrival & seminar begins" },
  { date: "31 January",  time: "4:00 am onwards",  event: "Day two" },
  { date: "1 February",  time: "4:00 am onwards",  event: "Day three" },
  { date: "2 February",  time: "11:00 am onwards", event: "Shri Ekadash Rudra Puja & Havan" },
  { date: "3 February",  time: "10:00 am",         event: "Conclusion" },
];

const VENUES = [
  {
    label: "Seminar",
    labelMr: "संमेलन",
    name: "Raghunandan Hall",
    address: "Rahuri–Taklimiya Road, Rahuri",
    map: "https://maps.app.goo.gl/YAdsrUouXRKXMACR6",
  },
  {
    label: "Puja",
    labelMr: "पूजा",
    name: "International Sahaja Yoga Meditation Center",
    address: "Swayambhu Ekadash Rudra Bhumi, near Musalwadi Lake",
    map: BHUMI.map,
  },
];

const FEES = [
  {
    title: "Four-day seminar · with stay",
    titleMr: "चार दिवसांचे संमेलन · निवासासह",
    rows: [["Adults", "₹3,500"], ["Youth", "₹3,000"], ["Children", "₹2,000"]],
  },
  {
    title: "Four-day seminar · without stay",
    titleMr: "चार दिवसांचे संमेलन · निवासाशिवाय",
    rows: [["Adults", "₹1,500"], ["Youth", "₹1,500"], ["Children", "₹1,000"]],
  },
  {
    title: "Puja day only",
    titleMr: "फक्त पूजा दिवस",
    rows: [["Adults / Youth", "₹300"], ["Children", "₹200"]],
  },
];

const EMAILS = [
  "ekadashrudramusalvadi@gmail.com",
  "rahurisahajyog.meditation@gmail.com",
];

const PHONES = [
  "9822891717", "9922127980", "9604944096",
  "8788559776", "8149551970", "9975091525",
];

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function EkadashRudraLanding() {
  /* If the event is behind us, say so plainly rather than leaving the page
     to advertise a gathering that has already happened. */
  const hasPassed = new Date() > new Date(`${EVENT.endsOn}T23:59:59`);

  return (
    <div className="min-h-screen">
      {/* ---------- Masthead ---------- */}
      <header className="relative overflow-hidden pt-14 pb-20 md:pt-16 md:pb-24 text-center">
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none breath"
          style={{
            width: 640,
            height: 640,
            maxWidth: "120vw",
            background:
              "radial-gradient(circle, hsl(var(--brass) / 0.15) 0%, transparent 62%)",
          }}
        />

        <div className="relative max-w-3xl mx-auto px-5 sm:px-6">
          <div className="flex justify-start">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to the site
            </Link>
          </div>

          <motion.div initial="hidden" animate="show" variants={rise} className="mt-10">
            <div className="eyebrow mb-7">
              {EVENT.headlineEn} {EVENT.year}
              <span className="marathi normal-case tracking-normal"> · राहुरी</span>
            </div>

            <h1 className="text-[32px] md:text-[46px] font-medium text-primary leading-[1.15]">
              International Shri Ekadash Rudra
              <br />
              Meditation, Puja &amp; Havan
            </h1>
            <h2 className="marathi text-[22px] md:text-[28px] font-medium text-primary/85 mt-4 leading-snug">
              आंतरराष्ट्रीय श्री एकादश रुद्र ध्यान, पूजा व हवन
            </h2>

            <div className="diya my-9 max-w-[220px] mx-auto">
              <span className="diya-mark" aria-hidden />
            </div>

            {hasPassed ? (
              <div
                className="max-w-lg mx-auto p-5"
                style={{
                  border: "1px solid hsl(var(--brass) / 0.45)",
                  borderRadius: 2,
                  background: "hsl(var(--secondary))",
                }}
              >
                <p className="italic text-[14.5px] text-primary leading-relaxed">
                  This gathering has now concluded. Details of the next Ekadash
                  Rudra will be posted here and on the centre&rsquo;s page.
                </p>
                <p className="marathi not-italic text-[13.5px] text-muted-foreground mt-2 leading-relaxed">
                  हा सोहळा संपन्न झाला आहे. पुढील एकादश रुद्राची माहिती येथे
                  प्रसिद्ध केली जाईल.
                </p>
                <Link
                  href="/#schedule"
                  className="text-link inline-block text-[13.5px] mt-4"
                >
                  See the weekly meditation schedule
                </Link>
              </div>
            ) : (
              <>
                <a
                  href="https://form.qfixonline.com/rahuriform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brass"
                >
                  <span>Register &amp; contribute</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <p className="marathi text-[13px] text-muted-foreground mt-4">
                  नोंदणी करा व योगदान द्या
                </p>
              </>
            )}
          </motion.div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 pb-24">
        <div className="thread mb-20" aria-hidden />

        {/* ---------- Schedule ---------- */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={rise}
        >
          <SectionTitle en="Programme" mr="कार्यक्रम" />

          <div className="leaf mt-8 overflow-hidden">
            <table className="w-full border-collapse">
              <caption className="sr-only">
                Programme for the Ekadash Rudra gathering
              </caption>
              <thead>
                <tr style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                  {["Date", "Time", "Event"].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="text-left px-5 md:px-7 py-4 text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--brass-deep))] font-normal"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SCHEDULE.map((r, i) => (
                  <tr
                    key={r.date}
                    className="transition-colors hover:bg-secondary/60"
                    style={{
                      borderBottom:
                        i < SCHEDULE.length - 1
                          ? "1px solid hsl(var(--border))"
                          : "none",
                    }}
                  >
                    <td className="px-5 md:px-7 py-4 text-[14.5px] text-primary whitespace-nowrap">
                      {r.date} {EVENT.year}
                    </td>
                    <td className="px-5 md:px-7 py-4 text-[13.5px] italic text-muted-foreground whitespace-nowrap">
                      {r.time}
                    </td>
                    <td className="px-5 md:px-7 py-4 text-[14.5px] text-foreground">
                      {r.event}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* ---------- Venues ---------- */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={rise}
          className="mt-20"
        >
          <SectionTitle en="Venues" mr="ठिकाणे" />

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {VENUES.map((v) => (
              <div key={v.label} className="leaf p-7 flex flex-col">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--brass-deep))]">
                  {v.label}
                  <span className="marathi normal-case tracking-normal"> · {v.labelMr}</span>
                </p>
                <h3 className="text-[19px] text-primary mt-3 leading-snug">{v.name}</h3>
                <p className="text-[14px] text-muted-foreground mt-1.5 leading-relaxed flex-1">
                  {v.address}
                </p>
                <a
                  href={v.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-[13.5px] text-primary mt-5 self-start"
                >
                  <MapPin className="h-3.5 w-3.5 text-[hsl(var(--brass))]" />
                  <span className="text-link">View on the map</span>
                </a>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ---------- Fees ---------- */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={rise}
          className="mt-20"
        >
          <SectionTitle en="Contribution" mr="योगदान" />

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {FEES.map((f) => (
              <div key={f.title} className="leaf p-7">
                <h3 className="text-[16px] text-primary leading-snug">{f.title}</h3>
                <p className="marathi text-[13px] text-muted-foreground mt-1 leading-relaxed">
                  {f.titleMr}
                </p>

                <div className="thread my-5" aria-hidden />

                <dl className="space-y-2.5 m-0">
                  {f.rows.map(([who, amt]) => (
                    <div key={who} className="flex items-baseline justify-between gap-4">
                      <dt className="text-[14px] text-muted-foreground">{who}</dt>
                      <dd
                        className="text-[15px] text-foreground m-0"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        {amt}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ---------- Contact ---------- */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={rise}
          className="mt-20"
        >
          <SectionTitle en="Contact" mr="संपर्क" />

          <div className="leaf p-7 md:p-9 mt-8 grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--brass-deep))] mb-4">
                By email
              </p>
              <ul className="space-y-3 m-0 p-0 list-none">
                {EMAILS.map((e) => (
                  <li key={e} className="flex items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-[hsl(var(--brass))]" aria-hidden />
                    <a href={`mailto:${e}`} className="text-link text-[14px] break-all">
                      {e}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--brass-deep))] mb-4">
                By telephone
              </p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 m-0 p-0 list-none">
                {PHONES.map((n) => (
                  <li key={n} className="flex items-center gap-2.5">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-[hsl(var(--brass))]" aria-hidden />
                    <a
                      href={`tel:${n}`}
                      className="text-link text-[14px]"
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {n}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* ---------- The mission card ----------
            The Bhumi still welcomes contributions after the gathering, so this
            stays — but it is the general appeal, not the event registration. */}
        <div className="mt-20">
          <RegistrationCard />
        </div>
      </main>
    </div>
  );
}

function SectionTitle({ en, mr }) {
  return (
    <div className="flex items-baseline gap-4">
      <div>
        <h2 className="text-[26px] md:text-[30px] font-medium text-primary leading-tight">
          {en}
        </h2>
        <p className="marathi text-[16px] text-primary/70 mt-0.5">{mr}</p>
      </div>
      <span
        aria-hidden
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--brass) / 0.4), transparent)",
        }}
      />
    </div>
  );
}
