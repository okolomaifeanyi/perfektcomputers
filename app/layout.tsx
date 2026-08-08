import type { Metadata } from "next";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} | Websites & Apps for Nigerian Businesses`,
  description:
    "Full-stack web and mobile developer building business websites, online stores, and apps for Nigerian small businesses, with Paystack and VTU integration experience.",
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

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  areaServed: "NG",
  description:
    "Full-stack web and mobile development, payment and VTU integration for Nigerian small businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body
        className="bg-paper font-sans text-ink antialiased"
        suppressHydrationWarning
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function () {
            try {
              var stored = localStorage.getItem("theme");
              if (stored === "light" || stored === "dark") {
                document.documentElement.setAttribute("data-theme", stored);
              }
            } catch (e) {}
          })();`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
