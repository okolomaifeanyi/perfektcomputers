import { describe, it, expect } from "vitest";
import { caseStudies } from "@/lib/case-studies";

describe("caseStudies", () => {
  it("has the full portfolio set with the added projects", () => {
    expect(caseStudies).toHaveLength(13);
    const ids = caseStudies.map((s) => s.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        "cometake",
        "ijsr",
        "savanna-spot",
        "marketplace",
        "perfektscore",
        "yunivax",
        "kaiserlowe-ugo",
        "yunikstarz",
        "savanna-spot-hub",
        "weather-forecast-app",
        "advanced-calculator",
        "event-update",
        "inventory-lite",
      ]),
    );
    expect(ids[0]).toBe("cometake");
  });

  it("gives every case study the fields the Work section depends on", () => {
    for (const study of caseStudies) {
      expect(study.id).toBeTruthy();
      expect(study.title).toBeTruthy();
      expect(study.problem).toBeTruthy();
      expect(study.whatWasBuilt).toBeTruthy();
      expect(study.standoutDetail).toBeTruthy();
      expect(study.techStack.length).toBeGreaterThan(0);
      expect(study.imageSrc).toMatch(/^\/case-studies\//);
      expect(study.imageAlt).toBeTruthy();
      expect(study.imageWidth).toBeGreaterThan(0);
      expect(study.imageHeight).toBeGreaterThan(0);
      if (study.url !== undefined) {
        expect(study.url).toMatch(/^https:\/\//);
      }
    }
  });

  it("labels the archived football project and keeps the Savanna Spot projects distinct", () => {
    const byId = Object.fromEntries(caseStudies.map((s) => [s.id, s]));
    expect(byId["perfektscore"].tagline).toMatch(/live demo offline/i);
    expect(byId["savanna-spot"].title).toBe("Savanna Spot");
    expect(byId["savanna-spot-hub"].title).toBe("Savanna Spot Hub");
  });

  it("uses distinct project URLs and omits the archived demo link", () => {
    const byId = Object.fromEntries(caseStudies.map((s) => [s.id, s.url]));
    expect(byId["cometake"]).toBe("https://cometake.net");
    expect(byId["ijsr"]).toBe("https://www.ijsrjournal.com/");
    expect(byId["marketplace"]).toBe("https://perfektmart.com.ng");
    expect(byId["savanna-spot"]).toBe("https://www.savannaspot.com/");
    expect(byId["perfektscore"]).toBeUndefined();
    expect(byId["yunivax"]).toBe("https://yunivax.netlify.app");
    expect(byId["kaiserlowe-ugo"]).toBe("https://kaiserlowe.netlify.app");
    expect(byId["yunikstarz"]).toBe("https://yunikstarz.netlify.app");
    expect(byId["savanna-spot-hub"]).toBe("https://hub.savannaspot.com/");
    expect(byId["weather-forecast-app"]).toBe(
      "https://weather-forecasted-now.netlify.app",
    );
    expect(byId["advanced-calculator"]).toBe(
      "https://advanced-calcalator.netlify.app",
    );
    expect(byId["event-update"]).toBe("https://gl-event.netlify.app");
    expect(byId["inventory-lite"]).toBe("https://inventory-lite.netlify.app");
  });

  it("marks exactly two case studies as featured for the varied-size grid", () => {
    const featured = caseStudies.filter((s) => s.featured);
    expect(featured).toHaveLength(2);
    expect(featured.map((s) => s.id).sort()).toEqual([
      "perfektscore",
      "savanna-spot",
    ]);
  });
});
