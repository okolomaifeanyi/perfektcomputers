import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Work } from "@/components/sections/work";
import { Process } from "@/components/sections/process";
import { Pricing } from "@/components/sections/pricing";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-surface focus:px-4 focus:py-3 focus:text-fg focus:ring-2 focus:ring-gold-deep"
      >
        Skip to content
      </a>
      <Nav />
      <main
        id="main-content"
        tabIndex={-1}
        className="scroll-mt-32 md:scroll-mt-20"
      >
        <Hero />
        <Services />
        <Work />
        <section
          id="about"
          aria-labelledby="about-ifeanyi"
          className="scroll-mt-32 border-t border-line bg-paper py-20 md:scroll-mt-20 md:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2
              id="about-ifeanyi"
              className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl"
            >
              About Ifeanyi
            </h2>
            <span
              aria-hidden="true"
              className="mt-4 block h-0.5 w-12 bg-gold-deep"
            />
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              I’m Ifeanyi Okoloma, a full-stack developer based in Nigeria. I
              build and maintain web products, from the interfaces customers use
              to the systems that keep payments and publishing working.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              At Savanna Spot, I’ve worked on venue discovery and a community
              hub. On Cometake, I’ve investigated payment and wallet issues,
              including cases where a successful payment didn’t update the
              customer’s balance. I’ve also worked on publishing workflows for
              IJSR Journal. I’m open to remote frontend and full-stack roles.
            </p>
          </div>
        </section>
        <Process />
        <Pricing />
      </main>
      <Contact />
    </>
  );
}
