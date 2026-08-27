import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.SITE_BASE ?? '/',
  plugins: [reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    // kanso-ui's entry imports its own compiled stylesheet, which is what makes
    // components arrive styled without the consumer importing anything. Left
    // external, that import reaches Node as a bare `.css` while the SPA's
    // fallback HTML is prerendered, and Node has no loader for it. Bundling the
    // package through Vite lets its own CSS pipeline handle the import.
    noExternal: ['@kanso-labs/kanso-ui'],
  },
})
