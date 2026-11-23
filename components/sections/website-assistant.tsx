import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function WebsiteAssistant() {
  return (
    <section
      aria-labelledby="website-assistant"
      className="border-t border-line bg-paper py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <span className="inline-flex rounded-md bg-gold/10 px-2 py-1 text-xs font-medium text-gold-deep">
          Optional add-on
        </span>
        <h2
          id="website-assistant"
          className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
        >
          Website AI Assistant
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Give visitors quick answers to common questions, guide them to the
          right service, and hand off to your team on WhatsApp. We set it up
          with information you approve. Setup and monthly usage are quoted
          separately, with a usage limit agreed upfront.
        </p>
        <a
          href={siteConfig.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants(),
            "mt-6 h-auto min-h-11 rounded-full bg-gold px-3 py-2 text-ink hover:bg-gold/90"
          )}
        >
          Chat on WhatsApp
        </a>
      </div>
    </section>
  );
}
