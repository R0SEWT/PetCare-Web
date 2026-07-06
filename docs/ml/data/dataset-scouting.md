# Dataset Scouting — HF Hub survey (2026-07-06)

Owner: ML Lead · Task: `ll2` · Scope: 5 canonical conditions + `unknown`, dog/cat.

## Headline finding

**There is no off-the-shelf labeled canine/feline dermatology-condition image
dataset on the Hugging Face Hub, and no existing pet-derm model.** Every image
dataset returned for "skin disease" / "dermatology" is **human** dermatology;
every "veterinary" dataset is text/QA/tabular. This confirms the plan's risk #2
(data scarcity): **the gold eval set must be built, not downloaded.**

## What the Hub *does* offer (and how we reuse it)

| Use | Candidates | License | Notes |
| --- | --- | --- | --- |
| **OOD negatives / "is-this-pet-skin" gate** | `microsoft/cats_vs_dogs`, `Voxel51/Stanford-Dogs-Imbalanced`, `Bingsu/Cat_and_Dog`, `sasha/dog-food` | mixed (cc0 / unknown) | Healthy whole-animal + hard non-skin negatives. Strong for the OOD gate, useless as condition labels. |
| **Transfer-learning pretrain (human derm domain)** | `HawkFranklin-Research/SCIN-Dermatology-Raw-Images` (6,517 imgs), `Digital-Dermatology/CleanPatrick` (Fitzpatrick17k-based) | MIT / **CC-BY-NC-4.0** | Human skin. Domain-adjacent texture/lesion features for backbone warm-up only. CleanPatrick is **non-commercial** — fine for portfolio/learning, not for a commercial product. |
| **Human OOD examples** | same as above | — | Human skin is a useful "confidently-not-a-pet" OOD probe. |

Links:
- https://hf.co/datasets/HawkFranklin-Research/SCIN-Dermatology-Raw-Images
- https://hf.co/datasets/Digital-Dermatology/CleanPatrick
- https://hf.co/datasets/microsoft/cats_vs_dogs
- https://hf.co/datasets/Voxel51/Stanford-Dogs-Imbalanced

## Verdict

1. **Condition labels come from a purpose-built collection**, not the Hub. Primary
   source: a vet-clinic partnership (real, consented photos with vet-confirmed
   labels). Secondary: licensed teaching atlases / curated web images, each
   vet-confirmed before entering the gold set. See `gold-eval-set.md`.
2. **Reuse the Hub for the OOD gate and pretraining only.** Pull healthy pet
   images as OOD negatives and (optionally) warm-start the backbone on human
   derm texture. Never let human/healthy images carry one of the 5 condition
   labels.
3. **This scarcity is the project's moat.** A small, vet-verified pet-derm eval
   set is a genuinely scarce asset and the portfolio centerpiece — lean into it.

## Next searches worth doing (not yet done)

- Kaggle / Zenodo / figshare for "canine dermatology" image sets (outside HF).
- Google Scholar / HF Papers for veterinary derm CV papers that release data.
- Direct outreach to a vet school for a labeled teaching set.
