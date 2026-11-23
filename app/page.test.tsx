import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import Home from "@/app/page";

describe("Home page", () => {
  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  }, 15000);

  it("places the approved About copy between Work and Process", () => {
    const { getByRole } = render(<Home />);
    const about = getByRole("region", { name: "About Ifeanyi" });
    expect(about.previousElementSibling).toHaveAttribute("id", "work");
    expect(about.nextElementSibling).toHaveAttribute("id", "process");
    expect(about.querySelector("p")).toHaveTextContent(
      "I’m Ifeanyi Okoloma, a full-stack developer based in Nigeria. My work includes building venue discovery for Savanna Spot and fixing payment and wallet flows for Cometake. I’m open to remote frontend and full-stack roles.",
    );
  });

  it("has exactly one h1", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });
});
