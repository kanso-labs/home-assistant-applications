import { Button, Card, Link, Stack, Text } from '@kanso-labs/kanso-ui'
import { useEffect, useState } from 'react'

// What analytics.js puts on the window. It is the one file every Kanso Labs
// site that loads gtag.js loads from https://kansolabs.org/analytics.js. It
// loads after the page has hydrated as often as before, so everything here
// starts empty and fills in when the script says it is ready.
type Analytics = {
  deny: () => void
  dismiss: () => void
  event: string
  grant: () => void
  prompt: () => 'consent' | 'notice' | null
  status: () => 'denied' | 'granted'
}

declare global {
  interface Window {
    kansoAnalytics?: Analytics
  }
}

export const MEASUREMENT_ID = 'G-B685B0SN8W'
export const PRIVACY = `${import.meta.env.BASE_URL}privacy`

const EVENT = 'kanso-analytics'

export function useAnalytics() {
  const [state, setState] = useState<{
    analytics: Analytics
    prompt: ReturnType<Analytics['prompt']>
    status: ReturnType<Analytics['status']>
  }>()

  useEffect(() => {
    const update = () => {
      const analytics = window.kansoAnalytics

      if (analytics) {
        setState({
          analytics,
          prompt: analytics.prompt(),
          status: analytics.status(),
        })
      }
    }

    update()
    window.addEventListener(EVENT, update)

    return () => window.removeEventListener(EVENT, update)
  }, [])

  return state
}

// Asks first in the EEA, the UK and Switzerland, and says so elsewhere. It is
// fixed to the foot of the viewport, so it moves nothing when it appears.
export function AnalyticsBanner() {
  const state = useAnalytics()

  if (!state?.prompt) {
    return null
  }

  const { analytics, prompt } = state
  const consent = prompt === 'consent'

  return (
    <section aria-label="Analytics" className="analytics-banner">
      <Card variant="elevated">
        <Stack gap="md">
          <Text block variant="bodyMedium">
            {consent
              ? 'May Kanso Labs count your visits with Google Analytics? It records the pages you open, without your name or any account, and nothing is sent unless you allow it. Your answer applies to every Kanso Labs site under kansolabs.org. '
              : 'Kanso Labs sites count visits with Google Analytics: the pages opened, without your name or any account. Your choice applies to every Kanso Labs site under kansolabs.org. '}
            <Link href={PRIVACY} tone="inherit" underline="always">
              Privacy
            </Link>
          </Text>
          <Stack direction="row" gap="sm" justify="end" wrap>
            <Button onPress={analytics.deny} variant="outlined">
              {consent ? 'Decline' : 'Opt out'}
            </Button>
            <Button
              onPress={consent ? analytics.grant : analytics.dismiss}
              variant="filled"
            >
              {consent ? 'Allow' : 'OK'}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </section>
  )
}
