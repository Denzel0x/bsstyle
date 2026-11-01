import type { Route } from "./+types/home";

const LAST_UPDATED = "2026-03-27";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Terms of Service | Invorious" },
    {
      name: "description",
      content:
        "These Terms of Service govern your access to and use of Invorious's website, consulting, and blockchain development services.",
    },
  ];
}

export default function TermsOfServiceRoute() {
  return (
    <main id="main-content" className="container mx-auto pt-32 pb-16 px-4">
      <header className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-slate-50">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      <section className="mt-8 space-y-6 text-slate-700 dark:text-slate-200 leading-relaxed">
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your use of this
          website. By accessing or using the website, you agree to these Terms.
          If you do not agree, do not use the website.
        </p>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Use of the website
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              You agree to use the website only for lawful purposes and in a way
              that does not infringe the rights of others.
            </li>
            <li>
              You must not attempt to disrupt, damage, or gain unauthorized
              access to the website or its systems.
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Intellectual property
          </h2>
          <p>
            The website and its content (including text, graphics, logos, and
            design) are owned by us or our licensors and are protected by
            applicable intellectual property laws. You may not copy, modify,
            distribute, or create derivative works without permission.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Third-party links
          </h2>
          <p>
            The website may contain links to third-party websites. We do not
            control and are not responsible for their content, policies, or
            practices.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Disclaimers
          </h2>
          <p>
            The website is provided on an &quot;as is&quot; and &quot;as
            available&quot; basis. We make no warranties of any kind, express or
            implied, including fitness for a particular purpose,
            non-infringement, or availability.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Limitation of liability
          </h2>
          <p>
            To the fullest extent permitted by law, we will not be liable for
            any indirect, incidental, special, consequential, or punitive
            damages, or any loss of profits or revenues, arising from your use
            of the website.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Changes to these Terms
          </h2>
          <p>
            We may update these Terms from time to time. Continued use of the
            website after changes become effective constitutes acceptance of the
            updated Terms.
          </p>
        </div>
      </section>
    </main>
  );
}
