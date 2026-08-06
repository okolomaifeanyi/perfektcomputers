import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("design tokens", () => {
  it("defines all six brand color tokens with their approved hex values", () => {
    const css = readFileSync(resolve(__dirname, "globals.css"), "utf-8");
    expect(css).toContain("--paper: #F6F7F9");
    expect(css).toContain("--ink: #0E1524");
    expect(css).toContain("--indigo: #3854E6");
    expect(css).toContain("--signal: #25D366");
    expect(css).toContain("--muted: #5B6472");
    expect(css).toContain("--line: #E3E6EC");
  });

  it("never defines a .dark override block (dark mode is deferred)", () => {
    const css = readFileSync(resolve(__dirname, "globals.css"), "utf-8");
    expect(css).not.toContain(".dark");
  });
});
