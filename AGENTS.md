# Affinity Creative - Permanent Safety Rules

These repository rules override normal workflows.

## Read This First

Before changing anything, read:

1. `documentation/PROJECT-MEMORY.md`
2. `documentation/SAFE-EDITING-WORKFLOW.md`
3. The guide for the requested area, such as `documentation/IMAGE-GUIDE.md`

The editable project root is this folder, identified by its `package.json`,
`app/`, `content/`, `public/`, and `documentation/` directories. Do not work
from a wrapper task folder or from `.output/public`.

## Never Reset This Website

The current working website and its manually updated images, content, layouts,
and assignments are the source of truth. Some changes may not exist in older
source files.

Never regenerate, rebuild, recreate, reset, restore, scaffold, initialize, or
replace the current website unless the user explicitly authorizes the exact
high-risk command after reviewing its impact.

## Forbidden Commands And Actions

Do not run:

- `pnpm run generate`
- `npm run generate`
- `yarn generate`
- `nuxt generate`
- Any full-site generator or static-output regeneration
- Any command that recreates `.output`
- Any command that replaces the current preview from older source
- Any bulk image replacement or image reassignment script
- Any cleanup that deletes manually added assets

Do not edit or replace:

- `.output`
- `dist`
- `.next`
- Generated HTML
- Generated JavaScript bundles
- Image mappings outside the requested category
- Unrelated pages, components, styles, assets, or configuration

The only exception is an explicitly authorized generation command. Generated
files must be recreated by the normal project command, never manually patched.

## Surgical Edits Only

For every request:

1. Identify the smallest file responsible.
2. Edit only that file or the minimum directly related files.
3. Do not modify unrelated code, images, pages, service categories, or styles.
4. Do not rebuild or regenerate the website.
5. Report the exact files changed.

## Required Response Before Editing

Before every edit, state:

- Requested change
- Files expected to change
- Files that will not be touched
- Commands planned
- Risk of overwriting existing work

Normal surgical edits must not include a full build or generator.

## Source Ownership

- Shared header: `app/components/navigation/SiteHeader.vue`
- Shared footer: `app/components/global/SiteFooter.vue`
- Shared service template: `app/components/pages/ServicePageTemplate.vue`
- Interactive process: `app/components/service/InteractiveProcessSection.vue`
- Project brief stack: `app/components/service/ProjectBriefStack.vue`
- Main service content: `app/data/multipageContent.ts`
- Embroidery and vinyl content: `app/data/priorityServicePages.ts`
- Business details and social links: `content/site.json`
- Public images and PHP endpoints: `public/`

Confirm the owning source file before editing. Do not use compiled HTML or
hashed JavaScript to locate ownership.

## High-Risk Commands

Before any build, generation, restore, migration, reset, or bulk operation:

1. Show the exact command.
2. Explain every file or folder it may change.
3. Explain whether it can overwrite images or current output.
4. Explain why it is necessary.
5. Create a new timestamped backup without overwriting an older backup.
6. Confirm the backup location.
7. Wait for explicit approval before proceeding.

Silence is never approval. If anything is unclear, stop and ask.

## Build Restriction

Even if the user says "build," first verify that editable source contains all
current images, assignments, and manual changes. Explain whether building could
overwrite the current working version and wait for confirmation.

Never run `pnpm run generate` unless the user explicitly writes:

“I authorize pnpm run generate and understand it may recreate the output.”

Without that exact authorization, the command is forbidden.

The exact authorization sentence, without smart quotes, is:

`I authorize pnpm run generate and understand it may recreate the output.`

## Deployment And Backups

- Editable-project backups belong in `outputs/` with a timestamped filename.
- WHC deployment archives contain only the contents of `.output/public/`.
- A WHC archive must have `index.html`, `.htaccess`, and `_nuxt/` at its root.
- Never place source folders, credentials, `.env` files, or dependencies in a
  deployment archive.
- Never overwrite an earlier backup.

## Current Baseline

The approved current source includes the reusable interactive process
storyboard and project brief stack on the service pages. The generated WHC
deployment was last refreshed on July 17, 2026 after explicit authorization.
Future agents must verify source freshness instead of assuming `.output` is
current.

## GitHub Desktop Publishing Process

When Brian asks to publish, push online, push the public site, update the GitHub
Desktop repo, or update the live/static website repository, do not guess what he
means. First identify whether the request is about source edits, refreshing the
built static site, publishing the already-built `.output/public/` folder, or all
of those steps.

Current intended public GitHub repository workflow:

1. The editable source project is the parent project folder, not `.output/public`.
2. The organized GitHub Desktop repository folder for the public Affinity site is
   `C:/Users/brian/Documents/GitHub/Affinity-website`.
3. The built static website source for that repository is `.output/public/`
   after an explicitly authorized generation refresh.
4. The deployable static folder must contain `index.html`, `.htaccess`, `_nuxt/`,
   route folders, `sitemap.xml`, and other public assets at the repository root.
5. Never manually patch generated HTML or hashed bundles to make a publishing
   change. Make source edits first, then refresh output only after Brian gives
   the exact required generation authorization sentence.
6. For the first GitHub Desktop publish, use the existing
   `Documents/GitHub/Affinity-website` folder as the repository root. Do not
   create a new folder inside `.output/public/`, and do not create a nested
   `Affinity-website/Affinity-website` folder.
7. In GitHub Desktop, use Add Local Repository and select
   `C:/Users/brian/Documents/GitHub/Affinity-website`. It should show
   `index.html`, `.htaccess`, `_nuxt/`, `images/`, route folders,
   `sitemap.xml`, and other public assets as changes ready to commit. Publish
   it as Public with a clear repository name such as `affinitycreative-ca-website`.
8. For future updates, make the requested source edits, preview them, request the
   required generation authorization if output must be refreshed, verify the
   refreshed `.output/public/`, copy the refreshed public files into
   `Documents/GitHub/Affinity-website`, then have Brian review the changed files
   in GitHub Desktop, commit with a plain summary, and push.
9. Never include `.env`, credentials, source folders, `node_modules`, or private
   notes in a deployment archive or public website repo unless Brian explicitly
   asks and the risk is explained.
10. If Brian asks for this workflow later, summarize these steps and continue from
   the current state instead of inventing a new deployment process.
