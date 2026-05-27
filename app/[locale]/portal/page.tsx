import Link from "next/link";
import {
  AlertTriangle,
  ClipboardList,
  FileDown,
  HardHat,
  Wrench,
  type LucideIcon
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import type { Locale } from "@/lib/site";

export default function PortalPage({ params }: { params: { locale: Locale } }) {
  const isZh = params.locale !== "en";
  const cards: Array<[LucideIcon, string, string]> = [
    [ClipboardList, isZh ? "我的询价与报价" : "My Quotes", "6"],
    [HardHat, isZh ? "项目/站点" : "Projects", "3"],
    [Wrench, isZh ? "维保记录" : "Maintenance", "14"],
    [AlertTriangle, isZh ? "告警事件" : "Alarm Events", "2"],
    [FileDown, isZh ? "资料下载" : "Documents", "28"]
  ];

  return (
    <main className="min-h-screen bg-mist">
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex min-h-20 max-w-7xl flex-col items-start justify-between gap-3 px-5 py-4 sm:flex-row sm:items-center">
          <Link href={`/${params.locale}`} className="min-w-0">
            <BrandLogo />
          </Link>
          <Link
            href={`/${params.locale}/inquiry`}
            className="rounded-md bg-gold px-4 py-2 text-sm font-semibold text-ink"
          >
            {isZh ? "新增采购需求" : "New Request"}
          </Link>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="rounded-md bg-ink p-6 text-white md:p-8">
          <div className="text-sm uppercase tracking-[0.18em] text-gold">Client Portal</div>
          <h1 className="mt-3 text-2xl font-semibold md:text-3xl">
            {isZh ? "客户中心" : "Customer Service Portal"}
          </h1>
          <p className="mt-4 max-w-3xl text-white/70">
            {isZh
              ? "客户可集中查看询价、报价、项目站点、设备台账、维保记录、告警事件和资料文件。"
              : "Clients can review quotes, projects, asset lists, maintenance records, alarm events, and documents in one place."}
          </p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {cards.map(([Icon, label, value]) => (
            <article key={String(label)} className="rounded-md bg-white p-6 shadow-soft">
              <Icon className="h-7 w-7 text-gold" />
              <div className="mt-5 text-3xl font-semibold text-ink">{String(value)}</div>
              <div className="mt-2 text-sm text-steel">{String(label)}</div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
