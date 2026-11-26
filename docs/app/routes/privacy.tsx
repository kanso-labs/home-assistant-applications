import {
  Button,
  Code,
  Container,
  Link,
  Stack,
  Text,
} from '@kanso-labs/kanso-ui'

import { useAnalytics } from '../components/analytics'
import type { Route } from './+types/privacy'

// The home page's measure, so the note sits where that page's content would.
const MEASURE = '1100px'

export const meta: Route.MetaFunction = () => [
  { title: 'Privacy · Kanso Labs Home Assistant applications' },
  {
    content:
      'This site counts visits with Google Analytics, without identifying you. What it records, for how long, and how to turn it off.',
    name: 'description',
  },
]

function Section({
  children,
  heading,
}: {
  children: React.ReactNode
  heading: string
}) {
  return (
    <>
      <Text render={<h2 />} variant="headlineSmall">
        {heading}
      </Text>
      {children}
    </>
  )
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <Text block className="measure" variant="bodyLarge">
      {children}
    </Text>
  )
}

// The visitor's own setting, and the buttons that change it. It is drawn
// only once public/analytics.js has loaded, since the prerendered page cannot
// know what this browser chose.
function Choice() {
  const state = useAnalytics()

  if (!state) {
    return (
      <Paragraph>
        The setting for this browser appears here once the page has loaded.
      </Paragraph>
    )
  }

  const { analytics, status } = state

  return (
    <Stack align="start" gap="md">
      <Paragraph>
        {status === 'granted'
          ? 'Analytics is on for this site in this browser.'
          : 'Analytics is off for this site in this browser.'}
      </Paragraph>
      {status === 'granted' ? (
        <Button onPress={analytics.deny} variant="outlined">
          Turn it off
        </Button>
      ) : (
        <Button onPress={analytics.grant} variant="outlined">
          Turn it on
        </Button>
      )}
    </Stack>
  )
}

// Linked from the banner, and from the home page's footer as the way to opt
// out that stays within reach.
export default function Privacy() {
  return (
    <Container maxInlineSize={MEASURE} render={<main />}>
      <Stack className="section" gap="lg" render={<article />}>
        <Stack align="start" gap="md">
          <Link
            href={import.meta.env.BASE_URL}
            tone="primary"
            underline="always"
          >
            Kanso Labs Home Assistant applications
          </Link>
          <Text render={<h1 />} variant="headlineMedium">
            Privacy
          </Text>
        </Stack>
        <Paragraph>
          This site uses Google Analytics for anonymous usage statistics: it
          counts visits, so Kanso Labs can see which pages are read. There are
          no accounts here and no ads. Nothing that names you is collected;
          Google Analytics tells one browser from another by a random ID, not by
          who is using it.
        </Paragraph>
        <Section heading="What is recorded">
          <Paragraph>
            The pages you open and the page that led you here; reaching the end
            of a page; clicks on links that leave the site; and files you
            download. With each, Google Analytics records your browser, device,
            language and approximate location, which it derives from your IP
            address without storing the address. No user ID is set, and nothing
            you type is sent.
          </Paragraph>
          <Paragraph>
            Google signals and every advertising feature are off, and the site
            tells Google that consent for ads is denied, for every visitor.
          </Paragraph>
        </Section>
        <Section heading="Cookies">
          <Paragraph>
            While analytics is on, Google Analytics sets two cookies on this
            site alone, <Code>_ga</Code> and one beginning <Code>_ga_</Code>, to
            tell a returning browser from a new one. Each Kanso Labs site keeps
            its own, so your choice here applies to this site only. It is kept
            in your browser&rsquo;s local storage, and goes nowhere else.
          </Paragraph>
        </Section>
        <Section heading="How long it is kept">
          <Paragraph>
            Google Analytics deletes the records of each visit after 14 months.
            The totals in its reports, such as how many times a page was read in
            a month, are kept.
          </Paragraph>
        </Section>
        <Section heading="Your choice">
          <Paragraph>
            In the European Economic Area, the United Kingdom and Switzerland,
            the site asks before it loads Google Analytics, and nothing is sent
            until you allow it. A static site cannot see where you are, so it
            goes by your browser&rsquo;s time zone, and asks whenever the zone
            leaves it unsure. Elsewhere analytics is on until you turn it off.
            If your browser keeps the time of another place while you are in one
            of those, Google still keeps its cookies off for you, by your IP
            address, though it may receive the visit without them; turning
            analytics off here stops that too.
          </Paragraph>
          <Choice />
          <Paragraph>
            Google also offers a{' '}
            <Link
              href="https://tools.google.com/dlpage/gaoptout"
              tone="primary"
              underline="always"
            >
              browser add-on that turns Google Analytics off
            </Link>{' '}
            on every site, and explains{' '}
            <Link
              href="https://policies.google.com/technologies/partner-sites"
              tone="primary"
              underline="always"
            >
              how it uses information from sites that use its services
            </Link>
            .
          </Paragraph>
        </Section>
        <Section heading="Questions">
          <Paragraph>
            Write to{' '}
            <Link
              href="mailto:contact@kansolabs.org"
              tone="primary"
              underline="always"
            >
              contact@kansolabs.org
            </Link>
            .
          </Paragraph>
        </Section>
      </Stack>
    </Container>
  )
}
