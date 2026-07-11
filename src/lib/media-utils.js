// Helpers for media items: YouTube parsing, embed URLs, link normalisation.

const YT_REGEX =
  /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([\w-]{11})/;

export function extractYouTubeId(url) {
  if (!url) return null;
  const m = String(url).match(YT_REGEX);
  return m ? m[1] : null;
}

export function youTubeEmbedUrl(url) {
  const id = extractYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

export function youTubeThumbnail(url, quality = "hqdefault") {
  const id = extractYouTubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/${quality}.jpg` : null;
}

export function isLikelyImageUrl(url) {
  if (!url) return false;
  return /\.(jpe?g|png|gif|webp|avif)(\?.*)?$/i.test(url) || /imgbb|imgur|i\.ytimg|drive\.google/i.test(url);
}

export function isLikelyVideoUrl(url) {
  if (!url) return false;
  return /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(url);
}

export function normaliseUrl(url) {
  if (!url) return "";
  const t = String(url).trim();
  if (!t) return "";
  if (/^(https?:)?\/\//i.test(t)) return t;
  if (/^mailto:|^tel:/i.test(t)) return t;
  return `https://${t}`;
}

// Media item shape we standardise on across the app:
// { id, kind: 'photo'|'video'|'link'|'youtube', src, title?, description?, label?, thumbnail? }
export function makeMediaId() {
  return `m_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function defaultMediaItem(kind) {
  return {
    id: makeMediaId(),
    kind,
    src: "",
    title: "",
    description: "",
    label: kind === "link" ? "Open link" : "",
    thumbnail: "",
  };
}
