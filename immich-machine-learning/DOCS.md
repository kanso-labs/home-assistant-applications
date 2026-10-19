# Home Assistant Application: Immich Machine Learning

[Immich](https://immich.app/) backs up the photos and videos on your phones.
This application runs its machine learning: finding and recognising the faces in
your library, the smart search that finds a photo by what is in it, and reading
the text in photos.

It does nothing on its own. It is the other half of the Immich application,
which sends it the work.

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Immich Machine Learning" application, and start it.
3. Install the "Immich" application. Installing machine learning first means the
   server finds it on its own first start.

There is nothing to connect by hand. See How Immich reaches it below.

## Configuration

| Option    | What it sets                                                         |
| --------- | -------------------------------------------------------------------- |
| Log level | How much detail machine learning writes to its log. `log` by default |

Everything else, such as which models to use, is set from Immich's own settings,
under Administration → Settings → Machine Learning Settings.

Turn on **Watchdog** on the application's Info tab to have Home Assistant
restart machine learning when it stops answering, not only when it exits.
Immich's image asks for machine learning's `/ping` every 30 seconds, waits two
seconds for each answer, and counts three failures in a row as a hang. It is off
by default.

## How Immich reaches it

The Immich application looks for machine learning at its hostname inside Home
Assistant:

```
http://2dd33fbd-immich-machine-learning:3003
```

`2dd33fbd` is Home Assistant's name for this repository when it was added by the
address in the README. The name only resolves while this application is running.
Immich's Machine Learning Settings can point it somewhere else.

**The port is closed by default.** The Immich application reaches machine
learning by the name above and needs no port. Open it only for an Immich server
elsewhere on your network: in this application's **Configuration** tab, under
**Network**, set the port to `3003`, then point that server's Machine Learning
Settings at your Home Assistant machine's address, such as
`http://192.168.1.10:3003`. Two applications cannot publish the same port, and
Home Assistant reports the conflict only when the second one starts. Flight
Finder publishes `3003`, so with it installed, set another port, such as `3013`,
and use that in the address instead. Keep that server on the same Immich version
as this application, since Immich warns that a mismatch between the two can
cause bugs. Machine learning has no login, so open the port only on a network
you trust.

**Immich keeps working while this is stopped**, from uploads to browsing. Two
things are the exception:

- Searching by what is in a photo fails until this is running again.
- A face detection, smart search or text recognition job that runs while this is
  stopped fails once and is not retried, so photos uploaded in that time have no
  faces and are not found by smart search.

Once this is running again, go to Administration → Job Queues and run
**Missing** for Face Detection, Smart Search and OCR.

## The GPU

On amd64 this runs Immich's OpenVINO image, which runs the models on an Intel
GPU, integrated graphics included, and on the processor where there is none. On
aarch64 there is no OpenVINO image, and the models always run on the processor.

Every GPU under `/dev/dri` is offered to the container, whatever number it comes
up as. Nothing breaks when there is none.

**To see which one is used**, set the log level to `debug`, restart, and upload
a photo. The first request after a restart loads the models, and the log names
the device OpenVINO was given. The message is wrapped over several lines, and
starts like this:

```text
Setting execution provider options to
[{'device_type': 'GPU.0', …
```

`GPU.0` is the GPU. Without a GPU it can use, the message reads
`'device_type': 'CPU'` instead. The messages that name
`OpenVINOExecutionProvider` appear either way, so they do not tell the two
apart.

Set the log level back to `log` afterwards. At `debug` the log grows quickly.

## Storage

| Path          | Access     | Holds                                                    |
| ------------- | ---------- | -------------------------------------------------------- |
| `/data/cache` | read/write | The models, downloaded the first time each one is needed |

The first face detection or smart search after installing waits while its model
downloads, which can be several hundred megabytes. After that the models are
kept, across restarts and updates.

## Backups

Backups are taken hot, since machine learning keeps no database. The models in
`/data/cache` are left out, because they download again the first time each one
is needed. A restore is therefore small, and the first face detection or smart
search after one waits while its model downloads.

## Decisions

These were settled before this application was built, and are recorded here with
the reasons. The Immich application's documentation records the ones about its
database.

1. **Immich's own image, as its own application.** Every piece then comes from
   its own project, and an Immich release reaches you without waiting on anyone
   else's rebuild. Immich publishes the server and machine learning as two
   images, and they become two applications here rather than one image assembled
   from both.
2. **Reached by hostname.** Unlike the database, machine learning can afford to
   be another application's neighbour on Home Assistant's network: while it is
   unreachable the rest of Immich keeps working, and the machine learning jobs
   that failed in the meantime can be run again with **Missing** from Job
   Queues.
3. **Both architectures.** amd64 builds from Immich's `-openvino` image, for
   Intel GPUs. aarch64 builds from the plain image, which runs on the processor
   and is what can be built and started natively on an arm64 machine.

## Updates

Updates arrive by updating this application. A new Immich release reaches this
application and the Immich application in the same update, because Immich
expects the server and its machine learning to be the same version. Update both
together.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Immich itself rather than this packaging, see
[Immich's documentation](https://docs.immich.app/) or its
[repository](https://github.com/immich-app/immich).

## Credits

This packaging is new. It starts from Immich's own image and adds s6-overlay and
bashio by hand, as the Byparr application here does.
[alexbelgium](https://github.com/alexbelgium/hassio-addons/tree/master/immich_openvino)'s
Immich packaging, under the MIT licence, was read for its options and its
documentation.

Immich is developed by the [Immich](https://github.com/immich-app/immich)
project and is licensed under the GNU Affero General Public License v3.0. The
icon is Immich's own, from its repository, and the logo is built from it.
