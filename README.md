# Sauti demo

A working, offline-first browser prototype based on the Sauti innovation proposal.

## Run

Requires Node.js. No dependency installation is needed.

```sh
npm run dev
```

Open http://127.0.0.1:4287.

## What works

- Visual communication board with 12 editable needs and category filters.
- English device-voice previews and real caregiver microphone recordings or audio uploads.
- Personal photos, household names, language labels, and phrase cues.
- Five-picture word, script, and multimodal communication practice sessions.
- Cue support adapts to caregiver observations from completed sessions.
- Actual usage and session history, a seven-day chart, and full JSON backup/restore.
- Service-worker caching of the app after the first successful load.
- Phone and desktop layouts, keyboard navigation, and reduced-motion support.

Recordings use IndexedDB; profile, photos, phrases, and history use localStorage. Browser clearing removes local data; export a backup. Existing recordings retain their recording language and caregiver labels when household settings change.

## Demo limits

The named household is illustrative. English is the only provided sample content. Indigenous-language audio must be recorded by the household; selecting a language never translates or fabricates speech. Device preview depends on an available speech voice; saved recordings work offline. The online typeface has a system-font fallback.

Practice is a concept demonstration, not clinically validated therapy. No real clinician oversight, CHV portal, cloud sync, or clinical recovery score is implemented. A qualified speech-language therapist should review rehabilitation activities before patient use.

## Check

```sh
npm run check
```



## Vercel deployment

This private repository deploys as a static Vercel app. The configuration runs the syntax checks and serves `dist/`; no environment variables or dependencies are required.

Run `node verify.mjs` for logic checks covering the board, sessions, adaptive hints, persistence, and backup validation.
