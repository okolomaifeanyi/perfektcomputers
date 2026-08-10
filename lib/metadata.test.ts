import { describe, it, expect } from "vitest";
import { metadata, localBusinessJsonLd } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

describe("metadata", () => {
  it("points the canonical tag at the production URL", () => {
    expect(metadata.alternates).toEqual({ canonical: siteConfig.url });
  });
});

describe("localBusinessJsonLd", () => {
  it("identifies the business with name, url, and contact details", () => {
    expect(localBusinessJsonLd.name).toBe(siteConfig.name);
    expect(localBusinessJsonLd.url).toBe(siteConfig.url);
    expect(localBusinessJsonLd.telephone).toBe(
      `+${siteConfig.whatsappNumber}`
    );
    expect(localBusinessJsonLd.email).toBe(siteConfig.email);
  });

  it("describes area served in plain text and a price range spanning the tiers", () => {
    expect(localBusinessJsonLd.areaServed).toBe("Nigeria");
    expect(localBusinessJsonLd.priceRange).toBe("₦180,000–₦950,000+");
  });
});
