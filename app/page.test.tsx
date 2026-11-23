import { describe, it, expect } from "vitest";
import { render, within } from "@testing-library/react";
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
    const paragraphs = about.querySelectorAll("p");
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0]).toHaveTextContent(
      "I’m Ifeanyi Okoloma, a full-stack developer based in Nigeria. I build and maintain web products, from the interfaces customers use to the systems that keep payments and publishing working."
    );
    expect(paragraphs[1]).toHaveTextContent(
      "At Savanna Spot, I’ve worked on venue discovery and a community hub. On Cometake, I’ve investigated payment and wallet issues, including cases where a successful payment didn’t update the customer’s balance. I’ve also worked on publishing workflows for IJSR Journal. I’m open to remote frontend and full-stack roles."
    );
  });

  it("links to About between Work and Pricing in the primary navigation", () => {
    const { getByRole } = render(<Home />);
    const nav = getByRole("navigation", { name: "Primary" });
    const links = [...nav.querySelectorAll("a")];
    expect(links.map((link) => link.textContent?.trim())).toEqual([
      "Services",
      "Work",
      "About",
      "Pricing",
    ]);
    const about = getByRole("region", { name: "About Ifeanyi" });
    expect(links[2]).toHaveAttribute("href", "#about");
    expect(about).toHaveAttribute("id", "about");
  });

  it("links the public NCP catalogue within the IJSR case study", () => {
    const { getByRole } = render(<Home />);
    const card = getByRole("heading", { name: "IJSR Journal" }).closest(
      "article"
    );
    expect(card).not.toBeNull();
    const links = within(card!);
    expect(links.getByRole("link", { name: "Visit site" })).toHaveAttribute(
      "href",
      "https://www.ijsrjournal.com/"
    );
    expect(
      links.getByRole("link", { name: "Explore Noble City Publishers (NCP)" })
    ).toHaveAttribute("href", "https://www.ijsrjournal.com/ncp");
    expect(
      links.getByRole("img", {
        name: "International Journal of Spectrum Research homepage with journal title and mission statement",
      })
    ).toBeInTheDocument();
    expect(
      links.getByRole("img", {
        name: "Noble City Publishers sample journal page for the Journal of Digital Enterprise and Sustainable Management",
      })
    ).toBeInTheDocument();
  });

  it("puts Skip to content first and targets programmatically focusable main", () => {
    const { container, getByRole } = render(<Home />);
    const skip = getByRole("link", { name: "Skip to content" });
    expect(container.querySelector("a")).toBe(skip);
    expect(skip).toHaveAttribute("href", "#main-content");
    const main = getByRole("main");
    expect(main).toHaveAttribute("id", "main-content");
    expect(main).toHaveAttribute("tabindex", "-1");
  });

  it("keeps all four narrow navigation links and their section targets", () => {
    const { container, getByRole } = render(<Home />);
    const narrow = getByRole("navigation", { name: "Sections" });
    const links = within(narrow).getAllByRole("link");
    expect(links.map((link) => link.textContent)).toEqual([
      "Services",
      "Work",
      "About",
      "Pricing",
    ]);
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "#services",
      "#work",
      "#about",
      "#pricing",
    ]);
    for (const link of links) {
      expect(link).toHaveClass("min-h-11");
      expect(container.querySelector(link.getAttribute("href")!)).toHaveClass(
        "scroll-mt-32",
        "md:scroll-mt-20"
      );
    }
  });

  it("shows the optional AI add-on directly after pricing", () => {
    const { getByRole } = render(<Home />);
    const addOn = getByRole("region", { name: "Website AI Assistant" });
    expect(addOn.previousElementSibling).toHaveAttribute("id", "pricing");
    expect(addOn).toHaveTextContent("Optional add-on");
    expect(addOn).toHaveTextContent(/usage limit agreed upfront/);
    expect(
      within(addOn).getByRole("link", { name: "Chat on WhatsApp" })
    ).toHaveAttribute("href", "https://wa.me/2349030658008");
  });

  it("has exactly one h1", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });
});
