import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("design tokens", () => {
  it("defines all light-mode brand color tokens with their approved hex values", () => {
    const css = readFileSync(resolve(__dirname, "globals.css"), "utf-8");
    expect(css).toContain("--paper: #f6f7f9");
    expect(css).toContain("--surface: #ffffff");
    expect(css).toContain("--ink: #0e1524");
    expect(css).toContain("--fg: #0e1524");
    expect(css).toContain("--gold: #d4af37");
    expect(css).toContain("--gold-deep: #8a6a1d");
    expect(css).toContain("--signal: #25d366");
    expect(css).toContain("--muted: #5b6472");
    expect(css).toContain("--line: #e3e6ec");
  });

  it("adapts to dark mode via prefers-color-scheme by default, with a [data-theme] attribute override for the manual toggle - never a .dark class", () => {
    const css = readFileSync(resolve(__dirname, "globals.css"), "utf-8");
    expect(css).toContain("@media (prefers-color-scheme: dark)");
    expect(css).toContain('[data-theme="dark"]');
    expect(css).toContain('[data-theme="light"]');
    expect(css).not.toContain(".dark");
  });

  it("keeps --ink, --gold, and --signal fixed across themes, in both the system-preference and explicit-override dark blocks (CTA button contrast depends on this)", () => {
    const css = readFileSync(resolve(__dirname, "globals.css"), "utf-8");

    const systemDarkMatch = css.match(
      /@media \(prefers-color-scheme: dark\) \{[\s\S]*?:root:not\(\[data-theme="light"\]\) \{([\s\S]*?)\n  \}/
    );
    expect(systemDarkMatch).not.toBeNull();
    const systemDarkBlock = systemDarkMatch![1];
    expect(systemDarkBlock).not.toMatch(/--ink:/);
    expect(systemDarkBlock).not.toMatch(/--gold:/);
    expect(systemDarkBlock).not.toMatch(/--signal:/);

    const explicitDarkMatch = css.match(
      /:root\[data-theme="dark"\] \{([\s\S]*?)\n\}/
    );
    expect(explicitDarkMatch).not.toBeNull();
    const explicitDarkBlock = explicitDarkMatch![1];
    expect(explicitDarkBlock).not.toMatch(/--ink:/);
    expect(explicitDarkBlock).not.toMatch(/--gold:/);
    expect(explicitDarkBlock).not.toMatch(/--signal:/);
  });
});
