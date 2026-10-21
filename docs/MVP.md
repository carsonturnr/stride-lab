# Stride Lab — MVP Spec

October 2026

## Overview

Stride Lab is AI running-form analysis from any phone video: upload footage from treadmill runs, workouts or races, and get a research-backed breakdown of injury risk, efficiency and symmetry, including exactly where your form breaks down when you're tired. Target: launched by the week of Jan 18, 2027, in about 90 hours.

- **One-liner:** a motion-capture lab in your phone.
- **User:** individual runners, from serious amateurs to competitive athletes.
- **Primary goal:** a resume-grade applied-AI product: computer vision on real footage, multi-person tracking, a biomechanics engine, a grounded coach agent, evals.
- **Secondary goal:** a real paid product (free trial, then subscription), launched to a first group of 10–20 runners (teammates, friends, training partners).
- **Platform:** mobile-friendly web app for the MVP; native iOS is V2.

**Success criteria for the MVP**

1. A new user can sign up, follow onboarding, upload clips from any angle and get a report without help.
2. In race or group footage, the user taps themselves once and the app tracks them through the clip.
3. Metrics come from a research-backed set, each shown only when the camera angle supports it, with a confidence level.
4. The fatigue breakdown shows when and where form changes across a clip, workout or race.
5. Results are visual: overlay video, side-by-side comparisons and drift charts, not just text.
6. The coach agent explains results and prescribes drills grounded in the measured numbers.
7. Stripe paywall with a free trial is live; evals are published; a demo video exists.

## Core user flow and onboarding

The flow is built around one idea: more footage gives better analysis, so uploading should feel effortless and filming guidance should be there for anyone who needs it.

1. **Sign up** with email or Google; start the free trial.
2. **Profile:** height (to scale measurements), typical weekly mileage, events, shoes, optional injury history and goals.
3. **Show the payoff first:** a sample report from a demo runner, so users see what they'll get before filming anything.
4. **Choose a path:**
   - *I have footage* → straight to upload (camera roll, any angle, multiple clips).
   - *I need to film* → a short filming guide (treadmill side and rear setup, slow-motion at 120/240 fps, race and workout tips).
5. **Upload:** drag-and-drop or phone camera roll, several clips at once; label each clip optionally (easy run, workout rep, race, early or late).
6. **Select yourself** in any clip with more than one runner: tap once, confirm the highlight.
7. **Processing:** progress screen with an estimate; email when the report is ready.
8. **Report:** visual results, ranked issues and the fatigue breakdown.
9. **Coach:** ask questions, get drills, re-test later to track change.

## MVP features

Ten features make up the MVP; the two flagships are race tracking and the fatigue breakdown, because form breaks down most under fatigue and in races.

1. **Accounts, profile and onboarding** — as in the user flow above; Supabase Auth.
2. **Filming guides** — optional, short, visual: treadmill side and rear placement, slow-motion settings, how to get usable race and workout footage.
3. **Seamless upload**
   - Multiple clips at once, any angle, from the phone camera roll or desktop.
   - Automatic camera-view detection (side, rear, front, diagonal, moving or panning camera).
   - Each metric is computed only from views where it's valid, with a confidence level.
4. **Race and group tracking (flagship)**
   - Detects every runner in the clip; the user taps themselves in one frame.
   - Tracks them through the clip, including when other runners pass in front.
   - Works on handheld and panning footage, with lower confidence on metrics that need a fixed camera.
5. **Pose and gait engine**
   - 2D pose estimation per frame, smoothing, and detection of foot contact and toe-off for every step.
   - Per-step measurements for the metric set below, averaged per clip segment.
6. **Research-backed metric set** — see the metric section; ranked injury risk first, then efficiency, then symmetry.
7. **Fatigue breakdown (flagship)**
   - Within a long clip: metrics tracked step by step, showing when they start to drift.
   - Across clips: early vs late reps of a workout, or early vs late in a race.
   - Output: which metrics break down first, by how much, at what point, and what to do about it.
8. **Visual report** — see the visualization section.
9. **Coach agent**
   - Chat plus drill prescriptions from a curated drill library.
   - Grounded in the measured numbers and a knowledge base built from the research behind the metric set.
   - Never diagnoses injuries; flags when to see a physio.
10. **Paywall** — Stripe; first full analysis free, then a monthly subscription.

Sessions are saved per user, with a simple list of past analyses; trend charts across sessions are V1.1.

## Metric set

The MVP measures 11 metrics in three tiers, chosen from published biomechanics research rather than guesswork. Pelvic drop leads because it shows the strongest association with common running injuries; cadence matters because raising it 5–10% measurably reduces knee and hip loading.

| Tier | Metric | Camera view | Why it matters |
| --- | --- | --- | --- |
| Injury risk | Contralateral pelvic drop | Rear | Strongest kinematic variable associated with common running injuries; each 1° increase linked to 80% higher odds of being in the injured group ([Bramah et al.](https://salford-repository.worktribe.com/output/1380218)) |
| Injury risk | Trunk forward lean at midstance | Side | Greater in injured runners ([Bramah et al.](https://salford-repository.worktribe.com/output/1380218)) |
| Injury risk | Knee angle at foot contact | Side | A more extended knee at contact is associated with injury ([Bramah et al.](https://salford-repository.worktribe.com/output/1380218)) |
| Injury risk | Overstride (foot ahead of hip at contact, shank angle) | Side | Lower step rate (overstriding) raises knee and hip loading ([Heiderscheit et al.](https://uwnmbl.engr.wisc.edu/pubs/acsm10.pdf)) |
| Injury risk | Hip adduction / knee caving | Rear | Associated with injury and reduced by higher step rate ([Bramah thesis](https://salford-repository.worktribe.com/output/1351228/the-association-between-running-kinematics-and-common-overuse-injuries-in-runners-implications-for-injury-and-rehabilitation)) |
| Injury risk | Step width / crossover | Rear | Narrow base of gait is linked to IT band syndrome and tibial stress injury ([base-of-gait study](https://pmc.ncbi.nlm.nih.gov/articles/PMC7740069); [Wang et al. review](https://doaj.org/article/db40107cd0c440ceb6635455abdf9b23)) |
| Efficiency and load | Cadence (steps per minute) | Any | +5–10% reduces energy absorbed at the knee and hip ([Heiderscheit et al.](https://uwnmbl.engr.wisc.edu/pubs/acsm10.pdf)) |
| Efficiency and load | Vertical oscillation | Side, fixed camera | Falls as step rate rises; wasted vertical motion |
| Efficiency and load | Ground contact time | Side, 120+ fps | Rises reliably with fatigue ([fatigue meta-analysis](https://lida.sport-iat.de/ta/Record/4088323?lng=en)) |
| Efficiency and load | Step length | Side, needs scale | Shortens with fatigue ([fatigue meta-analysis](https://lida.sport-iat.de/ta/Record/4088323?lng=en)) |
| Descriptive | Foot strike type and ankle angle at contact | Side | A dorsiflexed ankle at contact is associated with injury; foot strike itself is reported, not scored as a risk |

**Symmetry** is computed for every bilateral metric (left vs right), so the same table yields asymmetry flags.

**How scoring works:** each metric is scored against two references: ranges from the literature, and the runner's own baseline (their easy-run clips). No custom model is trained; the research becomes a scoring rulebook, and the coach agent explains results from a knowledge base built on the same papers.

**What the research says about fatigue:** at the group level, fatigue reliably increases contact time and shortens steps, while most joint angles change little ([meta-analysis](https://lida.sport-iat.de/ta/Record/4088323?lng=en)). But individual responses vary widely, so reviews recommend analyzing fatigue per runner ([systematic review](https://research.utwente.nl/en/publications/effects-of-level-running-induced-fatigue-on-running-kinematics-a-/)). That's exactly what the fatigue breakdown does: it compares each runner to their own fresh baseline.

**Caveats:** most of these findings are associations from lab studies, not proof that a metric causes injury, so the app frames results as risk flags, not diagnoses. Exact threshold values get pulled from the full papers during the Stride Lab research task (week 7).

## Results and visualization

The report leads with pictures and puts numbers second: a runner should understand their top issue within 10 seconds of opening it.

1. **Summary card:** top 3 issues ranked by injury priority, each with a one-line plain-English explanation and a severity color.
2. **Overlay video player:** the runner's clip with the tracked skeleton drawn on top, key angles labeled live, slow-motion and frame-step controls, and markers at each foot contact.
3. **Key-frame cards:** foot contact, midstance and toe-off for left and right, with the measured angle drawn on the frame and the healthy range beside it.
4. **Side-by-side comparison:** fresh vs fatigued at the same point in the stride (or left vs right), synced frame by frame.
5. **Fatigue drift charts:** each metric plotted step by step across a clip or race, with the runner's baseline band and the point where it broke out marked.
6. **Metric table:** every metric with value, healthy range, personal baseline, symmetry and confidence, with a short explanation on tap.
7. **Fix plan:** the coach's top 2–3 cues and drills, linked to the issues they address.

Overlays are rendered in the browser on top of the original video (canvas over a video element), not burned into new video files, which keeps processing cheap and lets users toggle layers.

## Architecture and stack

The pipeline runs clip by clip: detect, track, measure, score, explain. It shares Mosaic's stack, so most infrastructure is reused.

1. **Upload** to Supabase Storage; a job is queued per clip.
2. **Person detection and tracking** (GPU worker): detect every person per frame, link them into tracks; the user's tap selects one track. Single-runner clips skip the tap.
3. **Pose estimation** on the selected track: 2D keypoints per frame, then smoothing to remove jitter.
4. **View classification:** side, rear, front, diagonal; fixed vs moving camera. Decides which metrics are valid.
5. **Gait events:** foot contact and toe-off for every step, from foot keypoint motion.
6. **Metrics engine** (Python): per-step metrics, segment averages, symmetry, baseline comparison, fatigue drift.
7. **Scoring rulebook:** research-based ranges and severity rules.
8. **Coach agent:** reads the structured results and the research knowledge base; prescribes drills from the library.
9. **Web app** draws overlays from stored keypoints on top of the original video.

| Layer | Choice | Why |
| --- | --- | --- |
| Frontend | React + Vite + Tailwind, on Vercel | Same as Mosaic |
| Database, auth, storage | Supabase | Same as Mosaic |
| GPU workers | Python on Modal | Pay per second of GPU; no idle cost |
| Person detection and tracking | YOLO-class detector + ByteTrack-style tracker | Open, fast, handles occlusion |
| Pose estimation | RTMPose (MediaPipe as fallback) | Open, accurate on running motion |
| Agent | Claude | Tool use and grounded explanations |
| Payments | Stripe Checkout + Billing | Free trial and subscription in hours, not days |
| Tracing and evals | Langfuse | Same as Mosaic |

Estimated running cost: $20–60/month at MVP scale (GPU seconds per clip are small).

## Evals and validation

Without a motion-capture lab, validation rests on hand-marked frames, repeat testing and planted cases; that's enough to publish honest accuracy numbers for the MVP.

| Eval | How it works | What it proves |
| --- | --- | --- |
| Angle accuracy | You hand-mark joint positions and angles on \~150 frames from your own and teammates' clips; compare to the app | Measured angles match an expert's marks |
| Gait event accuracy | Hand-mark foot contact and toe-off frames on 240 fps clips | Steps and contact times are detected correctly |
| Test-retest consistency | Same runner, same pace, several clips; compare results | Numbers are stable, not noise |
| Tracking accuracy | Race and group clips; check the selected runner stays locked on (identity switches per clip) | Race analysis follows the right person |
| Planted fatigue | Clips filmed fresh vs deliberately fatigued (e.g. end of a hard session) | The fatigue breakdown detects real change |
| Coach grounding | Every number the coach cites is checked against the results; advice checked against the drill library | The agent doesn't invent numbers |

**Footage to collect (during the Mosaic build):** treadmill side and rear clips at 240 fps of yourself and 3–5 teammates, easy and hard; a few race clips with multiple runners. This doubles as demo content.

## Out of scope (V1.1 backlog)

These are cut to launch in January; most build on data the MVP already stores.

- Trend charts across sessions (sessions are saved; charts come next)
- Body map visualization
- Native iOS app with guided in-app capture
- On-device pose estimation (Core ML)
- 3D pose and 3D joint angles
- Live treadmill feedback
- Strava and Garmin integration
- Coach accounts and multi-athlete dashboards
- Shoe and surface comparisons

## Hours, milestones and risks

The build totals about 91 hours, starting the week of Nov 30 after Mosaic ships and launching the week of Jan 18, 2027, with the Christmas weeks planned light. The week-by-week order lives in the combined build board.

| Workstream | Hours |
| --- | --- |
| Metric research and thresholds | 4 |
| Auth, profile, onboarding, filming guides | 7 |
| Upload flow and job queue | 5 |
| Detection, tracking, tap-to-select | 10 |
| Pose pipeline and smoothing | 6 |
| View classification and gait events | 8 |
| Metrics engine and scoring rulebook | 12 |
| Fatigue breakdown | 6 |
| Visual report | 14 |
| Coach agent and drill library | 6 |
| Paywall | 3 |
| Evals | 6 |
| Polish, launch, demo video | 4 |
| **Total** | **91** |

**Risks**

- **Race footage quality varies** (distance, panning, crowds): show confidence per metric and fall back gracefully; treadmill stays the gold-standard path.
- **Gait events are the hardest technical piece:** budget extra time there; 240 fps clips make it much easier.
- **2D angles depend on camera angle:** view detection plus per-view metric validity keeps numbers honest.
- **Medical-claim risk:** frame everything as performance and risk flags, never diagnosis; add a "see a physio" path for pain.

## Sources

- [Bramah et al. — kinematic patterns in injured vs healthy runners (University of Salford)](https://salford-repository.worktribe.com/output/1380218)
- [Bramah — PhD thesis on running kinematics and overuse injuries](https://salford-repository.worktribe.com/output/1351228/the-association-between-running-kinematics-and-common-overuse-injuries-in-runners-implications-for-injury-and-rehabilitation)
- [Heiderscheit et al. — effects of step rate manipulation on joint mechanics](https://uwnmbl.engr.wisc.edu/pubs/acsm10.pdf)
- [Lenhart et al. — increasing step rate reduces patellofemoral joint forces](https://uwnmbl.engr.wisc.edu/pubs/msse14_lenhart.pdf)
- [Factors influencing base of gait during running (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC7740069)
- [Wang et al. — biomechanical influence of step width: a systematic review](https://doaj.org/article/db40107cd0c440ceb6635455abdf9b23)
- [Running-induced fatigue on joint kinematics and kinetics: meta-analysis](https://lida.sport-iat.de/ta/Record/4088323?lng=en)
- [Effects of level running-induced fatigue on running kinematics: systematic review and meta-analysis](https://research.utwente.nl/en/publications/effects-of-level-running-induced-fatigue-on-running-kinematics-a-/)
- [Biomechanical response of the lower extremity to running-induced acute fatigue (PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8430259/)
