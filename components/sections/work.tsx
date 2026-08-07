import Image from "next/image";
import { Sparkles } from "lucide-react";
import { caseStudies } from "@/lib/case-studies";

export function Work() {
  return (
    <section id="work" className="scroll-mt-20 bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Work
        </h2>
        <p className="mt-3 max-w-[60ch] text-pretty text-sm text-muted">
          Six shipped projects, from online stores to real-time platforms.
        </p>
        <div className="reveal-stagger mt-10 grid grid-flow-row-dense gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <article
              key={study.id}
              className={`reveal-on-scroll group flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_2px_rgba(14,21,36,0.04)] transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-indigo/30 hover:shadow-[0_16px_36px_rgba(56,84,230,0.14)] ${
                study.featured ? "sm:col-span-2" : ""
              }`}
            >
              <div
                className="relative w-full overflow-hidden bg-paper"
                style={{
                  aspectRatio: `${study.imageWidth} / ${study.imageHeight}`,
                }}
              >
                <Image
                  src={study.imageSrc}
                  alt={study.imageAlt}
                  fill
                  sizes={
                    study.featured
                      ? "(min-width: 1024px) 66vw, 100vw"
                      : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  }
                  className="object-contain transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-ink">
                  {study.title}
                </h3>
                {study.tagline ? (
                  <p className="mt-1 text-sm italic text-muted">
                    {study.tagline}
                  </p>
                ) : null}
                <p className="mt-3 text-sm text-muted">{study.problem}</p>
                <p className="mt-2 text-sm font-medium text-ink">
                  {study.whatWasBuilt}
                </p>
                <p className="mt-3 flex items-start gap-1.5 text-sm text-indigo">
                  <Sparkles
                    className="mt-0.5 h-3.5 w-3.5 shrink-0"
                    strokeWidth={1.5}
                  />
                  {study.standoutDetail}
                </p>
                <ul
                  className="mt-auto flex flex-wrap gap-2 pt-4 font-mono text-xs text-muted"
                  aria-label={`${study.title} tech stack`}
                >
                  {study.techStack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-line px-2 py-1"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
