# Robotic Data Inoculation

Buildless research project page for **Robotic Data Inoculation**, adapted from the Advantage Guidance website with the DI paper’s rose and sky-blue palette.

## Local preview

Run `python3 -m http.server 8000 --bind 127.0.0.1` from this directory and open <http://127.0.0.1:8000>.

The content and figures come from `/home/paulzhou/papers/di_paper`. The Paper button links to [the paper on arXiv](https://arxiv.org/abs/2610.39054). Page fonts load from Google Fonts with local sans-serif fallbacks; the algorithm text uses locally bundled TeX Gyre Termes. KaTeX renders `$...$` inline math and `$$...$$` display equations, using the same auto-render setup as Advantage Guidance. All figures, styles, scripts, and math fonts are served locally.

## Assets

- `static/figures/overview.webp`: the paper’s `Data_Inoculation.pdf`, rasterized for the web.
- The algorithm is HTML with LaTeX equations transcribed from the paper. Its two loops stack on small screens, and equations use line breaks and fit their available width rather than scrolling.
- `static/vendor/katex/`: KaTeX 0.16.9, its auto-render extension, fonts, and MIT license.
- `static/fonts/`: algorithm fonts and their GUST Font License, author credits, and source manifests.
- `static/figures/success-rates.svg` and `collection.svg`: vector exports of the corresponding paper plots.
- `static/figures/corrections.webp`: the paper’s correction-phase analysis.
- `static/videos/`: third-person task demonstration videos for T-Cube, Cable, and Keycap, with matching poster frames. Videos use the left 1280 × 720 view from the supplied composite clips, preserving their original timing.
- Task images: optimized copies of the paper’s robot trajectory images, retained in `static/figures/`.

Template attribution is retained in the page footer (CC BY-SA 4.0). The scientific content and figures retain their original ownership.
