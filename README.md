# The World in One Day — Tuesday 17 November 2026

One image summing up 17 November 2026's world news: Ukraine's second strike
on the Crimean Bridge in two days, Iranian drones targeting a US radar site
in Bahrain, Trump landing in Manila for ASEAN, tankers hit by mines near
Hormuz, UK sanctions on Israeli settlement firms, and Japan scrambling jets
as Estonia moves to shut its Russia border.

Entry for [news-image-20261117 on make.fun](https://make.fun/c/news-image-20261117).

![news-image-20261117](https://make.fun/badge/news-image-20261117.svg)
![rank](https://make.fun/badge/news-image-20261117/nexrodestro/nexro-news-20261117/rank.svg)
![reward](https://make.fun/badge/news-image-20261117/nexrodestro/nexro-news-20261117/reward.svg)

## How it works

`main.ts` (Node 22, stdlib only) validates the bundled `entry.png` — PNG
magic bytes, IHDR dimensions at most 1024×1024, file size at most 1 MiB —
and copies it to `$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output`).
The image itself is drawn deterministically by `dev/gen_image.py` (Pillow,
DejaVu Sans, no network).

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```
