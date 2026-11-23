import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "1",
    title: "Consultation",
    description:
      "We discuss your goals, what customers need to do, and what to build first.",
  },
  {
    number: "2",
    title: "Fixed quote & timeline",
    description:
      "You get a fixed quote that sets out the scope, delivery timeline, and any recurring costs.",
  },
  {
    number: "3",
    title: "Build with check-ins",
    description:
      "You get progress updates and a preview to review before launch.",
  },
  {
    number: "4",
    title: "Launch + handover",
    description:
      "We launch the project and hand over access and instructions to run it.",
  },
];

// Plain CSS classes (see globals.css), one per fixed step, matching the
// existing .animate-fade-in-up convention. Kept as literal strings so
// Tailwind never has to statically discover a runtime-computed class name.
const stepPulseClasses = [
  "animate-step-pulse-1",
  "animate-step-pulse-2",
  "animate-step-pulse-3",
  "animate-step-pulse-4",
];

export function Process() {
  return (
    <section id="process" className="scroll-mt-20 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
          How it works
        </h2>
        <span
          aria-hidden="true"
          className="mt-4 block h-0.5 w-12 bg-gold-deep"
        />
        <ol className="mt-12 grid gap-10 sm:grid-cols-4 sm:gap-8">
          {steps.map((step, index) => (
            <li key={step.number}>
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 font-mono text-lg font-semibold text-gold-deep"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 rounded-full bg-gold/25 opacity-0 ${stepPulseClasses[index]}`}
                  />
                  <span className="relative">{step.number}</span>
                </span>
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="hidden h-px flex-1 bg-line sm:block"
                  />
                ) : null}
              </div>
              <h3 className="mt-4 text-base font-semibold text-fg">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
        <a
          href={siteConfig.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants(),
            "mt-8 h-auto min-h-11 rounded-full bg-gold px-4 py-2 text-ink hover:bg-gold/90"
          )}
        >
          Get a fixed quote
        </a>
      </div>
    </section>
  );
}
