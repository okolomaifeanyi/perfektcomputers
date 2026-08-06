export interface PricingTier {
  id: string;
  name: string;
  price: string;
  isPlaceholder: true;
  description: string;
  features: string[];
  featured?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: "₦XX,XXX",
    isPlaceholder: true,
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
    price: "₦XXX,XXX",
    isPlaceholder: true,
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
    price: "₦XXX,XXX+",
    isPlaceholder: true,
    description: "A web and mobile app built for growth.",
    features: [
      "Everything in Standard",
      "Native or cross-platform mobile app",
      "Play Store publishing",
      "Ongoing build support",
    ],
  },
];
