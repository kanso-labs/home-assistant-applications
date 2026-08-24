import {
  AppBar,
  Badge,
  Button,
  Card,
  Code,
  CopyField,
  Feed,
  IconButton,
  Keycap,
  Link,
  ProductIcon,
  Separator,
  Text,
} from '@kanso-labs/kanso-ui'
import { useEffect, useState } from 'react'

import { type Access, applications } from '../generated/applications'

const repository = 'https://github.com/kanso-labs/home-assistant-applications'

const addRepository = `https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=${encodeURIComponent(repository)}`

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

export default function Home() {
  const scrolled = useScrolled()

  return (
    <>
      <div className="bar">
        <AppBar
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
      </div>

      <main>
        <div className="shell hero">
          <div className="hero__lede">
            <Text tone="muted" variant="bodyLarge">
              A media, download and automation stack, packaged as Home Assistant
              applications — add-ons, if your Home Assistant still calls them
              that. Each one follows its upstream project's releases without
              anyone having to remember to check.
            </Text>
          </div>

          <div className="hero__actions">
            <Button
              nativeButton={false}
              render={
                <a href={addRepository} rel="noreferrer" target="_blank" />
              }
              size="lg"
            >
              Add to Home Assistant
            </Button>

            <div className="hero__copy">
              <CopyField aria-label="Repository URL" value={repository} />
            </div>
          </div>

          <div className="hero__note">
            <Text tone="muted" variant="bodySmall">
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
          </div>
        </div>

        <Separator />

        <section className="shell section">
          <div className="section-head">
            <Text render={<h2 />} variant="headlineSmall">
              Applications
            </Text>
            <Text tone="muted" variant="bodyMedium">
              {applications.length} applications, each installable on its own.
            </Text>
          </div>

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
                <div className="card-body">
                  <div className="card-head">
                    <ProductIcon
                      name={application.name}
                      src={`${import.meta.env.BASE_URL}${application.icon}`}
                    />
                    <Text render={<h3 />} variant="titleMedium">
                      {application.name}
                    </Text>
                  </div>

                  <Text tone="muted" variant="bodySmall">
                    {application.tagline}
                  </Text>

                  <div className="card-foot">
                    <Badge
                      tone={accessTone(application.access.kind)}
                      variant="outlined"
                    >
                      {application.access.label}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </Feed>
        </section>

        <Separator />

        <section className="shell section">
          <div className="section-head">
            <Text render={<h2 />} variant="headlineSmall">
              How these are packaged
            </Text>
          </div>

          <Feed minItemWidth="360px">
            <Card variant="filled">
              <div className="note-body">
                <Text render={<h3 />} variant="titleMedium">
                  Two architectures, one image name
                </Text>
                <Text tone="muted" variant="bodyMedium">
                  Each application publishes a multi-architecture image to{' '}
                  <Code>
                    ghcr.io/kanso-labs/home-assistant-application-&lt;slug&gt;
                  </Code>
                  , covering aarch64 and amd64.
                </Text>
              </div>
            </Card>

            <Card variant="filled">
              <div className="note-body">
                <Text render={<h3 />} variant="titleMedium">
                  As little mapped as possible
                </Text>
                <Text tone="muted" variant="bodyMedium">
                  An application is given write access only where it actually
                  writes. Radarr and Sonarr get <Code>/media</Code> and{' '}
                  <Code>/share</Code>, because moving and renaming files is
                  their job. Prowlarr manages indexer definitions and gets
                  neither, even though its upstream packaging maps both.
                </Text>
              </div>
            </Card>

            <Card variant="filled">
              <div className="note-body">
                <Text render={<h3 />} variant="titleMedium">
                  Cold backups where the state is a database
                </Text>
                <Text tone="muted" variant="bodyMedium">
                  Most of these keep their settings in SQLite, so Home Assistant
                  stops them for the duration of a backup. Copying a database
                  while it is being written produces a backup that will not
                  restore.
                </Text>
              </div>
            </Card>

            <Card variant="filled">
              <div className="note-body">
                <Text render={<h3 />} variant="titleMedium">
                  Updates that arrive
                </Text>
                <Text tone="muted" variant="bodyMedium">
                  Renovate watches each upstream project's releases,
                  release-please cuts a version, and Home Assistant offers the
                  update. The arr applications' own updaters are switched off
                  deliberately — they would announce a new version and then
                  refuse to install it — so this packaging is the one route in.
                </Text>
              </div>
            </Card>
          </Feed>
        </section>

        <Separator />
      </main>

      <footer className="shell footer stack">
        <ul className="footer__links">
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
        </ul>

        <div className="footer__colophon">
          <Text tone="muted" variant="bodySmall">
            This packaging is MIT licensed. The applications it packages keep
            their own terms — mostly GPLv3 or MIT, with Plex Media Server
            proprietary and used under Plex's. Each application's docs record
            its licence and credit the packaging it was ported from.
          </Text>
        </div>
      </footer>
    </>
  )
}
