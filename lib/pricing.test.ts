import { describe, it, expect } from "vitest";
import {
  pricingTiers,
  starterPrice,
  standardPrice,
  proPrice,
  carePlanPrice,
} from "@/lib/pricing";

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

  it("gives every tier a real, non-placeholder price and at least one feature", () => {
    for (const tier of pricingTiers) {
      expect(tier.price).toBeTruthy();
      expect(tier.features.length).toBeGreaterThan(0);
    }
  });

  it("uses the named price constants as the real, approved figures", () => {
    expect(starterPrice).toBe("₦180,000");
    expect(standardPrice).toBe("₦450,000");
    expect(proPrice).toBe("From ₦950,000");
    expect(carePlanPrice).toBe("₦25,000/mo");

    const byId = Object.fromEntries(pricingTiers.map((t) => [t.id, t.price]));
    expect(byId["starter"]).toBe(starterPrice);
    expect(byId["standard"]).toBe(standardPrice);
    expect(byId["pro"]).toBe(proPrice);
  });
});
