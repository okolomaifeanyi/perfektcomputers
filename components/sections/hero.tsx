import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { WhatsappMockup } from "@/components/whatsapp-mockup";
import { WaveDivider } from "@/components/wave-divider";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden scroll-mt-20 pb-16 pt-12 md:pb-24 md:pt-16"
    >
      <div className="relative z-10 mx-auto max-w-7xl grid items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <div>
          <h1 className="animate-fade-in-up text-balance text-4xl font-semibold tracking-tight text-fg sm:text-5xl md:text-6xl">
            Websites &amp; Apps That Get Your Business Found, and Paid
          </h1>
          <p className="animate-fade-in-up mt-6 max-w-[46ch] text-pretty text-base text-muted [animation-delay:120ms] sm:text-lg">
            Full-stack web and mobile development, with Paystack and VTU
            integration experience.
          </p>
          <div className="animate-fade-in-up mt-8 [animation-delay:240ms]">
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants(),
                "h-12 rounded-full bg-gold px-8 text-base text-ink hover:bg-gold/90 active:scale-[0.98]"
              )}
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <div className="relative isolate flex justify-center md:justify-end">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 m-auto h-64 w-64 rounded-full bg-gold/20 blur-3xl md:h-80 md:w-80"
          />
          <div className="animate-fade-in-up w-full max-w-sm [animation-delay:360ms] md:max-w-md">
            <WhatsappMockup />
          </div>
        </div>
      </div>
      <WaveDivider />
    </section>
  );
}
