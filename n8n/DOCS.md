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
| `env_vars`                       | empty   | More of n8n's environment variables, by name       |
| `log_level`                      | `info`  | How much n8n writes to its log                     |
| `max_old_space_size`             | unset   | The most memory n8n's heap may use, in MB          |
| `node_function_external_modules` | empty   | npm modules Code nodes are allowed to import       |
| `webhook_url`                    | empty   | The external address for webhooks and OAuth        |

**`enable_ssl` is about the cookie, not about certificates.** Turn it on only
when you reach Home Assistant over HTTPS. With it on and an HTTP connection, the
browser will not send the session cookie back and n8n will not let you sign in.

**`webhook_url` does nothing on its own.** It changes the address n8n gives out
for webhook triggers and OAuth callbacks, not what can reach n8n. See "Reaching
n8n from outside" for the part that does.

**`node_function_external_modules` lists module names, not install commands.**
The modules must already be present in the image, so this allows what is there
rather than fetching anything new.

**`env_vars` reaches the settings that have no option here.** n8n reads most of
its configuration from its environment — how long executions are kept, SMTP for
invitations, metrics — and lists every variable in its
[environment variables reference](https://docs.n8n.io/hosting/configuration/environment-variables/).
Each entry is a name and a value:

```yaml
env_vars:
  - name: EXECUTIONS_DATA_MAX_AGE
    value: '72'
  - name: N8N_METRICS
    value: 'true'
```

The variables this application sets from its own options and from Home Assistant
win over these, and `NODE_ENV` stays `production`. The log names each variable
it takes from here, never its value.

**`max_old_space_size` caps n8n's own heap.** Raise it when large workflows or
executions run out of memory, and leave it unset to let Node choose from the
memory available. Code nodes run in a separate process that reads
`N8N_RUNNERS_MAX_OLD_SPACE_SIZE` instead, which `env_vars` can set.

Two settings are taken from Home Assistant rather than asked for. n8n runs in
your instance's timezone, so schedule triggers fire when you expect, and while
`webhook_url` is empty the links it generates point at the ingress address, so
they open from the sidebar.

## Storage

| Path     | Access     | Holds                                                     |
| -------- | ---------- | --------------------------------------------------------- |
| `/data`  | read/write | Workflows, credentials, settings, and the SQLite database |
| `/share` | read-only  | Shared storage, for workflows that read files             |

**n8n keeps its state in `/data`, not in `/config`.** That is where its user
folder points, so unlike most applications here there is no configuration
directory to browse with the File editor. Everything lives inside the
application's own storage and is reached through the n8n interface.

**Workflows can read files from `/share`, and from nowhere else.** n8n confines
the Read/Write Files from Disk node to the directories this application names,
and refuses every other path with "Access to the file is not allowed." Its own
folder in `/data` stays off limits to workflows either way.

`/share` is mapped read-only because n8n never needs to write there. A workflow
that reads a file from shared storage works; one that writes to it does not, by
design.

## Starting a workflow from Home Assistant

Home Assistant itself can call a webhook with nothing published. It shares an
internal network with this application and reaches it by the hostname Supervisor
gives it, which the log names when n8n starts:

```
Home Assistant can call webhooks at http://a1b2c3d4-n8n:5678/webhook/...
```

Give a workflow a Webhook trigger, publish the workflow, and call it from a
[`rest_command`](https://www.home-assistant.io/integrations/rest_command/):

```yaml
rest_command:
  n8n_doorbell:
    url: 'http://a1b2c3d4-n8n:5678/webhook/doorbell'
    method: POST
    content_type: 'application/json'
    payload: '{"camera": "{{ camera }}"}'
```

Take the hostname from your own log, since its first part comes from the address
you added this repository with, and the path from the trigger. The route is
plain HTTP inside your Home Assistant host, and nothing outside that host can
use it.

## Reaching n8n from outside

From anywhere else, ingress is the only way in as installed, and it is
authenticated — every request carries a Home Assistant session cookie that
Supervisor checks before the request reaches n8n. That is what makes the sidebar
work without a second login, and it is also why an external service cannot call
in.

**Webhook triggers therefore do not work from outside out of the box.** Nothing
outside your Home Assistant host can reach n8n, and n8n cannot tell that on its
own: with no external address configured it shows webhook URLs on `localhost`,
which only reaches n8n from inside its own container.

Home Assistant Cloud does not change this. Its remote URL is a tunnel to the
same authenticated frontend, so an ingress path reached that way still answers
`401` to anything without a session.

To accept webhooks you need two things.

1. **Publish the port.** `5678/tcp` is declared but unmapped, so open
   **Configuration → Network** and give it a host port. Nothing is published
   until you do.
2. **Set the external address.** Put whatever URL routes to that port into
   `webhook_url`, and n8n will show it instead of `localhost`.

**OAuth credentials need the same two things.** After you sign in to a provider
such as Google or Microsoft, it sends your browser back to n8n, and that
redirect cannot come through ingress, because the browser does not send the
ingress session along with it. With `webhook_url` set, n8n sends providers to
`<webhook_url>rest/oauth2-credential/callback`, which is the address to register
with them. Most of them insist that it is HTTPS.

**The published port is not authenticated.** Anything that can reach it can
reach n8n's editor, so put a reverse proxy or a tunnel in front of it rather
than forwarding it from a router, and terminate TLS there.

Ingress keeps working alongside this. The sidebar stays the comfortable way in
for you, and the port exists for the machines.

## Backups

Backups are taken cold, so Home Assistant stops n8n for the duration. n8n keeps
its state in SQLite, and copying a database that is being written to can produce
a backup that will not restore. The application is briefly unavailable while a
backup runs.

Credentials are included, encrypted with a key n8n generates on first start and
keeps in its user folder. Because that folder is `/data`, the key is backed up
alongside what it encrypts, so a restore into this application recovers them
together.

Three things in `/data` are left out, because a restore needs none of them. The
editor n8n compiles for the ingress path is rebuilt on every start, and it is
most of the folder on a new installation. The crash journal and the event log
are only read back to recover from a crash.

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

The toolchain is removed again in the same step, with npm's cache, so the image
carries neither. The cost is that a community node with native code cannot be
installed from the editor, because there is nothing left to compile it with. npm
itself stays, since n8n installs community nodes with it.

Node itself is installed with mise, at a version pinned in `.tool-versions`
beside the `package.json`. Those two pins together decide what an image
resolves, which is why both are exact.
