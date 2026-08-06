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
    description: "Your site goes live, and you get everything you need to run it.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="border-t border-line bg-paper py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          How it works
        </h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-4">
          {steps.map((step) => (
            <li key={step.number}>
              <span className="font-mono text-3xl font-semibold text-indigo">
                {step.number}
              </span>
              <h3 className="mt-3 text-base font-semibold text-ink">
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
