import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("design tokens", () => {
  it("defines all seven brand color tokens with their approved hex values", () => {
    const css = readFileSync(resolve(__dirname, "globals.css"), "utf-8");
    expect(css).toContain("--paper: #f6f7f9");
    expect(css).toContain("--ink: #0e1524");
    expect(css).toContain("--gold: #d4af37");
    expect(css).toContain("--gold-deep: #8a6a1d");
    expect(css).toContain("--signal: #25d366");
    expect(css).toContain("--muted: #5b6472");
    expect(css).toContain("--line: #e3e6ec");
  });

  it("never defines a .dark override block (dark mode is deferred)", () => {
    const css = readFileSync(resolve(__dirname, "globals.css"), "utf-8");
    expect(css).not.toContain(".dark");
  });
});
