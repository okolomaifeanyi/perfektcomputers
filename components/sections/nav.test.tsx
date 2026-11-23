import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Nav } from "@/components/sections/nav";
import { siteConfig } from "@/lib/site-config";

describe("Nav", () => {
  it("renders a WhatsApp CTA that links to the configured wa.me address", () => {
    render(<Nav />);
    const cta = screen.getByRole("link", { name: /chat on whatsapp/i });
    expect(cta).toHaveAttribute("href", siteConfig.whatsappLink);
  });

  it("renders the primary section anchor links", () => {
    render(<Nav />);
    const primary = within(screen.getByRole("navigation", { name: "Primary" }));
    expect(primary.getByRole("link", { name: "Services" })).toHaveAttribute(
      "href",
      "#services"
    );
    expect(primary.getByRole("link", { name: "Work" })).toHaveAttribute(
      "href",
      "#work"
    );
    expect(primary.getByRole("link", { name: "Pricing" })).toHaveAttribute(
      "href",
      "#pricing"
    );
  });
});
