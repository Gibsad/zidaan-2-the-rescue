# Zidaan 2 The Rescue 🚒

An interactive, mobile-first fire-rescue-themed birthday invitation and RSVP
site for Zidaan's 2nd birthday, built with Next.js, TypeScript, Tailwind CSS,
Framer Motion, and Supabase.

## What's inside

- Animated "Sound the Alarm" opening sequence (fire station → truck →
  Zidaan intro), skipped in favor of an instant transition when the visitor
  has `prefers-reduced-motion` enabled.
- Invitation screen with event details.
- RSVP form (attending/not attending, adult/child counts, optional message)
  backed by Supabase, with client + server validation, a duplicate-submit
  guard, a loading state, and graceful error handling.
- Distinct "confirmed" (confetti + calendar download + directions) and
  "declined" (friendly acknowledgement) outcomes.
- Mute/unmute audio control; siren/horn/celebration sound hooks (placeholder
  audio files — see [ASSETS.md](./ASSETS.md)).
- Fully original hand-built SVG artwork — no copyrighted characters.
- Dynamic Open Graph image for WhatsApp/iMessage link previews.

See [ASSETS.md](./ASSETS.md) for the full list of optional custom artwork
and audio you can supply later.

## 1. Install dependencies

```bash
npm install
```

## 2. Run locally

```bash
npm run dev
```

Visit http://localhost:3000. The site works without Supabase configured —
you'll just see a friendly error if you try to submit the RSVP form until
you complete step 3–5 below.

## 3. Create a Supabase project

1. Go to https://supabase.com and sign in (or create a free account).
2. Click **New project**, choose an organization, name it (e.g.
   `zidaan-2-the-rescue`), set a database password, and pick a region close
   to you.
3. Wait for provisioning to finish (~1–2 minutes).

## 4. Create the `rsvps` table

1. In your new project, open **SQL Editor** (left sidebar) → **New query**.
2. Paste the entire contents of [`supabase/schema.sql`](./supabase/schema.sql)
   from this repo and click **Run**.
3. Confirm the table exists: open **Table Editor** → you should see an
   `rsvps` table with columns `id, guest_name, attending, adult_count,
   child_count, message, created_at`.

This script also enables Row Level Security and adds a policy that allows
anonymous **inserts only** — the public site key can never read the guest
list back out.

## 5. Add environment variables

1. In Supabase, go to **Project Settings → API**.
2. Copy the **Project URL** and the **anon / public** key (not the
   `service_role` key — that one must never be used in client-facing code).
3. In this project, copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

4. Fill in the values:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```

5. Restart `npm run dev` if it was already running, so the new env vars are
   picked up.

`.env.local` is already in `.gitignore` — never commit real credentials.

## 6. Test RSVP submission locally

1. With the dev server running and env vars set, go through the full flow:
   Sound the Alarm → Let's Go → Join the Rescue Crew → fill out the RSVP
   form → Submit.
2. Check **Supabase → Table Editor → rsvps** — your test submission should
   appear as a new row.
3. Try submitting with "Sorry, can't make it" selected to confirm the
   declined-state screen appears (and that a row is still saved).
4. Try submitting with required fields empty to confirm inline validation
   messages appear and nothing is sent to the server.

## 7. Deploying to Vercel

1. Push this project to a GitHub repository.
2. Go to https://vercel.com/new and import the repository.
3. In the Vercel project's **Environment Variables** settings, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` — set this to your Vercel URL once you know it
     (e.g. `https://zidaan-2-the-rescue.vercel.app`), so link previews
     resolve correctly. You can add/update this after the first deploy.
4. Click **Deploy**.
5. Once live, open the URL on your phone and run through the full flow
   again before sending it out to guests.

## 8. Connecting a custom domain (optional, later)

1. In the Vercel project, go to **Settings → Domains** and add your domain.
2. Follow Vercel's DNS instructions (usually a CNAME or A record) at your
   domain registrar.
3. Once verified, update `NEXT_PUBLIC_SITE_URL` in Vercel's environment
   variables to the custom domain and redeploy, so social previews use it.

## Viewing RSVP responses securely

There is **no public `/admin` page** — the guest list is never exposed on
the website, and the anon key used by the site cannot read RSVP rows back
out (see the RLS policy in `supabase/schema.sql`).

To view responses, sign in to your Supabase project and use either:

- **Table Editor** → `rsvps` table — browse, sort, and filter responses
  visually.
- **SQL Editor** — run a query, e.g.:

  ```sql
  select guest_name, attending, adult_count, child_count, message, created_at
  from public.rsvps
  order by created_at desc;
  ```

Both are gated behind your Supabase account login, not the public site.

## Project structure

```
src/
  app/
    page.tsx                 Home page (renders the Experience)
    layout.tsx                Root layout, fonts, metadata
    opengraph-image.tsx       Dynamic OG/social preview image
    api/rsvp/route.ts         RSVP submission API (validates + inserts)
  components/
    Experience.tsx             Top-level stage state machine
    FireStationIntro.tsx       Opening screen
    SoundTheAlarmButton.tsx    CTA button on the opening screen
    FireTruckAnimation.tsx     Alarm → truck → Zidaan intro sequence
    Invitation.tsx             Invitation reveal + event details
    EventDetails.tsx           Date/time/location rows
    RSVPForm.tsx                RSVP form + submission logic
    RSVPSuccess.tsx             Confirmed-attending celebration screen
    RSVPDeclined.tsx            Declined-attending screen
    SpeechBubble.tsx            Reusable speech bubble
    Confetti.tsx                 Lightweight CSS confetti burst
    AudioController.tsx        Audio context, playback, mute button
    art/                        Original SVG illustrations + AssetImage fallback
  lib/
    supabase.ts                 Supabase client
    validation.ts                Shared client/server RSVP validation
    ics.ts                       .ics calendar file generation
    event.ts                     Event constants (date/time/location)
  types/rsvp.ts                  Shared RSVP types
supabase/schema.sql              RSVP table + RLS policy SQL
ASSETS.md                        Optional custom artwork/audio guide
```

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion
- Supabase (`@supabase/supabase-js`)

## Accessibility & performance notes

- Respects `prefers-reduced-motion`: the intro sequence and confetti are
  skipped in favor of instant transitions.
- Semantic form labels, radio grouping, `aria-live` regions, and keyboard-
  operable controls throughout.
- All illustrations are inline SVG (no image downloads), keeping the opening
  experience fast.
- iPhone safe-area insets are respected via `env(safe-area-inset-*)`.
