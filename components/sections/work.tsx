import Image from "next/image";
import { ExternalLink, Sparkles } from "lucide-react";
import { caseStudies } from "@/lib/case-studies";

const featuredIds = ["cometake", "savanna-spot", "ijsr", "savanna-spot-hub"];
const featuredWork = featuredIds.flatMap((id) =>
  caseStudies.filter((study) => study.id === id)
);
const moreWork = [
  ...caseStudies.filter(
    (study) => !featuredIds.includes(study.id) && study.id !== "perfektscore"
  ),
  ...caseStudies.filter((study) => study.id === "perfektscore"),
];

export function Work() {
  return (
    <section
      id="work"
      className="scroll-mt-32 bg-paper py-20 md:scroll-mt-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-baseline gap-3">
          <h2 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
            Work
          </h2>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-deep/30 bg-gold/5 px-3 py-1 font-mono text-xs text-gold-deep">
            {caseStudies.length} shipped
          </span>
        </div>
        <span
          aria-hidden="true"
          className="mt-4 block h-0.5 w-12 bg-gold-deep"
        />
        <p className="mt-4 max-w-[60ch] text-pretty text-base text-muted">
          From online stores to real-time platforms.
        </p>
        {[
          { label: null, studies: featuredWork },
          { label: "More work", studies: moreWork },
        ].map(({ label, studies }) => (
          <div key={label ?? "featured"} className="mt-12">
            {label ? (
              <h3 className="mb-6 text-2xl font-semibold text-fg">{label}</h3>
            ) : null}
            <div
              className={`reveal-stagger grid gap-6 sm:grid-cols-2 ${label ? "lg:grid-cols-3" : ""}`}
            >
              {studies.map((study) => {
                const Title = label ? "h4" : "h3";
                return (
                  <article
                    key={study.id}
                    id={`project-${study.id}`}
                    className="reveal-on-scroll group flex scroll-mt-32 flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-[0_1px_2px_rgba(14,21,36,0.04)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-gold-deep/30 hover:shadow-[0_16px_36px_rgba(138,106,29,0.16)] md:scroll-mt-20 dark:shadow-none dark:hover:shadow-none"
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
                          !label
                            ? "(min-width: 1024px) 50vw, 100vw"
                            : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        }
                        className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <Title className="text-lg font-semibold text-fg">
                        {study.title}
                      </Title>
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
                            <ExternalLink
                              className="h-3.5 w-3.5"
                              strokeWidth={1.5}
                            />
                          </a>
                        ) : null}
                        {study.relatedLink ? (
                          <figure className="w-full max-w-64">
                            <Image
                              src={study.relatedLink.image.src}
                              alt={study.relatedLink.image.alt}
                              width={study.relatedLink.image.width}
                              height={study.relatedLink.image.height}
                              sizes="(max-width: 320px) calc(100vw - 5rem), 256px"
                              className="h-auto w-full rounded-lg border border-line"
                            />
                            <figcaption className="mt-2">
                              <a
                                href={study.relatedLink.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-fit items-center gap-1 rounded-md text-sm font-medium text-gold-deep underline decoration-gold-deep/40 underline-offset-4 transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/60"
                              >
                                {study.relatedLink.label}
                                <ExternalLink
                                  className="h-3.5 w-3.5 shrink-0"
                                  strokeWidth={1.5}
                                />
                              </a>
                            </figcaption>
                          </figure>
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
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
