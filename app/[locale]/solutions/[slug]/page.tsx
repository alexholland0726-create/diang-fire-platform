import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { getMarkets, getProductCategoryLinks, getSolutions } from "@/lib/routes";
import { type Locale } from "@/lib/site";

export const dynamic = "force-dynamic";

export default function SolutionDetailPage({ params }: { params: { locale: Locale; slug: string } }) {
  const locale = params.locale === "en" ? "en" : "zh";
  const isZh = locale === "zh";
  const item = [...getSolutions(), ...getMarkets()].find((entry) => entry.key === params.slug);

  if (!item) {
    notFound();
  }

  const title = isZh ? item.zh : item.en;
  const desc = isZh ? item.descZh : item.descEn;
  const categoryLinks = getProductCategoryLinks(locale);

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5">
          <Link href={`/${locale}`}><BrandLogo /></Link>
          <Link href={`/${locale}/solutions`} className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-gold"><ArrowLeft className="h-4 w-4" />{isZh ? "解决方案" : "Solutions"}</Link>
        </div>
      </header>
      <section className="bg-ink px-5 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">{isZh ? "方案详情" : "Solution Detail"}</div>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold md:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl leading-8 text-white/70">{desc}</p>
        </div>
      </section>
      <section className="px-5 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-4 md:grid-cols-2">
            {categoryLinks.map((category) => (
              <Link key={category.key} href={category.href} className="group rounded-md border border-ink/10 bg-mist p-5 transition hover:border-gold hover:bg-white">
                <CheckCircle2 className="h-5 w-5 text-gold" />
                <h2 className="mt-4 text-xl font-semibold text-ink">{category.label}</h2>
                <p className="mt-3 text-sm leading-6 text-steel">{isZh ? "进入该产品分类，继续查看产品和子类。" : "Open this category for products and subcategories."}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink group-hover:text-gold">{isZh ? "查看分类" : "View category"} <ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
          <aside className="rounded-md bg-ink p-6 text-white">
            <h2 className="text-2xl font-semibold">{isZh ? "下一步" : "Next Step"}</h2>
            <p className="mt-4 leading-7 text-white/70">{isZh ? "选择产品分类，或直接提交该方案的采购需求。" : "Choose a product category or submit a sourcing request for this solution."}</p>
            <Link href={`/${locale}/inquiry?category=${encodeURIComponent(title)}`} className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-gold px-4 text-sm font-bold text-ink">
              {isZh ? "提交方案需求" : "Submit Request"} <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
