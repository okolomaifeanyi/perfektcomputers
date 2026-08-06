import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function Contact() {
  return (
    <footer id="contact" className="bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Let&apos;s build something that works.
        </h2>
        <p className="mx-auto mt-3 max-w-[46ch] text-sm text-white/70">
          Message us on WhatsApp for a fast reply, or email if you prefer.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <Button
            render={
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            size="lg"
            className="rounded-full bg-signal px-8 text-base text-white hover:bg-signal/90 active:scale-[0.98]"
          >
            Chat on WhatsApp
          </Button>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-sm text-white/70 underline underline-offset-4 hover:text-white"
          >
            {siteConfig.email}
          </a>
        </div>
        <p className="mt-12 text-xs text-white/40">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
