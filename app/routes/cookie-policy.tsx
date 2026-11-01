import type { Route } from "./+types/home";

const LAST_UPDATED = "2026-03-27";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cookie Policy | Invorious" },
    {
      name: "description",
      content:
        "Learn what cookies are, how we use them, and how you can manage your preferences.",
    },
  ];
}

export default function CookiePolicyRoute() {
  return (
    <main id="main-content" className="container mx-auto pt-32 pb-16 px-4">
      <header className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-slate-50">
          Cookie Policy
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      <section className="mt-8 space-y-6 text-slate-700 dark:text-slate-200 leading-relaxed">
        <p>
          This Cookie Policy explains what cookies are and how we use them on
          this website. You can control cookies through your browser settings.
        </p>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            What are cookies?
          </h2>
          <p>
            Cookies are small text files stored on your device when you visit a
            website. They help websites remember information about your visit.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            How we use cookies
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-medium">Essential:</span> required for core
              site functionality (for example, security and basic navigation).
            </li>
            <li>
              <span className="font-medium">Preferences:</span> remember your
              settings (such as language or theme, when available).
            </li>
            <li>
              <span className="font-medium">Analytics:</span> help us understand
              how the site is used so we can improve it.
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Managing cookies
          </h2>
          <p>
            Most browsers let you remove or reject cookies. Doing so may affect
            some website features. To learn more, check your browser&apos;s help
            documentation.
          </p>
        </div>
      </section>
    </main>
  );
}
