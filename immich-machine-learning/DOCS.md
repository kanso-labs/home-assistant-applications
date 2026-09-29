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

## How Immich reaches it

The Immich application looks for machine learning at its hostname inside Home
Assistant:

```
http://2dd33fbd-immich-machine-learning:3003
```

`2dd33fbd` is Home Assistant's name for this repository when it was added by the
address in the README. The name only resolves while this application is running.
Immich's Machine Learning Settings can point it somewhere else.

**No port is published.** Nothing outside Home Assistant can reach machine
learning, and nothing needs to.

**Immich keeps working while this is stopped**, from uploads to browsing. Its
machine learning jobs are the exception. A face detection, smart search or text
recognition job that runs while this is stopped fails once and is not retried,
so photos uploaded in that time have no faces and are not found by smart search.

Once this is running again, go to Administration → Job Queues and run
**Missing** for Face Detection, Smart Search and OCR.

## The GPU

On amd64 this runs Immich's OpenVINO image, which runs the models on an Intel
GPU, integrated graphics included, and on the processor where there is none. On
aarch64 there is no OpenVINO image, and the models always run on the processor.

The render devices under `/dev/dri` are offered to the container, the same ones
the Plex Media Server application is given. Nothing breaks when they are absent.

**To see which one is used**, set the log level to `debug`, restart, and upload
a photo. The first request after a restart loads the models, and the log names
the device OpenVINO chose:

```text
OpenVINO: Using GPU device GPU.0
```

or, without a GPU it can use:

```text
OpenVINO: No GPU found, using CPU
```

Set the log level back to `log` afterwards. At `debug` the log grows quickly.

## Storage

| Path          | Holds                                                    |
| ------------- | -------------------------------------------------------- |
| `/data/cache` | The models, downloaded the first time each one is needed |

The first face detection or smart search after installing waits while its model
downloads, which can be several hundred megabytes. After that the models are
kept, across restarts and updates.

They are **left out of backups**, because they download again on their own.

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

## Why this starts at 0.1.0

Most applications in this repository start at `1.0.0`. This one does not,
because it has only been built and run against a stand-in for Home Assistant, on
aarch64, where there is no OpenVINO. It has not yet run its models on the Intel
GPU it is for.

It moves to `1.0.0` once it has done that without surprises.

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
icon and logo are Immich's own, from its repository.
