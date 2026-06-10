import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { site, type Locale } from "@/lib/site";

export const dynamic = "force-dynamic";

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale === "en" ? "en" : "zh";
  const isZh = locale === "zh";

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5">
          <Link href={`/${locale}`}><BrandLogo /></Link>
          <Link href={`/${locale}/products`} className="text-sm font-semibold text-ink hover:text-gold">{isZh ? "产品中心" : "Products"}</Link>
        </div>
      </header>
      <section className="bg-ink px-5 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">{isZh ? "关于我们" : "About"}</div>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold md:text-5xl">{isZh ? site.nameZh : site.nameEn}</h1>
          <p className="mt-5 max-w-2xl leading-8 text-white/70">{isZh ? "消防救援装备与工业安全产品采购服务商，提供产品选型、询价、资料和项目跟进。" : "A sourcing service provider for fire rescue equipment and industrial safety products."}</p>
        </div>
      </section>
      <section className="px-5 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_420px]">
          <div className="grid gap-5 md:grid-cols-2">
            {[isZh ? "产品供应" : "Product Supply", isZh ? "方案选型" : "Solution Selection", isZh ? "资料支持" : "Document Support", isZh ? "服务跟进" : "Service Follow-up"].map((item) => (
              <div key={item} className="rounded-md border border-ink/10 bg-mist p-6">
                <ShieldCheck className="h-7 w-7 text-gold" />
                <h2 className="mt-4 text-xl font-semibold text-ink">{item}</h2>
              </div>
            ))}
          </div>
          <aside className="rounded-md bg-ink p-6 text-white">
            <h2 className="text-2xl font-semibold">{isZh ? "联系信息" : "Contact"}</h2>
            <div className="mt-5 space-y-4 text-sm text-white/72">
              <div className="flex gap-3"><Phone className="h-4 w-4 text-gold" />{site.phone} / {site.mobile}</div>
              <div className="flex gap-3"><Mail className="h-4 w-4 text-gold" />{site.email}</div>
              <div className="flex gap-3"><MapPin className="h-4 w-4 text-gold" />{isZh ? site.addressZh : site.addressEn}</div>
            </div>
            <Link href={`/${locale}/inquiry`} className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-gold px-4 text-sm font-bold text-ink">
              {isZh ? "提交需求" : "Submit Request"} <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
