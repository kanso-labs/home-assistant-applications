import {
  AppBar,
  Badge,
  Button,
  Card,
  Code,
  Container,
  CopyField,
  Feed,
  IconButton,
  Keycap,
  Link,
  ProductIcon,
  Separator,
  Stack,
  Text,
} from '@kanso-labs/kanso-ui'
import { useEffect, useState } from 'react'

import { type Access, applications } from '../generated/applications'

const repository = 'https://github.com/kanso-labs/home-assistant-applications'

const addRepository = `https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=${encodeURIComponent(repository)}`

// The page's measure and gutter. The app bar is told both, so its headline
// lands over the content beneath it while its surface still paints edge to
// edge.
const MEASURE = '1100px'
const GUTTER = '24px'

// M3 separates a bar from the content scrolled beneath it with a fill rather
// than a shadow, and AppBar's `scrolled` is controlled — only the app knows
// which element scrolls. Here that is the window.
function useScrolled() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return scrolled
}

function GitHubMark() {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      height="20"
      viewBox="0 0 16 16"
      width="20"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

// Ingress is the route worth pointing out — Home Assistant proxies it, so there
// is no port to open. A port and no web interface at all are statements of fact
// and rank against nothing.
function accessTone(kind: Access['kind']) {
  return kind === 'ingress' ? 'primary' : 'neutral'
}

function PackagingNote({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <Card variant="filled">
      <Stack gap="sm">
        <Text render={<h3 />} variant="titleMedium">
          {title}
        </Text>
        <Text block tone="muted" variant="bodyMedium">
          {children}
        </Text>
      </Stack>
    </Card>
  )
}

export default function Home() {
  const scrolled = useScrolled()

  return (
    <>
      <AppBar
        contentInset={GUTTER}
        contentMaxInlineSize={MEASURE}
        headline="A media stack your Home Assistant can install."
        scrolled={scrolled}
        size="large"
        subtitle="Home Assistant applications, built for aarch64 and amd64"
        trailing={
          <IconButton
            aria-label="View this repository on GitHub"
            nativeButton={false}
            render={<a href={repository} rel="noreferrer" target="_blank" />}
          >
            <GitHubMark />
          </IconButton>
        }
      />

      <Container maxInlineSize={MEASURE} render={<main />}>
        <Stack className="hero" gap="xl">
          <Text block className="measure" tone="muted" variant="bodyLarge">
            A media, download and automation stack, packaged as Home Assistant
            applications — add-ons, if your Home Assistant still calls them
            that. Each one follows its upstream project's releases without
            anyone having to remember to check.
          </Text>

          <Stack align="center" direction="row" gap="md" wrap>
            <Button
              nativeButton={false}
              render={
                <a href={addRepository} rel="noreferrer" target="_blank" />
              }
              size="lg"
            >
              Add to Home Assistant
            </Button>

            <CopyField
              aria-label="Repository URL"
              className="hero__copy"
              value={repository}
            />
          </Stack>

          <Text block className="measure" tone="muted" variant="bodySmall">
            The button works if you use My Home Assistant. Otherwise paste the
            URL under{' '}
            <span className="keys">
              <Keycap>Settings</Keycap>
              <span aria-hidden="true">→</span>
              <Keycap>Add-ons</Keycap>
              <span aria-hidden="true">→</span>
              <Keycap>Add-on store</Keycap>
              <span aria-hidden="true">→</span>
              <Keycap>⋮</Keycap>
              <span aria-hidden="true">→</span>
              <Keycap>Repositories</Keycap>
            </span>
            .
          </Text>
        </Stack>

        <Separator />

        <Stack className="section" gap="xl" render={<section />}>
          <Stack gap="xs">
            <Text render={<h2 />} variant="headlineSmall">
              Applications
            </Text>
            <Text block tone="muted" variant="bodyMedium">
              {applications.length} applications, each installable on its own.
            </Text>
          </Stack>

          <Feed minItemWidth="260px">
            {applications.map((application) => (
              <Card
                interactive
                key={application.slug}
                render={
                  <a href={application.url} rel="noreferrer" target="_blank" />
                }
                variant="elevated"
              >
                <Stack className="card-body" gap="md">
                  <Stack align="center" direction="row" gap="md">
                    <ProductIcon
                      name={application.name}
                      src={`${import.meta.env.BASE_URL}${application.icon}`}
                    />
                    <Text render={<h3 />} variant="titleMedium">
                      {application.name}
                    </Text>
                  </Stack>

                  <Text block tone="muted" variant="bodySmall">
                    {application.tagline}
                  </Text>

                  <Stack align="start" className="card-foot" gap="none">
                    <Badge
                      tone={accessTone(application.access.kind)}
                      variant="outlined"
                    >
                      {application.access.label}
                    </Badge>
                  </Stack>
                </Stack>
              </Card>
            ))}
          </Feed>
        </Stack>

        <Separator />

        <Stack className="section" gap="xl" render={<section />}>
          <Text render={<h2 />} variant="headlineSmall">
            How these are packaged
          </Text>

          <Feed minItemWidth="360px">
            <PackagingNote title="Two architectures, one image name">
              Each application publishes a multi-architecture image to{' '}
              <Code>
                ghcr.io/kanso-labs/home-assistant-application-&lt;slug&gt;
              </Code>
              , covering aarch64 and amd64.
            </PackagingNote>

            <PackagingNote title="As little mapped as possible">
              An application is given write access only where it actually
              writes. Radarr and Sonarr get <Code>/media</Code> and{' '}
              <Code>/share</Code>, because moving and renaming files is their
              job. Prowlarr manages indexer definitions and gets neither, even
              though its upstream packaging maps both.
            </PackagingNote>

            <PackagingNote title="Cold backups where the state is a database">
              Most of these keep their settings in SQLite, so Home Assistant
              stops them for the duration of a backup. Copying a database while
              it is being written produces a backup that will not restore.
            </PackagingNote>

            <PackagingNote title="Updates that arrive">
              Renovate watches each upstream project's releases, release-please
              cuts a version, and Home Assistant offers the update. The arr
              applications' own updaters are switched off deliberately — they
              would announce a new version and then refuse to install it — so
              this packaging is the one route in.
            </PackagingNote>
          </Feed>
        </Stack>

        <Separator />

        <Stack className="footer" gap="lg" render={<footer />}>
          <Stack direction="row" gap="lg" render={<ul />} wrap>
            <li>
              <Link href={repository} tone="inherit" underline="hover">
                Repository
              </Link>
            </li>
            <li>
              <Link
                href={`${repository}/blob/main/CONTRIBUTING.md`}
                tone="inherit"
                underline="hover"
              >
                Contributing
              </Link>
            </li>
            <li>
              <Link
                href={`${repository}/issues`}
                tone="inherit"
                underline="hover"
              >
                Issues
              </Link>
            </li>
            <li>
              <Link
                href={`${repository}/blob/main/LICENSE.md`}
                tone="inherit"
                underline="hover"
              >
                Licence
              </Link>
            </li>
          </Stack>

          <Text block className="measure" tone="muted" variant="bodySmall">
            This packaging is MIT licensed. The applications it packages keep
            their own terms — mostly GPLv3 or MIT, with Plex Media Server
            proprietary and used under Plex's. Each application's docs record
            its licence and credit the packaging it was ported from.
          </Text>
        </Stack>
      </Container>
    </>
  )
}
