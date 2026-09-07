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
        "savannah-spot",
        "marketplace",
        "perfektscore",
        "yunivax",
        "kaiserlowe-ugo",
        "yunikstarz",
        "perfekthub",
        "weather-forecast-app",
        "advanced-calculator",
        "event-update",
        "inventory-lite",
      ]),
    );
    expect(ids).toContain("perfektscore");
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

  it("links each live project to its real URL", () => {
    const byId = Object.fromEntries(caseStudies.map((s) => [s.id, s.url]));
    expect(byId["cometake"]).toBe("https://cometake.net");
    expect(byId["ijsr"]).toBe("https://ijsrjournal.com");
    expect(byId["marketplace"]).toBe("https://perfektmart.com.ng");
    expect(byId["savannah-spot"]).toBe("https://savannaspot.com");
    expect(byId["perfektscore"]).toBe("https://perfektscore.vercel.app");
    expect(byId["yunivax"]).toBe("https://yunivax.netlify.app");
    expect(byId["kaiserlowe-ugo"]).toBe("https://kaiserlowe.netlify.app");
    expect(byId["yunikstarz"]).toBe("https://yunikstarz.netlify.app");
    expect(byId["perfekthub"]).toBe("https://perfekthub.vercel.app");
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
      "savannah-spot",
    ]);
  });
});
