// Named constants so the actual figures can be adjusted in one place
// without touching the tier structure below.
export const starterPrice = "₦180,000";
export const standardPrice = "₦450,000";
export const proPrice = "From ₦950,000";
/** Shown under Services (Care Plan), not in the Pricing tiers below. */
export const carePlanPrice = "₦25,000/mo";

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: starterPrice,
    description: "A business website that gets you found online.",
    features: [
      "Up to 5 pages",
      "Mobile-friendly design",
      "WhatsApp contact built in",
      "1 round of revisions",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: standardPrice,
    description: "A website plus a working payment setup.",
    features: [
      "Everything in Starter",
      "Online store or booking flow",
      "Paystack integration",
      "2 rounds of revisions",
    ],
    featured: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: proPrice,
    description: "A web and mobile app built for growth.",
    features: [
      "Everything in Standard",
      "Native or cross-platform mobile app",
      "Play Store publishing",
      "Ongoing build support",
    ],
  },
];
