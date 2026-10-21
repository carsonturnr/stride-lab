import { SitePage } from '../components/SiteFrame'
import { WaitlistForm } from '../components/WaitlistForm'

const metrics: [string, string, string][] = [
  ['Injury risk', 'Pelvic drop', 'The kinematic variable most strongly associated with common running injuries.'],
  ['Injury risk', 'Trunk lean at midstance', 'Greater forward lean is seen more often in injured runners.'],
  ['Injury risk', 'Knee angle at contact', 'A more extended knee at foot strike is associated with injury.'],
  ['Injury risk', 'Overstride', 'Foot landing ahead of the hip raises knee and hip loading.'],
  ['Injury risk', 'Hip adduction', 'Knee caving inward, reduced by a higher step rate.'],
  ['Injury risk', 'Step width', 'A narrow base of gait is linked to IT band and tibial stress injuries.'],
  ['Efficiency', 'Cadence', 'Raising step rate 5 to 10% measurably reduces energy absorbed at the knee and hip.'],
  ['Efficiency', 'Vertical oscillation', 'Wasted vertical motion, which falls as step rate rises.'],
  ['Efficiency', 'Ground contact time', 'Rises reliably with fatigue.'],
  ['Efficiency', 'Step length', 'Shortens with fatigue.'],
  ['Descriptive', 'Foot strike and ankle angle', 'Reported, not scored. A dorsiflexed ankle at contact is associated with injury.'],
]

const steps = [
  ['Film', 'Any phone, any angle. Treadmill side and rear views give the most metrics; race and workout footage works too. Slow motion helps.'],
  ['Tap yourself', 'In race or group footage, tap yourself once. Stride Lab tracks you through the clip, even when other runners pass in front.'],
  ['Measure', 'Every step gets foot contact, toe-off and joint angles. Each metric is shown only when the camera angle supports it, with a confidence level.'],
  ['See the breakdown', 'An overlay video, key-frame cards, side-by-side fresh vs fatigued, and drift charts that show exactly when your form started to change.'],
]

export function Landing() {
  return (
    <SitePage>
      <main>
        <section className="mx-auto max-w-5xl px-6 pt-16 pb-20 sm:pt-24">
          <p className="text-sm font-medium text-slate-500">AI running-form analysis</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            A motion-capture lab in your phone.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            Upload footage from a treadmill, a workout or a race and get a research-backed breakdown of injury
            risk, efficiency and symmetry, including exactly where your form breaks down when you're tired.
          </p>
          <div className="mt-8">
            <WaitlistForm source="landing-hero" />
            <p className="mt-2 text-xs text-slate-500">Launching early 2027. First analysis free.</p>
          </div>
        </section>

        <section id="how" className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
            <ol className="mt-8 grid gap-8 sm:grid-cols-2">
              {steps.map(([title, body], i) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-medium text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-medium">{title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="metrics" className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">Eleven metrics, from the research</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            No guesswork and no custom model trained on your data. Each metric is scored against published
            ranges and against your own easy-run baseline, and framed as a risk flag, never a diagnosis.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map(([tier, name, body]) => (
              <li key={name} className="rounded-lg border border-slate-200 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{tier}</p>
                <h3 className="mt-1 text-sm font-medium">{name}</h3>
                <p className="mt-1 text-sm text-slate-600">{body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <h2 className="text-2xl font-semibold tracking-tight">The fatigue breakdown</h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Form breaks down most in races and hard reps, and every runner breaks down differently. Stride
              Lab compares you to your own fresh baseline, step by step, so you can see which metrics drift
              first, by how much, and at what point. Then a coach grounded in the measured numbers prescribes
              the drills.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">Built in the open</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Stride Lab is open source. The pose pipeline, the metrics engine and the evals against hand-marked
            frames will all be public.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="https://github.com/carsonturnr/stride-lab"
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              View on GitHub
            </a>
            <WaitlistForm source="landing-footer" />
          </div>
        </section>
      </main>
    </SitePage>
  )
}
