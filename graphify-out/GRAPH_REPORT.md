# Graph Report - PayMe (2026-10-29)

## Corpus Check

- cluster-only mode — file stats not available

## Summary

- 956 nodes · 2179 edges · 61 communities (36 shown, 25 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)

- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 45
- Community 46
- Community 48
- Community 50
- Community 51

## God Nodes (most connected - your core abstractions)

1. `cn()` - 127 edges
2. `react` - 50 edges
3. `Button()` - 42 edges
4. `@inertiajs/react` - 39 edges
5. `AppHeader()` - 30 edges
6. `lucide-react` - 28 edges
7. `TestCase` - 27 edges
8. `User` - 26 edges
9. `InputError()` - 26 edges
10. `Input()` - 20 edges

## Surprising Connections (you probably didn't know these)

- `Appearance()` --calls--> `Heading()` [EXTRACTED]
  resources/js/pages/settings/appearance.tsx → resources/js/components/heading.tsx
- `BreadcrumbEllipsis()` --calls--> `cn()` [EXTRACTED]
  resources/js/components/ui/breadcrumb.tsx → resources/js/lib/utils.ts
- `CardFooter()` --calls--> `cn()` [EXTRACTED]
  resources/js/components/ui/card.tsx → resources/js/lib/utils.ts
- `DropdownMenuCheckboxItem()` --calls--> `cn()` [EXTRACTED]
  resources/js/components/ui/dropdown-menu.tsx → resources/js/lib/utils.ts
- `DropdownMenuRadioItem()` --calls--> `cn()` [EXTRACTED]
  resources/js/components/ui/dropdown-menu.tsx → resources/js/lib/utils.ts

## Import Cycles

- None detected.

## Communities (61 total, 25 thin omitted)

### Community 0 - "Community 0"

Cohesion: 0.06
Nodes (68): @inertiajs/react, input-otp, @laravel/passkeys, lucide-react, react, DeleteUser(), Heading(), InputError() (+60 more)

### Community 1 - "Community 1"

Cohesion: 0.06
Nodes (11): CreateNewUser, ResetUserPassword, PasswordValidationRules, ProfileValidationRules, Controller, ProfileController, SecurityController, PasswordUpdateRequest (+3 more)

### Community 2 - "Community 2"

Cohesion: 0.06
Nodes (15): HandleAppearance, HandleInertiaRequests, AppServiceProvider, {closure#1}(), {closure#1}(), {closure#10}(), {closure#2}(), {closure#3}() (+7 more)

### Community 3 - "Community 3"

Cohesion: 0.09
Nodes (19): {closure#1}(), InstallFeaturesCommand, chiselRemoveNpmPackages(), chiselRun(), chiselSkipsNode(), {closure#1}(), {closure#10}(), {closure#11}() (+11 more)

### Community 4 - "Community 4"

Cohesion: 0.14
Nodes (25): AppContent(), Props, AppShell(), Props, AppSidebar(), footerNavItems, mainNavItems, NavFooter() (+17 more)

### Community 5 - "Community 5"

Cohesion: 0.11
Nodes (24): NavUser(), DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem() (+16 more)

### Community 6 - "Community 6"

Cohesion: 0.12
Nodes (24): sonner@^2.0.0, sonner, withApp(), AppearanceToggleTab(), Toaster(), TooltipProvider(), Appearance, applyTheme() (+16 more)

### Community 7 - "Community 7"

Cohesion: 0.15
Nodes (20): AlertError(), AppLogo(), AppLogoIcon(), Props, TwoFactorRecoveryCodes(), Alert(), AlertDescription(), AlertTitle() (+12 more)

### Community 8 - "Community 8"

Cohesion: 0.15
Nodes (24): AppHeader(), mainNavItems, Props, rightNavItems, Avatar(), AvatarFallback(), AvatarImage(), Sheet() (+16 more)

### Community 9 - "Community 9"

Cohesion: 0.07
Nodes (30): dependencies, clsx@^2.1.1, @inertiajs/react@^3.0.0, input-otp@^1.4.2, @laravel/passkeys@^0.2.0, lucide-react@^0.475.0, @radix-ui/react-checkbox@^1.1.4, @radix-ui/react-label@^2.1.2 (+22 more)

### Community 10 - "Community 10"

Cohesion: 0.12
Nodes (11): {closure#1}(), {closure#2}(), {closure#3}(), {closure#1}(), {closure#2}(), {closure#1}(), {closure#2}(), {closure#3}() (+3 more)

### Community 11 - "Community 11"

Cohesion: 0.15
Nodes (23): NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList(), NavigationMenuTrigger(), navigationMenuTriggerStyle (+15 more)

### Community 12 - "Community 12"

Cohesion: 0.08
Nodes (23): concurrently@^10.0.3, @radix-ui/react-avatar@^1.1.3, @radix-ui/react-dialog@^1.1.6, @radix-ui/react-dropdown-menu@^2.1.6, tailwind-merge@^3.0.1, tw-animate-css@^1.4.0, vite@npm:@voidzero-dev/vite-plus-core@1.4.0, engines (+15 more)

### Community 13 - "Community 13"

Cohesion: 0.10
Nodes (20): runs-on, steps, jobs, ci, name, on, pull_request, push (+12 more)

### Community 14 - "Community 14"

Cohesion: 0.16
Nodes (5): RegistrationTest, DashboardTest, ExampleTest, TestCase, ExampleTest

### Community 15 - "Community 15"

Cohesion: 0.11
Nodes (19): @inertiajs/vite@^3.0.0, laravel-vite-plugin@^3.0.0, @tailwindcss/vite@^4.1.11, @vitejs/plugin-react@^6.1.1, devDependencies, babel-plugin-react-compiler@^1.0.0, @laravel/vite-plugin-wayfinder@^0.1.3, @rolldown/plugin-babel@^0.2.3 (+11 more)

### Community 16 - "Community 16"

Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 17 - "Community 17"

Cohesion: 0.12
Nodes (15): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, module, moduleResolution (+7 more)

### Community 19 - "Community 19"

Cohesion: 0.13
Nodes (15): optionalDependencies, @laravel/multiplex@^0.4.1, lightningcss-linux-x64-gnu@^1.29.1, lightningcss-win32-x64-msvc@^1.29.1, @rollup/rollup-linux-x64-gnu@4.9.5, @rollup/rollup-win32-x64-msvc@4.9.5, @tailwindcss/oxide-linux-x64-gnu@^4.0.1, @tailwindcss/oxide-win32-x64-msvc@^4.0.1 (+7 more)

### Community 21 - "Community 21"

Cohesion: 0.31
Nodes (11): AppSidebarHeader(), Breadcrumbs(), Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage() (+3 more)

### Community 22 - "Community 22"

Cohesion: 0.20
Nodes (8): IsCurrentOrParentUrlFn, IsCurrentUrlFn, useCurrentUrl(), UseCurrentUrlReturn, WhenCurrentUrlFn, SettingsLayout(), sidebarNavItems, toUrl()

### Community 23 - "Community 23"

Cohesion: 0.15
Nodes (13): scripts, ci:check, dev, lint, lint:check, post-autoload-dump, post-create-project-cmd, post-root-package-install (+5 more)

### Community 24 - "Community 24"

Cohesion: 0.22
Nodes (5): {closure#1}(), PasswordConfirmationTest, {closure#1}(), {closure#1}(), {closure#2}()

### Community 26 - "Community 26"

Cohesion: 0.21
Nodes (11): class-variance-authority@^0.7.1, @radix-ui/react-toggle@^1.1.2, @radix-ui/react-toggle-group@^1.1.2, class-variance-authority, @radix-ui/react-toggle, @radix-ui/react-toggle-group, ToggleGroup(), ToggleGroupContext (+3 more)

### Community 27 - "Community 27"

Cohesion: 0.17
Nodes (11): autoload-dev, psr-4, description, keywords, license, minimum-stability, name, prefer-stable (+3 more)

### Community 28 - "Community 28"

Cohesion: 0.17
Nodes (11): default-days, patterns, github-actions, interval, updates, cooldown, directory, groups (+3 more)

### Community 30 - "Community 30"

Cohesion: 0.22
Nodes (7): SelectContent(), SelectItem(), SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton(), SelectSeparator(), SelectTrigger()

### Community 31 - "Community 31"

Cohesion: 0.22
Nodes (9): Auth, Passkey, TwoFactorSecretKey, TwoFactorSetupData, User, InertiaConfig, @inertiajs/core, InputHTMLAttributes (+1 more)

### Community 32 - "Community 32"

Cohesion: 0.20
Nodes (10): require-dev, fakerphp/faker, larastan/larastan, laravel/pail, laravel/pao, laravel/pint, laravel/sail, mockery/mockery (+2 more)

### Community 33 - "Community 33"

Cohesion: 0.22
Nodes (9): require, inertiajs/inertia-laravel, laravel/ai, laravel/chisel, laravel/fortify, laravel/framework, laravel/tinker, laravel/wayfinder (+1 more)

### Community 35 - "Community 35"

Cohesion: 0.28
Nodes (3): PlaceholderPattern(), PlaceholderPatternProps, Dashboard()

### Community 36 - "Community 36"

Cohesion: 0.29
Nodes (7): pestphp/pest-plugin, php-http/discovery, config, allow-plugins, optimize-autoloader, preferred-install, sort-packages

### Community 38 - "Community 38"

Cohesion: 0.29
Nodes (7): scripts, build, build:ssr, check, check:fix, dev, types:check

### Community 42 - "Community 42"

Cohesion: 0.40
Nodes (5): autoload, psr-4, App\\, Database\\Factories\\, Database\\Seeders\\

### Community 43 - "Community 43"

Cohesion: 0.40
Nodes (5): extra, laravel, post-create-project, dont-discover, installer

### Community 46 - "Community 46"

Cohesion: 0.50
Nodes (4): @radix-ui/react-slot@^1.2.3, @radix-ui/react-slot, Badge(), badgeVariants

## Knowledge Gaps

- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 11` to `Community 0`, `Community 4`, `Community 5`, `Community 6`, `Community 7`, `Community 8`, `Community 46`, `Community 21`, `Community 22`, `Community 26`, `Community 30`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.055979330708661415 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Community 0` to `Community 35`, `Community 4`, `Community 5`, `Community 6`, `Community 7`, `Community 8`, `Community 9`, `Community 11`, `Community 12`, `Community 46`, `Community 21`, `Community 22`, `Community 26`, `Community 30`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06015037593984962 - nodes in this community are weakly interconnected._
- **Why does `@inertiajs/react` connect `Community 0` to `Community 35`, `Community 4`, `Community 5`, `Community 6`, `Community 7`, `Community 8`, `Community 9`, `Community 12`, `Community 21`, `Community 22`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05805515239477504 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.09041835357624832 - nodes in this community are weakly interconnected._
