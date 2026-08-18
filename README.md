# BRO 😭 — Gen Alpha Translator

A survival guide for understanding what your kid is actually saying.

A dark, kinetic, fully client-side web app that translates Gen Alpha / younger Gen Z slang into plain human English — without the "hello fellow kids" energy.

## Features

- **Translator** — paste a message, get a word-by-word breakdown + a human translation. Runs 100% locally: longest-phrase matching over a 111-entry dictionary, emoji-aware tokenization, case-insensitive. Standard English words are detected and returned unchanged; unknown words are flagged honestly instead of being hallucinated.
- **Dictionary explorer** — 111 entries in 7 categories (Essentials, Reactions, You're Cooked, Aura Economy, Internet Brainrot, Social, Internet Grammar) with instant search, filters, expandable cards, brainrot-level scale (🧠1–5) and a "should I say this" safety rating.
- **Emoji Are Not Emotions** — interactive cards showing what 😭 💀 🙏 🥀 actually mean.
- **Aura Check** — gaming-style meter scoring parent behavior in aura points.
- **The Final Exam** — 8-question fluency quiz with aura scoring and final ranks (from CERTIFIED AURA to UNC STATUS).
- **Generational Pipeline** — how one sentence evolves: Millennial → Gen Z → Gen Alpha.
- **Give Me Brainrot** — random phrase generator with translations.

## Stack

React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion. Fonts: Bricolage Grotesque, Manrope, JetBrains Mono. No backend — everything runs in the browser.

## Run it

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

---

Vocabulary expires approximately 12 minutes after publication.
