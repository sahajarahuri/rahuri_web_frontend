"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Save, X, Quote as QuoteIcon, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const empty = () => ({ quote: "", author: "", location: "", active: true });

export default function TestimonialsManager() {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [draft, setDraft] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingDraft, setEditingDraft] = useState(null);

  const token = () => (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  const load = async () => {
    try {
      const r = await fetch("/api/testimonials");
      const d = await r.json();
      setItems(Array.isArray(d) ? d : []);
    } catch {
      setItems([]);
    }
  };
  useEffect(() => { load(); }, []);

  const create = async () => {
    if (!draft.quote || !draft.author) {
      toast({ title: "Please add a quote and author.", variant: "destructive" });
      return;
    }
    const r = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
      body: JSON.stringify(draft),
    });
    if (r.ok) {
      toast({ title: "Testimonial added" });
      setDraft(null);
      load();
    } else {
      toast({ title: "Couldn't save", variant: "destructive" });
    }
  };

  const update = async (id) => {
    const r = await fetch("/api/testimonials", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ id, ...editingDraft }),
    });
    if (r.ok) {
      toast({ title: "Updated" });
      setEditingId(null);
      setEditingDraft(null);
      load();
    } else {
      toast({ title: "Couldn't save", variant: "destructive" });
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this testimonial?")) return;
    const r = await fetch("/api/testimonials", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ id }),
    });
    if (r.ok) { toast({ title: "Deleted" }); load(); }
  };

  return (
    <div className="space-y-6 outline-none">
      <div className="flex items-center justify-between bg-card/60 p-4 rounded-2xl border border-primary/10">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <QuoteIcon className="h-5 w-5 text-primary" /> Testimonials
          </h2>
          <p className="text-sm text-muted-foreground">
            "Seekers speak" quotes shown on the homepage. Add 2–4 for the best look.
          </p>
        </div>
        {!draft && (
          <Button onClick={() => setDraft(empty())} className="rounded-xl">
            <Plus className="h-4 w-4 mr-1.5" /> Add
          </Button>
        )}
      </div>

      {draft && (
        <Editor
          draft={draft}
          setDraft={setDraft}
          onCancel={() => setDraft(null)}
          onSave={create}
          title="New testimonial"
        />
      )}

      {items.length === 0 && !draft ? (
        <Card className="rounded-3xl border-dashed border-primary/20 bg-card/40 p-10 text-center">
          <QuoteIcon className="h-7 w-7 text-primary/60 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            No testimonials yet. The homepage will show two sample ones as a fallback until you add your own.
          </p>
          <Button onClick={() => setDraft(empty())} className="mt-4 rounded-xl">Add your first</Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((it) =>
            editingId === it._id ? (
              <Editor
                key={it._id}
                draft={editingDraft}
                setDraft={setEditingDraft}
                onCancel={() => { setEditingId(null); setEditingDraft(null); }}
                onSave={() => update(it._id)}
                title="Editing"
              />
            ) : (
              <Card key={it._id} className="rounded-2xl border border-primary/10">
                <CardContent className="p-5">
                  <p className="italic text-sm text-foreground/90 leading-relaxed">
                    &ldquo;{it.quote}&rdquo;
                  </p>
                  <div className="text-xs text-muted-foreground mt-2">
                    — {it.author}{it.location ? `, ${it.location}` : ""}
                    {it.active === false && (
                      <span className="ml-2 bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-[10px]">Hidden</span>
                    )}
                  </div>
                  <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-border/50">
                    <Button
                      variant="ghost" size="sm" onClick={() => remove(it._id)}
                      className="rounded-xl text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                    </Button>
                    <Button
                      variant="outline" size="sm"
                      onClick={() => { setEditingId(it._id); setEditingDraft({
                        quote: it.quote, author: it.author, location: it.location || "", active: it.active !== false
                      }); }}
                      className="rounded-xl border-primary/25 text-primary"
                    >
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </div>
      )}
    </div>
  );
}

function Editor({ draft, setDraft, onCancel, onSave, title }) {
  return (
    <Card className="rounded-3xl border border-primary/25 shadow-lg">
      <CardHeader className="bg-primary/5 border-b border-primary/10 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-bold text-primary">{title}</CardTitle>
          <CardDescription>A single quote from a seeker.</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onCancel} className="rounded-full">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-1.5">
          <Label className="font-semibold">Quote</Label>
          <Textarea
            rows={3}
            placeholder="e.g. After starting meditation daily I feel completely rejuvenated…"
            value={draft.quote}
            onChange={(e) => setDraft({ ...draft, quote: e.target.value })}
            className="rounded-xl"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="font-semibold">Author (first name)</Label>
            <Input
              placeholder="e.g. Neeta"
              value={draft.author}
              onChange={(e) => setDraft({ ...draft, author: e.target.value })}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="font-semibold">Location (optional)</Label>
            <Input
              placeholder="e.g. Pune"
              value={draft.location}
              onChange={(e) => setDraft({ ...draft, location: e.target.value })}
              className="rounded-xl"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setDraft({ ...draft, active: !draft.active })}
          className={`text-left rounded-xl border px-4 py-3 transition-colors w-full ${
            draft.active ? "border-primary/30 bg-primary/5" : "border-border/60 bg-muted/20"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm flex items-center gap-1.5">
              {draft.active ? <Eye className="h-3.5 w-3.5 text-primary" /> : <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />}
              Active
            </span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${draft.active ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
              {draft.active ? "ON" : "OFF"}
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">Turn off to hide without deleting.</p>
        </button>
        <div className="flex justify-end gap-2 border-t border-border/50 pt-4">
          <Button variant="ghost" onClick={onCancel} className="rounded-xl">Cancel</Button>
          <Button onClick={onSave} className="rounded-xl px-6">
            <Save className="h-4 w-4 mr-1.5" /> Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
