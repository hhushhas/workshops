# Workshops

Version: 0.0.0 · Last Updated: 2025-12-07

Compact repo for hands-on AI workshops. Each module is self-contained; start inside its folder.

## Modules

| Module                                | Path                        | What it is                                                                                                   | Dev scripts (npm)                 |
| ------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| Intro to Working with AI — Slide Deck | `intro-to-working-with-ai/` | React/Vite Markdown slide reader with presenter mode, keyboard nav, theming, notes, Prism code highlighting. | `dev`, `build`, `preview`, `lint` |

## Quickstart (Intro to Working with AI)

1. `cd intro-to-working-with-ai`
2. Install: `bun install` (or `npm install`)
3. Run dev server: `bun run dev` (or `npm run dev`) → open shown localhost URL.
4. Edit slides: `public/slides/example.md` (auto-reloads).

## Layout

```
intro-to-working-with-ai/
  package.json        # scripts + deps (React 19, Vite 7, TS)
  public/slides/      # Markdown slides (example.md)
  src/                # App shell, components, hooks, styles
```

## Notes

- Uses Vite + React 19 + TypeScript + ESLint flat config.
- Slides support GitHub Flavored Markdown + inline HTML.
- Presenter mode includes timer, next-slide preview, notes panel, keyboard shortcuts.
