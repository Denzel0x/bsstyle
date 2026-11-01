import type { Route } from "./+types/home";

const LAST_UPDATED = "2026-03-27";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Privacy Policy | Invorious" },
    {
      name: "description",
      content:
        "Learn how Invorious collects, uses, stores, and protects your personal information when you use our website, consulting, and development services.",
    },
  ];
}

export default function PrivacyPolicyRoute() {
  return (
    <main id="main-content" className="container mx-auto pt-32 pb-16 px-4">
      <header className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-slate-50">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      <section className="mt-8 space-y-6 text-slate-700 dark:text-slate-200 leading-relaxed">
        <p>
          This Privacy Policy explains how we collect, use, and share
          information when you visit our website or contact us. If you do not
          agree with this Policy, please do not use the website.
        </p>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Information we collect
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-medium">Information you provide:</span>{" "}
              name, email address, company, and any details you send via forms
              or email.
            </li>
            <li>
              <span className="font-medium">Usage information:</span> pages
              viewed, approximate location, device and browser information, and
              referral sources (typically via analytics tools).
            </li>
            <li>
              <span className="font-medium">
                Cookies and similar technologies:
              </span>{" "}
              used to remember preferences and measure website performance.
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            How we use information
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To respond to inquiries and provide requested services.</li>
            <li>To operate, maintain, and improve the website.</li>
            <li>To monitor security and prevent fraud or abuse.</li>
            <li>
              To send administrative messages (for example, policy updates).
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            How we share information
          </h2>
          <p>
            We may share information with trusted service providers that help us
            operate the website (for example, hosting, analytics, and email). We
            may also share information if required by law or to protect our
            rights and users.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Data retention
          </h2>
          <p>
            We retain personal information only as long as needed for the
            purposes described in this Policy, unless a longer retention period
            is required or permitted by law.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Your choices
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>You can disable cookies in your browser settings.</li>
            <li>
              You may request access, correction, or deletion of your personal
              information, subject to applicable law.
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Contact
          </h2>
          <p>
            For privacy-related requests, please contact us using the contact
            details provided on the website.
          </p>
        </div>
      </section>
    </main>
  );
}
