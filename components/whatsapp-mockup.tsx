import { Check } from "lucide-react";

export function WhatsappMockup() {
  return (
    <div
      aria-hidden="true"
      className="w-full max-w-sm rounded-2xl border border-line bg-white p-4 shadow-[0_1px_2px_rgba(14,21,36,0.04),0_12px_32px_rgba(14,21,36,0.08)]"
    >
      <div className="flex items-center gap-2 border-b border-line pb-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-signal text-sm font-semibold text-ink">
          PC
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">Perfect Computers</p>
          <p className="text-xs text-muted">Typically replies within an hour</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-paper px-3 py-2 text-sm text-ink">
          Hi, I saw your website. I need an online store for my shop.
        </div>
        <div className="ml-auto flex max-w-[85%] flex-col items-end gap-1">
          <div className="rounded-2xl rounded-tr-sm bg-signal/10 px-3 py-2 text-sm text-ink">
            Sure, let&apos;s talk about your store. What are you selling?
          </div>
          <span className="flex items-center gap-0.5 pr-1 text-muted">
            <Check className="h-3 w-3" strokeWidth={2.5} />
            <Check className="-ml-1.5 h-3 w-3" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </div>
  );
}
