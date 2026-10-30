# Graph Report - PayMe  (2026-10-30)

## Corpus Check
- 212 files · ~43,934 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 7, .example 1, .neon 1)

## Summary
- 1278 nodes · 3115 edges · 80 communities (53 shown, 27 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 45 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a1780de6`
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
- cn
- Invoice
- dependencies
- use-appearance.tsx
- two-factor-recovery-codes.tsx
- TestCase
- app-sidebar.tsx
- ProfileController.php
- index.ts
- package.json
- with
- vite.config.ts
- dropdown-menu.tsx
- InvoiceResource.php
- FortifyServiceProvider.php
- components.json
- Inertia\Testing\AssertableInertia
- StoreInvoiceRequest.php
- FortifyServiceProvider
- PasswordValidationRules
- InvoiceResource
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
- InvoiceApiTest
- TwoFactorChallengeTest
- WorkspacePagesTest
- pnpm-workspace.yaml
- PasswordConfirmationTest
- Design System Master File
- @radix-ui/react-navigation-menu
- PayMe landing page — design QA
- RTK - Rust Token Killer
- PayMe data and API design

## God Nodes (most connected - your core abstractions)
1. `cn()` - 135 edges
2. `react` - 61 edges
3. `Button()` - 51 edges
4. `@inertiajs/react` - 46 edges
5. `User` - 40 edges
6. `lucide-react` - 40 edges
7. `TestCase` - 33 edges
8. `Invoice` - 30 edges
9. `BusinessContext` - 30 edges
10. `AppHeader()` - 30 edges

## Surprising Connections (you probably didn't know these)
- `Authenticated JSON API` --references--> `InvoiceResource`  [INFERRED]
  docs/data-api.md → app/Http/Resources/InvoiceResource.php
- `Authenticated JSON API` --references--> `ClientResource`  [INFERRED]
  docs/data-api.md → app/Http/Resources/ClientResource.php
- `{closure#1}()` --references--> `User`  [EXTRACTED]
  app/Actions/Fortify/CreateNewUser.php → app/Models/User.php
- `{closure#1}()` --calls--> `ClientResource`  [INFERRED]
  app/Http/Resources/InvoiceResource.php → app/Http/Resources/ClientResource.php
- `BreadcrumbEllipsis()` --calls--> `cn()`  [EXTRACTED]
  resources/js/components/ui/breadcrumb.tsx → resources/js/lib/utils.ts

## Import Cycles
- None detected.

## Communities (80 total, 27 thin omitted)

### Community 0 - "react"
Cohesion: 0.06
Nodes (48): @inertiajs/react, @laravel/passkeys, react, AppearanceToggleTab(), DeleteUser(), Heading(), InputError(), EmptyState() (+40 more)

### Community 1 - "dashboard.tsx"
Cohesion: 0.06
Nodes (76): input-otp, sonner, PasskeyItem(), Props, EmptyState(), fieldClass, PaymeCard(), PaymePage() (+68 more)

### Community 2 - "lucide-react"
Cohesion: 0.10
Nodes (41): lucide-react, faqs, FaqSection(), FinalCta(), Footer(), plans, PricingSection(), RoiCalculator() (+33 more)

### Community 3 - "Illuminate\Database\Schema\Blueprint"
Cohesion: 0.06
Nodes (25): {closure#1}(), {closure#2}(), {closure#3}(), {closure#1}(), {closure#2}(), {closure#1}(), {closure#2}(), {closure#3}() (+17 more)

### Community 4 - "BusinessContext"
Cohesion: 0.16
Nodes (6): ClientController, ReminderController, StoreClientRequest, UpdateClientRequest, BusinessContext, ReminderService

### Community 5 - "Illuminate\Database\Eloquent\Model"
Cohesion: 0.08
Nodes (9): Client, InvoiceEvent, InvoiceItem, InvoiceReminder, Payment, Plan, ReminderRule, Subscription (+1 more)

### Community 6 - "navbar.tsx"
Cohesion: 0.33
Nodes (14): AppHeader(), LandingNavbar(), navItems, PayMeLogo(), Sheet(), SheetClose(), SheetContent(), SheetDescription() (+6 more)

### Community 7 - "cn"
Cohesion: 0.14
Nodes (16): SidebarContext, SidebarGroupAction(), SidebarInput(), SidebarMenuAction(), SidebarMenuBadge(), sidebarMenuButtonVariants, SidebarMenuSkeleton(), SidebarMenuSub() (+8 more)

### Community 8 - "Invoice"
Cohesion: 0.15
Nodes (8): Business, Invoice, {closure#1}(), {closure#1}(), {closure#2}(), {closure#1}(), {closure#1}(), {closure#2}()

### Community 9 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, @inertiajs/react@^3.0.0, input-otp@^1.4.2, @laravel/passkeys@^0.2.0, lucide-react@^0.475.0, @radix-ui/react-avatar@^1.1.3, @radix-ui/react-checkbox@^1.1.4, @radix-ui/react-collapsible@^1.1.3 (+21 more)

### Community 10 - "use-appearance.tsx"
Cohesion: 0.15
Nodes (21): withApp(), Toaster(), TooltipProvider(), applyTheme(), getStoredAppearance(), handleSystemThemeChange(), initializeTheme(), isDarkMode() (+13 more)

### Community 11 - "two-factor-recovery-codes.tsx"
Cohesion: 0.17
Nodes (18): AlertError(), AppLogoIcon(), Props, TwoFactorRecoveryCodes(), Alert(), AlertDescription(), AlertTitle(), alertVariants (+10 more)

### Community 12 - "TestCase"
Cohesion: 0.12
Nodes (6): RegistrationTest, DashboardTest, ExampleTest, ProfileUpdateTest, TestCase, ExampleTest

### Community 13 - "app-sidebar.tsx"
Cohesion: 0.17
Nodes (22): AppLogo(), AppSidebar(), footerNavItems, mainNavItems, NavFooter(), NavMain(), SidebarContent(), SidebarFooter() (+14 more)

### Community 14 - "ProfileController.php"
Cohesion: 0.13
Nodes (3): ProfileController, SecurityController, TwoFactorAuthenticationRequest

### Community 15 - "index.ts"
Cohesion: 0.21
Nodes (13): AppContent(), Props, AppShell(), Props, AppSidebarHeader(), SidebarInset(), SidebarProvider(), SidebarTrigger() (+5 more)

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
Cohesion: 0.13
Nodes (20): NavUser(), DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem() (+12 more)

### Community 20 - "InvoiceResource.php"
Cohesion: 0.12
Nodes (4): ClientResource, {closure#1}(), ReminderResource, Authenticated JSON API

### Community 21 - "FortifyServiceProvider.php"
Cohesion: 0.11
Nodes (7): {closure#1}(), {closure#10}(), {closure#2}(), {closure#3}(), {closure#4}(), {closure#8}(), {closure#9}()

### Community 22 - "components.json"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 23 - "Inertia\Testing\AssertableInertia"
Cohesion: 0.14
Nodes (7): {closure#1}(), {closure#1}(), {closure#1}(), LandingPageTest, {closure#1}(), {closure#2}(), SecurityTest

### Community 24 - "StoreInvoiceRequest.php"
Cohesion: 0.20
Nodes (4): HandleAppearance, {closure#1}(), {closure#1}(), Money

### Community 25 - "FortifyServiceProvider"
Cohesion: 0.17
Nodes (3): AppServiceProvider, {closure#1}(), FortifyServiceProvider

### Community 26 - "PasswordValidationRules"
Cohesion: 0.17
Nodes (4): ResetUserPassword, PasswordValidationRules, PasswordUpdateRequest, ProfileDeleteRequest

### Community 27 - "InvoiceResource"
Cohesion: 0.31
Nodes (3): InvoiceController, InvoiceResource, InvoiceService

### Community 28 - "compilerOptions"
Cohesion: 0.12
Nodes (15): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, module, moduleResolution (+7 more)

### Community 29 - "optionalDependencies"
Cohesion: 0.13
Nodes (15): optionalDependencies, @laravel/multiplex@^0.4.1, lightningcss-linux-x64-gnu@^1.29.1, lightningcss-win32-x64-msvc@^1.29.1, @rollup/rollup-linux-x64-gnu@4.9.5, @rollup/rollup-win32-x64-msvc@4.9.5, @tailwindcss/oxide-linux-x64-gnu@^4.0.1, @tailwindcss/oxide-win32-x64-msvc@^4.0.1 (+7 more)

### Community 30 - "bootstrap/app.php"
Cohesion: 0.11
Nodes (7): DashboardController, HandleInertiaRequests, DashboardService, {closure#1}(), {closure#2}(), {closure#3}(), GET /user()

### Community 31 - "breadcrumbs.tsx"
Cohesion: 0.44
Nodes (8): Breadcrumbs(), Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage(), BreadcrumbSeparator()

### Community 32 - "Illuminate\Foundation\Http\FormRequest"
Cohesion: 0.17
Nodes (3): StoreInvoiceRequest, StorePaymentRequest, StoreUploadedDocumentRequest

### Community 34 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, ci:check, dev, lint, lint:check, post-autoload-dump, post-create-project-cmd, post-root-package-install (+5 more)

### Community 37 - "toggle-group.tsx"
Cohesion: 0.21
Nodes (11): class-variance-authority@^0.7.1, @radix-ui/react-toggle@^1.1.2, @radix-ui/react-toggle-group@^1.1.2, class-variance-authority, @radix-ui/react-toggle, @radix-ui/react-toggle-group, ToggleGroup(), ToggleGroupContext (+3 more)

### Community 38 - "CreateNewUser.php"
Cohesion: 0.24
Nodes (4): {closure#1}(), CreateNewUser, ProfileValidationRules, ProfileUpdateRequest

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
Cohesion: 0.16
Nodes (18): NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList(), NavigationMenuTrigger(), navigationMenuTriggerStyle (+10 more)

### Community 46 - "user-info.tsx"
Cohesion: 0.22
Nodes (13): mainNavItems, Props, rightNavItems, Avatar(), AvatarFallback(), AvatarImage(), Tooltip(), TooltipContent() (+5 more)

### Community 48 - "Controller"
Cohesion: 0.12
Nodes (6): AnalyticsController, PaymentController, UploadedDocumentController, Controller, AnalyticsService, PaymentService

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

### Community 68 - "Design System Master File"
Cohesion: 0.11
Nodes (17): Additional Forbidden Patterns, Anti-Patterns (Do NOT Use), Buttons, Cards, Color Palette, Component Specs, Design System Master File, Global Rules (+9 more)

### Community 80 - "PayMe landing page — design QA"
Cohesion: 0.20
Nodes (9): Accepted P3 differences, Comparison setup, Fidelity review, Final result, Interaction and runtime checks, Iteration 1, Iteration 2, Iteration history (+1 more)

### Community 82 - "RTK - Rust Token Killer"
Cohesion: 0.33
Nodes (5): Avoid RTK For, Explicit fallback when the hook is unavailable, How RTK Fits With Graphify, RTK - Rust Token Killer, Useful Checks

### Community 84 - "PayMe data and API design"
Cohesion: 0.40
Nodes (4): Entity relationships, Indexes and query patterns, PayMe data and API design, State and next implementation steps

## Knowledge Gaps
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `react`, `dashboard.tsx`, `lucide-react`, `toggle-group.tsx`, `navbar.tsx`, `cn`, `two-factor-recovery-codes.tsx`, `app-sidebar.tsx`, `user-info.tsx`, `index.ts`, `dropdown-menu.tsx`, `badge.tsx`, `breadcrumbs.tsx`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.058220773171867725 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `dashboard.tsx`, `lucide-react`, `toggle-group.tsx`, `navbar.tsx`, `cn`, `dependencies`, `use-appearance.tsx`, `two-factor-recovery-codes.tsx`, `app-sidebar.tsx`, `user-info.tsx`, `index.ts`, `package.json`, `cn`, `dropdown-menu.tsx`, `badge.tsx`, `breadcrumbs.tsx`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Should `dashboard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06129426129426129 - nodes in this community are weakly interconnected._
- **Why does `@inertiajs/react` connect `react` to `dashboard.tsx`, `lucide-react`, `navbar.tsx`, `dependencies`, `use-appearance.tsx`, `two-factor-recovery-codes.tsx`, `app-sidebar.tsx`, `user-info.tsx`, `index.ts`, `package.json`, `dropdown-menu.tsx`, `breadcrumbs.tsx`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `lucide-react` be split into smaller, more focused modules?**
  _Cohesion score 0.10235690235690235 - nodes in this community are weakly interconnected._
- **Should `Illuminate\Database\Schema\Blueprint` be split into smaller, more focused modules?**
  _Cohesion score 0.06458635703918723 - nodes in this community are weakly interconnected._