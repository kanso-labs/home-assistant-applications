import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.SITE_BASE ?? '/',
  plugins: [reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  // kanso-ui's entry does `import './styles.css'` for its side effect, and Vite
  // leaves a dependency external in the SSR build — so the prerender that
  // produces index.html would hand that specifier to Node, which cannot load a
  // .css file and fails the whole build. Bundling the library into the SSR
  // build instead puts the import back through Vite's pipeline, where it
  // becomes part of the emitted stylesheet.
  ssr: {
    noExternal: ['@kanso-labs/kanso-ui'],
  },
})
