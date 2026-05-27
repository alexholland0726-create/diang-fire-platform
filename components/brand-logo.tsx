import { site } from "@/lib/site";

type BrandLogoProps = {
  compact?: boolean;
  inverse?: boolean;
};

export function BrandLogo({ compact = false, inverse = false }: BrandLogoProps) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div
        className={`relative h-10 w-10 shrink-0 overflow-hidden rounded-md border bg-white sm:h-11 sm:w-11 ${
          inverse
            ? "border-white/20 shadow-[0_10px_24px_rgba(0,0,0,0.25)]"
            : "border-ink/10 shadow-[0_10px_24px_rgba(11,23,41,0.18)]"
        }`}
      >
        <img
          src="/brand/da-icon-white.png"
          alt="DA"
          className="h-full w-full object-contain"
        />
      </div>
      {!compact && (
        <div className="min-w-0 leading-tight">
          <div className={`truncate text-sm font-semibold sm:text-base ${inverse ? "text-white" : "text-ink"}`}>
            {site.nameZh}
          </div>
          <div className={`hidden truncate text-xs sm:block ${inverse ? "text-white/65" : "text-steel"}`}>
            {site.nameEn}
          </div>
        </div>
      )}
    </div>
  );
}
