"use client";

import { useEffect, useState } from "react";

const DEFAULTS = {
  selfRealisationVideoUrl: "https://www.youtube.com/watch?v=3395oxkxrxg",
  weeklyYoutubeUrl: "",
  socialYoutubeUrl: "",
  socialFacebookUrl: "https://www.facebook.com/share/1CW5dHLMyL/",
  socialInstagramUrl: "https://www.instagram.com/rahurisahajyoga?igsh=eHcwZWl0dXpwbjM5",
};

let cache = null;
let inflight = null;

export function useSettings() {
  const [settings, setSettings] = useState(cache || DEFAULTS);
  const [loaded, setLoaded] = useState(!!cache);

  useEffect(() => {
    if (cache) {
      setSettings(cache);
      setLoaded(true);
      return;
    }
    if (!inflight) {
      inflight = fetch("/api/settings")
        .then((r) => r.json())
        .then((d) => {
          cache = { ...DEFAULTS, ...d };
          return cache;
        })
        .catch(() => {
          cache = DEFAULTS;
          return cache;
        });
    }
    inflight.then((c) => {
      setSettings(c);
      setLoaded(true);
    });
  }, []);

  return { settings, loaded };
}

// Utility for other files that want the raw defaults
export const SETTINGS_DEFAULTS = DEFAULTS;
