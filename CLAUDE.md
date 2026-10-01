<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Design

Minimal and typographic: a single 672px column, monochrome plus one accent, Outfit for all text. No mono and no all caps. Bold only for the homepage greeting, page and section headings, and experience and project names. Lines, borders, and underlines are 2px. No shadows or gradients. Images only where they are the content: the flag in the intro, album covers in the music player, and project screenshots in the project modal.

- Every clickable element gets hover and `focus-visible` states.
- Only animate `transform`, `opacity`, and color. The experience rows' open and close height is the one exception. Never `transition-all`.
- Use the spacing scale consistently rather than arbitrary steps.
- The accent is never default Tailwind blue or indigo.

## Writing

Comments are bare or absent — never advice addressed to the reader. The same goes for placeholder strings and commit messages. Plain words over jargon.
