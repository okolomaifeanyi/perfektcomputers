import {
  Globe,
  RefreshCw,
  ShoppingCart,
  Smartphone,
  Wallet,
} from "lucide-react";

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

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Services
        </h2>
        <p className="mt-3 max-w-[60ch] text-pretty text-sm text-muted">
          Everything a small business needs to get online, take payments, and
          stay running.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {standardServices.map((service) => (
            <div
              key={service.name}
              className="rounded-xl bg-paper p-6 shadow-[0_1px_2px_rgba(14,21,36,0.05)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo/10">
                <service.icon
                  className="h-5 w-5 text-indigo"
                  strokeWidth={1.5}
                />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">
                {service.name}
              </h3>
              <p className="mt-2 text-sm text-muted">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-paper p-6 shadow-[0_1px_2px_rgba(14,21,36,0.05)] sm:col-span-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo/10">
              <Wallet className="h-5 w-5 text-indigo" strokeWidth={1.5} />
            </span>
            <h3 className="mt-4 text-base font-semibold text-ink">
              Payments &amp; Wallets
            </h3>
            <p className="mt-2 text-sm text-muted">
              Paystack integration, in-app wallets, and VTU airtime and data
              top-up.
            </p>
          </div>
          <div className="rounded-xl border border-indigo/30 bg-indigo/5 p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo/10">
              <RefreshCw className="h-5 w-5 text-indigo" strokeWidth={1.5} />
            </span>
            <h3 className="mt-4 text-base font-semibold text-ink">Care Plan</h3>
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
