# Intro to Working with AI — Slide Deck

Version: 0.0.0 · Last Updated: 2025-12-07 · Stack: React 19 + Vite 7 + TypeScript

Concise deck reader/presenter that renders Markdown slides from `public/slides/example.md` with notes, keyboard control, presenter view, theming, and code highlighting.

## Quickstart

1. Install: `bun install` (or `npm install`)
2. Run dev server: `bun run dev` (or `npm run dev`) → open the shown localhost URL.
3. Edit slides in `public/slides/example.md`; the app auto-reloads.
4. Build static bundle: `npm run build` (output in `dist/`)
5. Lint: `npm run lint`

### Project layout

```
src/
  App.tsx            # Shell + routing to presenter/normal modes
  components/        # Slide viewer, navigation bar, presenter view, theme toggle
  hooks/             # Markdown loading/parsing + keyboard shortcuts
  utils/markdownParser.ts # Slide + notes extraction
public/slides/example.md  # Editable slide source (GFM + HTML allowed)
```

## How the deck works (feature matrix)

| Area                 | Behavior (actual)                                                                                                                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Slides source        | Fetches `/slides/example.md` on load; reload button retries on errors.                                                                                                                               |
| Parsing              | Splits slides on blank-line `---` or `## ` headers. Title = first `#`/`##` in block or “Slide N”.                                                                                                    |
| Speaker notes        | In-slide `<!-- notes: ... -->` or `:::notes ... :::` are extracted + hidden from rendered slide; shown in Notes.                                                                                     |
| Rendering            | `react-markdown` + `remark-gfm` + `rehype-raw` (HTML allowed). Code blocks get Prism (oneDark) highlighting.                                                                                         |
| Navigation bar       | Fixed bottom bar with prev/next, jump-to menu listing slide titles, draggable progress scrubber, presenter toggle, notes toggle.                                                                     |
| Keyboard             | `→/↓/Space/PageDown` next; `←/↑/PageUp` previous; `P` toggle presenter; `M` toggle slide menu; `F` fullscreen; `Esc` exits fullscreen; ignored while typing in inputs/textareas.                     |
| Presenter mode       | Two-column view: current slide, next slide preview, speaker notes panel, slide counter, start/pause/reset timer, nav buttons, exit button.                                                           |
| Notes                | Click notes icon in nav to open popup for current slide; shows “No notes…” if empty.                                                                                                                 |
| States               | Loading placeholder; error view with message + “Try Again”; “No slides found” if file parsed empty.                                                                                                  |
| Theming & typography | Theme toggle (top-right) switches dark/light; JetBrains Mono; font scale buttons XS–XXL adjust `--font-scale`; choices persisted in `localStorage`. Accent color persists (defaults to warm orange). |
| Fullscreen           | `F` toggles fullscreen; `Esc` exits.                                                                                                                                                                 |

## Editing slides

- Location: `public/slides/example.md`
- Separate slides with either `---` on its own line (blank lines around it) **or** start a new slide with a `##` heading.
- Add notes (visible only in Notes/Presenter):
  - HTML comment: `<!-- notes: Keep it tight -->`
  - Fence block:
    ```
    :::notes
    Speaker-only guidance
    :::
    ```
- Use regular Markdown + GitHub Flavored Markdown; raw HTML is allowed.

## Components at a glance

- `useSlideParser` — fetch + parse slides; exposes `slides`, `loading`, `error`, `reload`.
- `SlideViewer` — renders current slide Markdown with code highlighting.
- `SlideNavigation` — nav buttons, slide menu, progress scrub, notes popup, presenter toggle.
- `PresenterMode` — dual-pane presenter UI with notes + timer.
- `useKeyboardNav` — global key bindings (see Keyboard above).
- `ThemeToggle` — theme + font-size controls; persists to `localStorage`.

## Scripts

- `npm run dev` – Vite dev server with HMR
- `npm run build` – production build to `dist/`
- `npm run preview` – preview the built app
- `npm run lint` – ESLint (flat config)

## Tips

- If slides fail to load, the UI shows the HTTP status; click **Try Again** after fixing the file/path.
- Keep slide titles concise; they’re reused in the jump menu and presenter sidebar.
- Presenter timer does not auto-start; use the play/pause control.
