<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class SeoDiscoveryController extends Controller
{
    public function robots(): Response
    {
        $content = config('seo.indexable')
            ? "User-agent: *\nAllow: /\nSitemap: {$this->siteUrl('sitemap.xml')}\n"
            : "User-agent: *\nDisallow: /\n";

        return response($content)->header('Content-Type', 'text/plain; charset=UTF-8');
    }

    public function sitemap(): Response
    {
        $homeUrl = htmlspecialchars($this->siteUrl(), ENT_XML1 | ENT_QUOTES, 'UTF-8');
        $content = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
            .'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
            ."<url><loc>{$homeUrl}</loc></url></urlset>";

        return response($content)->header('Content-Type', 'application/xml; charset=UTF-8');
    }

    private function siteUrl(string $path = ''): string
    {
        return rtrim((string) config('app.url'), '/').'/'.ltrim($path, '/');
    }
}
