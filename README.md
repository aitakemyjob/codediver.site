# codediver.site

The landing page for [CodeDiver](https://github.com/aitakemyjob/codediver) —
a desktop app that keeps you part of your codebase while AI agents write it.

A single static page with no build step: `index.html`, `styles.css`,
`main.js` and `assets/`. Served with GitHub Pages from the `main` branch.

## Preview locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Screenshots

`assets/screens/` holds real screenshots of CodeDiver exploring its own
source, captured at 1420×802 with the Deep Dive theme while a simulated agent
drove it over MCP (walkthroughs, explanations, proposals, diagrams).

## Releases

The **Releases** section and the hero's "Latest release" line are filled in
at load time from the GitHub API (`/repos/aitakemyjob/codediver/releases`),
cached for ten minutes per browser session. Each card shows GitHub's
generated "What's Changed" list and direct download links. If the API is
unreachable, the static v0.1.0 card in `index.html` stays in place.

## Style

A light, flat theme built from the logo palette: navy text on soft
off-white, sky blue and code yellow as accents (darker variants where they're
used as text, for contrast). Code snippets are dark panels, and the app
screenshots use the app's dark Deep Dive theme. No gradients or glows.
