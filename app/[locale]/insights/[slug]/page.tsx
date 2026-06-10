import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { getProductCategoryLinks, insightItems } from "@/lib/routes";
import { type Locale } from "@/lib/site";

export const dynamic = "force-dynamic";

export default function InsightDetailPage({ params }: { params: { locale: Locale; slug: string } }) {
  const locale = params.locale === "en" ? "en" : "zh";
  const isZh = locale === "zh";
  const item = insightItems.find((entry) => entry.key === params.slug);

  if (!item) {
    notFound();
  }

  const title = isZh ? item.zh : item.en;

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5">
          <Link href={`/${locale}`}><BrandLogo /></Link>
          <Link href={`/${locale}/insights`} className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-gold"><ArrowLeft className="h-4 w-4" />{isZh ? "知识库" : "Insights"}</Link>
        </div>
      </header>
      <section className="bg-ink px-5 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">{isZh ? "知识库详情" : "Insight Detail"}</div>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold md:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl leading-8 text-white/70">{isZh ? item.descZh : item.descEn}</p>
        </div>
      </section>
      <section className="px-5 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_360px]">
          <article className="rounded-md border border-ink/10 bg-mist p-6">
            <FileText className="h-8 w-8 text-gold" />
            <h2 className="mt-5 text-2xl font-semibold text-ink">{isZh ? "栏目说明" : "Section Notes"}</h2>
            <p className="mt-4 leading-8 text-steel">{isZh ? "这里后续可以沉淀资料、证书、选型文章和服务记录。当前先作为可点击栏目入口，连接到产品分类和询价流程。" : "This section can later hold documents, certificates, guides, and service records. It already links into products and quotes."}</p>
          </article>
          <aside className="rounded-md bg-ink p-6 text-white">
            <h2 className="text-2xl font-semibold">{isZh ? "继续下钻" : "Continue"}</h2>
            <div className="mt-5 space-y-3">
              {getProductCategoryLinks(locale).slice(0, 4).map((link) => (
                <Link key={link.key} href={link.href} className="flex items-center justify-between rounded-md border border-white/12 px-4 py-3 text-sm text-white/76 hover:border-gold hover:text-gold">
                  {link.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
