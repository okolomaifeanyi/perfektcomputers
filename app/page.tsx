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
      <Nav />
      <main>
        <Hero />
        <Services />
        <Work />
        <section
          aria-labelledby="about-ifeanyi"
          className="border-t border-line bg-paper py-20 md:py-28"
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
              I’m Ifeanyi Okoloma, a full-stack developer based in Nigeria. My
              work includes building venue discovery for Savanna Spot and fixing
              payment and wallet flows for Cometake. I’m open to remote frontend
              and full-stack roles.
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
