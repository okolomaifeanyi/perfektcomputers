import { Check } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function WhatsappMockup() {
  return (
    <div
      aria-hidden="true"
      className="w-full rounded-2xl border border-line bg-surface p-4 shadow-[0_2px_4px_rgba(14,21,36,0.04),0_20px_48px_rgba(14,21,36,0.12)] dark:shadow-none"
    >
      <div className="flex items-center gap-2 border-b border-line pb-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-signal text-sm font-semibold text-ink">
          PC
        </span>
        <div>
          <p className="text-sm font-semibold text-fg">{siteConfig.name}</p>
          <p className="text-xs text-muted">Typically replies within an hour</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-paper px-3 py-2 text-sm text-fg">
          Hi, I saw your website. I need an online store for my shop.
        </div>
        <div className="ml-auto flex max-w-[85%] flex-col items-end gap-1">
          <div className="rounded-2xl rounded-tr-sm bg-signal/10 px-3 py-2 text-sm text-fg">
            Sure, let&apos;s talk about your store. What are you selling?
          </div>
          <span className="flex items-center gap-1 pr-1 text-[10px] text-muted">
            10:42
            <span className="flex items-center">
              <Check className="h-3 w-3" strokeWidth={2.5} />
              <Check className="-ml-1.5 h-3 w-3" strokeWidth={2.5} />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
