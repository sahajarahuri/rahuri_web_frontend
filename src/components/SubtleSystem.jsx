"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The subtle system, traced from the traditional chart.
 *
 * The geometry was read off the chart pixel by pixel, because the
 * common stock illustration gets it wrong. What the chart shows:
 *
 *   · Ida and Pingala run as two STRAIGHT channels flanking the
 *     Sushumna — not as wide bows, and they do not braid up the spine.
 *   · They cross ONCE, in a narrow X immediately above Agnya, and
 *     nowhere else. Above that they open into Sahasrara.
 *   · Pingala (right channel) begins at Swadisthana. Ida (left) runs
 *     the full length from Mooladhara.
 *   · The Kundalini sleeps coiled below Mooladhara and rises through
 *     the Sushumna, igniting each chakra as it passes.
 *
 * Petal counts and colours are the traditional ones, sampled from the
 * chart's own lotus strip.
 */

const CX = 200;          // Sushumna, the central axis
const OFF = 30;          // how far Ida / Pingala sit off the axis

const CROWN = 84;        // Sahasrara
const AGNYA = 200;       // Agnya — and the single crossing point
const ROOT = 716;        // Mooladhara

/* Ida is the LEFT channel, Pingala the RIGHT — named for the meditator's
   own left and right, not the viewer's. The chart is drawn facing us, so
   the meditator's left falls on the RIGHT of the image. */

const CHAKRAS = [
  { n: 7, y: CROWN, r: 19, en: "Sahasrara",   mr: "सहस्रार",     q: "Integration",  petals: 20, color: "#b06fc4", multi: true },
  { n: 6, y: AGNYA, r: 11, en: "Agnya",       mr: "आज्ञा",        q: "Forgiveness",  petals: 2,  color: "#c9c9d4" },
  { n: 5, y: 298,   r: 14, en: "Vishuddhi",   mr: "विशुद्धी",     q: "Collectivity", petals: 16, color: "#1f7fc0" },
  { n: 4, y: 400,   r: 13, en: "Anahata",     mr: "अनाहत",       q: "Security",     petals: 12, color: "#d0486a" },
  { n: 3, y: 508,   r: 13, en: "Nabhi",       mr: "नाभी",         q: "Satisfaction", petals: 10, color: "#0f9550" },
  { n: 2, y: 614,   r: 11, en: "Swadisthana", mr: "स्वाधिष्ठान",  q: "Creativity",   petals: 6,  color: "#e8b800" },
  { n: 1, y: ROOT,  r: 13, en: "Mooladhara",  mr: "मूलाधार",      q: "Innocence",    petals: 4,  color: "#d81c1c" },
];

const SWADISTHANA = 614;  // where Pingala begins

const IDA_COLOR = "#3f7bd0";
const PINGALA_COLOR = "#e07a2a";

/* Each channel rises straight on its own side and passes THROUGH Agnya,
   crossing the axis at exactly (CX, AGNYA) — the optic chiasma. Above it,
   the channel continues out to the opposite side and curves into the crown.
   `side` is +1 or -1 in SVG coordinates; the channel ends up on -side. */
function channel(from, side) {
  const x = CX + OFF * side;
  return [
    `M ${CX} ${from}`,
    // leave the axis and settle onto this channel's own side
    `C ${x} ${from - 16}, ${x} ${from - 28}, ${x} ${from - 44}`,
    // straight run up the spine
    `L ${x} ${AGNYA + 54}`,
    // sweep in to meet the axis EXACTLY at Agnya — this is the crossing
    `C ${x} ${AGNYA + 30}, ${CX + 5 * side} ${AGNYA + 16}, ${CX} ${AGNYA}`,
    // continue through, now emerging on the opposite side
    `C ${CX - 5 * side} ${AGNYA - 16}, ${CX - 20 * side} ${AGNYA - 30}, ${CX - 22 * side} ${AGNYA - 48}`,
    // and up into the crown
    `C ${CX - 24 * side} ${AGNYA - 70}, ${CX - 18 * side} ${CROWN + 30}, ${CX - 7 * side} ${CROWN + 17}`,
  ].join(" ");
}

/* Ida runs the full length from Mooladhara; Pingala begins at Swadisthana. */
const IDA = channel(ROOT, +1);          // meditator's left  → viewer's right
const PINGALA = channel(SWADISTHANA, -1); // meditator's right → viewer's left

export default function SubtleSystem() {
  const ref = useRef(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setGo(true);
          io.disconnect();
        }
      },
      { rootMargin: "-80px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const RISE = 3.6;
  const litAt = (y) => 1.0 + ((ROOT - y) / (ROOT - CROWN)) * RISE;

  return (
    <div ref={ref} className={`ss-root${go ? " ss-go" : ""}`}>
      <svg
        viewBox="0 0 400 800"
        className="w-full h-auto"
        role="img"
        aria-label="The subtle system: the Sushumna running from Mooladhara to Sahasrara, the Ida channel rising from Mooladhara on the left and the Pingala from Swadisthana on the right, crossing once above Agnya; the seven chakras; and the Kundalini rising from Mooladhara to Sahasrara."
      >
        <defs>
          <linearGradient id="ss-rise" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#d81c1c" />
            <stop offset="45%" stopColor="hsl(var(--brass))" />
            <stop offset="100%" stopColor="#f7ecc8" />
          </linearGradient>

          <radialGradient id="ss-halo">
            <stop offset="0%" stopColor="#f2d493" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f2d493" stopOpacity="0" />
          </radialGradient>

          <filter id="ss-glow" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sushumna — the dormant central channel */}
        <line
          x1={CX} y1={ROOT} x2={CX} y2={CROWN}
          stroke="hsl(var(--brass))"
          strokeOpacity="0.22"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Ida and Pingala */}
        <g fill="none" strokeWidth="2.2" strokeLinecap="round">
          <path className="ss-nadi" d={IDA} stroke={IDA_COLOR} strokeOpacity="0.9" />
          <path className="ss-nadi" d={PINGALA} stroke={PINGALA_COLOR} strokeOpacity="0.9" />
        </g>

        {/* The Kundalini, rising through the Sushumna */}
        <line
          className="ss-kundalini"
          x1={CX} y1={ROOT} x2={CX} y2={CROWN}
          stroke="url(#ss-rise)"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#ss-glow)"
          strokeDasharray={ROOT - CROWN}
          strokeDashoffset={ROOT - CROWN}
        />

        {/* Chakras */}
        {CHAKRAS.map((c) => (
          <g key={c.n}>
            <circle
              className="ss-halo"
              cx={CX} cy={c.y} r={c.r + 17}
              fill="url(#ss-halo)"
              style={{ "--d": `${litAt(c.y)}s` }}
            />
            <g className="ss-lotus" style={{ "--d": `${litAt(c.y)}s` }}>
              <Lotus {...c} />
            </g>
            <g className="ss-label" style={{ "--d": `${litAt(c.y) + 0.15}s` }}>
              <text
                x={CX + 58} y={c.y - 3}
                fill="hsl(var(--primary))"
                fontSize="14.5"
                fontFamily="'EB Garamond', Georgia, serif"
              >
                {c.en}
              </text>
              <text
                x={CX + 58} y={c.y + 14}
                fill="hsl(var(--muted-foreground))"
                fontSize="12"
                fontFamily="'Tiro Devanagari Marathi', system-ui, sans-serif"
              >
                {c.mr}
              </text>
              <text
                x={CX - 58} y={c.y + 4}
                textAnchor="end"
                fill="hsl(var(--muted-foreground))"
                fontSize="11.5"
                fontStyle="italic"
                fontFamily="'EB Garamond', Georgia, serif"
              >
                {c.q}
              </text>
            </g>
          </g>
        ))}

        {/* The sleeping coil, below Mooladhara */}
        <g className="ss-coil">
          <path
            d={`M ${CX - 11} ${ROOT + 32} a 11 6 0 1 0 22 0 a 8 4.5 0 1 0 -16 0 a 5 3 0 1 0 10 0`}
            fill="none"
            stroke="#d81c1c"
            strokeOpacity="0.75"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <text
            x={CX} y={ROOT + 58}
            textAnchor="middle"
            fill="hsl(var(--muted-foreground))"
            fontSize="10.5"
            fontStyle="italic"
            fontFamily="'EB Garamond', Georgia, serif"
          >
            Kundalini
          </text>
        </g>

        {/* Legend. Pingala is drawn on the viewer's left because the chart
            faces us — it is the meditator's own right channel. */}
        <g fontFamily="'EB Garamond', Georgia, serif" fontSize="11.5">
          <line x1="10" y1="784" x2="30" y2="784" stroke={PINGALA_COLOR} strokeWidth="2.2" />
          <text x="36" y="788" fill="hsl(var(--muted-foreground))">Pingala · right</text>

          <line x1="136" y1="784" x2="156" y2="784" stroke="hsl(var(--brass))" strokeWidth="3" />
          <text x="162" y="788" fill="hsl(var(--muted-foreground))">Sushumna · centre</text>

          <line x1="292" y1="784" x2="312" y2="784" stroke={IDA_COLOR} strokeWidth="2.2" />
          <text x="318" y="788" fill="hsl(var(--muted-foreground))">Ida · left</text>
        </g>

        {/* A quiet note, because the mirroring always trips people up. */}
        <text
          x={CX} y={764}
          textAnchor="middle"
          fill="hsl(var(--muted-foreground))"
          fontSize="10"
          fontStyle="italic"
          opacity="0.6"
          fontFamily="'EB Garamond', Georgia, serif"
        >
          Left and right are the meditator&rsquo;s own.
        </text>
      </svg>
    </div>
  );
}

function Lotus({ y, r, petals, color, multi }) {
  const p = [];
  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * 360;
    p.push(
      <ellipse
        key={i}
        cx={CX}
        cy={y - r * 0.74}
        rx={r * 0.28}
        ry={r * 0.74}
        fill={multi ? `hsl(${(i * 360) / petals} 62% 62%)` : color}
        fillOpacity={multi ? 0.55 : 0.3}
        stroke={multi ? `hsl(${(i * 360) / petals} 55% 50%)` : color}
        strokeWidth="1"
        strokeOpacity="0.95"
        transform={`rotate(${a} ${CX} ${y})`}
      />
    );
  }

  return (
    <>
      {multi && (
        <circle
          cx={CX} cy={y} r={r + 11}
          fill="none"
          stroke="hsl(var(--brass))"
          strokeOpacity="0.45"
          strokeWidth="0.9"
          strokeDasharray="1.5 3"
        />
      )}
      {p}
      <circle
        cx={CX} cy={y} r={r * 0.4}
        fill="hsl(var(--card))"
        stroke={multi ? "hsl(var(--brass))" : color}
        strokeWidth="1.6"
      />
    </>
  );
}
