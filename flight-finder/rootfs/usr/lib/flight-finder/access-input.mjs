// thesidedoor-core/access as Flight Finder's command line sees it when
// flight-finder-access runs it. See unattended-access.mjs.
//
// A module's own exports take precedence over the ones it re-exports, so these
// two replace upstream's, and everything else is upstream's unchanged. Each
// value is taken out of the environment as it is read.
export * from 'thesidedoor-core/access'

function take(name) {
  const value = process.env[name]
  delete process.env[name]
  if (!value) throw new Error(`${name} is not set`)
  return value
}

export async function readLocalSetupInput() {
  return {
    name: take('FLIGHT_FINDER_ACCESS_NAME'),
    password: take('FLIGHT_FINDER_ACCESS_PASSWORD'),
  }
}

export async function readLocalResetInput() {
  return take('FLIGHT_FINDER_ACCESS_PASSWORD')
}
