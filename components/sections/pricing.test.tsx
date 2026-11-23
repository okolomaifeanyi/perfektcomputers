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

  it("shows the approved starting prices and scope restrictions", () => {
    render(<Pricing />);
    expect(
      screen.getByRole("heading", {
        name: "Straightforward pricing for your next website or app",
      })
    ).toBeInTheDocument();
    for (const text of ["From ₦180,000", "From ₦450,000", "From ₦950,000"]) {
      expect(screen.getByText(text)).toBeInTheDocument();
    }
    expect(screen.getByText(/setup for up to 20 products/)).toBeInTheDocument();
    expect(screen.getByText(/iOS, complex integrations/)).toBeInTheDocument();
    expect(screen.queryByText(/Everything in Starter/)).not.toBeInTheDocument();
  });

  it("marks exactly one tier as most popular", () => {
    render(<Pricing />);
    expect(screen.getByText("Most popular")).toBeInTheDocument();
  });
});
