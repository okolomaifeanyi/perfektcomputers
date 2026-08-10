import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pricingTiers } from "@/lib/pricing";
import { siteConfig } from "@/lib/site-config";

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
          Pricing
        </h2>
        <span aria-hidden="true" className="mt-4 block h-0.5 w-12 bg-gold-deep" />
        <p className="mt-4 max-w-[60ch] text-base text-muted">
          Starting prices below. Every project gets a fixed quote after a quick
          consultation.
        </p>
        <div className="reveal-stagger mt-12 grid gap-6 sm:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`reveal-on-scroll flex flex-col rounded-xl border p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 ${
                tier.featured
                  ? "border-gold-deep bg-surface shadow-[0_1px_2px_rgba(14,21,36,0.04),0_16px_40px_rgba(138,106,29,0.14)] hover:shadow-[0_1px_2px_rgba(14,21,36,0.04),0_28px_56px_rgba(138,106,29,0.24)] dark:shadow-none dark:hover:shadow-none sm:-mt-4 sm:mb-4"
                  : "border-line bg-surface shadow-[0_1px_2px_rgba(14,21,36,0.04)] hover:border-gold-deep/30 hover:shadow-[0_16px_36px_rgba(138,106,29,0.16)] dark:shadow-none dark:hover:shadow-none"
              }`}
            >
              {tier.featured ? (
                <span className="mb-3 inline-flex w-fit items-center rounded-md bg-gold/10 px-2 py-1 text-xs font-medium text-gold-deep">
                  Most popular
                </span>
              ) : null}
              <h3 className="text-lg font-semibold text-fg">{tier.name}</h3>
              <p className="mt-2 font-mono text-3xl font-semibold text-fg">
                {tier.price}
              </p>
              {/* min-h reserves 2 lines regardless of actual wrap, so the
               * feature list below starts at the same Y across all three
               * cards - some descriptions wrap to 1 line, others to 2. */}
              <p className="mt-2 min-h-10 text-sm text-muted">
                {tier.description}
              </p>
              <ul className="mt-6 flex flex-1 flex-col gap-2">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-fg"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep"
                      strokeWidth={2}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({
                    variant: tier.featured ? "default" : "outline",
                  }),
                  "mt-6 rounded-full active:scale-[0.98]",
                  tier.featured
                    ? // Bright gold vs white text measures 2.1:1 (fails AA) - ink on
                      // gold measures 8.67:1. See docs/superpowers/specs/2026-08-07-
                      // gold-rebrand-contrast.md. This is a solid, opaque fill, so
                      // --ink (fixed, not theme-adaptive) is correct here in both
                      // themes - see docs/superpowers/specs/2026-08-08-dark-mode-
                      // contrast.md.
                      "bg-gold text-ink hover:bg-gold/90"
                    : // Override the outline variant's shared `hover:bg-muted
                      // hover:text-foreground`: our --muted is a dark slate used for
                      // secondary text, so that default fill fails contrast here.
                      // hover:text-fg (not the fixed --ink): this is a translucent
                      // wash over the ambient page background, not a solid fill, so
                      // the text needs to track the page's adaptive foreground or it
                      // goes dark-on-dark once the page itself turns dark.
                      "hover:bg-gold/5 hover:text-fg"
                )}
              >
                Chat on WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
