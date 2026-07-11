"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar, ExternalLink, Play, X, ChevronLeft, ChevronRight,
  Megaphone, Pin,
} from "lucide-react";
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
        // Only show active ones
        setItems(list.filter((it) => it.active !== false));
      } catch (e) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return null;
  if (items.length === 0) return null;

  return (
    <section
      id="announcements"
      className="py-24 md:py-32 bg-background border-t border-border"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
        >
          <div className="eyebrow mb-4">
            at our centre <span className="marathi normal-case tracking-normal">· आमच्या केंद्रात</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-1">
            Upcoming programmes
          </h2>
          <h3 className="marathi text-2xl md:text-3xl font-medium text-primary mb-3">
            आगामी कार्यक्रम
          </h3>
          <p className="italic text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Pujas, meditations, gatherings — kept here for all seekers.
          </p>
          <p className="marathi not-italic text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            पूजा, ध्यान, संमेलने — सर्व साधकांसाठी येथे ठेवलेले.
          </p>
        </motion.div>

        <div className="space-y-10">
          {items.map((it, idx) => (
            <AnnouncementItem key={it._id} item={it} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AnnouncementItem({ item, index }) {
  const photos = (item.media || []).filter((m) => m.kind === "photo" && m.src);
  const videos = (item.media || []).filter((m) => m.kind === "video" && m.src);
  const youtubes = (item.media || []).filter((m) => m.kind === "youtube" && m.src);
  const links = (item.media || []).filter((m) => m.kind === "link" && m.src);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 3) * 0.05 }}
    >
      <Card className="overflow-hidden border border-primary/10 bg-card shadow-sm hover:shadow-md transition-shadow rounded-3xl">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-wrap items-start gap-3 mb-4">
            {item.pinned && (
              <span className="inline-flex items-center gap-1 text-[11px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                <Pin className="h-3 w-3" />
                Pinned
              </span>
            )}
            {item.eventDate && (
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary/70" />
                {new Date(item.eventDate).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-x-6 mb-2">
            {item.titleEn && (
              <h3 className="text-2xl md:text-3xl font-bold text-primary leading-tight">
                {item.titleEn}
              </h3>
            )}
            {item.titleMr && (
              <h3 className="text-2xl md:text-3xl font-bold text-primary leading-tight marathi">
                {item.titleMr}
              </h3>
            )}
          </div>

          {(item.descriptionEn || item.descriptionMr) && (
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-3 mt-3 text-muted-foreground">
              {item.descriptionEn && (
                <p className="whitespace-pre-line">{item.descriptionEn}</p>
              )}
              {item.descriptionMr && (
                <p className="whitespace-pre-line marathi">{item.descriptionMr}</p>
              )}
            </div>
          )}

          {/* YouTube videos */}
          {youtubes.length > 0 && (
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {youtubes.map((y) => (
                <YouTubeCard key={y.id} item={y} />
              ))}
            </div>
          )}

          {/* Direct videos */}
          {videos.length > 0 && (
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {videos.map((v) => (
                <VideoCard key={v.id} item={v} />
              ))}
            </div>
          )}

          {/* Photo gallery */}
          {photos.length > 0 && (
            <div className="mt-6">
              <PhotoGallery photos={photos} />
            </div>
          )}

          {/* Links */}
          {links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {links.map((l) => (
                <Button
                  key={l.id}
                  asChild
                  variant="outline"
                  className="rounded-full border-primary/30 hover:bg-primary/5 text-primary"
                >
                  <a href={normaliseUrl(l.src)} target="_blank" rel="noopener noreferrer">
                    {l.label || "Open link"}
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </a>
                </Button>
              ))}
            </div>
          )}
        </div>
      </Card>
    </motion.article>
  );
}

/* ---------------- YouTube tile with click-to-play ---------------- */

function YouTubeCard({ item }) {
  const [playing, setPlaying] = useState(false);
  const embed = youTubeEmbedUrl(item.src);
  const thumb = youTubeThumbnail(item.src, "hqdefault");

  if (!embed) return null;

  return (
    <div className="rounded-2xl overflow-hidden border border-border/60 bg-card">
      <div className="relative aspect-video bg-black">
        {playing ? (
          <iframe
            src={`${embed}?autoplay=1&rel=0`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={item.title || "YouTube video"}
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 w-full h-full focus:outline-none"
          >
            {thumb && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={thumb} alt={item.title || ""} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="h-6 w-6 text-white fill-white ml-0.5" />
              </div>
            </div>
          </button>
        )}
      </div>
      {(item.title || item.description) && (
        <div className="p-3">
          {item.title && <p className="font-semibold text-sm text-foreground">{item.title}</p>}
          {item.description && (
            <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- Direct video tile ---------------- */

function VideoCard({ item }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-border/60 bg-card">
      <div className="relative aspect-video bg-black">
        <video
          src={normaliseUrl(item.src)}
          poster={item.thumbnail || undefined}
          controls
          preload="metadata"
          className="absolute inset-0 w-full h-full"
        />
      </div>
      {(item.title || item.description) && (
        <div className="p-3">
          {item.title && <p className="font-semibold text-sm text-foreground">{item.title}</p>}
          {item.description && (
            <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- Photo gallery with lightbox ---------------- */

function PhotoGallery({ photos }) {
  const [openAt, setOpenAt] = useState(-1);

  const close = () => setOpenAt(-1);
  const prev = () => setOpenAt((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setOpenAt((i) => (i + 1) % photos.length);

  // Decide a sensible grid based on count
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
            className="group aspect-square rounded-2xl overflow-hidden bg-muted border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={p.description || p.title || ""}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {openAt >= 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                aria-label="Previous"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                aria-label="Next"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          <div onClick={(e) => e.stopPropagation()} className="max-w-5xl max-h-[85vh]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[openAt].src}
              alt={photos[openAt].description || photos[openAt].title || ""}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl"
            />
            {photos[openAt].title && (
              <p className="text-center text-white/90 text-sm mt-3">
                {photos[openAt].title}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
