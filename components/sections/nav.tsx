import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#pricing", label: "Pricing" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur supports-backdrop-filter:bg-paper/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/60"
        >
          <Image
            src="/logo.png"
            alt={siteConfig.name}
            width={823}
            height={815}
            priority
            className="h-11 w-11 object-contain"
          />
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md text-sm font-medium text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/60"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={siteConfig.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants(),
            "rounded-full bg-gold text-ink hover:bg-gold/90 active:scale-[0.98]"
          )}
        >
          Chat on WhatsApp
        </a>
      </div>
    </header>
  );
}
