const steps = [
  {
    number: "1",
    title: "Consultation",
    description: "We talk through what you need and what success looks like.",
  },
  {
    number: "2",
    title: "Fixed quote & timeline",
    description:
      "You get a clear price and delivery date before any work starts.",
  },
  {
    number: "3",
    title: "Build with check-ins",
    description:
      "Regular updates as the site or app comes together, not a black box.",
  },
  {
    number: "4",
    title: "Launch + handover",
    description:
      "Your site goes live, and you get everything you need to run it.",
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
    <section id="process" className="scroll-mt-20 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          How it works
        </h2>
        <ol className="mt-10 grid gap-10 sm:grid-cols-4 sm:gap-8">
          {steps.map((step, index) => (
            <li key={step.number}>
              <div className="flex items-center gap-4">
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 font-mono text-lg font-semibold text-gold-deep">
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
              <h3 className="mt-4 text-base font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
