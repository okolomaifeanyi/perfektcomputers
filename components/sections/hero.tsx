import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { WhatsappMockup } from "@/components/whatsapp-mockup";

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-16 pt-12 sm:px-6 md:pb-24 md:pt-16 lg:px-8"
    >
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-6xl">
            Websites &amp; Apps That Get Your Business Found, and Paid
          </h1>
          <p className="mt-6 max-w-[46ch] text-base text-muted sm:text-lg">
            Full-stack web and mobile development, with Paystack and VTU
            integration experience.
          </p>
          <div className="mt-8">
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
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <WhatsappMockup />
        </div>
      </div>
    </section>
  );
}
