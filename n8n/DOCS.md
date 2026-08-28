# Home Assistant Application: n8n

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "n8n" application.
3. Start it, then open it from the sidebar.

There is no port to open and no address to remember. n8n is served through Home
Assistant's ingress, so it appears in the sidebar and is reached through the
same session you are already signed in to.

There is nothing to configure before the first start. n8n asks you to create an
owner account the first time you open it.

## Configuration

| Option                           | Default | Does                                               |
| -------------------------------- | ------- | -------------------------------------------------- |
| `enable_ssl`                     | `false` | Requires n8n's session cookie to travel over HTTPS |
| `enable_task_runners`            | `false` | Runs Code node tasks in a separate process         |
| `log_level`                      | `info`  | How much n8n writes to its log                     |
| `node_function_external_modules` | empty   | npm modules Code nodes are allowed to import       |

**`enable_ssl` is about the cookie, not about certificates.** Turn it on only
when you reach Home Assistant over HTTPS. With it on and an HTTP connection, the
browser will not send the session cookie back and n8n will not let you sign in.

**`node_function_external_modules` lists module names, not install commands.**
The modules must already be present in the image, so this allows what is there
rather than fetching anything new.

Two settings are taken from Home Assistant rather than asked for. n8n runs in
your instance's timezone, so schedule triggers fire when you expect, and its
editor base URL is set to the ingress address so links it generates resolve.

## Storage

| Path     | Access     | Holds                                                     |
| -------- | ---------- | --------------------------------------------------------- |
| `/data`  | read/write | Workflows, credentials, settings, and the SQLite database |
| `/share` | read-only  | Shared storage, for workflows that read files             |

**n8n keeps its state in `/data`, not in `/config`.** That is where its user
folder points, so unlike most applications here there is no configuration
directory to browse with the File editor. Everything lives inside the
application's own storage and is reached through the n8n interface.

`/share` is mapped read-only because n8n never needs to write there. A workflow
that reads a file from shared storage works; one that writes to it does not, by
design.

## Backups

Backups are taken cold, so Home Assistant stops n8n for the duration. n8n keeps
its state in SQLite, and copying a database that is being written to can produce
a backup that will not restore. The application is briefly unavailable while a
backup runs.

Credentials are included, encrypted with a key n8n generates on first start and
keeps in its user folder. Because that folder is `/data`, the key is backed up
alongside what it encrypts, so a restore into this application recovers them
together.

## Updates

n8n is installed from npm at build time, at a version pinned in this
application's `package.json`. Updates arrive as pull requests against the
repository and reach you as an application update once released.

n8n's own update prompts do not apply. Nothing inside the container can replace
the installed version, so updating this application is the only route.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about n8n itself rather than this packaging, see the
[n8n documentation](https://docs.n8n.io/) and the
[community forum](https://community.n8n.io/).

## Credits

This packaging began from Home Assistant's own
[example application](https://github.com/home-assistant/apps-example), which is
MIT licensed.

n8n itself is developed by [n8n GmbH](https://github.com/n8n-io/n8n). It is
fair-code rather than open source: the bulk of it is under the
[Sustainable Use License](https://github.com/n8n-io/n8n/blob/master/LICENSE.md),
which permits internal business use and personal use but restricts reselling it
as a service. Files marked `.ee` need a separate n8n Enterprise License and are
not covered by that licence.

## A note on the base image

Most applications here start from `ghcr.io/home-assistant/base`, which is
Alpine. This one starts from `base-ubuntu`, the Debian-family equivalent.

n8n is installed from npm rather than unpacked from a release archive, and that
install compiles native code — which is why the Dockerfile pulls in `g++`,
`make`, `python3` and `linux-libc-dev` before it runs. Those builds are the
reason a glibc base is the less troublesome choice here.

Node itself is installed with mise, at a version pinned in `.tool-versions`
beside the `package.json`. Those two pins together decide what an image
resolves, which is why both are exact.
