import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { starterPrice, proPrice } from "@/lib/pricing";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} | Websites & Apps for Nigerian Businesses`,
  description:
    "Full-stack web and mobile developer building business websites, online stores, and apps for Nigerian small businesses, with Paystack and VTU integration experience.",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.name,
    description:
      "Websites and apps that get your business found, and paid. Chat on WhatsApp for a fixed quote.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: "Websites and apps that get your business found, and paid.",
  },
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  url: siteConfig.url,
  telephone: `+${siteConfig.whatsappNumber}`,
  email: siteConfig.email,
  areaServed: "Nigeria",
  priceRange: `${starterPrice}–${proPrice.replace("From ", "")}+`,
  description:
    "Full-stack web and mobile development, payment and VTU integration for Nigerian small businesses.",
};
