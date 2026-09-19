# Art & Audio Assets

The site ships with complete, original hand-built SVG/CSS artwork (see
`src/components/art/`), so **it works perfectly with zero custom files**.
Everything below is optional — supply any of these to replace the built-in
illustration with your own, and the site will use it automatically.

## How the fallback works

Illustrations that support a custom override are rendered through
`src/components/art/AssetImage.tsx`. It tries to load the named file from
`/public/assets/`; if the file doesn't exist (or fails to load for any
reason), it silently falls back to the built-in SVG — you'll never see a
broken-image icon.

> Note: as shipped, every illustration currently renders via its built-in SVG
> component directly (`FireStationArt`, `FireTruckArt`, `ZidaanCharacterArt`,
> etc.) rather than through `AssetImage`. To wire in a custom PNG for one of
> them, swap that component's usage for `<AssetImage src="..." fallback={<TheSvgComponent />} alt="..." />`
> in the relevant component file.

## Recommended custom artwork

| Filename (in `/public/assets/`) | Recommended size | Where it appears | Format |
| --- | --- | --- | --- |
| `fire-station.png` | 800×640px | Opening screen + rescue sequence (garage door) | Transparent PNG or SVG |
| `fire-truck.png` | 1000×440px | Rescue sequence (truck drive-in) | Transparent PNG or SVG |
| `zidaan-firefighter.png` | 600×700px | Rescue sequence, RSVP success | Transparent PNG or SVG |
| `firefighter-helmet.png` | 300×220px | Decorative accents | Transparent PNG or SVG |
| `fire-hydrant.png` | 300×420px | Invitation screen accent | Transparent PNG or SVG |
| `rescue-badge.png` | 400×450px | Decorative badge / share image | Transparent PNG or SVG |
| `background.png` | 1600×1200px | Full-screen backdrop | JPG or PNG (opaque is fine) |

All illustrations are original artwork (hand-built SVG/CSS) — no copyrighted
characters (e.g. Paw Patrol, Disney) are used anywhere in this project.

## Audio

Audio lives in `/public/audio/` and is played via `src/components/AudioController.tsx`.
Playback is wrapped in try/catch, so a missing or silent file never breaks
the experience — it just plays nothing.

| Filename | Used for | Recommended length | Format |
| --- | --- | --- | --- |
| `siren.mp3` | Pressing "SOUND THE ALARM" | 1–3 seconds | MP3, normalized volume |
| `truck-horn.mp3` | Truck arriving ("WEE-OOO!" moment) | 1–2 seconds | MP3 |
| `celebration.mp3` | Successful RSVP confirmation | 2–4 seconds | MP3 |

**Current status: these three files exist as empty (0-byte) placeholders.**
I did not generate or download any audio, since I can't create real sound
and won't source copyrighted audio. Replace the placeholder files with real
royalty-free or custom-recorded audio (same filenames) to enable sound —
good sources include Freesound.org (CC0 filter), Zapsplat, or a quick phone
recording of a toy siren / party horn / "yay!" cheer.

## Social share image

The Open Graph preview image (what shows up when you share the link in
WhatsApp/iMessage) is generated dynamically at `src/app/opengraph-image.tsx`
using Next.js's built-in image generation (`next/og`), at 1200×630px. This
is more reliable than a static file because it can never go out of sync with
the title/theme — no action needed. If you'd rather use a fully custom
image, delete `src/app/opengraph-image.tsx` and add your own
`public/opengraph-image.jpg` (1200×630px) instead.
