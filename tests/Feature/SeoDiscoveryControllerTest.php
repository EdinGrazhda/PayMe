<?php

namespace Tests\Feature;

use Tests\TestCase;

class SeoDiscoveryControllerTest extends TestCase
{
    public function test_robots_disallows_crawling_when_indexing_is_disabled(): void
    {
        config()->set('seo.indexable', false);

        $this->get('/robots.txt')
            ->assertOk()
            ->assertHeader('Content-Type', 'text/plain; charset=UTF-8')
            ->assertSee("User-agent: *\nDisallow: /\n", false)
            ->assertDontSee('Sitemap:');
    }

    public function test_robots_advertises_the_sitemap_when_indexing_is_enabled(): void
    {
        config()->set('seo.indexable', true);
        config()->set('app.url', 'https://payme.example');

        $this->get('/robots.txt')
            ->assertOk()
            ->assertSee('Allow: /')
            ->assertSee('Sitemap: https://payme.example/sitemap.xml');
    }

    public function test_sitemap_contains_only_the_public_homepage_on_the_configured_domain(): void
    {
        config()->set('app.url', 'https://payme.example');

        $this->withHeaders(['Host' => 'untrusted.example'])->get('/sitemap.xml')
            ->assertOk()
            ->assertHeader('Content-Type', 'application/xml; charset=UTF-8')
            ->assertSee('<loc>https://payme.example/</loc>', false)
            ->assertDontSee('untrusted.example')
            ->assertDontSee('/dashboard');
    }
}
