import type { Config } from '@react-router/dev/config'

// GitHub Pages serves this from the root of a custom domain, and from
// `/home-assistant-applications/` on the project domain. `actions/configure-pages`
// reports which, and the workflow passes it through as SITE_BASE.
const base = process.env.SITE_BASE ?? '/'

export default {
  basename: base,
  // A static single-page site on GitHub Pages. There is no server, so nothing
  // may depend on a loader running server-side.
  ssr: false,
} satisfies Config
