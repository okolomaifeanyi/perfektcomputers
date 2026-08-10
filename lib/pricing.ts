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
    description: "A real website that's easy to find and easy to trust.",
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
    description:
      "Everything in Starter, plus a way to actually get paid online.",
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
    description:
      "Everything in Standard, plus your own app to grow with you.",
    features: [
      "Everything in Standard",
      "Native or cross-platform mobile app",
      "Play Store publishing",
      "Ongoing build support",
    ],
  },
];
