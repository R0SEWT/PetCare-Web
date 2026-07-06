# Decision Record: Classification vs. Detection

Status: Decided (v0.1) · Owner: ML Lead · Date: 2026-07-06

## Decision

**The triage model is an image classifier, not an object detector.** It consumes
one pet-skin photo and returns a calibrated probability over the canonical
condition set (`labels.json`) plus top-k. It does **not** return bounding boxes.

This retires the `yolov8` naming inherited from the frontend mock
(`src/lib/mock-data.ts`, `dashboard.new-analysis.tsx`), which promised a
detection model the contract never exposed. Model name going forward:
`petcare-derm-classifier`.

## Why

| Criterion | Classification | Detection (YOLO) |
| --- | --- | --- |
| Matches contract output (`prediction` = condition + confidence + top-k, no bbox) | ✅ exact | ❌ requires a new bbox field |
| Labeling cost | ✅ image-level label | ❌ per-lesion boxes — ~3–5× effort, needs expert annotators |
| Data availability (public vet-derm sets) | ✅ image-level is what exists | ❌ boxed vet-derm data is scarce |
| Calibration (confidence drives urgency policy) | ✅ well-understood (temp scaling, ECE) | ⚠️ box-score calibration is murkier |
| Portfolio credibility on a small dataset | ✅ honest baseline | ❌ box mAP collapses with few labels |
| Triage question actually asked | "what condition?" → classification | "where is the lesion?" → not required |

The product question is *which condition and how urgent*, not *where on the body*
(body region is already a user-supplied input field). Detection solves a problem
we don't have and taxes the two scarcest resources — labeled data and expert
annotation time.

## Consequences

- Baseline model = transfer-learned classifier (timm / ViT / MobileNet). See
  Task 5.
- The contract keeps `prediction.topK` with **no** `boundingBoxes`. No schema
  change needed.
- OOD / lesion-presence is handled by the **OOD + image-quality gates**, not by
  a detector finding "nothing."
- The mock's `model.name` is corrected to `petcare-derm-classifier` (Task 2).

## Revisit this decision only if

1. Product genuinely needs to **show users where** the lesion is (annotated
   overlay), **and**
2. We can fund **box-level labeling** by someone qualified, **and**
3. A localized display measurably improves triage trust or accuracy in testing.

Until all three hold, classification is the right and cheaper call. If revisited,
detection would be **additive** (a localization head alongside the classifier),
introduced behind a contract minor-version bump (adds an optional `regions`
field), not a replacement.
