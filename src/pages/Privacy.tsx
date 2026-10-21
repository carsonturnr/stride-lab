import { Prose, SitePage } from '../components/SiteFrame'

export function Privacy() {
  return (
    <SitePage>
      <Prose title="Privacy Policy" updated="October 21, 2026">
        <p>
          Stride Lab analyzes running videos you upload. This page explains what we collect and what we do
          with it. Stride Lab is not a medical device and does not diagnose injuries.
        </p>
        <h2 className="pt-2 text-lg font-semibold">What we collect</h2>
        <p>
          <strong>Waitlist.</strong> Your email address, used only to tell you when Stride Lab is available.
        </p>
        <p>
          <strong>When the product launches.</strong> Your account email, profile details you choose to enter
          (height, mileage, goals), the videos you upload, and the pose data, metrics and reports derived from
          them. Videos are processed on our servers to extract body keypoints and are stored in your account
          so you can review the overlay and compare sessions.
        </p>
        <h2 className="pt-2 text-lg font-semibold">How we use it</h2>
        <p>
          To produce your analysis and let you track change over time. Aggregate, de-identified data may be
          used to evaluate and improve the accuracy of the pipeline. We never sell your data and never share
          your videos.
        </p>
        <h2 className="pt-2 text-lg font-semibold">Retention and deletion</h2>
        <p>
          Data is kept while your account exists. You can delete any session, or your whole account, from the
          app, and we remove the videos and derived data within 30 days.
        </p>
        <h2 className="pt-2 text-lg font-semibold">Contact</h2>
        <p>
          Questions or requests:{' '}
          <a className="underline" href="https://github.com/carsonturnr/stride-lab/issues">
            open an issue on GitHub
          </a>
          .
        </p>
      </Prose>
    </SitePage>
  )
}
