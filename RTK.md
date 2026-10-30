# RTK - Rust Token Killer

RTK is installed globally for Codex and its `PreToolUse` hook automatically compresses supported shell commands. It is useful when command output would otherwise be large or repetitive.

The user should not need to request RTK by name. Run supported commands normally so the hook can rewrite them; do not manually double-wrap them. Use native commands when exact output matters.

## How RTK Fits With Graphify

Graphify is the project map. Use it first for codebase understanding, locating implementation areas, architectural questions, and source-change planning.

RTK is the output filter. The global Codex hook applies it after Graphify when supported shell commands are still needed and their output is expected to be noisy.

If a task involves both codebase understanding and shell output, run Graphify first, then run follow-up commands such as status, diff, search, tests, logs, build, and lint normally. If the hook is unavailable, the explicit RTK wrappers below are a fallback.

## Explicit fallback when the hook is unavailable

```bash
rtk git status
rtk git diff
rtk rg "pattern" .
rtk find "*.tsx" web/src
rtk ls -la
rtk npm run build
rtk test npm test
rtk test php artisan test
rtk docker ps
rtk docker logs <container>
```

## Avoid RTK For

- `graphify query`, `graphify path`, `graphify explain`, and `graphify update`
- exact full file reads
- exact diagnostics where truncated output could hide relevant lines
- commands where the user explicitly asks to see raw output
- short deterministic commands where filtering adds no value

Use the native command for exact output. Use `rtk proxy <cmd>` only when raw passthrough plus RTK tracking is useful.

## Useful Checks

```bash
rtk --version
rtk gain
rtk discover
rtk rewrite "git status"
```
