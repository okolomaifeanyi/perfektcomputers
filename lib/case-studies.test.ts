import { describe, it, expect } from "vitest";
import { caseStudies } from "@/lib/case-studies";

describe("caseStudies", () => {
  it("has exactly the 6 case studies from the brief", () => {
    expect(caseStudies).toHaveLength(6);
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
    }
  });

  it("marks exactly two case studies as featured for the varied-size grid", () => {
    const featured = caseStudies.filter((s) => s.featured);
    expect(featured).toHaveLength(2);
    expect(featured.map((s) => s.id).sort()).toEqual([
      "savannah-spot",
      "yunivax-sports",
    ]);
  });
});
