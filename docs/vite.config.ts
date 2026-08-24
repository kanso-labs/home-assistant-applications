import { reactRouter } from '@react-router/dev/vite'
import { createRequire } from 'node:module'
import { defineConfig } from 'vite'

const require = createRequire(import.meta.url)

// kanso-ui 0.8.0 ships its compiled StyleX rules at `dist/assets/stylex.css`,
// but neither exports that path nor imports it from any module — so a consumer
// that only imports components gets them unstyled, despite the README saying no
// further setup is needed. Resolving the documented specifier onto the file
// that actually exists keeps `app/root.tsx` written the way the library intends,
// so this alias is the only thing to delete once the package exports it.
const kansoStyles = require
  .resolve('@kanso-labs/kanso-ui/package.json')
  .replace('package.json', 'dist/assets/stylex.css')

export default defineConfig({
  base: process.env.SITE_BASE ?? '/',
  plugins: [reactRouter()],
  resolve: {
    alias: {
      '@kanso-labs/kanso-ui/styles.css': kansoStyles,
    },
    tsconfigPaths: true,
  },
})
