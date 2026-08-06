import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/hero";
import { siteConfig } from "@/lib/site-config";

describe("Hero", () => {
  it("renders the headline as the page's h1", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Websites & Apps That Get Your Business Found, and Paid"
    );
  });

  it("renders a WhatsApp CTA that links to the configured wa.me address", () => {
    render(<Hero />);
    const cta = screen.getByRole("link", { name: /chat on whatsapp/i });
    expect(cta).toHaveAttribute("href", siteConfig.whatsappLink);
  });
});
