import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Pricing } from "@/components/sections/pricing";
import { siteConfig } from "@/lib/site-config";

describe("Pricing", () => {
  it("renders three tiers with WhatsApp CTAs linking to the configured wa.me address", () => {
    render(<Pricing />);
    const ctas = screen.getAllByRole("link", { name: /chat on whatsapp/i });
    expect(ctas).toHaveLength(3);
    for (const cta of ctas) {
      expect(cta).toHaveAttribute("href", siteConfig.whatsappLink);
    }
  });

  it("marks exactly one tier as most popular", () => {
    render(<Pricing />);
    expect(screen.getByText("Most popular")).toBeInTheDocument();
  });
});
