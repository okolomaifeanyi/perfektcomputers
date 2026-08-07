import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pricingTiers } from "@/lib/pricing";
import { siteConfig } from "@/lib/site-config";

export function Pricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-t border-line bg-paper py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Pricing
        </h2>
        <p className="mt-3 max-w-[60ch] text-sm text-muted">
          Starting prices below. Every project gets a fixed quote after a quick
          consultation.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col rounded-xl border p-6 ${
                tier.featured
                  ? "border-indigo bg-white shadow-[0_1px_2px_rgba(14,21,36,0.04),0_16px_40px_rgba(56,84,230,0.12)] sm:-mt-4 sm:mb-4"
                  : "border-line bg-white"
              }`}
            >
              {tier.featured ? (
                <span className="mb-3 inline-flex w-fit items-center rounded-md bg-indigo/10 px-2 py-1 text-xs font-medium text-indigo">
                  Most popular
                </span>
              ) : null}
              <h3 className="text-lg font-semibold text-ink">{tier.name}</h3>
              <p className="mt-2 font-mono text-3xl font-semibold text-ink">
                {tier.price}
              </p>
              <p className="mt-2 text-sm text-muted">{tier.description}</p>
              <ul className="mt-6 flex flex-1 flex-col gap-2">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-ink"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-indigo"
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
                    ? "bg-indigo text-white hover:bg-indigo/90"
                    : // Override the outline variant's shared `hover:bg-muted
                      // hover:text-foreground`: our --muted is a dark slate used for
                      // secondary text, so that default fill fails contrast here.
                      "hover:bg-indigo/5 hover:text-ink"
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
