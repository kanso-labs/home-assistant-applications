# Home Assistant Application: Immich Power Tools

[Immich Power Tools](https://github.com/immich-power-tools/immich-power-tools)
does in bulk what Immich's own interface does one photo at a time. It manages
people in bulk and suggests the ones to merge, fills in missing locations, finds
albums waiting to be made, shifts dates, and shows analytics across your
library.

It works beside Immich rather than inside it. It reads Immich's database
directly for its searches and analytics, and makes every change through Immich's
API.

## Before you install

Power Tools needs Immich 3.0 or later, and two ways in:

- **Immich's API**, where Immich answers.
- **Immich's PostgreSQL database**, which it reads directly. Every page needs
  it, the sign-in page included.

The [Immich](../immich) application in this repository keeps its database to
itself until a **read-only database password** is set in its options. Other
applications can then read it as the user `reader`, and none can change it.

## Installation

1. In the Immich application's configuration, set **Read-only database
   password** to a long, random password, and restart Immich.
2. Install the "Immich Power Tools" application.
3. In its configuration, set **Database password** to the same password. The
   other settings already reach the Immich application.
4. Set **Immich URL for your browser** to the address you open Immich at, such
   as `http://homeassistant.local:2283`.
5. Start it, open the web interface on port `3000`, and sign in with your Immich
   account.

For an Immich somewhere else, point the Immich URL and the database settings at
it. A database user that can read Immich's tables is enough.

## Signing in

Power Tools signs you in with an Immich account, by email and password, and
works as that account. Each person sees their own library.

**An Immich API key replaces the sign-in.** With one set, anyone who can open
port `3000` works as the key's owner, without a password. Keep the port on your
own network when you set one. Give the key every permission when you create it
in Immich, under Account Settings → API Keys, because Power Tools uses most of
them.

An account that signs in to Immich only through OAuth, such as through
Authentik, has no password to give Power Tools. An API key of its own is that
account's way in.

## Configuration

| Option                       | What it sets                                    |
| ---------------------------- | ----------------------------------------------- |
| Immich URL                   | Where Power Tools reaches Immich                |
| Immich URL for your browser  | Where links from Power Tools open Immich        |
| Immich API key               | Skips the sign-in; see above                    |
| Database host, port and name | Where Immich's database answers                 |
| Database user and password   | Who Power Tools reads the database as           |
| Power Tools URL              | The address share links are made from           |
| AI API URL, model and key    | The model Find turns a search into filters with |

The Immich URL and the database settings default to the Immich application in
this repository, when the repository was added by the address in the README.
`2dd33fbd` is Home Assistant's name for the repository then.

### Share links

Power Tools can share a filtered view of your library as a link. It makes none
until **Power Tools URL** is set to the address people open it at, such as
`http://homeassistant.local:3000`. The links are signed with a secret made on
the first start and kept in `/data`, so a link keeps working across restarts and
updates.

### Find

Find searches your library in plain language, such as "videos of Alice from last
summer". It asks a language model to turn the search into filters, and stays off
until **AI model** and **AI API key** are set.

**AI API URL** takes any OpenAI-compatible API, and is OpenAI's own when left
empty. For a model you run yourself, such as one in Ollama, give its address,
for example `http://192.168.1.10:11434/v1`, and any text as the key.

Find sends the model what you type and today's date, and nothing from your
library.

## Ports

| Port   | Serves            |
| ------ | ----------------- |
| `3000` | The web interface |

Two applications cannot publish the same port, and Home Assistant reports the
conflict only when the second one starts. If `3000` is already taken, change the
one Power Tools is published on under its **Network** settings.

## Storage

| Path                      | Holds                                            |
| ------------------------- | ------------------------------------------------ |
| `/data/app.db`            | Power Tools' workflows, import jobs and settings |
| `/data/share-link-secret` | The secret share links are signed with           |

Your photos and Immich's database stay with Immich. Power Tools keeps no copy of
either.

## Backups

Backups are taken cold, so Home Assistant stops Power Tools for the duration.
Its own settings are in SQLite, and copying a database that is being written to
can produce a backup that will not restore.

## Updates

Updates arrive by updating this application. Power Tools reads Immich's tables
directly, so a release can need a newer Immich, or stop working with an older
one. Read its release notes before updating either.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Immich Power Tools itself rather than this packaging, see
[its own repository](https://github.com/immich-power-tools/immich-power-tools).

## Credits

This packaging starts from the image Immich Power Tools publishes, and adds
s6-overlay and bashio by hand, as the Byparr application here does.
[alexbelgium/hassio-addons](https://github.com/alexbelgium/hassio-addons/tree/master/immich_power_tools)
packages Power Tools too, under the MIT licence, and was read for its options.

Immich Power Tools is developed by [Varun Raj](https://github.com/varun-raj) and
its contributors, and is licensed under the GNU Affero General Public License
v3.0. The icon is its own, and the logo is built from it.
