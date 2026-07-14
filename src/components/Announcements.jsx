"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Calendar, ExternalLink, Play, X, ChevronLeft, ChevronRight, Pin,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import {
  youTubeEmbedUrl,
  youTubeThumbnail,
  normaliseUrl,
} from "@/lib/media-utils";

export default function Announcements() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/announcements");
        const d = await r.json();
        const list = Array.isArray(d) ? d : [];
        setItems(list.filter((it) => it.active !== false));
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading || items.length === 0) return null;

  return (
    <section id="announcements" className="relative py-24 md:py-32">
      <div className="thread max-w-4xl mx-auto mb-24 md:mb-32" aria-hidden />

      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrowEn="At our centre"
          eyebrowMr="आमच्या केंद्रात"
          titleEn="Upcoming programmes"
          titleMr="आगामी कार्यक्रम"
          leadEn="Pujas, meditations, gatherings — kept here for all seekers."
          leadMr="पूजा, ध्यान, संमेलने — सर्व साधकांसाठी येथे ठेवलेले."
          className="mb-16"
        />

        <div className="space-y-8">
          {items.map((it, idx) => (
            <AnnouncementItem key={it._id} item={it} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AnnouncementItem({ item, index }) {
  const media = item.media || [];
  const photos = media.filter((m) => m.kind === "photo" && m.src);
  const videos = media.filter((m) => m.kind === "video" && m.src);
  const youtubes = media.filter((m) => m.kind === "youtube" && m.src);
  const links = media.filter((m) => m.kind === "link" && m.src);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.75,
        delay: Math.min(index, 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="leaf p-6 md:p-9"
    >
      {/* Meta row */}
      {(item.pinned || item.eventDate) && (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6">
          {item.pinned && (
            <span
              className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--brass-deep))] px-2.5 py-1"
              style={{ border: "1px solid hsl(var(--brass) / 0.45)" }}
            >
              <Pin className="h-3 w-3" />
              Pinned
            </span>
          )}
          {item.eventDate && (
            <span className="inline-flex items-center gap-2 text-[13px] italic text-muted-foreground">
              <Calendar className="h-[15px] w-[15px] text-[hsl(var(--brass))]" />
              {new Date(item.eventDate).toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
        </div>
      )}

      {/* Titles, facing pages */}
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-1">
        {item.titleEn && (
          <h3 className="text-[24px] md:text-[28px] font-medium text-primary leading-snug">
            {item.titleEn}
          </h3>
        )}
        {item.titleMr && (
          <h3 className="marathi text-[22px] md:text-[26px] font-medium text-primary/90 leading-snug">
            {item.titleMr}
          </h3>
        )}
      </div>

      {(item.descriptionEn || item.descriptionMr) && (
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 mt-5 text-muted-foreground text-[15px] leading-relaxed">
          {item.descriptionEn && (
            <p className="whitespace-pre-line">{item.descriptionEn}</p>
          )}
          {item.descriptionMr && (
            <p className="whitespace-pre-line marathi leading-[1.85]">
              {item.descriptionMr}
            </p>
          )}
        </div>
      )}

      {youtubes.length > 0 && (
        <div className="mt-8 grid sm:grid-cols-2 gap-5">
          {youtubes.map((y) => <YouTubeCard key={y.id} item={y} />)}
        </div>
      )}

      {videos.length > 0 && (
        <div className="mt-8 grid sm:grid-cols-2 gap-5">
          {videos.map((v) => <VideoCard key={v.id} item={v} />)}
        </div>
      )}

      {photos.length > 0 && (
        <div className="mt-8">
          <PhotoGallery photos={photos} />
        </div>
      )}

      {links.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {links.map((l) => (
            <a
              key={l.id}
              href={normaliseUrl(l.src)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brass !py-2.5 !px-5 !text-[13px]"
            >
              <span>{l.label || "Open link"}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      )}
    </motion.article>
  );
}

function MediaFrame({ children, title, description }) {
  return (
    <figure
      className="m-0 overflow-hidden group"
      style={{ border: "1px solid hsl(var(--border))", borderRadius: 2 }}
    >
      <div className="relative aspect-video bg-[#1a1008]">{children}</div>
      {(title || description) && (
        <figcaption className="p-4 bg-card">
          {title && (
            <p className="text-[14px] text-foreground leading-snug">{title}</p>
          )}
          {description && (
            <p className="text-[12.5px] italic text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </figcaption>
      )}
    </figure>
  );
}

function YouTubeCard({ item }) {
  const [playing, setPlaying] = useState(false);
  const embed = youTubeEmbedUrl(item.src);
  const thumb = youTubeThumbnail(item.src, "hqdefault");
  if (!embed) return null;

  return (
    <MediaFrame title={item.title} description={item.description}>
      {playing ? (
        <iframe
          src={`${embed}?autoplay=1&rel=0`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={item.title || "Video"}
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="group/play absolute inset-0 w-full h-full"
          aria-label={`Play ${item.title || "video"}`}
        >
          {thumb && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumb}
              alt=""
              className="w-full h-full object-cover transition-transform [transition-duration:1200ms] group-hover/play:scale-[1.04]"
            />
          )}
          <span className="absolute inset-0 bg-black/25 group-hover/play:bg-black/15 transition-colors duration-500 grid place-items-center">
            <span
              className="grid place-items-center rounded-full transition-transform duration-500 group-hover/play:scale-110"
              style={{
                width: 62,
                height: 62,
                border: "1px solid rgba(233,207,149,0.8)",
                background: "rgba(26,16,8,0.5)",
                backdropFilter: "blur(4px)",
              }}
            >
              <Play className="h-5 w-5 ml-0.5" style={{ fill: "#e9cf95", color: "#e9cf95" }} />
            </span>
          </span>
        </button>
      )}
    </MediaFrame>
  );
}

function VideoCard({ item }) {
  return (
    <MediaFrame title={item.title} description={item.description}>
      <video
        src={normaliseUrl(item.src)}
        poster={item.thumbnail || undefined}
        controls
        preload="metadata"
        className="absolute inset-0 w-full h-full"
      />
    </MediaFrame>
  );
}

function PhotoGallery({ photos }) {
  const [openAt, setOpenAt] = useState(-1);

  const close = useCallback(() => setOpenAt(-1), []);
  const prev = useCallback(
    () => setOpenAt((i) => (i - 1 + photos.length) % photos.length),
    [photos.length]
  );
  const next = useCallback(
    () => setOpenAt((i) => (i + 1) % photos.length),
    [photos.length]
  );

  // Keyboard control for the lightbox
  useEffect(() => {
    if (openAt < 0) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openAt, close, prev, next]);

  const gridCls =
    photos.length === 1
      ? "grid-cols-1"
      : photos.length === 2
      ? "grid-cols-2"
      : photos.length === 3
      ? "grid-cols-2 sm:grid-cols-3"
      : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";

  return (
    <>
      <div className={`grid ${gridCls} gap-3`}>
        {photos.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setOpenAt(i)}
            className="group relative aspect-square overflow-hidden bg-muted"
            style={{ border: "1px solid hsl(var(--border))", borderRadius: 2 }}
            aria-label={`Open photograph ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={p.description || p.title || ""}
              loading="lazy"
              className="w-full h-full object-cover transition-transform ease-out [transition-duration:1400ms] group-hover:scale-[1.07]"
            />
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ boxShadow: "inset 0 0 0 1px hsl(var(--brass) / 0.9)" }}
              aria-hidden
            />
          </button>
        ))}
      </div>

      {openAt >= 0 && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: "rgba(20,12,6,0.92)", backdropFilter: "blur(8px)" }}
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            className="absolute top-5 right-5 h-11 w-11 grid place-items-center text-[#e9cf95] hover:bg-white/10 transition-colors"
            style={{ border: "1px solid rgba(233,207,149,0.45)" }}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-12 w-12 grid place-items-center text-[#e9cf95] hover:bg-white/10 transition-colors"
                style={{ border: "1px solid rgba(233,207,149,0.45)" }}
                aria-label="Previous photograph"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-12 w-12 grid place-items-center text-[#e9cf95] hover:bg-white/10 transition-colors"
                style={{ border: "1px solid rgba(233,207,149,0.45)" }}
                aria-label="Next photograph"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <motion.figure
            key={openAt}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="m-0 max-w-5xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[openAt].src}
              alt={photos[openAt].description || photos[openAt].title || ""}
              className="max-w-full max-h-[80vh] object-contain"
              style={{ border: "1px solid rgba(233,207,149,0.3)" }}
            />
            <figcaption className="text-center mt-4">
              {photos[openAt].title && (
                <p className="text-[#e9cf95] text-[14px]">{photos[openAt].title}</p>
              )}
              <p className="text-[11px] tracking-[0.2em] uppercase mt-1.5" style={{ color: "rgba(233,207,149,0.5)" }}>
                {openAt + 1} / {photos.length}
              </p>
            </figcaption>
          </motion.figure>
        </div>
      )}
    </>
  );
}
