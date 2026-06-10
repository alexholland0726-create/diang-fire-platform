import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { insightItems } from "@/lib/routes";
import { type Locale } from "@/lib/site";

export const dynamic = "force-dynamic";

export default function InsightsPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale === "en" ? "en" : "zh";
  const isZh = locale === "zh";

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
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">{isZh ? "知识库" : "Insights"}</div>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold md:text-5xl">{isZh ? "资料、选型和服务记录入口" : "Documents, Selection, and Service Knowledge"}</h1>
        </div>
      </section>
      <section className="px-5 py-10">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {insightItems.map((item) => (
            <Link key={item.key} href={`/${locale}/insights/${item.key}`} className="group rounded-md border border-ink/10 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-gold">
              <FileText className="h-8 w-8 text-gold" />
              <h2 className="mt-5 text-xl font-semibold text-ink">{isZh ? item.zh : item.en}</h2>
              <p className="mt-3 min-h-24 leading-7 text-steel">{isZh ? item.descZh : item.descEn}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink group-hover:text-gold">{isZh ? "进入栏目" : "Open"} <ArrowRight className="h-4 w-4" /></span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
