# SpurAudio: A Benchmark for Studying Shortcut Learning in Few-Shot Audio Classification

Project page for SpurAudio (Preprint, 2026).

- **Website:** https://jerryaa98.github.io/SpurAudio_website/
- **Paper:** https://arxiv.org/abs/2605.13672
- **Code:** https://github.com/Jerryaa98/SpurAudio
- **Dataset:** https://huggingface.co/datasets/spuraudioNips/SpurAudio-neurips-anonym

## About this repository

It is a static site: no build step, no dependencies. Fonts load from Google Fonts; everything else is local.

## Preview locally

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly from disk also works.

## Publish on GitHub Pages

1. In the repository settings, open **Pages** and deploy from the `main` branch, root folder.
2. The `.nojekyll` file is already here, so the folder is served as is.

The `og:url` and `og:image` tags in `index.html` use absolute URLs under `https://jerryaa98.github.io/SpurAudio_website/`,
because link previews do not resolve relative paths. Update them if the repository is renamed.

## Layout

```
index.html              all text and structure
assets/css/style.css    styles (colours are CSS variables at the top)
assets/js/app.js        animations and interactive figures
assets/js/data.js       result tables, generated from the paper's LaTeX source
assets/js/clips.js      list of the audio clips used on the page
assets/audio/           16 real clips from the SpurAudio test split (16 kHz mono WAV)
assets/img/spec/        their 128-band log-mel spectrograms
assets/img/             favicon, social card
assets/img/team/        author photos (from each author's site, cropped, metadata stripped)
tools/                  scripts that generated data.js and the audio/spectrogram assets
```

## Common edits

| To change | Edit |
|---|---|
| Paper / code / dataset links | search `index.html` for `arxiv.org`, `github.com/Jerryaa98/SpurAudio`, `huggingface.co` (nav, hero, footer) |
| Authors, affiliations, personal sites | the author cards (`.au-cards`) in the hero of `index.html`; photos are `assets/img/team/*.webp` (240 × 240) |
| Venue line (for example after acceptance) | the `.venue` paragraph in the hero |
| BibTeX | the `#bib` block in `index.html` |
| Numbers in the charts | regenerate `assets/js/data.js` (below); the headline tiles and inline figures are computed from it |

## Regenerating the data

`assets/js/data.js` is parsed from the LaTeX source of the paper, so the charts cannot drift from the tables:

```bash
# unpack the arXiv source (https://arxiv.org/e-print/2605.13672) into ./paper_src first
python tools/parse_tables.py ./paper_src assets/js/data.js
```

The script prints a consistency report. For arXiv v1 it flags two rows where the printed Δ does not equal
IID − OOD; the site shows Δ exactly as printed:

- Conv-64F, ADM, 5-shot: 81.80 − 69.36 = 12.44, printed 12.65
- ResNet-12, Proto-LP, 1-shot: 49.50 − 49.30 = 0.20, printed 2.00

The audio clips and spectrogram images come from the test split of the Hugging Face dataset:

```bash
# <clips_dir> holds one folder per class, as in test/audio/ of the dataset
python tools/build_assets.py <clips_dir> assets
```

It resamples each clip to 16 kHz, peak-normalises it, and renders a log-mel spectrogram
(1024-point STFT, 128 mel bands) in the site's colour ramp. The clip list is at the top of the script.

## Notes

- The hero and the "what the model hears" lanes are illustrations drawn in code. Every chart is real data from the paper,
  and every audio clip and spectrogram is a real SpurAudio test clip.
- The feature-space sketch in the protocol section is a two-dimensional schematic of the mechanism measured in Appendix H.
- Animations respect `prefers-reduced-motion`, and all text is readable with JavaScript disabled.
