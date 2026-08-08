import Image from "next/image";
import { ExternalLink, Sparkles } from "lucide-react";
import { caseStudies } from "@/lib/case-studies";

export function Work() {
  return (
    <section id="work" className="scroll-mt-20 bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
          Work
        </h2>
        <p className="mt-3 max-w-[60ch] text-pretty text-base text-muted">
          Five shipped projects, from online stores to real-time platforms.
        </p>
        <div className="reveal-stagger mt-12 grid grid-flow-row-dense gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <article
              key={study.id}
              className={`reveal-on-scroll group flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-[0_1px_2px_rgba(14,21,36,0.04)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-gold-deep/30 hover:shadow-[0_16px_36px_rgba(138,106,29,0.16)] dark:shadow-none dark:hover:shadow-none ${
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
                  className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-fg">{study.title}</h3>
                {study.tagline ? (
                  <p className="mt-1 text-sm italic text-muted">
                    {study.tagline}
                  </p>
                ) : null}
                <p className="mt-3 text-sm text-muted">{study.problem}</p>
                <p className="mt-2 text-sm font-medium text-fg">
                  {study.whatWasBuilt}
                </p>
                <p className="mt-3 flex items-start gap-1.5 text-sm text-gold-deep">
                  <Sparkles
                    className="mt-0.5 h-3.5 w-3.5 shrink-0"
                    strokeWidth={1.5}
                  />
                  {study.standoutDetail}
                </p>
                <div className="mt-auto flex flex-col gap-3 pt-4">
                  {study.url ? (
                    <a
                      href={study.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center gap-1 rounded-md text-sm font-medium text-gold-deep underline decoration-gold-deep/40 underline-offset-4 transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/60"
                    >
                      Visit site
                      <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </a>
                  ) : null}
                  <ul
                    className="flex flex-wrap gap-2 font-mono text-xs text-muted"
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
