import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ClipboardList } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { caseItems, getProductCategoryLinks } from "@/lib/routes";
import { type Locale } from "@/lib/site";

export const dynamic = "force-dynamic";

export default function CaseDetailPage({ params }: { params: { locale: Locale; slug: string } }) {
  const locale = params.locale === "en" ? "en" : "zh";
  const isZh = locale === "zh";
  const item = caseItems.find((entry) => entry.key === params.slug);

  if (!item) {
    notFound();
  }

  const title = isZh ? item.zh : item.en;
  const links = getProductCategoryLinks(locale).slice(0, 4);

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5">
          <Link href={`/${locale}`}><BrandLogo /></Link>
          <Link href={`/${locale}/cases`} className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-gold"><ArrowLeft className="h-4 w-4" />{isZh ? "案例" : "Cases"}</Link>
        </div>
      </header>
      <section className="bg-ink px-5 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">{isZh ? "案例详情" : "Case Detail"}</div>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold md:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl leading-8 text-white/70">{isZh ? item.descZh : item.descEn}</p>
        </div>
      </section>
      <section className="px-5 py-10">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          {links.map((link) => (
            <Link key={link.key} href={link.href} className="group rounded-md border border-ink/10 bg-mist p-6 hover:border-gold hover:bg-white">
              <ClipboardList className="h-7 w-7 text-gold" />
              <h2 className="mt-4 text-xl font-semibold text-ink">{link.label}</h2>
              <p className="mt-3 text-sm leading-6 text-steel">{isZh ? "进入相关产品分类，继续选择子类和产品。" : "Open related product category for subcategories and products."}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink group-hover:text-gold">{isZh ? "进入产品" : "Open products"} <ArrowRight className="h-4 w-4" /></span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
