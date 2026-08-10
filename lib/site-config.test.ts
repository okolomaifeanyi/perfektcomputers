import { describe, it, expect } from "vitest";
import { siteConfig } from "@/lib/site-config";

describe("siteConfig", () => {
  it("exposes the business name", () => {
    expect(siteConfig.name).toBe("Perfekt Computers");
  });

  it("exposes the WhatsApp deep link built from the configured number", () => {
    expect(siteConfig.whatsappNumber).toBe("2349030658008");
    expect(siteConfig.whatsappLink).toBe(
      `https://wa.me/${siteConfig.whatsappNumber}`
    );
  });

  it("exposes the canonical site URL", () => {
    expect(siteConfig.url).toBe("https://perfektcomputers.com.ng");
  });

  it("exposes the contact email", () => {
    expect(siteConfig.email).toBe("hello@perfektcomputers.com.ng");
  });
});
