import {
  Globe,
  RefreshCw,
  ShoppingCart,
  Smartphone,
  Wallet,
} from "lucide-react";
import { carePlanPrice } from "@/lib/pricing";

const standardServices = [
  {
    icon: Globe,
    name: "Business Websites",
    description:
      "Landing pages and company sites that make a strong first impression.",
  },
  {
    icon: ShoppingCart,
    name: "Online Stores",
    description: "Full e-commerce storefronts with Paystack checkout built in.",
  },
  {
    icon: Smartphone,
    name: "Mobile Apps",
    description: "Android and iOS apps, including Play Store publishing.",
  },
];

const cardTransition =
  "transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]";

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
          Services
        </h2>
        <p className="mt-3 max-w-[60ch] text-pretty text-base text-muted">
          Everything a small business needs to get online, take payments, and
          stay running.
        </p>
        <div className="reveal-stagger mt-12 grid gap-4 sm:grid-cols-3">
          {standardServices.map((service) => (
            <div
              key={service.name}
              className={`reveal-on-scroll group rounded-xl bg-paper p-6 shadow-[0_1px_2px_rgba(14,21,36,0.05)] hover:-translate-y-1.5 hover:bg-surface hover:shadow-[0_12px_32px_rgba(138,106,29,0.16)] dark:shadow-none dark:hover:shadow-none ${cardTransition}`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 group-hover:scale-110 ${cardTransition}`}
              >
                <service.icon
                  className="h-5 w-5 text-gold-deep"
                  strokeWidth={1.5}
                />
              </span>
              <h3 className="mt-4 text-base font-semibold text-fg">
                {service.name}
              </h3>
              <p className="mt-2 text-sm text-muted">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="reveal-stagger mt-4 grid gap-4 sm:grid-cols-3">
          <div
            className={`reveal-on-scroll group rounded-xl bg-paper p-6 shadow-[0_1px_2px_rgba(14,21,36,0.05)] hover:-translate-y-1.5 hover:bg-surface hover:shadow-[0_12px_32px_rgba(138,106,29,0.16)] dark:shadow-none dark:hover:shadow-none sm:col-span-2 ${cardTransition}`}
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 group-hover:scale-110 ${cardTransition}`}
            >
              <Wallet className="h-5 w-5 text-gold-deep" strokeWidth={1.5} />
            </span>
            <h3 className="mt-4 text-base font-semibold text-fg">
              Payments &amp; Wallets
            </h3>
            <p className="mt-2 text-sm text-muted">
              Paystack integration, in-app wallets, and VTU airtime and data
              top-up.
            </p>
          </div>
          <div
            className={`reveal-on-scroll group rounded-xl border border-gold-deep/30 bg-gold/5 p-6 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(138,106,29,0.20)] dark:shadow-none dark:hover:shadow-none ${cardTransition}`}
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 group-hover:scale-110 ${cardTransition}`}
            >
              <RefreshCw className="h-5 w-5 text-gold-deep" strokeWidth={1.5} />
            </span>
            <div className="mt-4 flex items-baseline gap-2">
              <h3 className="text-base font-semibold text-fg">Care Plan</h3>
              <span className="font-mono text-sm text-gold-deep">
                {carePlanPrice}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted">
              A small monthly fee keeps your site updated, backed up, and
              supported.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
