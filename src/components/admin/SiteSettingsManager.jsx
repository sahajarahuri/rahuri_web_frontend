"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Youtube, Video as VideoIcon, Facebook, Instagram, Link2, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DEFAULTS = {
  selfRealisationVideoUrl: "https://www.youtube.com/watch?v=3395oxkxrxg",
  weeklyYoutubeUrl: "",
  socialYoutubeUrl: "",
  socialFacebookUrl: "https://www.facebook.com/share/1CW5dHLMyL/",
  socialInstagramUrl: "https://www.instagram.com/rahurisahajyoga?igsh=eHcwZWl0dXpwbjM5",
};

export default function SiteSettingsManager() {
  const { toast } = useToast();
  const [values, setValues] = useState(DEFAULTS);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  const token = () => (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/settings");
        const d = await r.json();
        setValues({ ...DEFAULTS, ...d });
      } catch {
        setValues(DEFAULTS);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const r = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
        body: JSON.stringify(values),
      });
      if (r.ok) {
        toast({ title: "Site settings saved" });
      } else {
        const err = await r.json().catch(() => ({}));
        toast({ title: err.error || "Couldn't save", variant: "destructive" });
      }
    } finally {
      setSaving(false);
    }
  };

  const set = (k, v) => setValues((s) => ({ ...s, [k]: v }));

  return (
    <div className="space-y-6 outline-none">
      <div className="bg-card/60 p-4 rounded-2xl border border-primary/10">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Link2 className="h-5 w-5 text-primary" /> Site settings
        </h2>
        <p className="text-sm text-muted-foreground">
          Website-wide links. Change any of these here and they update everywhere on the site instantly.
        </p>
      </div>

      <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-amber-900 dark:text-amber-100 rounded-2xl px-4 py-3 text-sm flex gap-3">
        <Info className="h-4 w-4 mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold">Weekly reminder</p>
          <p className="text-[13px] mt-0.5">
            The <b>Weekly Thursday YouTube URL</b> below changes each week. Update it every Thursday morning before the session, and both the "Join this Thursday" and "Join virtual session" buttons on the homepage will point to the new stream.
          </p>
        </div>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Youtube className="h-4 w-4 text-primary" /> YouTube links
          </CardTitle>
          <CardDescription>
            Videos and streams the site links to.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <Field
            label="Weekly Thursday YouTube URL"
            hint="Update each week. Used by 'Join this Thursday' and 'Join virtual session' on the homepage."
            placeholder="https://youtube.com/live/..."
            value={values.weeklyYoutubeUrl}
            onChange={(v) => set("weeklyYoutubeUrl", v)}
            loaded={loaded}
          />
          <Field
            label="Self-realisation video URL"
            hint="The video the hero button 'Experience self-realisation in 10 minutes' opens. Defaults to a Hindi-language guided self-realisation session by Shri Mataji."
            placeholder="https://www.youtube.com/watch?v=..."
            value={values.selfRealisationVideoUrl}
            onChange={(v) => set("selfRealisationVideoUrl", v)}
            loaded={loaded}
          />
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Facebook className="h-4 w-4 text-primary" /> Social links (footer)
          </CardTitle>
          <CardDescription>
            Leave any of these blank and the icon simply won't appear in the footer.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <Field
            label="YouTube channel"
            icon={<Youtube className="h-3.5 w-3.5" />}
            placeholder="https://youtube.com/@rahurisahajayoga"
            value={values.socialYoutubeUrl}
            onChange={(v) => set("socialYoutubeUrl", v)}
            loaded={loaded}
          />
          <Field
            label="Facebook page"
            icon={<Facebook className="h-3.5 w-3.5" />}
            placeholder="https://facebook.com/..."
            value={values.socialFacebookUrl}
            onChange={(v) => set("socialFacebookUrl", v)}
            loaded={loaded}
          />
          <Field
            label="Instagram profile"
            icon={<Instagram className="h-3.5 w-3.5" />}
            placeholder="https://instagram.com/..."
            value={values.socialInstagramUrl}
            onChange={(v) => set("socialInstagramUrl", v)}
            loaded={loaded}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end pt-2">
        <Button onClick={save} disabled={saving || !loaded} className="rounded-xl px-6">
          <Save className="h-4 w-4 mr-1.5" />
          {saving ? "Saving…" : "Save settings"}
        </Button>
      </div>
    </div>
  );
}

function Field({ label, hint, placeholder, value, onChange, loaded, icon }) {
  return (
    <div className="space-y-1.5">
      <Label className="flex items-center gap-1.5 font-semibold text-sm">
        {icon}
        {label}
      </Label>
      <Input
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={!loaded}
        className="rounded-xl"
      />
      {hint && <p className="text-[11px] text-muted-foreground italic">{hint}</p>}
    </div>
  );
}
