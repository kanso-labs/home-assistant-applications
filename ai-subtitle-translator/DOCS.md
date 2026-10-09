# Home Assistant Application: AI Subtitle Translator

[AI Subtitle Translator](https://github.com/LavX/ai-subtitle-translator)
translates subtitles through AI models on [OpenRouter](https://openrouter.ai/),
for [Bazarr+](../bazarr-plus). Bazarr+ hands it a subtitle file; it splits the
file into batches, sends them to the model you choose, retries what fails, and
reports progress and cost as it goes.

It is made by the author of Bazarr+, and Bazarr+'s **OpenRouter** translator is
built to talk to it.

## Before you install

**Translating costs money.** OpenRouter charges per request, by the model and
the amount of dialogue, and needs an API key from
[openrouter.ai/keys](https://openrouter.ai/keys). Upstream's README compares
models by quality and by what an episode, a film and a season cost.

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "AI Subtitle Translator" application, and start it. The first
   start generates an encryption key.
3. Read the key: it is the 64 characters in `encryption.key`, in this
   application's folder under `addon_configs`, which the Samba share and the
   Studio Code Server application both show.
4. In Bazarr+, under **Settings → Translator**, choose **OpenRouter** and set:

   | Field              | Value                                         |
   | ------------------ | --------------------------------------------- |
   | Service URL        | `http://2dd33fbd-ai-subtitle-translator:8765` |
   | OpenRouter API Key | Your key from OpenRouter                      |
   | Encryption Key     | The 64 characters from `encryption.key`       |

5. Choose a model, then use **Test** and save.

`2dd33fbd` is Home Assistant's name for this repository when it was added by the
address in the README. A Bazarr+ elsewhere reaches the translator at
`http://<address>:8765` instead.

### The encryption key

Bazarr+ labels the field optional, but this application needs it. Bazarr+
encrypts your OpenRouter key with it before sending, and signs every request
with a token derived from it; the translator refuses a request without that
token.

Keep the key as you would a password, and keep `encryption.key` where it is.
Deleting it makes the translator generate a new one on its next start, and
Bazarr+ then needs the new one.

## Configuration

| Option             | What it sets                                                           |
| ------------------ | ---------------------------------------------------------------------- |
| OpenRouter API key | A default key, for anything that calls the API without sending its own |
| Default model      | The model used when a request names none                               |
| Web interface      | Serves upstream's subtitle studio at `/ui/`                            |
| Log level          | How much the translator writes to the log                              |

Bazarr+ sends its own key and model with every request, so neither of the first
two is needed for it.

### The web interface

Turn on **Web interface** to translate `.srt` files by hand, at
`http://<address>:8765/ui/`. Each person enters their own OpenRouter key there,
and it never falls back to the default key, so turning it on lends nobody yours.
Subtitles and keys pass through it in plain HTTP, so use it on your own network.

## Ports

| Port   | Serves                                                        |
| ------ | ------------------------------------------------------------- |
| `8765` | The API, its interactive documentation, and the web interface |

Bazarr+ inside Home Assistant reaches the translator by its internal name, so
nothing needs the port published unless something outside Home Assistant calls
it. Two applications cannot publish the same port, and Home Assistant reports
the conflict only when the second one starts. If `8765` is taken, change it
under **Network**, or clear it there to publish none.

## Storage

| Path                             | Holds                                                  |
| -------------------------------- | ------------------------------------------------------ |
| `/data/jobs.db`                  | The job history, kept for 24 hours after each job ends |
| `addon_configs/…/encryption.key` | The key Bazarr+ shares                                 |

## Backups

Backups are taken cold, so Home Assistant stops the translator for the duration.
The job history is SQLite, and copying a database that is being written to can
produce a backup that will not restore. A job running when the backup starts is
started again from its beginning when the translator comes back.

## Updates

Updates arrive by updating this application. A job still running when it stops
for an update starts again from its beginning afterwards.

## Why this starts at 0.1.0

Most applications in this repository start at `1.0.0`. This one does not,
because it has only been run against a stand-in for Home Assistant, with an
OpenRouter key that does not exist. Its queue, database and authentication all
worked there, and OpenRouter answered, but it has not yet translated a subtitle
for Bazarr+.

It moves to `1.0.0` once it has done that without surprises.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about AI Subtitle Translator itself rather than this packaging,
see [its repository](https://github.com/LavX/ai-subtitle-translator).

## Credits

This packaging is new. It starts from the image AI Subtitle Translator
publishes, and adds s6-overlay and bashio by hand, as the Byparr application
here does.

AI Subtitle Translator is developed by [LavX](https://github.com/LavX), who also
develops Bazarr+, and is licensed under the MIT License. The icon and logo are
built from the mark in its web interface.
