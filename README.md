# Maths lessons

A growing collection of mathematics lessons for Years 7–12, built with Quarto and published as a website. Students navigate from **course → topic → lesson**. Presentations combine explanations, booklet examples, interactive activities and timed hinge questions, with touch controls for classroom delivery on an iPad.

**[Open the teaching site](https://agreasley.github.io/maths-lessons/)**

## Courses

| Year level | Courses |
|---|---|
| Years 7–10 | Year 7, Year 8, Year 9 and Year 10 Mathematics |
| Year 11 | Mathematics Advanced; Mathematics Extension 1 |
| Year 12 | Mathematics Advanced; Mathematics Extension 1; Mathematics Extension 2 |

Each course lists its topics, and each topic has an ordered list of lessons. Courses without published topics show a coming-soon message.

## Repository structure

Teaching materials live together under their course and topic:

```text
courses/<course>/<topic>/lessons/lesson-1.qmd
```

| Location | Purpose |
|---|---|
| `index.qmd` | Homepage; discovers the course pages automatically |
| `courses/<course>/index.qmd` | Course page; discovers its topic pages automatically |
| `courses/<course>/<topic>/index.qmd` | Topic introduction, booklet context and lesson listing |
| `courses/<course>/<topic>/lessons/_metadata.yml` | Presentation settings shared by that topic's lessons |
| `courses/<course>/<topic>/lessons/lesson-N.qmd` | A lesson's metadata and ordered slide includes |
| `courses/<course>/<topic>/lessons/lesson-N/_*.qmd` | Individual slides, including any presenter notes |
| `courses/<course>/<topic>/TEACHER_GUIDE.md` | Optional topic-specific pacing, source notes and worked checks |
| `courses/<course>/<topic>/media/` | Optional folder for topic images, animations and other media |
| `assets/site.css` | Appearance of the homepage, course pages and topic pages |
| `assets/lesson.css` | Shared presentation styling and touch controls |
| `assets/lesson.js` | Shared interactive activities, datasets and presentation navigation |
| `assets/templates/` | Quarto templates for course, topic and lesson cards |
| `_site-page.yml` | Shared HTML settings for navigation pages |
| `_quarto.yml` | Website navigation, render patterns and project settings |
| `.github/workflows/publish.yml` | Manual GitHub Pages publishing workflow |
| `_site/` | Generated website; excluded from version control |

Use lowercase, hyphenated folder names, such as `year-12-mathematics-extension-2` and `vectors`. Folder names determine published URLs, so keep them stable once shared with students.

The `lessons/` subfolder keeps presentation settings separate from the topic's HTML page. Shared assets stay at the root; lesson content and topic notes stay with their topic.

## Edit and preview in VS Code

Install [Quarto](https://quarto.org/docs/get-started/) and its VS Code extension, clone this repository, then open the repository folder in VS Code.

From the terminal at the repository root:

```bash
quarto preview
```

To preview a single lesson, use its path, replacing the placeholders:

```bash
quarto preview courses/<course>/<topic>/lessons/lesson-1.qmd
```

Build the complete website with:

```bash
quarto render
```

Quarto writes the website to `_site/`. Edit the source files, rather than the generated HTML. The publishing workflow pins Quarto 1.10.18; using that version locally keeps builds consistent. The current site does not require R, Python, npm packages or API keys to render.

## Edit a lesson

Each lesson master contains its card information and an ordered list of slide includes:

````markdown
---
pagetitle: "Lesson 1 — Lesson name"
lesson-title: "Lesson name"
description: "A short description of what students will learn."
lesson-order: 1
booklet: "Section and example references"
homework: "Exercise reference"
---

{{< include lesson-1/_opening.qmd >}}

{{< include lesson-1/_example.qmd >}}

{{< include lesson-1/_homework.qmd >}}
````

Use `lesson-title` for the card and `pagetitle` for the browser title. The opening slide is authored in its own file.

- Edit an individual `_*.qmd` file to change a slide.
- Reorder the includes to change the slide sequence.
- Start each slide with `## Slide title`.
- Keep presentation YAML in the lesson master or `lessons/_metadata.yml`.
- Put presenter notes inside a `::: {.notes}` block on the relevant slide.

Relative media paths in included slides resolve from the **lesson master**, not the slide file. For example, an image in the topic's `media/` folder is referenced as `../media/diagram.svg` from a lesson master in `lessons/`.

If an example uses a shared interactive dataset, update its slide text and the corresponding dataset in `assets/lesson.js` together.

## Add a lesson, topic or course

### Add a lesson to a topic

1. Create `lessons/lesson-N.qmd` with the metadata shown above.
2. Create its `lessons/lesson-N/` folder and individual slide files.
3. Add the slide includes to the lesson master.
4. Update the topic introduction, displayed lesson count and homework summary if needed.

The topic's listing uses `contents: "lessons/lesson-*.qmd"` and sorts by `lesson-order`, so the new lesson card appears automatically after rendering.

### Add a topic to a course

1. Create `courses/<course>/<topic>/index.qmd`, using an existing topic page as a starting point. Update the title, description, `topic-order`, introduction and breadcrumbs.
2. Keep `metadata-files: [../../../_site-page.yml]` and the shared lesson-card template. Set the listing to `contents: "lessons/lesson-*.qmd"`.
3. Create `lessons/` and copy an existing topic's `lessons/_metadata.yml` into it. At this standard folder depth, the shared asset paths and `../index.html` return link already work.
4. Add lesson masters and slides as above. Add `TEACHER_GUIDE.md` and `media/` when needed.
5. Set `availability: available` in the course's `index.qmd` when its first topic is ready.

The course discovers new topic index pages automatically and sorts them by `topic-order`.

### Add a course

Create `courses/<course>/index.qmd` using an existing course page as a starting point. Update the title, breadcrumbs, `course-year`, `course-name`, `course-group`, `course-order` and `availability` metadata.

The homepage automatically discovers course pages. Its display groups are `Years 7–10`, `Year 11` and `Year 12`; these are defined in `assets/templates/courses.ejs.md`.

The project render patterns cover course/topic index pages and `lesson-*.qmd` masters under `courses/`. New content following these conventions does not need an entry added to `_quarto.yml`.

If copying an existing lesson as a starting point, remove its `aliases` entry: those redirects belong to the original lesson.

## Present in class

Open a lesson in Safari on the iPad, preferably in landscape orientation. Use **Previous**, **Next**, **Slide map** and **Topic lessons**. Swipe navigation is disabled so interactive controls remain comfortable to use.

On a computer, press **S** for presenter notes. Where included, hinge questions offer a selectable timer and separate answer reveal; moving away from the slide pauses the timer. Answer choices are classroom presentation controls, not a student-response collection system.

Lessons can accompany printed booklets, with worked examples completed in OneNote. Embedded external applets and linked resources may require internet access. The current presentations embed their local assets and mathematics; keeping the complete `_site/` folder preserves the site structure for offline use on a computer. For iPad delivery, use the hosted site in Safari.

## Publish updates

Publishing is manual: committing changes to `main` does not update the live website by itself.

1. Preview or render the site and check the changed pages.
2. Commit and push the source changes to GitHub.
3. Open **[Actions → Publish Quarto lessons](https://github.com/agreasley/maths-lessons/actions/workflows/publish.yml)**.
4. Select **Run workflow → main → Run workflow**.
5. Wait for the successful run, then refresh the teaching site.

For a new repository, first select **Settings → Pages → Source: GitHub Actions**. The workflow renders the project, uploads `_site/` and deploys it to GitHub Pages.

## Portability and existing links

The content is stored in plain-text Quarto, HTML, CSS and JavaScript files. Clone or download the repository to keep a copy independent of a school account. The site can be rebuilt with Quarto and served by another static website host.

When moving a published lesson, retain its old URL in the new master file's `aliases` metadata. Quarto generates a redirect during rendering. The migrated Probability and Data lessons include these aliases, so their previously shared URLs continue to work without keeping duplicate source files.

Documentation: [Quarto includes](https://quarto.org/docs/authoring/includes.html), [listings](https://quarto.org/docs/websites/website-listings.html), [redirects](https://quarto.org/docs/websites/website-navigation.html#redirects), [GitHub Pages publishing](https://quarto.org/docs/publishing/github-pages.html).
