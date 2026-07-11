# Rahuri Sahaja Yoga — refactor notes (final)

Complete refactor: the Announcements module (photo/video/link/YouTube, admin-managed), a calm "rich and silent" visual refresh, site-wide settings so links never need code changes, a "What is Sahaja Yoga" section with an animated original chakra/subtle-system illustration, and full English + Marathi bilingual content throughout the public site.

## 1. What the admin can do without code

Go to `/edit`, sign in, and you'll see six tabs:

- **Announcements** — programs, pujas, news. Photos (auto-compressed, stored free in MongoDB), videos, YouTube links, external links — any combination, per announcement.
- **Sessions** — meditation-session cards (unchanged from the original build).
- **Page Content** — bilingual English + Marathi text (relabeled from "Hindi" — the script in the data was always Marathi).
- **Resources** — links & sacred resources (unchanged).
- **Testimonials** — kept in the admin for future use, though the public "Seekers speak" section has been removed from the homepage per request.
- **Site Settings** — five URLs that drive the whole site's action buttons and footer:
  - **Weekly Thursday YouTube URL** — powers "Join this Thursday" / "Join virtual session". Update it each Thursday morning.
  - **Self-realisation video URL** — opened by "Experience self-realisation, freely given" on the homepage. Defaults to a Hindi-language guided self-realisation session by Shri Mataji.
  - **YouTube / Facebook / Instagram URLs** — shown in the footer if set; hidden if blank. Facebook and Instagram are pre-filled.

A one-page printable guide is in `ADMIN_WALKTHROUGH.html`.

## 2. Storage — still zero cost

- Photos: compressed client-side to ~500 KB, stored as base64 inside the announcement document in MongoDB. Free tier (512 MB) holds roughly 1,000 photos.
- Videos: only the URL is stored — YouTube hosts the file for free.
- Links: plain text.
- No S3, no Cloudinary, no per-GB bill, ever, at this centre's scale.

## 3. The visual refresh

Calm ivory/maroon/gold palette, no gradients, EB Garamond + Tiro Devanagari Marathi typography, text-link buttons with thin gold underlines instead of filled buttons.

### Homepage section order

1. **Hero** — pure rotating photo gallery (all 6 site photos: `main.jpg`, `1.jpg`–`5.jpg`, crossfading every 6 seconds with clickable dot indicators), matching the original site's gallery behaviour. No text overlay.
2. **Welcome** — the heading, tagline, and self-realisation link, on a calm ivory background (moved off the hero photos for reliable contrast).
3. **About — "What is Sahaja Yoga?"** — intro paragraphs plus the animated chakra illustration (see §4).
4. **MatajiQuote** — portrait, her quote (English, primary) with a Marathi rendering below, dates.
5. **Stats** — 55+ years · 90+ countries · Free, always given freely.
6. **Announcements** — the admin-managed module.
7. **Video** — Shri Ekadash Rudra documentary.
8. **Registration (donation)** — QR + bank details; "Donate online" smooth-scrolls to it.
9. **Schedule** — weekly meditation card, pulls the join-link from Site Settings.
10. **ShantiMantra** — closing shloka.
11. **Footer** — text-only, socials from Site Settings.

`Testimonials.jsx` still exists as a component (admin tab intact) but is no longer rendered on the homepage — remove `TestimonialsManager` from `EditableSchedule.jsx` too if you want it gone from the admin entirely.

## 4. The chakra illustration

Built entirely from scratch — an original SVG illustration, not copied or traced from any reference chart. Several near-identical chakra/subtle-system charts were shared during development (from different Sahaja Yoga sites, in English, Dutch, and Marathi); none were used directly, since they're clearly a professionally designed template whose rights aren't held by any single local centre. What ships is built only from the underlying shared facts:

- Seven chakras, Sahaja-Yoga-specific colors (their Heart chakra is red, Navel is green — the reverse of generic "rainbow chakra" charts)
- Three channels: left (blue, past/emotion), right (yellow, future/action, starting one chakra higher at Svādhiṣṭhāna), centre (where the Kundalini rises)
- The dormant Kundalini shown coiled inside a downward-pointing triangle — the sacrum bone — between Svādhiṣṭhāna and Mūlādhāra
- A soft glow at the navel/Void, labelled "Guru principle"
- A small flame mark at the heart
- Numbered chakras (1–7), full bilingual English/Marathi labels throughout
- No body silhouette (removed per request — channels and chakras only)

**Animation:** each chakra's petals unfurl outward from the centre, one after another, root first and crown last (matching the traditional order the Kundalini rises), over about 5 seconds. A bright light climbs the central channel in sync, arriving at each chakra the instant it begins to bloom, passing through the Kundalini's triangle first. A brief pulse marks the light's arrival at each chakra. It replays every time the section scrolls into view.

If the centre later obtains a legitimate license for an official chart, swap the `<About />` illustration for an `<Image>` of the licensed file — no other code changes needed.

## 5. Bilingual content (English + Marathi)

Every public-facing section now carries both languages:

- **Navbar** — nav links show English with Marathi beneath; eyebrow and subtitle bilingual
- **Welcome** — heading, tagline, and CTA all bilingual (stacked)
- **About** — heading stacked, body paragraphs side-by-side (English | Marathi), legend and caption bilingual
- **MatajiQuote** — English quote kept as the primary/exact wording (it's a direct quote); a Marathi rendering is shown below, clearly as a translation, not as her verbatim words
- **Stats, Announcements header, Video, Registration, Schedule, Footer** — all bilingual
- **ShantiMantra** — was already fully bilingual (Sanskrit + English)
- **Announcements themselves** — the admin form already collects English + Marathi title/description per announcement

**Scope decisions, made deliberately:**
- The admin panel (`/edit`) stays English-only — internal tooling, not public content.
- Three small SVG annotations in the chakra diagram ("Guru principle," "Kuṇḍalinī," "sacrum bone") stay English-only — the diagram's core content (all 7 chakras) is already fully bilingual, and adding more text to those specific 9px labels would hurt legibility.

**On translation quality:** translations were done carefully, consistent with the Marathi already present in the original codebase (schedule content, etc.), but this is community-facing content — a quick native-speaker review before going fully live is good practice, not because errors are expected, but because that kind of review is standard for anything representing the community's voice.

## 6. File map

**Deleted:** `public/images/poster.jpg` (outdated 2025 campaign asset)

**New:**
- `src/hooks/use-settings.js`
- `src/lib/image-compress.js`, `src/lib/media-utils.js`
- `src/app/api/announcements/route.js`, `src/app/api/settings/route.js`, `src/app/api/testimonials/route.js`
- `src/components/About.jsx` — What is Sahaja Yoga + animated chakra diagram
- `src/components/Welcome.jsx` — hero-adjacent heading/tagline/CTA
- `src/components/MatajiQuote.jsx`, `src/components/Stats.jsx`, `src/components/Testimonials.jsx` (unused on homepage), `src/components/ShantiMantra.jsx`
- `src/components/Announcements.jsx`
- `src/components/admin/MediaInput.jsx`, `AnnouncementsManager.jsx`, `SiteSettingsManager.jsx`, `TestimonialsManager.jsx`
- `ADMIN_WALKTHROUGH.html`

**Updated:**
- `src/app/globals.css`, `src/app/layout.js`, `src/app/page.js`
- `src/components/Hero.jsx` — pure 6-photo rotating gallery, no text
- `src/components/Navbar.jsx`, `src/components/Schedule.jsx`, `src/components/Video.jsx` (also fixed a broken default-export import bug), `src/components/Registration.jsx`, `src/components/Footer.jsx`
- `src/components/EditableSchedule.jsx` — 6 admin tabs

## 7. Database — two new collections

- `siteSettings` — single document (`_id: "main"`) with the five URLs
- `testimonials` — one document per testimonial (admin tab still works, just not shown publicly)

No migration needed for existing `users`, `sessions`, `content`, or `schedule` collections.

## 8. Running it

```bash
npm install
node create-admin.js   # creates the admin user once, using MONGODB_URI
npm run dev
```

`.env.local`:
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=any-long-random-string
```

Change the default password in `create-admin.js` and re-run before going live.

**Build verified clean**: `next build` compiles with zero warnings in this environment. The only failure is a native `bcrypt` binary that can't cross-compile in this sandbox — `npm install` on your actual machine will build it normally.

## 9. Not done in this refactor (possible follow-ups)

- Drag-and-drop multi-photo upload (current: button + file picker, one at a time)
- Autosave for in-progress announcement drafts
- A real admin-driven hero photo manager (currently the 6 gallery photos are hardcoded filenames)
- Contact form doesn't send messages yet (static form, unchanged from the original build)
- If a legitimately licensed chakra chart is obtained later, swap it into `About.jsx` per §4
- Native-speaker review of the Marathi translations added in §5
