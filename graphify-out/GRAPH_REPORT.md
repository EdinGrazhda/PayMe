# Graph Report - PayMe  (2026-10-30)

## Corpus Check
- 218 files · ~45,491 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 7, .example 1, .neon 1)

## Summary
- 1303 nodes · 3143 edges · 82 communities (51 shown, 31 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 46 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8788aa08`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- dashboard.tsx
- lucide-react
- Illuminate\Database\Schema\Blueprint
- BusinessContext
- Illuminate\Database\Eloquent\Model
- navbar.tsx
- layout.tsx
- Invoice
- dependencies
- use-appearance.tsx
- two-factor-recovery-codes.tsx
- TestCase
- sidebar.tsx
- ProfileController.php
- index.ts
- package.json
- with
- vite.config.ts
- dropdown-menu.tsx
- InvoiceResource.php
- components.json
- Inertia\Testing\AssertableInertia
- StoreInvoiceRequest.php
- FortifyServiceProvider
- PasswordValidationRules
- Business
- compilerOptions
- optionalDependencies
- bootstrap/app.php
- breadcrumbs.tsx
- Illuminate\Foundation\Http\FormRequest
- User
- scripts
- Laravel\Fortify\Features
- EmailVerificationTest
- toggle-group.tsx
- CreateNewUser.php
- composer.json
- updates
- require-dev
- auth.ts
- require
- UserFactory.php
- cn
- user-info.tsx
- AuthenticationTest
- Controller
- concurrently@^10.0.3
- config
- scripts
- PasswordResetTest
- vite@npm:@voidzero-dev/vite-plus-core@1.4.0
- psr-4
- laravel
- DatabaseSeeder.php
- badge.tsx
- SeoDiscoveryController
- InvoiceApiTest
- Laravel\Fortify\Features
- ProfileUpdateTest
- pnpm-workspace.yaml
- PayMe SEO audit — 30 October 2026
- Design System Master File
- @radix-ui/react-navigation-menu
- seo-keyword-strategy.md
- PayMe landing page — design QA
- RTK - Rust Token Killer

## God Nodes (most connected - your core abstractions)
1. `cn()` - 135 edges
2. `react` - 61 edges
3. `Button()` - 51 edges
4. `@inertiajs/react` - 46 edges
5. `User` - 40 edges
6. `lucide-react` - 40 edges
7. `TestCase` - 35 edges
8. `Invoice` - 30 edges
9. `BusinessContext` - 30 edges
10. `AppHeader()` - 30 edges

## Surprising Connections (you probably didn't know these)
- `Current architecture` --references--> `SeoDiscoveryController`  [INFERRED]
  docs/seo-agent.md → app/Http/Controllers/SeoDiscoveryController.php
- `Authenticated JSON API` --references--> `InvoiceResource`  [INFERRED]
  docs/data-api.md → app/Http/Resources/InvoiceResource.php
- `Authenticated JSON API` --references--> `ClientResource`  [INFERRED]
  docs/data-api.md → app/Http/Resources/ClientResource.php
- `{closure#1}()` --references--> `User`  [EXTRACTED]
  app/Actions/Fortify/CreateNewUser.php → app/Models/User.php
- `{closure#1}()` --calls--> `ClientResource`  [INFERRED]
  app/Http/Resources/InvoiceResource.php → app/Http/Resources/ClientResource.php

## Import Cycles
- None detected.

## Communities (82 total, 31 thin omitted)

### Community 0 - "react"
Cohesion: 0.06
Nodes (54): @inertiajs/react, input-otp, @laravel/passkeys, react, Heading(), InputError(), EmptyState(), ManagePasskeys() (+46 more)

### Community 1 - "dashboard.tsx"
Cohesion: 0.08
Nodes (64): sonner, DeleteUser(), PasskeyItem(), Props, EmptyState(), fieldClass, PaymeCard(), PaymePage() (+56 more)

### Community 2 - "lucide-react"
Cohesion: 0.10
Nodes (42): lucide-react, faqs, FaqSection(), FinalCta(), Footer(), plans, PricingSection(), RoiCalculator() (+34 more)

### Community 3 - "Illuminate\Database\Schema\Blueprint"
Cohesion: 0.06
Nodes (25): {closure#1}(), {closure#2}(), {closure#3}(), {closure#1}(), {closure#2}(), {closure#1}(), {closure#2}(), {closure#3}() (+17 more)

### Community 4 - "BusinessContext"
Cohesion: 0.19
Nodes (6): ClientController, ReminderController, UpdateClientRequest, Client, BusinessContext, ReminderService

### Community 5 - "Illuminate\Database\Eloquent\Model"
Cohesion: 0.09
Nodes (8): InvoiceEvent, InvoiceItem, InvoiceReminder, Payment, Plan, ReminderRule, Subscription, UploadedDocument

### Community 6 - "navbar.tsx"
Cohesion: 0.32
Nodes (13): LandingNavbar(), navItems, Sheet(), SheetClose(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader() (+5 more)

### Community 7 - "layout.tsx"
Cohesion: 0.22
Nodes (4): Separator(), SidebarSeparator(), sidebarNavItems, NavItem

### Community 8 - "Invoice"
Cohesion: 0.15
Nodes (9): InvoiceController, InvoiceResource, Invoice, {closure#1}(), {closure#2}(), InvoiceService, {closure#1}(), {closure#1}() (+1 more)

### Community 9 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, @inertiajs/react@^3.0.0, input-otp@^1.4.2, @laravel/passkeys@^0.2.0, lucide-react@^0.475.0, @radix-ui/react-avatar@^1.1.3, @radix-ui/react-checkbox@^1.1.4, @radix-ui/react-collapsible@^1.1.3 (+21 more)

### Community 10 - "use-appearance.tsx"
Cohesion: 0.12
Nodes (23): withApp(), AppearanceToggleTab(), Toaster(), TooltipProvider(), Appearance, applyTheme(), getStoredAppearance(), handleSystemThemeChange() (+15 more)

### Community 11 - "two-factor-recovery-codes.tsx"
Cohesion: 0.17
Nodes (18): AlertError(), AppLogoIcon(), Props, TwoFactorRecoveryCodes(), Alert(), AlertDescription(), AlertTitle(), alertVariants (+10 more)

### Community 12 - "TestCase"
Cohesion: 0.10
Nodes (7): RegistrationTest, DashboardTest, ExampleTest, SeoDiscoveryControllerTest, WorkspacePagesTest, TestCase, ExampleTest

### Community 13 - "sidebar.tsx"
Cohesion: 0.12
Nodes (35): AppLogo(), AppSidebar(), footerNavItems, mainNavItems, NavFooter(), NavMain(), NavUser(), DropdownMenu() (+27 more)

### Community 15 - "index.ts"
Cohesion: 0.19
Nodes (14): AppContent(), Props, AppShell(), Props, AppSidebarHeader(), SidebarInset(), SidebarProvider(), SidebarTrigger() (+6 more)

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): clsx@^2.1.1, @radix-ui/react-label@^2.1.2, @radix-ui/react-select@^2.1.6, @radix-ui/react-tooltip@^1.1.8, tailwind-merge@^3.0.1, tw-animate-css@^1.4.0, engines, node (+13 more)

### Community 17 - "with"
Cohesion: 0.10
Nodes (20): runs-on, steps, jobs, ci, name, on, pull_request, push (+12 more)

### Community 18 - "vite.config.ts"
Cohesion: 0.11
Nodes (19): @inertiajs/vite@^3.0.0, laravel-vite-plugin@^3.0.0, @tailwindcss/vite@^4.1.11, @vitejs/plugin-react@^6.1.1, devDependencies, babel-plugin-react-compiler@^1.0.0, @laravel/vite-plugin-wayfinder@^0.1.3, @rolldown/plugin-babel@^0.2.3 (+11 more)

### Community 19 - "dropdown-menu.tsx"
Cohesion: 0.15
Nodes (13): DropdownMenuCheckboxItem(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut(), DropdownMenuSubContent() (+5 more)

### Community 20 - "InvoiceResource.php"
Cohesion: 0.09
Nodes (8): ClientResource, {closure#1}(), ReminderResource, Authenticated JSON API, Entity relationships, Indexes and query patterns, PayMe data and API design, State and next implementation steps

### Community 22 - "components.json"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 23 - "Inertia\Testing\AssertableInertia"
Cohesion: 0.13
Nodes (7): {closure#1}(), PasswordConfirmationTest, {closure#1}(), LandingPageTest, {closure#1}(), {closure#2}(), SecurityTest

### Community 24 - "StoreInvoiceRequest.php"
Cohesion: 0.16
Nodes (5): HandleAppearance, {closure#1}(), StoreInvoiceRequest, {closure#1}(), Money

### Community 25 - "FortifyServiceProvider"
Cohesion: 0.17
Nodes (3): AppServiceProvider, {closure#1}(), FortifyServiceProvider

### Community 26 - "PasswordValidationRules"
Cohesion: 0.17
Nodes (5): {closure#1}(), CreateNewUser, ResetUserPassword, PasswordValidationRules, ProfileDeleteRequest

### Community 27 - "Business"
Cohesion: 0.18
Nodes (4): Business, AnalyticsService, {closure#1}(), DashboardService

### Community 28 - "compilerOptions"
Cohesion: 0.12
Nodes (15): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, module, moduleResolution (+7 more)

### Community 29 - "optionalDependencies"
Cohesion: 0.13
Nodes (15): optionalDependencies, @laravel/multiplex@^0.4.1, lightningcss-linux-x64-gnu@^1.29.1, lightningcss-win32-x64-msvc@^1.29.1, @rollup/rollup-linux-x64-gnu@4.9.5, @rollup/rollup-win32-x64-msvc@4.9.5, @tailwindcss/oxide-linux-x64-gnu@^4.0.1, @tailwindcss/oxide-win32-x64-msvc@^4.0.1 (+7 more)

### Community 30 - "bootstrap/app.php"
Cohesion: 0.09
Nodes (12): HandleInertiaRequests, {closure#1}(), {closure#10}(), {closure#2}(), {closure#3}(), {closure#4}(), {closure#8}(), {closure#9}() (+4 more)

### Community 31 - "breadcrumbs.tsx"
Cohesion: 0.44
Nodes (8): Breadcrumbs(), Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage(), BreadcrumbSeparator()

### Community 32 - "Illuminate\Foundation\Http\FormRequest"
Cohesion: 0.15
Nodes (4): PasswordUpdateRequest, TwoFactorAuthenticationRequest, StoreClientRequest, StoreUploadedDocumentRequest

### Community 34 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, ci:check, dev, lint, lint:check, post-autoload-dump, post-create-project-cmd, post-root-package-install (+5 more)

### Community 37 - "toggle-group.tsx"
Cohesion: 0.21
Nodes (11): class-variance-authority@^0.7.1, @radix-ui/react-toggle@^1.1.2, @radix-ui/react-toggle-group@^1.1.2, class-variance-authority, @radix-ui/react-toggle, @radix-ui/react-toggle-group, ToggleGroup(), ToggleGroupContext (+3 more)

### Community 39 - "composer.json"
Cohesion: 0.17
Nodes (11): autoload-dev, psr-4, description, keywords, license, minimum-stability, name, prefer-stable (+3 more)

### Community 40 - "updates"
Cohesion: 0.17
Nodes (11): default-days, patterns, github-actions, interval, updates, cooldown, directory, groups (+3 more)

### Community 41 - "require-dev"
Cohesion: 0.18
Nodes (11): require-dev, fakerphp/faker, larastan/larastan, laravel/boost, laravel/pail, laravel/pao, laravel/pint, laravel/sail (+3 more)

### Community 42 - "auth.ts"
Cohesion: 0.22
Nodes (9): Auth, Passkey, TwoFactorSecretKey, TwoFactorSetupData, User, InertiaConfig, @inertiajs/core, InputHTMLAttributes (+1 more)

### Community 43 - "require"
Cohesion: 0.20
Nodes (10): require, inertiajs/inertia-laravel, laravel/ai, laravel/chisel, laravel/fortify, laravel/framework, laravel/sanctum, laravel/tinker (+2 more)

### Community 45 - "cn"
Cohesion: 0.15
Nodes (19): NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList(), NavigationMenuTrigger(), navigationMenuTriggerStyle (+11 more)

### Community 46 - "user-info.tsx"
Cohesion: 0.16
Nodes (21): AppHeader(), mainNavItems, Props, rightNavItems, Avatar(), AvatarFallback(), AvatarImage(), Tooltip() (+13 more)

### Community 48 - "Controller"
Cohesion: 0.14
Nodes (7): AnalyticsController, DashboardController, PaymentController, UploadedDocumentController, Controller, StorePaymentRequest, PaymentService

### Community 50 - "config"
Cohesion: 0.29
Nodes (7): pestphp/pest-plugin, php-http/discovery, config, allow-plugins, optimize-autoloader, preferred-install, sort-packages

### Community 51 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, build:ssr, check, check:fix, dev, types:check

### Community 54 - "psr-4"
Cohesion: 0.40
Nodes (5): autoload, psr-4, App\\, Database\\Factories\\, Database\\Seeders\\

### Community 55 - "laravel"
Cohesion: 0.40
Nodes (5): extra, laravel, post-create-project, dont-discover, installer

### Community 59 - "badge.tsx"
Cohesion: 0.50
Nodes (4): @radix-ui/react-slot@^1.2.3, @radix-ui/react-slot, Badge(), badgeVariants

### Community 60 - "SeoDiscoveryController"
Cohesion: 0.25
Nodes (5): SeoDiscoveryController, Current architecture, Future design, not implemented, Operational configuration, PayMe SEO architecture and staged automation

### Community 67 - "PayMe SEO audit — 30 October 2026"
Cohesion: 0.33
Nodes (5): Implemented in this stage, Next approvals and measurements, PayMe SEO audit — 30 October 2026, Prioritized findings, Scope and evidence

### Community 68 - "Design System Master File"
Cohesion: 0.11
Nodes (17): Additional Forbidden Patterns, Anti-Patterns (Do NOT Use), Buttons, Cards, Color Palette, Component Specs, Design System Master File, Global Rules (+9 more)

### Community 80 - "PayMe landing page — design QA"
Cohesion: 0.20
Nodes (9): Accepted P3 differences, Comparison setup, Fidelity review, Final result, Interaction and runtime checks, Iteration 1, Iteration 2, Iteration history (+1 more)

### Community 82 - "RTK - Rust Token Killer"
Cohesion: 0.33
Nodes (5): Avoid RTK For, Explicit fallback when the hook is unavailable, How RTK Fits With Graphify, RTK - Rust Token Killer, Useful Checks

## Knowledge Gaps
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `dashboard.tsx`, `lucide-react`, `toggle-group.tsx`, `navbar.tsx`, `layout.tsx`, `dependencies`, `use-appearance.tsx`, `two-factor-recovery-codes.tsx`, `sidebar.tsx`, `user-info.tsx`, `index.ts`, `package.json`, `cn`, `dropdown-menu.tsx`, `badge.tsx`, `breadcrumbs.tsx`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.05744449619624282 - nodes in this community are weakly interconnected._
- **Why does `cn()` connect `cn` to `react`, `dashboard.tsx`, `lucide-react`, `toggle-group.tsx`, `navbar.tsx`, `layout.tsx`, `use-appearance.tsx`, `two-factor-recovery-codes.tsx`, `sidebar.tsx`, `user-info.tsx`, `index.ts`, `dropdown-menu.tsx`, `badge.tsx`, `breadcrumbs.tsx`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Should `dashboard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08036036036036036 - nodes in this community are weakly interconnected._
- **Why does `@inertiajs/react` connect `react` to `dashboard.tsx`, `lucide-react`, `navbar.tsx`, `layout.tsx`, `dependencies`, `use-appearance.tsx`, `two-factor-recovery-codes.tsx`, `sidebar.tsx`, `user-info.tsx`, `index.ts`, `package.json`, `dropdown-menu.tsx`, `breadcrumbs.tsx`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Should `lucide-react` be split into smaller, more focused modules?**
  _Cohesion score 0.10235690235690235 - nodes in this community are weakly interconnected._
- **Should `Illuminate\Database\Schema\Blueprint` be split into smaller, more focused modules?**
  _Cohesion score 0.06458635703918723 - nodes in this community are weakly interconnected._