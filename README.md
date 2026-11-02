# Robotic Data Inoculation

Buildless research project page for **Robotic Data Inoculation**, adapted from the Advantage Guidance website with the DI paper’s rose and sky-blue palette.

## Local preview

Run `python3 -m http.server 8000 --bind 127.0.0.1` from this directory and open <http://127.0.0.1:8000>.

The content and figures come from `/home/paulzhou/papers/di_paper`. The Paper button links to [the paper on arXiv](https://arxiv.org/abs/2610.39054). Page fonts load from Google Fonts with local sans-serif fallbacks; the algorithm text uses locally bundled TeX Gyre Termes. KaTeX renders `$...$` inline math and `$$...$$` display equations, using the same auto-render setup as Advantage Guidance. All figures, styles, scripts, and math fonts are served locally.

Each task has a failure carousel with previous/next buttons and an example counter. The buttons wrap through all available slides; there is no fixed example limit. Add a `.failure-slide` with its video and caption to extend a carousel, and update its accessible slide labels and initial counter. Only the three demonstrations and the three selected failures autoplay muted. Each video plays, pauses, and loops independently. Changing a failure selection starts only the newly selected clip from zero; hidden clips stay paused and the other videos continue uninterrupted.

All task videos play at 2× speed in the browser, with a floating speed label in the upper-right corner. Source assets retain their original playback speed. Each clip loops at its own pace, and carousel selections start at 2× speed.

T-Cube carousel order is asset 2, original failure, asset 4, asset 3; filenames retain their original identifiers.

Keycap carousel order is asset 4, original failure, asset 2, asset 3, asset 5, asset 6. Assets 4–6 have their first four seconds trimmed; filenames retain their original identifiers.

## Assets

- `static/figures/overview.webp`: the paper’s `Data_Inoculation.pdf`, rasterized for the web.
- The algorithm is HTML with LaTeX equations transcribed from the paper. Its two loops stack on small screens, and equations use line breaks and fit their available width rather than scrolling.
- `static/vendor/katex/`: KaTeX 0.16.9, its auto-render extension, fonts, and MIT license.
- `static/fonts/`: algorithm fonts and their GUST Font License, author credits, and source manifests.
- `static/figures/success-rates.svg` and `collection.svg`: vector exports of the corresponding paper plots.
- `static/figures/corrections-chart.svg`: the vector chart from the paper’s `recovery_correction_phase_distribution_styled_images_below.pdf`, with the embedded stills removed and the viewBox shortened to the chart. The original combined figure remains in `corrections.webp`.
- `static/videos/correction-phases/`: five independently looping third-person clips from `task1/evals/tb-ours-bfn-s2-14.mov` in the supplied Dropbox source folder, using its 720p preview. Visually selected source windows: approach 25.8–27.3 s, grasp 27.3–28.8 s, transport 28.8–31.6 s, place/release 31.6–36.2 s, retreat 38.7–40.1 s. These show the descent, a brief close/lift, transport, full release, and retreat; human resets and the idle pause before retreat are excluded. This is a different episode from the original wrist-camera example, used only to illustrate the phases; the chart and its analytical definitions are unchanged. Each clip uses a 720×720 crop resized to 480×480 (crop x offsets 100, 100, 220, 380, 380; y=0), H.264/yuv420p at 30 fps, faststart, and no audio. Poster timestamps are 26.7, 28.4, 30.2, 35.9, and 39.8 s. Playback stays at 1×, starts near the viewport, and pauses offscreen or in a hidden tab. Reduced-motion visitors start with still posters and native video controls; native controls also appear if the browser blocks autoplay. All screen sizes retain five aligned columns and the original figure’s chart-to-image proportions.
- `static/videos/`: third-person task demonstrations and failure examples, with matching poster frames. All clips use clean footage without camera insets or burned-in text.
- Task images: optimized copies of the paper’s robot trajectory images, retained in `static/figures/`.
- T-Cube and Cable clips use the 720p previews of the original recordings in the updated [source folder](https://www.dropbox.com/scl/fo/9rnyr2ggjox549ulw9kgd/ADiDrmuAz9oZUxnXWo4QI8g?rlkey=cfnyaqz4p66nogwfvsx7rknuv&dl=0), exported at 30 fps with original playback speed and no audio or overlays. T-Cube: `task1/evals/tb-ours-bfn-s2-14.mov`, demonstration 25–39 s, failure 0–21 s. Cable: `task2/evals/cable-ours-bfn-s4-11.mov`, demonstration 35–55.5 s, failure 0–30.5 s. Outcomes were checked visually; clips end before the manual resets.
- Keycap failure: approximately 6:29.8–7:00.4 of `Video Aug 23 2026, 5 12 46 PM.mov` from the supplied [Keycap recordings](https://www.dropbox.com/scl/fo/6al78ic1xcrz4xoprx43t/AFW6ZKqIlN8bGU2dWaJKF6I?rlkey=4y21irx952iuwo4yeskh85a36&dl=0), exported from its 720p preview at 30 fps. Visually verified: the robot lifts away with an empty puller and releases it onto the table. The clip includes the release and ends before the manual reset. This source has no success/failure or policy label, so no policy attribution is made.

- Keycap demonstration: approximately 2:44.1–3:07.3 of `Video Aug 23 2026, 4 40 46 PM.mov` from the same Keycap recordings, exported from its 720p preview at 30 fps with original playback speed and no audio. The clip includes the stable placement and release of the puller with the extracted keycap onto the table, ending before the manual reset.

- Second failure examples: T-Cube uses 3:39.5–3:53.5 of `tb-ours-bfn-s2-14.mov`, showing both cubes toppling off the base. Keycap uses approximately 7:06.9–7:19.8 of `Video Aug 23 2026, 5 23 05 PM.mov`, showing the puller falling onto the keyboard. Cable uses approximately 5:30.3–5:36.9 of `cable-ours-bfn-s4-11.mov`, showing a missed pickup and the gripper lifting away empty. All three are exported at 720p / 30 fps at original speed; manual resets are excluded, and the Keycap clip starts after the hand leaves the frame.

- Third Keycap failure: approximately 8:21.8–8:39.0 of `Video Aug 23 2026, 5 23 05 PM.mov`, exported at 720p / 30 fps at original speed. The robot leaves the puller on the keys; the clip excludes the human hand and manual reset.

- Third T-Cube failure: 49.7–55.2 s of `task1/evals/tb-noise-bc-s2-11.mov` in the supplied source folder. The gripper closes off-center, nudges the cubes, and lifts away empty. This comes from the noise-BC recording (not the DI recording used for the existing T-Cube clips). Exported at 720p / 30 fps at original speed, excluding hands and resets.

- Keycap asset `keycap-failure-4.mp4` (first carousel example): approximately 3:12.6–3:24.6 of `Video Aug 23 2026, 5 34 04 PM.mov` from the supplied Keycap recordings (the episode around 3:12). The keycap pops off and falls away as the robot raises the puller. Exported at 720p / 30 fps at original speed with no audio; the clip keeps the outcome and excludes the human hand and reset.

- Keycap asset `keycap-failure-5.mp4` (fifth carousel example): approximately 2:43.3–3:08.9 of `Video Aug 23 2026, 5 51 58 PM.mov` from the supplied Keycap recordings (the episode around 2:43). The puller tilts sideways without removing the keycap. Exported at 720p / 30 fps at original speed with no audio; the clip keeps the extraction attempt and ends before the human hand enters for the reset.

- Keycap asset `keycap-failure-6.mp4` (sixth carousel example): approximately 6:08.3–6:20.8 of `Video Aug 23 2026, 5 51 58 PM.mov` from the supplied Keycap recordings (the episode around 6:09). The robot lifts the keycap, then drops the puller onto the keyboard. Exported at 720p / 30 fps at original speed with no audio; the clip keeps the extraction, drop, and landing and excludes the human hand and reset.

- Fourth T-Cube failure: 2.7–17.4 s of `task1/evals/tb-ours-bc-s2-10.mov` in the supplied source folder. The pink cube falls off the right side while the red cube remains balanced on the yellow base. This is a DI-BC recording. Exported at 720p / 30 fps at original speed with no audio, including pickup through retreat and excluding the manual reset. Selected after reviewing the baseline-BFN and DI-BC recordings for additional falling variations.

Template attribution is retained in the page footer (CC BY-SA 4.0). The scientific content and figures retain their original ownership.
