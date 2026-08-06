import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Contact } from "@/components/sections/contact";
import { siteConfig } from "@/lib/site-config";

describe("Contact", () => {
  it("renders a WhatsApp CTA that links to the configured wa.me address", () => {
    render(<Contact />);
    const cta = screen.getByRole("link", { name: /chat on whatsapp/i });
    expect(cta).toHaveAttribute("href", siteConfig.whatsappLink);
  });

  it("renders a mailto link with the configured email", () => {
    render(<Contact />);
    const emailLink = screen.getByRole("link", { name: siteConfig.email });
    expect(emailLink).toHaveAttribute("href", `mailto:${siteConfig.email}`);
  });
});
