import { Globe, RefreshCw, ShoppingCart, Smartphone, Wallet } from "lucide-react";

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
    <section id="services" className="border-t border-line bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Services
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {standardServices.map((service) => (
            <div
              key={service.name}
              className="rounded-xl border border-line bg-white p-6"
            >
              <service.icon className="h-6 w-6 text-indigo" strokeWidth={1.5} />
              <h3 className="mt-4 text-base font-semibold text-ink">
                {service.name}
              </h3>
              <p className="mt-2 text-sm text-muted">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-line bg-white p-6 sm:col-span-2">
            <Wallet className="h-6 w-6 text-indigo" strokeWidth={1.5} />
            <h3 className="mt-4 text-base font-semibold text-ink">
              Payments &amp; Wallets
            </h3>
            <p className="mt-2 text-sm text-muted">
              Paystack integration, in-app wallets, and VTU airtime and data
              top-up.
            </p>
          </div>
          <div className="rounded-xl border border-indigo/30 bg-indigo/5 p-6">
            <RefreshCw className="h-6 w-6 text-indigo" strokeWidth={1.5} />
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
