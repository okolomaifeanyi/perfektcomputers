import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const siteUrl = "https://perfectcomputers.com.ng";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Perfect Computers | Websites & Apps for Nigerian Businesses",
  description:
    "Full-stack web and mobile developer building business websites, online stores, and apps for Nigerian small businesses, with Paystack and VTU integration experience.",
  openGraph: {
    title: "Perfect Computers",
    description:
      "Websites and apps that get your business found, and paid. Chat on WhatsApp for a fixed quote.",
    url: siteUrl,
    siteName: "Perfect Computers",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Perfect Computers",
    description: "Websites and apps that get your business found, and paid.",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Perfect Computers",
  url: siteUrl,
  email: "ifeanyiokoloma@gmail.com",
  areaServed: "NG",
  description:
    "Full-stack web and mobile development, payment and VTU integration for Nigerian small businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-paper font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
