# PayMe SEO audit — 30 October 2026

## Scope and evidence

This is a codebase audit, not a live-site crawl. The local HTTP server was unavailable during review, and no Search Console, analytics, keyword-provider, or Core Web Vitals data was supplied. Rankings, traffic, indexing, AI citations, and conversion rates are therefore unknown.

PayMe is presented as a web app for freelancers and small businesses to track invoices and send payment reminders. The public marketing page is `/`; dashboard, invoice, client, reminder, analytics, and API routes require authentication. The frontend uses Laravel 13, PHP 8.5, Inertia 3, React, and Vite. Public copy is English. The real operating company, domain, service area, supported languages, and actual billing availability have not been verified.

## Prioritized findings

| Priority | Finding | Evidence | Action |
| --- | --- | --- | --- |
| P0 | Crawler-visible homepage HTML is unverified. Inertia SSR is enabled in `config/inertia.php`, but no running server was available to confirm that the deployed SSR process emits the title, description, content, and JSON-LD. | `config/inertia.php`; `resources/js/pages/welcome.tsx`; failed local HTTP connection | Verify production HTML without JavaScript and SSR health before claiming crawlability. |
| P0 | Published domain and indexing policy are unverified. `APP_URL` is localhost in `.env.example`; staging and production must be configured deliberately. | `.env.example`; `config/seo.php` | Set the real production `APP_URL`; use `SEO_INDEXABLE=true` only for the intended public site and `false` for staging. |
| P1 | No canonical URL is emitted for `/`, and the Open Graph URL is relative (`/`). | `resources/js/pages/welcome.tsx` | Add one absolute canonical and absolute `og:url` from a verified site URL; avoid duplicate canonical tags across SSR and client rendering. |
| P1 | The original static `robots.txt` had no sitemap and no environment distinction. | Former `public/robots.txt` | Implemented dynamic robots policy and a one-URL sitemap for the public homepage. |
| P1 | Auth and account pages have titles but no demonstrated `noindex` policy. Robots exclusion alone would not guarantee deindexing. | `resources/js/pages/auth/*`; route definitions | Add a response-level `X-Robots-Tag: noindex` policy for non-public HTML after testing all auth and private routes. |
| P1 | No verified search or conversion measurement. The in-app analytics page reports invoice activity, not organic acquisition. | `app/Services/AnalyticsService.php`; no GA4/Search Console integration found | Connect approved Search Console and consent-aware analytics; define signup as the initial conversion. |
| P2 | The homepage contains a SoftwareApplication offer priced at €0. A Free plan is visible, but plan availability and paid billing have not been verified. | `resources/js/pages/welcome.tsx`; pricing section | Validate the offer against the live product and remove or adjust claims that are not currently true. |
| P2 | The homepage has a useful FAQ and product explanation, but no confirmed search-query demand or customer language data. | Landing components | Use Search Console and customer research before publishing new landing pages. |
| P2 | No real geographic service area or translated public pages were found. | Landing copy and routes | Do not add LocalBusiness, city pages, or hreflang until business facts and approved translations exist. |

## Implemented in this stage

- `/robots.txt` now allows crawling and advertises an absolute sitemap only when indexing is enabled; otherwise it disallows crawling.
- `/sitemap.xml` contains only the current public homepage, using the configured `APP_URL` rather than an untrusted request host.
- `SEO_INDEXABLE` is configurable. It defaults to enabled only in production mode; local and testing environments default to disabled. A staging deployment must override it to `false`.
- Feature tests cover enabled/disabled robots policy, sitemap content, and host-header isolation.

## Next approvals and measurements

1. Confirm the production domain, company identity, product availability/prices, legal pages, and target markets/languages.
2. Inspect deployed initial HTML and crawl with JavaScript disabled. Establish Search Console ownership and a baseline for indexing, queries, clicks, and Core Web Vitals.
3. Add canonical/OG URL and private-page noindex after confirming deployment behavior. Validate the existing structured data against visible claims.
4. Only then consider content expansion, local pages, translation, GA4, or an automated audit workflow. New copy and metadata rewrites require editorial review; URL/indexing changes require explicit approval.

Google's current guidance favors crawlable, useful content and says there are no special technical requirements for AI Overviews beyond ordinary Search eligibility. Structured data must reflect visible content; sitemap inclusion does not guarantee indexing. Sources: [AI features](https://developers.google.com/search/docs/appearance/ai-features), [JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [structured data](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
