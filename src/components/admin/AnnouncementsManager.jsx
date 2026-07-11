"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Plus, Trash2, Edit2, Save, X, Pin, PinOff, Eye, EyeOff,
  Megaphone, Calendar as CalendarIcon, AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DatePicker } from "@/components/ui/date-picker";
import MediaInput from "./MediaInput";

const emptyDraft = () => ({
  titleEn: "",
  titleMr: "",
  descriptionEn: "",
  descriptionMr: "",
  eventDate: "",
  pinned: false,
  active: true,
  media: [],
});

const AnnouncementsManager = () => {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [draft, setDraft] = useState(null); // null = not creating
  const [editingId, setEditingId] = useState(null);
  const [editingDraft, setEditingDraft] = useState(null);

  const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  const fetchItems = useCallback(async () => {
    try {
      const r = await fetch("/api/announcements");
      const d = await r.json();
      setItems(Array.isArray(d) ? d : []);
    } catch (e) {
      toast({ title: "Couldn't load announcements", variant: "destructive" });
    }
  }, [toast]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const create = async () => {
    if (!draft.titleEn && !draft.titleMr) {
      toast({ title: "Please add a title (English or Marathi).", variant: "destructive" });
      return;
    }
    const r = await fetch("/api/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify(draft),
    });
    if (r.ok) {
      toast({ title: "Announcement published" });
      setDraft(null);
      fetchItems();
    } else {
      const err = await r.json().catch(() => ({}));
      toast({ title: err.error || "Couldn't save", variant: "destructive" });
    }
  };

  const update = async (id) => {
    if (!editingDraft.titleEn && !editingDraft.titleMr) {
      toast({ title: "Please add a title.", variant: "destructive" });
      return;
    }
    const r = await fetch("/api/announcements", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ id, ...editingDraft }),
    });
    if (r.ok) {
      toast({ title: "Announcement updated" });
      setEditingId(null);
      setEditingDraft(null);
      fetchItems();
    } else {
      const err = await r.json().catch(() => ({}));
      toast({ title: err.error || "Couldn't save", variant: "destructive" });
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this announcement permanently?")) return;
    const r = await fetch("/api/announcements", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ id }),
    });
    if (r.ok) {
      toast({ title: "Deleted" });
      fetchItems();
    } else {
      toast({ title: "Couldn't delete", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6 outline-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-card/60 p-4 rounded-2xl border border-primary/10">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-primary" />
            Announcements
          </h2>
          <p className="text-sm text-muted-foreground">
            Programs, pujas, news. Add photos, videos, links, and YouTube videos — no code edits needed.
          </p>
        </div>
        {!draft && (
          <Button onClick={() => setDraft(emptyDraft())} className="rounded-xl">
            <Plus className="h-4 w-4 mr-1.5" /> New announcement
          </Button>
        )}
      </div>

      {/* Helpful tip box */}
      <div className="border border-amber-200/60 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-950/20 text-amber-900 dark:text-amber-100 rounded-2xl px-4 py-3 text-sm flex gap-3">
        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold">Quick tips</p>
          <ul className="list-disc pl-5 mt-1 space-y-0.5 text-[13px]">
            <li>Pin an announcement to show it at the top.</li>
            <li>Photos are auto-compressed — just pick from your phone or computer.</li>
            <li>For YouTube, paste any youtube.com or youtu.be link; the player appears automatically.</li>
            <li>Set "Active = off" to hide an old announcement without deleting it.</li>
          </ul>
        </div>
      </div>

      {/* Create form */}
      <AnimatePresence>
        {draft && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <DraftEditor
              draft={draft}
              setDraft={setDraft}
              onCancel={() => setDraft(null)}
              onSave={create}
              saveLabel="Publish"
              titleLabel="New announcement"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* List */}
      {items.length === 0 && !draft ? (
        <Card className="border border-dashed border-primary/20 bg-card/40 p-10 text-center rounded-3xl">
          <Megaphone className="h-7 w-7 text-primary/60 mx-auto mb-3" />
          <h3 className="font-bold text-foreground">No announcements yet</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Create one — for example, an upcoming Puja or a new program at the center.
          </p>
          <Button onClick={() => setDraft(emptyDraft())} className="mt-4 rounded-xl">
            Create your first announcement
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {items.map((it) =>
            editingId === it._id ? (
              <DraftEditor
                key={it._id}
                draft={editingDraft}
                setDraft={setEditingDraft}
                onCancel={() => { setEditingId(null); setEditingDraft(null); }}
                onSave={() => update(it._id)}
                saveLabel="Save changes"
                titleLabel="Editing announcement"
              />
            ) : (
              <AnnouncementCard
                key={it._id}
                item={it}
                onEdit={() => {
                  setEditingId(it._id);
                  setEditingDraft({
                    titleEn: it.titleEn || "",
                    titleMr: it.titleMr || "",
                    descriptionEn: it.descriptionEn || "",
                    descriptionMr: it.descriptionMr || "",
                    eventDate: it.eventDate || "",
                    pinned: !!it.pinned,
                    active: it.active !== false,
                    media: Array.isArray(it.media) ? it.media : [],
                  });
                }}
                onDelete={() => remove(it._id)}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

/* ---------------- the editor (shared by create + edit) ---------------- */

function DraftEditor({ draft, setDraft, onCancel, onSave, saveLabel, titleLabel }) {
  return (
    <Card className="border border-primary/25 shadow-lg bg-card rounded-3xl overflow-hidden">
      <CardHeader className="bg-primary/5 border-b border-primary/10 py-4 px-6 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-bold text-primary">{titleLabel}</CardTitle>
          <CardDescription>
            Bilingual (English + Marathi). Add as many photos, videos, links, and YouTube videos as you like.
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onCancel} className="rounded-full">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Titles */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="flex justify-between font-semibold">
              <span>Title (English)</span>
              <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">EN</span>
            </Label>
            <Input
              placeholder="e.g., Shri Krishna Puja 2026"
              value={draft.titleEn}
              onChange={(e) => setDraft({ ...draft, titleEn: e.target.value })}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="flex justify-between font-semibold marathi">
              <span>Title (Marathi)</span>
              <span className="text-[10px] bg-amber-500/15 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded">MR</span>
            </Label>
            <Input
              placeholder="उदा. श्री कृष्ण पूजा २०२६"
              value={draft.titleMr}
              onChange={(e) => setDraft({ ...draft, titleMr: e.target.value })}
              className="rounded-xl marathi"
            />
          </div>
        </div>

        {/* Descriptions */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="font-semibold">Description (English)</Label>
            <Textarea
              rows={4}
              placeholder="What is the program, where, when, who can attend?"
              value={draft.descriptionEn}
              onChange={(e) => setDraft({ ...draft, descriptionEn: e.target.value })}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="font-semibold marathi">Description (Marathi)</Label>
            <Textarea
              rows={4}
              value={draft.descriptionMr}
              onChange={(e) => setDraft({ ...draft, descriptionMr: e.target.value })}
              className="rounded-xl marathi"
            />
          </div>
        </div>

        {/* Date + pin + active */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-1.5 flex flex-col">
            <Label className="font-semibold flex items-center gap-1.5">
              <CalendarIcon className="h-3.5 w-3.5 text-primary" />
              Event date (optional)
            </Label>
            <DatePicker
              selected={draft.eventDate ? new Date(draft.eventDate) : null}
              onSelect={(d) =>
                setDraft({ ...draft, eventDate: d ? d.toISOString() : "" })
              }
              placeholderText="Pick a date"
            />
          </div>
          <ToggleField
            label="Pin to top"
            description="Show this on top of the homepage."
            value={draft.pinned}
            onChange={(v) => setDraft({ ...draft, pinned: v })}
            onIcon={Pin}
            offIcon={PinOff}
          />
          <ToggleField
            label="Active"
            description="If off, this is hidden from the homepage."
            value={draft.active}
            onChange={(v) => setDraft({ ...draft, active: v })}
            onIcon={Eye}
            offIcon={EyeOff}
          />
        </div>

        {/* Media */}
        <div className="border-t border-border/60 pt-5 space-y-3">
          <div>
            <h4 className="font-bold text-foreground">Photos, Videos, Links & YouTube</h4>
            <p className="text-sm text-muted-foreground">
              Add as many as you need. Drag with the arrows to reorder.
            </p>
          </div>
          <MediaInput
            value={draft.media}
            onChange={(media) => setDraft({ ...draft, media })}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 border-t border-border/60 pt-4">
          <Button variant="ghost" onClick={onCancel} className="rounded-xl">
            Cancel
          </Button>
          <Button onClick={onSave} className="rounded-xl px-6">
            <Save className="h-4 w-4 mr-1.5" />
            {saveLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ToggleField({ label, description, value, onChange, onIcon: OnIcon, offIcon: OffIcon }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`text-left rounded-xl border px-4 py-3 transition-colors ${
        value
          ? "border-primary/30 bg-primary/5"
          : "border-border/60 bg-muted/20"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-semibold text-sm flex items-center gap-1.5">
          {value ? <OnIcon className="h-3.5 w-3.5 text-primary" /> : <OffIcon className="h-3.5 w-3.5 text-muted-foreground" />}
          {label}
        </span>
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${value ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
          {value ? "ON" : "OFF"}
        </span>
      </div>
      <p className="text-[11px] text-muted-foreground mt-1">{description}</p>
    </button>
  );
}

/* ---------------- read-only card ---------------- */

function AnnouncementCard({ item, onEdit, onDelete }) {
  const mediaSummary = (item.media || []).reduce(
    (acc, m) => {
      if (m.kind === "photo") acc.photo += 1;
      else if (m.kind === "video") acc.video += 1;
      else if (m.kind === "youtube") acc.youtube += 1;
      else if (m.kind === "link") acc.link += 1;
      return acc;
    },
    { photo: 0, video: 0, youtube: 0, link: 0 }
  );
  const firstPhoto = (item.media || []).find((m) => m.kind === "photo" && m.src);

  return (
    <Card className="border border-primary/10 hover:border-primary/25 bg-card rounded-3xl overflow-hidden transition-colors">
      <CardContent className="p-5">
        <div className="flex gap-4">
          <div className="hidden sm:block w-24 h-24 rounded-xl bg-muted/30 border border-border/60 overflow-hidden shrink-0">
            {firstPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={firstPhoto.src} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Megaphone className="h-6 w-6" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-1">
              <div className="min-w-0">
                <h3 className="font-bold text-foreground truncate">
                  {item.titleEn || item.titleMr || "Untitled"}
                </h3>
                {item.titleMr && item.titleEn && (
                  <p className="text-sm text-muted-foreground marathi truncate">{item.titleMr}</p>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {item.pinned && (
                  <span className="text-[10px] bg-primary/15 text-primary px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                    <Pin className="h-2.5 w-2.5" /> Pinned
                  </span>
                )}
                {item.active === false && (
                  <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-semibold">
                    Hidden
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground mt-1">
              {item.eventDate && (
                <span className="inline-flex items-center gap-1">
                  <CalendarIcon className="h-3 w-3" />
                  {new Date(item.eventDate).toLocaleDateString()}
                </span>
              )}
              {mediaSummary.photo > 0 && <span>📷 {mediaSummary.photo}</span>}
              {mediaSummary.video > 0 && <span>🎬 {mediaSummary.video}</span>}
              {mediaSummary.youtube > 0 && <span>▶ {mediaSummary.youtube}</span>}
              {mediaSummary.link > 0 && <span>🔗 {mediaSummary.link}</span>}
            </div>
            {item.descriptionEn && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                {item.descriptionEn}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-border/50">
          <Button variant="ghost" size="sm" onClick={onDelete} className="rounded-xl text-destructive hover:bg-destructive/10">
            <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
          </Button>
          <Button variant="outline" size="sm" onClick={onEdit} className="rounded-xl border-primary/25 text-primary hover:bg-primary/5">
            <Edit2 className="h-3.5 w-3.5 mr-1" /> Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default AnnouncementsManager;
