# PayMe SEO architecture and staged automation

## Current architecture

The only indexable marketing candidate is `/`. Laravel serves an Inertia 3 React page. The new `SeoDiscoveryController` serves `robots.txt` and `sitemap.xml` without a database query. `config/seo.php` controls whether robots permits crawling. Sitemap URLs come from `APP_URL`; the environment must provide the verified public origin. The controller does not fetch remote URLs, so it introduces no SSRF surface.

There is no SEO database schema, keyword provider, scheduled SEO audit, AI publication job, search analytics connector, or SEO admin panel. The application's existing invoice analytics are not organic-traffic analytics. No external credentials or new dependencies were added in this stage.

## Operational configuration

| Setting | Purpose | Required action |
| --- | --- | --- |
| `APP_URL` | Authoritative absolute origin for sitemap and robots | Set to the verified production URL before launch. |
| `SEO_INDEXABLE` | `true` advertises sitemap and allows crawling; `false` disallows crawling | Set `false` for staging; set `true` for the intended public production site after launch checks. |

On production, verify `GET /robots.txt`, `GET /sitemap.xml`, the homepage status and initial HTML, and Inertia SSR availability. Submit the sitemap through Search Console only after ownership is authorized. The sitemap intentionally excludes login, registration, private workspace URLs, and APIs. A public staging site should also be access-controlled: robots rules alone are not a privacy or deindexing guarantee.

## Future design, not implemented

1. **Metadata foundation:** a single server-aware metadata source for the public homepage, canonical and Open Graph URLs, and response-level noindex for private HTML. Avoid per-request AI generation.
2. **Audit runner:** an allowlisted, same-origin-only scheduled Laravel command that checks public routes, canonical consistency, status codes, robots, and sitemap. Require timeouts, redirects limits, idempotency, and private-network blocking before any URL-fetching implementation.
3. **Recommendation store:** persist timestamped findings with severity, evidence, proposed change, reviewer decision, and rollback information. AI may summarize or draft proposals, never silently publish content.
4. **Connected metrics:** with approved credentials, import Search Console query/page performance and consent-aware signup events. Label missing data rather than estimating it.
5. **Approvals:** safe deterministic technical corrections can be auto-applied with tests; metadata/content changes require review; URL moves, indexing-policy changes, deletion, and external submissions require explicit approval.

No daily, weekly, or monthly SEO automation is scheduled yet. This is intentional until a verified production URL, measurement access, and approval ownership exist.
