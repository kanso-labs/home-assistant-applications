// Verifies the conventions every application here follows by hand.
//
// AGENTS.md sets out how an application is laid out, and none of it fails on
// its own when it slips: a key out of order, a translation missing, a logo the
// wrong size or a Renovate rule that forgot the application all ship without a
// word, and each of those has slipped before and been put back by hand.
// verify-release-wiring.sh covers the release chain; this covers the rest.
//
// Run from the repository root, after `npm --prefix docs ci`: it reads YAML with
// the `yaml` package the site already pins, so nothing new is installed.

import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(
  new URL('../../docs/package.json', import.meta.url),
)
const YAML = require('yaml')

const repository = 'kanso-labs/home-assistant-applications'
const languages = ['en', 'pt-BR']

let failures = 0
const fail = (app, message) => {
  console.error(`  ✗ ${app}: ${message}`)
  failures += 1
}

const read = (path) => YAML.parse(readFileSync(path, 'utf8'))
const sameSet = (a, b) => a.length === b.length && a.every((x) => b.includes(x))

// Keys in JSON and YAML are ordered by name. `schema` is exempt, because the
// Configuration tab shows options in the order it declares them, and so are
// `ports` and the translations' `network`, because the Network tab lists ports
// in the order config.yaml declares them.
const unordered = (node, path, exempt, found = []) => {
  if (Array.isArray(node)) {
    node.forEach((item, i) => unordered(item, `${path}[${i}]`, exempt, found))
  } else if (node && typeof node === 'object') {
    const keys = Object.keys(node)
    const sorted = [...keys].sort()
    if (keys.some((key, i) => key !== sorted[i])) {
      found.push(`${path || 'top level'} (${keys.join(', ')})`)
    }
    for (const key of keys) {
      if (!exempt.includes(key))
        unordered(node[key], path ? `${path}.${key}` : key, exempt, found)
    }
  }
  return found
}

// A PNG's width and height are the first two fields of its IHDR chunk.
const pngSize = (path) => {
  const bytes = readFileSync(path)
  if (bytes.toString('latin1', 1, 4) !== 'PNG') return null
  return [bytes.readUInt32BE(16), bytes.readUInt32BE(20)]
}

// The curated rule types the application versions users see, as `fix`.
const renovate = JSON.parse(readFileSync('.github/renovate.json', 'utf8'))
const curated = renovate.packageRules.find(
  (rule) => rule.semanticCommitType === 'fix' && rule.matchDepNames,
)?.matchDepNames
if (!curated) {
  console.error(
    "  ✗ .github/renovate.json: no rule types matchDepNames as fix, so the curated list can't be checked",
  )
  failures += 1
}

// The depNames Renovate reads out of an application: each annotated ARG, each
// image a FROM names, directly or through an ARG's default, and each package a
// package.json under it pins, as n8n's does.
const versionNames = (app, dockerfile) => {
  const names = [
    ...dockerfile.matchAll(/^# renovate: datasource=\S+ depName=(\S+)/gm),
  ].map((m) => m[1])
  const args = Object.fromEntries(
    [...dockerfile.matchAll(/^ARG (\w+)=(\S+)/gm)].map((m) => [m[1], m[2]]),
  )
  for (const [, from] of dockerfile.matchAll(/^FROM (\S+)/gm)) {
    const image = from.replace(
      /^\$\{?(\w+)\}?$/,
      (whole, name) => args[name] ?? whole,
    )
    if (!image.startsWith('$'))
      names.push(image.replace(/@.*$/, '').replace(/:[^/]*$/, ''))
  }
  const packages = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const path = `${dir}/${entry.name}`
      if (entry.isDirectory())
        return entry.name === 'node_modules' ? [] : packages(path)
      return entry.name === 'package.json'
        ? Object.keys(JSON.parse(readFileSync(path, 'utf8')).dependencies ?? {})
        : []
    })
  return [...new Set([...names, ...packages(app)])]
}

const apps = readdirSync('.', { withFileTypes: true })
  .filter(
    (entry) => entry.isDirectory() && existsSync(`${entry.name}/config.yaml`),
  )
  .map((entry) => entry.name)
  .sort()

for (const app of apps) {
  console.log(app)
  const config = read(`${app}/config.yaml`)

  // What every application declares the same way.
  if (config.slug !== app)
    fail(app, `slug is '${config.slug}', not the directory name`)
  const url = `https://github.com/${repository}/tree/main/${app}`
  if (config.url !== url) fail(app, `url is '${config.url}', not ${url}`)
  if (
    'image' in config &&
    config.image !== `ghcr.io/kanso-labs/home-assistant-application-${app}`
  ) {
    fail(
      app,
      `image is '${config.image}'; it is ghcr.io/kanso-labs/home-assistant-application-${app}, or absent when the software may not be redistributed`,
    )
  }
  if (!sameSet(config.arch ?? [], ['aarch64', 'amd64']))
    fail(app, `arch is ${JSON.stringify(config.arch)}, not aarch64 and amd64`)
  if (config.init !== false)
    fail(app, 'init is not false; the base image supplies s6-overlay')
  if ('watchdog' in config)
    fail(app, 'sets watchdog, which the linter rejects; use a HEALTHCHECK')
  for (const where of unordered(config, '', [
    'schema',
    'ports',
    'ports_description',
  ])) {
    fail(app, `config.yaml keys out of order at ${where}`)
  }

  // Every option and port has a name and a description in every language.
  const schema = Object.keys(config.schema ?? {})
  const ports = Object.keys(config.ports ?? {})
  const translations = {}
  for (const language of schema.length || ports.length ? languages : []) {
    const path = `${app}/translations/${language}.yaml`
    if (!existsSync(path)) {
      fail(app, `${path} is missing`)
      continue
    }
    const translation = read(path) ?? {}
    translations[language] = translation
    for (const where of unordered(translation, '', ['network']))
      fail(app, `${path} keys out of order at ${where}`)
    const options = Object.keys(translation.configuration ?? {})
    if (!sameSet(options, schema)) {
      fail(
        app,
        `${path} translates options [${options}], but the schema has [${schema}]`,
      )
    }
    for (const [option, entry] of Object.entries(
      translation.configuration ?? {},
    )) {
      if (!entry?.name || !entry?.description)
        fail(app, `${path} gives ${option} no name or no description`)
    }
    const network = Object.keys(translation.network ?? {})
    if (!sameSet(network, ports))
      fail(
        app,
        `${path} describes ports [${network}], but config.yaml has [${ports}]`,
      )
  }
  if (translations.en && translations['pt-BR']) {
    const shape = (t) =>
      JSON.stringify(
        Object.entries(t.configuration ?? {}).map(([k, v]) => [
          k,
          Object.keys(v?.fields ?? {}).sort(),
        ]),
      )
    if (shape(translations.en) !== shape(translations['pt-BR'])) {
      fail(app, 'en.yaml and pt-BR.yaml translate different list fields')
    }
  }

  // The store shows the icon in a square and the logo in a banner.
  for (const [file, width, height] of [
    ['icon.png', 128, 128],
    ['logo.png', 250, 100],
  ]) {
    const size = existsSync(`${app}/${file}`) ? pngSize(`${app}/${file}`) : null
    if (!size) fail(app, `${file} is missing or not a PNG`)
    else if (size[0] !== width || size[1] !== height)
      fail(app, `${file} is ${size[0]}x${size[1]}, not ${width}x${height}`)
  }

  const dockerfile = readFileSync(`${app}/Dockerfile`, 'utf8')

  // The application's own version is in the curated rule, or its bumps ship as
  // a patch under Dependencies whatever step upstream took.
  const names = versionNames(app, dockerfile)
  if (curated && !names.some((name) => curated.includes(name))) {
    fail(
      app,
      `none of its versions (${names.join(', ')}) is in the curated rule in .github/renovate.json`,
    )
  }

  // Watchdog acts on a health check, so each Dockerfile has one or says why not.
  if (
    !/^HEALTHCHECK /m.test(dockerfile) &&
    !/^#.*\bhealth ?check/im.test(dockerfile)
  ) {
    fail(
      app,
      'its Dockerfile neither has a HEALTHCHECK nor says in a comment why it needs none',
    )
  }

  // A download fails loudly and retries through a bad spell, as Traps describes.
  // Docker drops comment lines inside a RUN, and these RUNs carry comments in
  // backticks as well, so both go before the continuations are joined.
  const logical = dockerfile
    .split('\n')
    .filter((line) => !/^\s*#/.test(line))
    .join('\n')
    .replace(/`#[^`]*`/g, '')
    .replace(/\\\n/g, ' ')
  for (const line of logical.split('\n')) {
    if (!/^RUN\s/.test(line)) continue
    for (const command of line.slice(4).split(/&&|\|\||;|\||\$\(/)) {
      const words = command.trim().replace(/^(exec|then|do)\s+/, '')
      if (!/^curl\s/.test(words)) continue
      const missing = [
        [/\s(-[a-zA-Z]*f[a-zA-Z]*|--fail)(\s|$)/, '-f'],
        [/\s--retry-all-errors(\s|$)/, '--retry-all-errors'],
      ]
        .filter(([pattern]) => !pattern.test(words))
        .map(([, flag]) => flag)
      if (missing.length)
        fail(
          app,
          `a curl in its Dockerfile lacks ${missing.join(' and ')}: ${words.slice(0, 100)}`,
        )
    }
  }
}

if (failures > 0) {
  console.error(`\n${failures} convention problem(s) found.`)
  process.exit(1)
}
console.log('\nEvery application follows the conventions this checks.')
