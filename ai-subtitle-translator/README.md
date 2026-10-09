# Home Assistant Application: AI Subtitle Translator

Translates subtitles through AI models on OpenRouter, for Bazarr+.

Bazarr+ hands it a subtitle file, and it splits the file into batches, sends
them to the model you choose, retries what fails, and reports progress and cost
as it goes. A web interface for translating files by hand is there to turn on.

![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]

See [DOCS.md](./DOCS.md) for installation and usage.

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg
[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg
