import Image from "next/image";
import { caseStudies } from "@/lib/case-studies";

export function Work() {
  return (
    <section id="work" className="border-t border-line bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Work
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <article
              key={study.id}
              className={`flex flex-col overflow-hidden rounded-xl border border-line bg-white ${
                study.featured ? "sm:col-span-2" : ""
              }`}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={study.imageSrc}
                  alt={study.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
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
                <p className="mt-2 text-sm text-ink">{study.whatWasBuilt}</p>
                <p className="mt-2 text-sm text-indigo">
                  {study.standoutDetail}
                </p>
                <ul
                  className="mt-4 flex flex-wrap gap-2 font-mono text-xs text-muted"
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
