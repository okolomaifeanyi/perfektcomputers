import { describe, it, expect } from "vitest";
import { pricingTiers } from "@/lib/pricing";

describe("pricingTiers", () => {
  it("has exactly 3 tiers: Starter, Standard, Pro", () => {
    expect(pricingTiers.map((t) => t.id)).toEqual([
      "starter",
      "standard",
      "pro",
    ]);
  });

  it("marks exactly one tier as featured (Standard)", () => {
    const featured = pricingTiers.filter((t) => t.featured);
    expect(featured).toHaveLength(1);
    expect(featured[0].id).toBe("standard");
  });

  it("flags every price as a placeholder pending real rates", () => {
    for (const tier of pricingTiers) {
      expect(tier.isPlaceholder).toBe(true);
      expect(tier.features.length).toBeGreaterThan(0);
    }
  });
});
