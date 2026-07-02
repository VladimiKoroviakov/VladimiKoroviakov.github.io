# Repo / remote workflow

This repo is `VladimiKoroviakov/VladimiKoroviakov.github.io` (GitHub Pages).

- **`source` branch** (this branch): full source — `src/`, `gulpfile.js`, `dist/` (build output), etc. Normal development and commits happen here.
- **`main` branch**: published site only. It is NOT edited directly — it's kept in sync via `git subtree push --prefix dist origin main` (see `npm run deploy` in `package.json`). It contains just the contents of `dist/`.
- Build pipeline: Gulp (`gulpfile.js`). Editing `src/` requires rebuilding `dist/` (e.g. `npx gulp html scripts` or other relevant gulp tasks) before the site reflects changes, since `dist/` is what actually gets deployed to `main`/GitHub Pages.
- To publish changes live: commit to `source`, push `source`, then run `npm run deploy` to push `dist/` to `main`.

## Commit authorship rule

**Never** add Claude as an author or co-author of any commit in this repo. Do not include `Co-Authored-By: Claude` (or any Anthropic/Claude attribution) trailers in commit messages — commits must be attributed solely to the human user.
