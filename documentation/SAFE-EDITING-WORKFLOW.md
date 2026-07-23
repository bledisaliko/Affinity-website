# Safe Editing Workflow

Use this checklist for every future change.

## Before Editing

Report:

- Requested change
- Files expected to change
- Files that will not be touched
- Commands planned
- Risk of overwriting existing work

Find the smallest source owner for the requested feature. Read nearby code and
reuse the existing component and design patterns.

## During Editing

1. Edit source files only.
2. Keep the change inside the requested page, component, content object, image
   assignment, or style block.
3. Do not reformat or refactor unrelated files.
4. Do not change image paths outside the requested item.
5. Do not edit `.output`, `.nuxt`, `dist`, generated HTML, or hashed bundles.
6. Do not run a generator to preview a normal source change.

## Safe Verification

Preferred checks:

- `pnpm run typecheck`
- Source development preview
- Browser checks at relevant desktop and mobile widths
- Console-error and horizontal-overflow checks

Type checking is not permission to generate the site.

## High-Risk Work

Generation requires this exact user sentence:

`I authorize pnpm run generate and understand it may recreate the output.`

Before an authorized generation:

1. Confirm source includes the current approved images and assignments.
2. Create a timestamped backup of the existing generated output.
3. Report the backup path.
4. Run only the approved command.
5. Verify all 17 routes and required PHP endpoints.

## Backup Types

### Editable project backup

Include source, content, public assets, configuration, documentation, scripts,
tests, and the current generated deployment. Exclude dependency folders,
caches, Git metadata, temporary work, reports, and earlier backup archives.

### WHC deployment ZIP

Include only the contents of `.output/public/`. The ZIP must not contain a
`.output/` or `public/` wrapper.

## After Editing

Report:

- Exact files changed
- What was verified
- What was intentionally not run
- Any residual risk

Never say a generated deployment is current unless its timestamps and rendered
content have been checked against the latest source.
