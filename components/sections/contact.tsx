import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export function Contact() {
  return (
    <footer
      id="contact"
      className="relative isolate overflow-hidden bg-ink py-16 md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full bg-indigo/20 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Let&apos;s build something that works.
        </h2>
        <p className="mx-auto mt-3 max-w-[46ch] text-sm text-white/70">
          Message us on WhatsApp for a fast reply, or email if you prefer.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants(),
              "h-12 rounded-full bg-signal px-8 text-base text-ink hover:bg-signal/90 active:scale-[0.98]"
            )}
          >
            Chat on WhatsApp
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="rounded-md text-sm text-white/70 underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/60"
          >
            {siteConfig.email}
          </a>
        </div>
        <p className="mt-12 text-xs text-white/60">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
