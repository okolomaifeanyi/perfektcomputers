import {
  Globe,
  RefreshCw,
  ShoppingCart,
  Smartphone,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { carePlanPrice } from "@/lib/pricing";

const standardServices = [
  {
    icon: Globe,
    name: "Business Websites",
    description:
      "Give new customers a reason to trust you before they ever call.",
  },
  {
    icon: ShoppingCart,
    name: "Online Stores",
    description:
      "Get paid instantly — no more chasing 'sent, check your alert.'",
  },
  {
    icon: Smartphone,
    name: "Mobile Apps",
    description: "Show up on their home screen, not just their browser.",
  },
];

const cardTransition =
  "transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]";

// Rotated-square badge, echoing the diamond frame from the hero reference
// image rather than the generic rounded-square icon-in-a-box pattern.
function ServiceIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
      <span
        aria-hidden="true"
        className={`absolute inset-0 m-auto h-7 w-7 rotate-45 rounded-md border border-gold-deep/50 bg-gold/10 group-hover:scale-110 ${cardTransition}`}
      />
      <Icon className="relative h-5 w-5 text-gold-deep" strokeWidth={1.5} />
    </span>
  );
}

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
          Services
        </h2>
        <span aria-hidden="true" className="mt-4 block h-0.5 w-12 bg-gold-deep" />
        <p className="mt-4 max-w-[60ch] text-pretty text-base text-muted">
          Everything a small business needs to get online, take payments, and
          stay running.
        </p>
        <div className="reveal-stagger mt-12 grid gap-4 sm:grid-cols-3">
          {standardServices.map((service) => (
            <div
              key={service.name}
              className={`reveal-on-scroll group rounded-xl bg-paper p-6 shadow-[0_1px_2px_rgba(14,21,36,0.05)] hover:-translate-y-1.5 hover:bg-surface hover:shadow-[0_12px_32px_rgba(138,106,29,0.16)] dark:shadow-none dark:hover:shadow-none ${cardTransition}`}
            >
              <ServiceIcon icon={service.icon} />
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
            <ServiceIcon icon={Wallet} />
            <h3 className="mt-4 text-base font-semibold text-fg">
              Payments &amp; Wallets
            </h3>
            <p className="mt-2 text-sm text-muted">
              Pay, top up, and keep a balance — all in one place.
            </p>
          </div>
          <div
            className={`reveal-on-scroll group rounded-xl border border-gold-deep/30 bg-gold/5 p-6 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(138,106,29,0.20)] dark:shadow-none dark:hover:shadow-none ${cardTransition}`}
          >
            <ServiceIcon icon={RefreshCw} />
            <div className="mt-4 flex items-baseline gap-2">
              <h3 className="text-base font-semibold text-fg">Care Plan</h3>
              <span className="font-mono text-sm text-gold-deep">
                {carePlanPrice}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted">
              If something breaks the night before a big sale, you&apos;re
              not on your own.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
