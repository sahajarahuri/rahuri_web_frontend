"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Image as ImageIcon,
  Video as VideoIcon,
  Youtube,
  Link2,
  Upload,
  X,
  Trash2,
  GripVertical,
  Plus,
  Info,
} from "lucide-react";
import {
  compressImage,
  formatBytes,
} from "@/lib/image-compress";
import {
  defaultMediaItem,
  extractYouTubeId,
  youTubeThumbnail,
} from "@/lib/media-utils";
import { useToast } from "@/hooks/use-toast";

const KIND_META = {
  photo: { icon: ImageIcon, label: "Photo", colour: "amber" },
  video: { icon: VideoIcon, label: "Video", colour: "rose" },
  link: { icon: Link2, label: "Link", colour: "emerald" },
  youtube: { icon: Youtube, label: "YouTube", colour: "red" },
};

/**
 * MediaInput — manages an ordered list of media items.
 *
 * Props:
 *   value: array of media items
 *   onChange: fn(newValue)
 *   maxItems: optional cap (default 12)
 */
export default function MediaInput({ value = [], onChange, maxItems = 12 }) {
  const items = Array.isArray(value) ? value : [];
  const { toast } = useToast();

  const updateItem = (id, patch) => {
    onChange(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  };
  const removeItem = (id) => {
    onChange(items.filter((it) => it.id !== id));
  };
  const moveItem = (id, dir) => {
    const idx = items.findIndex((it) => it.id === id);
    if (idx < 0) return;
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= items.length) return;
    const copy = [...items];
    [copy[idx], copy[newIdx]] = [copy[newIdx], copy[idx]];
    onChange(copy);
  };
  const addItem = (kind) => {
    if (items.length >= maxItems) {
      toast({
        title: `You can add up to ${maxItems} media items per announcement.`,
        variant: "destructive",
      });
      return;
    }
    onChange([...items, defaultMediaItem(kind)]);
  };

  return (
    <div className="space-y-4">
      {/* Add buttons row */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(KIND_META).map(([kind, meta]) => {
          const Icon = meta.icon;
          return (
            <Button
              key={kind}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addItem(kind)}
              className="border-primary/20 hover:bg-primary/5 rounded-full"
            >
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              <Icon className="h-3.5 w-3.5 mr-1.5" />
              Add {meta.label}
            </Button>
          );
        })}
      </div>

      {/* Items list */}
      {items.length === 0 ? (
        <div className="border border-dashed border-primary/20 rounded-2xl p-8 text-center bg-muted/30">
          <ImageIcon className="h-8 w-8 text-primary/40 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            No media yet. Use the buttons above to add a photo, video, link, or
            YouTube video.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <MediaItemEditor
              key={item.id}
              item={item}
              index={idx}
              isFirst={idx === 0}
              isLast={idx === items.length - 1}
              onChange={(patch) => updateItem(item.id, patch)}
              onRemove={() => removeItem(item.id)}
              onMoveUp={() => moveItem(item.id, -1)}
              onMoveDown={() => moveItem(item.id, 1)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- single item editor ---------------- */

function MediaItemEditor({
  item,
  index,
  isFirst,
  isLast,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}) {
  const meta = KIND_META[item.kind] || KIND_META.link;
  const Icon = meta.icon;

  return (
    <div className="border border-primary/15 rounded-2xl bg-card overflow-hidden">
      <div className="flex items-center justify-between bg-primary/5 px-4 py-2.5 border-b border-primary/10">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-xs">
            {index + 1}
          </span>
          <Icon className="h-4 w-4" />
          <span>{meta.label}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground"
            disabled={isFirst}
            onClick={onMoveUp}
            title="Move up"
          >
            <GripVertical className="h-4 w-4 rotate-180" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground"
            disabled={isLast}
            onClick={onMoveDown}
            title="Move down"
          >
            <GripVertical className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:bg-destructive/10"
            onClick={onRemove}
            title="Remove"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {item.kind === "photo" && (
          <PhotoFields item={item} onChange={onChange} />
        )}
        {item.kind === "video" && (
          <VideoFields item={item} onChange={onChange} />
        )}
        {item.kind === "youtube" && (
          <YouTubeFields item={item} onChange={onChange} />
        )}
        {item.kind === "link" && (
          <LinkFields item={item} onChange={onChange} />
        )}
      </div>
    </div>
  );
}

/* ---------------- Photo ---------------- */

function PhotoFields({ item, onChange }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { dataUrl, sizeBytes } = await compressImage(file);
      onChange({ src: dataUrl });
      toast({
        title: "Photo ready",
        description: `Compressed to ${formatBytes(sizeBytes)}.`,
      });
    } catch (err) {
      toast({
        title: "Couldn't process the photo",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-[160px_1fr] gap-4">
        <div className="aspect-square rounded-xl bg-muted/40 border border-border/60 overflow-hidden flex items-center justify-center">
          {item.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.src}
              alt={item.title || "preview"}
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
          )}
        </div>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFile}
            />
            <Button
              type="button"
              variant="default"
              size="sm"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
              className="rounded-full"
            >
              <Upload className="h-3.5 w-3.5 mr-1.5" />
              {uploading ? "Processing…" : item.src ? "Replace photo" : "Upload photo"}
            </Button>
            {item.src && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onChange({ src: "" })}
                className="text-muted-foreground rounded-full"
              >
                <X className="h-3.5 w-3.5 mr-1.5" />
                Clear
              </Button>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground flex items-start gap-1.5">
            <Info className="h-3 w-3 mt-0.5 shrink-0" />
            <span>
              Choose any photo from your phone or computer — it's automatically
              compressed (≈500 KB) so it stays fast and storage stays free. You can
              also paste a link instead.
            </span>
          </p>
          <div className="space-y-1.5">
            <Label className="text-xs">Or paste an image URL</Label>
            <Input
              placeholder="https://i.imgbb.com/..."
              value={item.src && item.src.startsWith("data:") ? "" : item.src || ""}
              onChange={(e) => onChange({ src: e.target.value })}
              className="rounded-xl h-9"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 pt-2 border-t border-border/50">
        <div className="space-y-1.5">
          <Label className="text-xs">Caption (optional)</Label>
          <Input
            placeholder="e.g., Havan ceremony 2024"
            value={item.title || ""}
            onChange={(e) => onChange({ title: e.target.value })}
            className="rounded-xl h-9"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Alt text (for accessibility)</Label>
          <Input
            placeholder="e.g., Yogis seated during havan"
            value={item.description || ""}
            onChange={(e) => onChange({ description: e.target.value })}
            className="rounded-xl h-9"
          />
        </div>
      </div>
    </>
  );
}

/* ---------------- Video (direct URL) ---------------- */

function VideoFields({ item, onChange }) {
  return (
    <>
      <div className="space-y-1.5">
        <Label className="text-xs">Video URL</Label>
        <Input
          placeholder="https://example.com/video.mp4  •  or any direct video link"
          value={item.src || ""}
          onChange={(e) => onChange({ src: e.target.value })}
          className="rounded-xl h-9"
        />
        <p className="text-[11px] text-muted-foreground flex items-start gap-1.5">
          <Info className="h-3 w-3 mt-0.5 shrink-0" />
          <span>
            Paste a direct video URL (mp4 / webm) or a Google Drive shareable
            link. For YouTube videos, please use the YouTube option instead — it
            shows a proper player.
          </span>
        </p>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Thumbnail URL (optional)</Label>
        <Input
          placeholder="https://..."
          value={item.thumbnail || ""}
          onChange={(e) => onChange({ thumbnail: e.target.value })}
          className="rounded-xl h-9"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Title (optional)</Label>
          <Input
            value={item.title || ""}
            onChange={(e) => onChange({ title: e.target.value })}
            className="rounded-xl h-9"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Description (optional)</Label>
          <Input
            value={item.description || ""}
            onChange={(e) => onChange({ description: e.target.value })}
            className="rounded-xl h-9"
          />
        </div>
      </div>
    </>
  );
}

/* ---------------- YouTube ---------------- */

function YouTubeFields({ item, onChange }) {
  const id = extractYouTubeId(item.src);
  const thumb = youTubeThumbnail(item.src);

  return (
    <>
      <div className="grid md:grid-cols-[160px_1fr] gap-4">
        <div className="aspect-video md:aspect-square rounded-xl bg-muted/40 border border-border/60 overflow-hidden flex items-center justify-center">
          {thumb ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={thumb} alt="" className="w-full h-full object-cover" />
          ) : (
            <Youtube className="h-8 w-8 text-muted-foreground/50" />
          )}
        </div>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs">YouTube URL</Label>
            <Input
              placeholder="https://youtu.be/...  •  https://youtube.com/watch?v=..."
              value={item.src || ""}
              onChange={(e) => onChange({ src: e.target.value })}
              className="rounded-xl h-9"
            />
            {item.src && !id && (
              <p className="text-[11px] text-destructive">
                That doesn't look like a YouTube link — please paste a normal
                youtube.com or youtu.be URL.
              </p>
            )}
            {id && (
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                ✓ Detected video ID: <span className="font-mono">{id}</span>
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3 pt-2 border-t border-border/50">
        <div className="space-y-1.5">
          <Label className="text-xs">Title (optional)</Label>
          <Input
            placeholder="e.g., Shri Ekadash Rudra documentary"
            value={item.title || ""}
            onChange={(e) => onChange({ title: e.target.value })}
            className="rounded-xl h-9"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Short description (optional)</Label>
          <Input
            value={item.description || ""}
            onChange={(e) => onChange({ description: e.target.value })}
            className="rounded-xl h-9"
          />
        </div>
      </div>
    </>
  );
}

/* ---------------- Link ---------------- */

function LinkFields({ item, onChange }) {
  return (
    <>
      <div className="grid md:grid-cols-[1fr_2fr] gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Button label</Label>
          <Input
            placeholder="e.g., Register here"
            value={item.label || ""}
            onChange={(e) => onChange({ label: e.target.value })}
            className="rounded-xl h-9"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">URL</Label>
          <Input
            placeholder="https://..."
            value={item.src || ""}
            onChange={(e) => onChange({ src: e.target.value })}
            className="rounded-xl h-9"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Description (optional)</Label>
        <Input
          placeholder="e.g., Registration form for the 2026 puja"
          value={item.description || ""}
          onChange={(e) => onChange({ description: e.target.value })}
          className="rounded-xl h-9"
        />
      </div>
    </>
  );
}
