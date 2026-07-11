"use client";

import { useSettings } from "@/hooks/use-settings";

const Footer = () => {
  const { settings } = useSettings();

  const socials = [
    { url: settings.socialYoutubeUrl, label: "YouTube" },
    { url: settings.socialFacebookUrl, label: "Facebook" },
    { url: settings.socialInstagramUrl, label: "Instagram" },
    { url: "https://www.sahajayoga.org", label: "Global Foundation" },
  ].filter((s) => s.url);

  return (
    <footer id="contact" className="bg-card border-t border-border py-14 md:py-16 text-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <p className="italic text-sm md:text-base text-muted-foreground max-w-lg mx-auto mb-2 leading-relaxed">
          Sahaja Yoga meditation is always given freely — a gift from H.H. Shri
          Mataji Nirmala Devi to humanity.
        </p>
        <p className="marathi not-italic text-sm md:text-base text-muted-foreground max-w-lg mx-auto mb-6 leading-relaxed">
          सहज योग ध्यान नेहमी विनामूल्य दिले जाते — प.पू. श्री माताजी निर्मला
          देवी यांनी मानवतेला दिलेली एक अनमोल देणगी.
        </p>

        {socials.length > 0 && (
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-sm text-primary mb-7">
            {socials.map((s, i) => (
              <span key={s.label} className="flex items-center gap-6">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary/70 transition-colors"
                >
                  {s.label}
                </a>
                {i < socials.length - 1 && (
                  <span className="text-accent opacity-50" aria-hidden>·</span>
                )}
              </span>
            ))}
          </div>
        )}

        <p className="text-xs text-muted-foreground tracking-wider">
          © {new Date().getFullYear()} · Rahuri Sahaja Yoga Meditation Center
        </p>
        <p className="marathi text-xs text-muted-foreground tracking-wide mt-0.5">
          © {new Date().getFullYear()} · राहुरी सहज योग ध्यान केंद्र
        </p>
      </div>
    </footer>
  );
};

export default Footer;
