import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'

import '@kanso-labs/kanso-ui/styles.css'
import '@kanso-labs/kanso-ui/tokens.css'
import './styles/theme.css'
import './styles/layout.css'

import { Text } from '@kanso-labs/kanso-ui'

import type { Route } from './+types/root'

export const links: Route.LinksFunction = () => [
  { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
  {
    crossOrigin: 'anonymous',
    href: 'https://fonts.gstatic.com',
    rel: 'preconnect',
  },
  // The two faces home-assistant.io loads, and the two styles/theme.css points
  // every type role at: Figtree for the headings, Instrument Sans for the rest.
  {
    href: 'https://fonts.googleapis.com/css2?family=Figtree:wght@600;700;800&family=Instrument+Sans:wght@400;500;600&display=swap',
    rel: 'stylesheet',
  },
  {
    href: `${import.meta.env.BASE_URL}favicon.svg`,
    rel: 'icon',
    type: 'image/svg+xml',
  },
]

export const meta: Route.MetaFunction = () => [
  { title: 'Kanso Labs Home Assistant applications' },
  {
    content:
      'A media, download and automation stack packaged as Home Assistant applications, for aarch64 and amd64.',
    name: 'description',
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Something went wrong'
  let details = 'An unexpected error occurred.'

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? 'Not found' : 'Error'
    details =
      error.status === 404
        ? 'There is one page here, and this is not it.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message
  }

  return (
    <main className="shell section stack">
      <Text render={<h1 />} variant="headlineMedium">
        {message}
      </Text>
      <Text tone="muted" variant="bodyLarge">
        {details}
      </Text>
    </main>
  )
}
