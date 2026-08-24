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

## What is hand-written

The library plus a little layout CSS, and no more than that.
`app/styles/layout.css` holds page width, section rhythm, and the few rows and
columns kanso-ui has no primitive for — it styles no component. Everything with
a look of its own is a kanso-ui component, at its default tokens.
