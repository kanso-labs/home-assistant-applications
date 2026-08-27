# The applications site

The page published at
[home-assistant.kansolabs.org](https://home-assistant.kansolabs.org/): a React
Router SPA built with [`@kanso-labs/kanso-ui`](https://kanso-ui.kansolabs.org/).

Nothing here is committed built. `.github/scripts/build-pages.sh` assembles
`_site/` at deploy time and `.github/workflows/deploy-pages.yaml` publishes it,
so there is no generated output in the tree to keep in step.

## Running it

Node comes from `.tool-versions`.

```bash
npm --prefix docs install
```

```bash
npm --prefix docs run dev
```

| Task                | Command                           |
| ------------------- | --------------------------------- |
| Develop             | `npm --prefix docs run dev`       |
| Build               | `npm --prefix docs run build`     |
| Typecheck           | `npm --prefix docs run typecheck` |
| Regenerate the data | `npm --prefix docs run generate`  |

Building the whole site the way CI does, including the `_site/` assembly:

```bash
./.github/scripts/build-pages.sh
```

## The catalogue is generated

`scripts/generate-catalogue.mjs` reads every `../*/config.yaml` and writes
`app/generated/applications.ts`, copying each `icon.png` into `public/icons/`.
It runs ahead of `dev` and `build`, and both outputs are git-ignored.

That is what stops the page drifting from what the repository ships: a card's
name, tagline and access chip are the application's own `name`, the first
sentence of its `description`, and its `ingress`/`webui`. Adding an application
directory is enough to put it on the page, and removing one takes it off.

## Serving from a subpath

`SITE_BASE` sets both Vite's `base` and the router's `basename`, so one tree
works at a domain root and under `/home-assistant-applications/`. The workflow
passes whatever `actions/configure-pages` reports. To check the subpath case by
hand:

```bash
SITE_BASE=/home-assistant-applications ./.github/scripts/build-pages.sh
```

## Theming

`app/styles/theme.css` is the whole of it: `--kui-*` overrides at `:root`,
carrying Home Assistant's palette and its two faces. Nothing there styles a
component — it retints and resets the type of all of them at once, which is what
kanso-ui's token contract is for. Material's shape, spacing and type scale are
left alone; only the colours and faces filling them change.

The values are sampled from [home-assistant.io](https://www.home-assistant.io/):
its blue, its Figtree and Instrument Sans, and its heavy headings. The dark
scheme follows Home Assistant's own frontend dark theme, since the marketing
site has none to copy. Every text pair was checked against WCAG AA in both
schemes, which is why the blue is a shade darker than the site's own.

Overrides have to sit at `:root` — kanso-ui resolves tokens once, at the root,
so the same declarations on a wrapper would not reach a component.

## What is hand-written

The library, the theme above, and what is left of `app/styles/layout.css` — no
more than that. `Container` carries the page measure and gutter, `Stack` carries
every gap, and `AppBar` is told the same measure and gutter so a full-bleed bar
lines its headline up with the content beneath it.

What remains in `layout.css` is the handful of things a layout primitive has no
opinion about: the rhythm between the page's regions, a prose measure in `ch`,
and two rules that answer to their contents rather than to the grid. It styles
no component.
