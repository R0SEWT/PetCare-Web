# PetCare-Web Repository Audit

Date: 2026-07-06
Branch: `setup/project-kit-codex`
Role focus: ML Lead

## Scope

This audit records the current repository state after the Claude/Codex tooling setup. It separates general engineering debt from ML Lead ownership so follow-up work can stay focused.

## Verification Snapshot

- `npm run build`: passes.
- `npx tsc --noEmit`: fails.
- `npx eslint . --format json`: fails with 251 errors and 6 warnings.
- `npx prettier --check .`: fails across 32 files.
- `npm audit --omit=dev --json`: not applicable because the repo uses `bun.lock` without `package-lock.json`.

## Findings

### AUDIT-001 — High — Typecheck Is Broken

Evidence: `src/lib/api/example.functions.ts` uses `.inputValidator`, but the installed TanStack Start compiler expects `.validator`. `src/server.ts` imports `@tanstack/react-start/server-entry`, which is not exported by the installed package.

Risk: TypeScript cannot validate the project reliably, even though Vite build currently passes.

Recommendation: Fix TanStack Start server function usage, correct or remove the custom server entry import, and add a `typecheck` script.

Verification command: `npx tsc --noEmit`

### AUDIT-002 — High — Auth And Admin Routes Are Unprotected

Evidence: login/register navigate directly to `/dashboard` without credential validation. The admin route is linked globally and has no route guard.

Risk: Any visitor can access dashboard and admin views.

Recommendation: Add auth context, role-aware route guards, and real logout behavior.

Verification command: open `/dashboard/admin` without a session.

### AUDIT-003 — Medium — CI Does Not Enforce Type Or Lint Quality

Evidence: CI runs lint with `continue-on-error: true` and does not run typecheck.

Risk: regressions can merge while lint/type errors remain unresolved.

Recommendation: Fix baseline typecheck/formatting first, then make lint and typecheck blocking.

Verification command: `gh pr checks 1 --repo J3ffo3/PetCare-Web`

### AUDIT-004 — Medium — Analysis Flow Is Simulated

Evidence: `src/routes/dashboard.new-analysis.tsx` uses `Math.random()` for timeout/OOD states, hardcodes the predicted condition and confidence, and does not persist results to history.

Risk: The app presents model-like behavior without a real inference boundary, reproducibility, or audit trail.

Recommendation: Introduce a typed inference contract, upload endpoint, deterministic response handling, persisted triage records, and model metadata capture.

Verification command: upload an image, refresh the app, and confirm the result appears in history with stable metadata.

### AUDIT-005 — Medium — Dashboard Navigation Is Desktop-Only

Evidence: the dashboard sidebar is `hidden md:flex` and there is no mobile navigation replacement.

Risk: mobile users cannot move through dashboard views reliably.

Recommendation: add a bottom nav or sheet-based mobile navigation.

Verification command: open `/dashboard` below 768px viewport width.

### AUDIT-006 — Medium — Formatting Baseline Is Noisy

Evidence: Prettier and ESLint report formatting issues across application files and local Beads runtime artifacts are not ignored by Prettier.

Risk: future PRs will mix formatting churn with functional changes.

Recommendation: update `.prettierignore` for local artifacts and land one formatting-only PR.

Verification command: `npx prettier --check . && npm run lint`

### AUDIT-007 — Low — Local Tooling Differs From CI

Evidence: CI uses Bun 1.3.14, but local `bun` was not installed during audit. npm audit cannot run without an npm lockfile.

Risk: local verification can diverge from CI.

Recommendation: add `packageManager: "bun@1.3.14"` and document Bun installation in the repo guide.

Verification command: `bun --version && bun install --frozen-lockfile`

### AUDIT-008 — Low — Placeholder UX Controls Remain

Evidence: placeholder `href="#"` links exist in login/footer, and several dashboard buttons/toggles have no durable behavior.

Risk: users hit dead ends and accessibility is weak.

Recommendation: replace placeholders with routes, disabled states, or implemented actions; use accessible switch controls.

Verification command: keyboard-tab through login, landing footer, settings, and dashboard actions.

## ML Lead Scope

Primary ownership should be AUDIT-004. The ML contribution is not only “wire a model”; it should define the product-grade inference surface:

- Image upload contract: accepted MIME types, max size, metadata, pet ID, and consent flags.
- Inference response schema: condition labels, confidence, top-k predictions, urgency class, OOD flag, latency, model version, and calibration metadata.
- Failure taxonomy: invalid image, OOD, timeout, model unavailable, and low confidence.
- Persistence model: each triage should store original request metadata, model output, user-facing summary, and timestamp.
- Evaluation hooks: track false negatives, low-confidence cases, OOD rate, latency, and user/veterinarian feedback.
- Safety wording: preserve “triage, not diagnosis” language and make uncertainty visible.

## Recommended PR Order

1. `fix/typecheck-tanstack-start`
2. `style/format-codebase`
3. `ci/enforce-quality-gates`
4. `ml/design-inference-contract`
5. `ml/persist-triage-results`
6. `ml/add-model-evaluation-telemetry`
