// Remembers which shared password flight-finder-access applied last, so that a
// restart applies the option again only once it has changed.
//
//   password-fingerprint.mjs write <file>   records the password
//   password-fingerprint.mjs check <file>   exits 0 if it is the one recorded
//
// The password comes from FLIGHT_FINDER_ACCESS_PASSWORD, never the command
// line, where any process could read it. The file holds a salted scrypt hash
// as costly to guess from as the one Flight Finder keeps in its database.
import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import { promisify } from 'node:util'

const derive = promisify(scrypt)
const cost = { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }
const [operation, file] = process.argv.slice(2)
const password = process.env.FLIGHT_FINDER_ACCESS_PASSWORD ?? ''

if (operation === 'write') {
  const salt = randomBytes(16)
  const hash = await derive(password, salt, 64, cost)
  await writeFile(file, `${salt.toString('hex')}:${hash.toString('hex')}\n`, {
    mode: 0o600,
  })
} else if (operation === 'check') {
  const [salt = '', recorded = ''] = (await readFile(file, 'utf8'))
    .trim()
    .split(':')
  const expected = Buffer.from(recorded, 'hex')
  const hash = await derive(password, Buffer.from(salt, 'hex'), 64, cost)
  process.exitCode =
    expected.length === hash.length && timingSafeEqual(hash, expected) ? 0 : 1
} else {
  console.error('Use write <file> or check <file>')
  process.exitCode = 2
}
