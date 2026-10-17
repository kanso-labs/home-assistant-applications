// Loaded with --import ahead of Flight Finder's own command line, by
// flight-finder-access.
//
// Upstream's `access setup` and `access reset` take the first Admin's name and
// the shared password from an interactive terminal, through two functions of
// thesidedoor-core/access, and refuse to run without one. This points the
// command's imports of that module at access-input.mjs, which is the same
// module with those two functions taking the values from the environment.
// Everything else the commands do, and the store they write to, is upstream's.
import { registerHooks } from 'node:module'
import { pathToFileURL } from 'node:url'

const replacement = new URL('./access-input.mjs', import.meta.url).href
// The command being run, which the real module is resolved from, so that it is
// the very copy the command would have loaded itself.
const command = pathToFileURL(process.argv[1]).href

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier !== 'thesidedoor-core/access') {
      return nextResolve(specifier, context)
    }
    if (context.parentURL === replacement) {
      return nextResolve(specifier, { ...context, parentURL: command })
    }
    return { shortCircuit: true, url: replacement }
  },
})
