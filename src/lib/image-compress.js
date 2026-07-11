// Client-side image compression so we can safely store photos as base64 in MongoDB.
// Target ~500 KB after compression — admin never sees this; it's automatic.

const DEFAULTS = {
  maxWidth: 1600,
  maxHeight: 1600,
  maxSizeBytes: 500 * 1024, // 500 KB
  mimeType: "image/jpeg",
  initialQuality: 0.82,
  minQuality: 0.45,
};

/**
 * Compress an image File to a base64 data URL under maxSizeBytes.
 * Returns { dataUrl, sizeBytes, width, height }.
 */
export async function compressImage(file, options = {}) {
  const cfg = { ...DEFAULTS, ...options };

  if (!file || !file.type?.startsWith("image/")) {
    throw new Error("Please choose an image file (JPG, PNG, or WEBP).");
  }

  // Generous upper bound on raw upload — we'll reject 30 MB+ files outright.
  if (file.size > 30 * 1024 * 1024) {
    throw new Error("Image is over 30 MB. Please choose a smaller one.");
  }

  const img = await loadImage(file);
  const { width, height } = fitWithin(img.width, img.height, cfg.maxWidth, cfg.maxHeight);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  // White background for transparent PNGs converted to JPEG
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);

  let quality = cfg.initialQuality;
  let dataUrl = canvas.toDataURL(cfg.mimeType, quality);
  let sizeBytes = approxBytesFromDataUrl(dataUrl);

  // Step quality down until size is acceptable or we hit min quality.
  while (sizeBytes > cfg.maxSizeBytes && quality > cfg.minQuality) {
    quality = Math.max(cfg.minQuality, quality - 0.07);
    dataUrl = canvas.toDataURL(cfg.mimeType, quality);
    sizeBytes = approxBytesFromDataUrl(dataUrl);
  }

  // If still too big, scale the canvas down progressively
  let scale = 1;
  while (sizeBytes > cfg.maxSizeBytes && scale > 0.4) {
    scale -= 0.15;
    const w = Math.max(640, Math.round(width * scale));
    const h = Math.max(640, Math.round(height * scale));
    canvas.width = w;
    canvas.height = h;
    const ctx2 = canvas.getContext("2d");
    ctx2.fillStyle = "#ffffff";
    ctx2.fillRect(0, 0, w, h);
    ctx2.drawImage(img, 0, 0, w, h);
    dataUrl = canvas.toDataURL(cfg.mimeType, quality);
    sizeBytes = approxBytesFromDataUrl(dataUrl);
  }

  return {
    dataUrl,
    sizeBytes,
    width: canvas.width,
    height: canvas.height,
  };
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Couldn't read the image."));
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error("Couldn't read the file."));
    reader.readAsDataURL(file);
  });
}

function fitWithin(w, h, maxW, maxH) {
  const ratio = Math.min(maxW / w, maxH / h, 1);
  return { width: Math.round(w * ratio), height: Math.round(h * ratio) };
}

function approxBytesFromDataUrl(dataUrl) {
  // base64 length * 0.75 ≈ byte length
  const base64 = dataUrl.split(",")[1] || "";
  return Math.round((base64.length * 3) / 4);
}

export function formatBytes(b) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`;
  return `${(b / 1024 / 1024).toFixed(2)} MB`;
}
