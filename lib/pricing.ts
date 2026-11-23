// Numeric figures are kept separate from the public "From" labels.
export const starterPrice = "₦180,000";
export const standardPrice = "₦450,000";
export const proPrice = "From ₦950,000";
export const carePlanPrice = "₦25,000/month";
export const carePlanDescription =
  "For routine maintenance and small updates on one site. Includes up to one hour per month for tasks such as text and image changes and routine software updates. We aim to respond within two business days. New features, urgent out-of-hours work and third-party fees are quoted separately.";

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  featured?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: `From ${starterPrice}`,
    description:
      "A mobile-friendly business website with up to five pages, WhatsApp contact and one round of revisions. You supply the text, logo and photos. Your quote lists domain, hosting and renewal costs separately.",
  },
  {
    id: "standard",
    name: "Standard",
    price: `From ${standardPrice}`,
    description:
      "A business website with either a simple online store or a booking flow, Paystack setup and two rounds of revisions. For a store, the starting scope includes one storefront and setup for up to 20 products. For bookings, it includes one booking flow for one location. Payment processing fees are charged separately by the provider. Custom integrations are quoted separately.",
    featured: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: proPrice,
    description:
      "A focused Android app for one core workflow, with Play Store publishing assistance. Your quote sets out the screens and features included. iOS, complex integrations, store fees and ongoing maintenance are quoted separately.",
  },
];
