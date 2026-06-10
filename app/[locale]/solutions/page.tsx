import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { getMarkets, getSolutions } from "@/lib/routes";
import { type Locale } from "@/lib/site";

export const dynamic = "force-dynamic";

export default function SolutionsPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale === "en" ? "en" : "zh";
  const isZh = locale === "zh";
  const items = getSolutions();
  const markets = getMarkets();

  return (
    <main className="min-h-screen bg-mist">
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5">
          <Link href={`/${locale}`}><BrandLogo /></Link>
          <Link href={`/${locale}/products`} className="text-sm font-semibold text-ink hover:text-gold">{isZh ? "产品中心" : "Products"}</Link>
        </div>
      </header>
      <section className="bg-ink px-5 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">{isZh ? "解决方案" : "Solutions"}</div>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold md:text-5xl">{isZh ? "按场景进入产品、资料和询价" : "Enter Products, Documents, and Quotes by Scenario"}</h1>
          <p className="mt-5 max-w-2xl leading-8 text-white/70">{isZh ? "每个方案页都会继续下钻到适用行业、产品分类和采购需求。" : "Each solution links to markets, product categories, and quote workflows."}</p>
        </div>
      </section>
      <section className="px-5 py-10">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {items.map((item) => (
            <Link key={item.key} href={`/${locale}/solutions/${item.key}`} className="group rounded-md border border-ink/10 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-gold">
              <Building2 className="h-8 w-8 text-gold" />
              <h2 className="mt-5 text-xl font-semibold text-ink">{isZh ? item.zh : item.en}</h2>
              <p className="mt-3 min-h-24 leading-7 text-steel">{isZh ? item.descZh : item.descEn}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink group-hover:text-gold">
                {isZh ? "进入方案" : "Open solution"} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
        <div className="mx-auto mt-8 grid max-w-7xl gap-4 md:grid-cols-4">
          {markets.map((market) => (
            <Link key={market.key} href={`/${locale}/solutions/${market.key}`} className="rounded-md border border-ink/10 bg-white p-5 text-sm font-semibold text-ink hover:border-gold hover:text-gold">
              {isZh ? market.zh : market.en}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
