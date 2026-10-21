# Stride Lab

**A motion-capture lab in your phone.** Upload running footage from a treadmill, a workout or a race and get a research-backed breakdown of injury risk, efficiency and symmetry, including exactly where your form breaks down when you're tired.

**Live:** [trystridelab.vercel.app](https://trystridelab.vercel.app)

[![CI](https://github.com/carsonturnr/stride-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/carsonturnr/stride-lab/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Status: **pre-launch.** This repo currently holds the marketing site and waitlist. The analysis pipeline starts after [Mosaic](https://github.com/carsonturnr/mosaic) ships, with a launch planned for January 2027.

## What it will do

- **Any footage.** Side and rear treadmill views, workouts, handheld race clips. In group footage you tap yourself once and the app tracks you through the clip.
- **Eleven metrics from published biomechanics research**, in three tiers: injury risk (pelvic drop, trunk lean, knee angle at contact, overstride, hip adduction, step width), efficiency (cadence, vertical oscillation, ground contact time, step length) and descriptive (foot strike). Each is shown only when the camera angle supports it, with a confidence level, and scored against literature ranges and your own baseline.
- **Fatigue breakdown.** Step-by-step drift within a clip and early-vs-late across a session, compared to your fresh baseline.
- **Visual report.** Overlay video with the tracked skeleton, key-frame cards, side-by-side comparisons, drift charts.
- **Coach.** Grounded in the measured numbers; prescribes drills, never diagnoses.

The full spec, metric set with sources, and evals plan are in [docs/MVP.md](docs/MVP.md).

## Planned stack

React + Vite + Tailwind on Vercel · Supabase · Python GPU workers on Modal · YOLO-class detection with ByteTrack-style tracking · RTMPose · Claude for the coach · Stripe · Langfuse for tracing and evals.

## Development

```bash
npm install
cp .env.example .env   # optional: Supabase keys for the waitlist form
npm run dev
```

## License

MIT. See [LICENSE](LICENSE).
