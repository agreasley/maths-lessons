# maths-lessons

A collection of Year 7–12 Mathematics Lessons.

The first unit contains **three Quarto presentations for Section 3 (Data)** of `11MAX - Probability and Data.pdf`, aligned with its three homework blocks.

| Lesson | Booklet | Examples | Homework |
|---|---|---|---|
| 1. Random variables | Section 3.1, pp. 35–37 | 3.1–3.3 | Cambridge 15A |
| 2. Organising and displaying data | Sections 3.2–3.3, pp. 38–47 | 3.4–3.11 | Cambridge 15B |
| 3. Grouping and estimating probability | Sections 3.4–3.5, pp. 48–51 | 3.12–3.14 | Cambridge 15C |

## Edit and preview in VS Code

Install Quarto and the VS Code Quarto extension. Clone this repository, open the folder in VS Code and run the following in its terminal:

```bash
quarto preview
```

To preview just one lesson:

```bash
quarto preview year-11/probability-data/lesson-1.qmd
```

Render the complete site with:

```bash
quarto render
```

The result is written to `_site/`. Open `_site/index.html` on your computer or use the local preview URL. Quarto 1.10.18 was used for the initial render. No R, Python, npm packages or API keys are required to render or run these lessons.

## Separate slide files

| Location | What to edit |
|---|---|
| `index.qmd` | Course homepage and lesson links |
| `year-11/probability-data/lesson-1.qmd` | Lesson 1 slide order |
| `year-11/probability-data/lesson-1/_example-3-1.qmd` | One slide's content and presenter notes |
| `year-11/probability-data/lesson-2/` and `lesson-3/` | The other individual slides |
| `year-11/probability-data/_metadata.yml` | Shared presentation settings |
| `assets/lesson.css` | Colours, typography, layout and touch controls |
| `assets/lesson.js` | Reusable interactions and their datasets |
| `TEACHER_GUIDE.md` | Lesson pacing, mathematical notes and answer checks |

Each master lesson file is an ordered list of includes:

```markdown
{{< include lesson-1/_define-the-variable.qmd >}}

{{< include lesson-1/_two-types.qmd >}}
```

Reorder these lines to change the sequence. Name a new slide `_meaningful-name.qmd`, start it with `## Slide title`, then add its include to the lesson file. The leading underscore keeps the slide from being rendered on its own. Keep YAML presentation settings in the master file or `_metadata.yml`, not inside each included slide. Images and other relative references in included slides resolve from the master lesson file's folder.

The existing SVG charts are generated from `datasets` in `assets/lesson.js`. If you change a numerical example, update both its slide text and its shared dataset.

## Presenting

- Open the published lesson in Safari on your iPad, in landscape orientation.
- Use the large **Previous**, **Next** and **Slide map** controls. Swipe navigation is disabled so controls can be used comfortably.
- On a computer, press **S** for presenter notes. Notes include worked answers, misconceptions and teaching prompts.
- Hinge questions have selectable 30–120 second timers, Start/Pause/Resume, Reset and a separate Reveal answer button. Leaving the slide pauses its timer. Selecting an answer represents the teacher's choice; this is not an online student-response collection system.
- Table columns and example graphs can be revealed after the class has attempted them. Most worked calculations remain in OneNote/the booklet.
- The simulation, tables and graphs make no network requests. The optional Google Sheets link from Example 3.4 needs internet access.
- Each rendered lesson HTML embeds its own presentation assets and mathematics. Keep the complete `_site/` folder for the homepage and links between files to work offline on a computer. iPad Files previews may not run HTML presentations; use Safari with the hosted site.

## Publish to GitHub Pages

The repository's visibility is unchanged. No Pages website is enabled by adding these files.

1. In GitHub, open **Settings → Pages** and choose **GitHub Actions** as the source. A private repository needs a GitHub plan that supports Pages from private repositories; ordinary Pages websites are public even when their source is private.
2. Open **Actions → Publish Quarto lessons → Run workflow**, select `main`, then run it.
3. After the workflow succeeds, use the URL shown under Settings → Pages. For this project the usual address is `https://agreasley.github.io/maths-lessons/`.

The workflow is initially **manual**, so committing changes does not publish them automatically. It renders Quarto, uploads `_site/`, and deploys it using GitHub Pages. Run it again whenever you want the published site updated.

For automatic publication later, add a push trigger to `.github/workflows/publish.yml`:

```yaml
on:
  workflow_dispatch:
  push:
    branches: [main]
```

If your connection does not allow workflow files, the remaining project can still be published locally using Quarto's `quarto publish gh-pages` command after completing that method's setup. Use one publishing method consistently.

Official instructions: [Quarto includes](https://quarto.org/docs/authoring/includes.html), [Quarto GitHub publishing](https://quarto.org/docs/publishing/github-pages.html), [GitHub custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
