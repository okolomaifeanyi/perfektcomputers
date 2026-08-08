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

  it("adapts to dark mode via prefers-color-scheme, never a manual .dark class toggle", () => {
    const css = readFileSync(resolve(__dirname, "globals.css"), "utf-8");
    expect(css).toContain("@media (prefers-color-scheme: dark)");
    expect(css).not.toContain(".dark");
  });

  it("keeps --ink, --gold, and --signal fixed across themes (CTA button contrast depends on this)", () => {
    const css = readFileSync(resolve(__dirname, "globals.css"), "utf-8");
    const darkBlockMatch = css.match(
      /@media \(prefers-color-scheme: dark\) \{[\s\S]*?:root \{([\s\S]*?)\}/
    );
    expect(darkBlockMatch).not.toBeNull();
    const darkBlock = darkBlockMatch![1];
    expect(darkBlock).not.toMatch(/--ink:/);
    expect(darkBlock).not.toMatch(/--gold:/);
    expect(darkBlock).not.toMatch(/--signal:/);
  });
});
