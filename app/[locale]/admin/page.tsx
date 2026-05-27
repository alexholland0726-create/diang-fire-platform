import Link from "next/link";
import {
  Bell,
  Boxes,
  FileCheck2,
  LayoutDashboard,
  MessageSquareText,
  Search,
  Settings,
  UsersRound,
  type LucideIcon
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { dashboardMetrics, type Locale } from "@/lib/site";

export default function AdminPage({ params }: { params: { locale: Locale } }) {
  const isZh = params.locale !== "en";
  const nav: Array<[LucideIcon, string, string]> = [
    [LayoutDashboard, isZh ? "仪表盘" : "Dashboard", `/${params.locale}/admin`],
    [Boxes, isZh ? "产品管理" : "Products", `/${params.locale}/admin/products`],
    [MessageSquareText, isZh ? "询价管理" : "Inquiries", `/${params.locale}/admin`],
    [UsersRound, isZh ? "客户管理" : "Customers", `/${params.locale}/admin`],
    [FileCheck2, isZh ? "内容与资质" : "Content", `/${params.locale}/admin`],
    [Settings, isZh ? "系统设置" : "Settings", `/${params.locale}/admin`]
  ];

  return (
    <main className="min-h-screen bg-mist">
      <aside className="fixed inset-y-0 left-0 hidden w-72 bg-ink px-5 py-6 text-white lg:block">
        <Link href={`/${params.locale}`}>
          <BrandLogo inverse />
        </Link>
        <nav className="mt-10 space-y-2">
          {nav.map(([Icon, label, href], index) => (
            <Link
              key={label}
              href={href}
              className={`flex h-11 w-full items-center gap-3 rounded-md px-3 text-sm font-medium ${
                index === 0 ? "bg-gold text-ink" : "text-white/72 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="lg:pl-72">
        <header className="flex min-h-20 flex-col items-start justify-between gap-4 border-b border-ink/10 bg-white px-5 py-4 sm:flex-row sm:items-center lg:px-8">
          <div className="min-w-0">
            <h1 className="text-xl font-semibold text-ink md:text-2xl">
              {isZh ? "运营管理后台" : "Operations Admin"}
            </h1>
            <p className="mt-1 text-sm text-steel">
              {isZh ? "产品、询价、客户、内容和SaaS服务统一管理" : "Unified management for products, leads, clients, content, and service"}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button className="grid h-10 w-10 place-items-center rounded-md border border-ink/10">
              <Search className="h-4 w-4" />
            </button>
            <button className="grid h-10 w-10 place-items-center rounded-md border border-ink/10">
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </header>
        <div className="p-5 lg:p-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {dashboardMetrics.map((metric) => (
              <article key={metric.labelZh} className="rounded-md bg-white p-6 shadow-soft">
                <div className="text-sm text-steel">{isZh ? metric.labelZh : metric.labelEn}</div>
                <div className="mt-3 text-3xl font-semibold text-ink">{metric.value}</div>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-md bg-white p-6 shadow-soft">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <h2 className="text-lg font-semibold text-ink">
                  {isZh ? "最近询价" : "Recent Inquiries"}
                </h2>
                <button className="h-10 rounded-md bg-ink px-4 text-sm font-semibold text-white">
                  {isZh ? "导出" : "Export"}
                </button>
              </div>
              <div className="mt-5 overflow-hidden rounded-md border border-ink/10">
                {[
                  ["上海某工业园", "空气呼吸器 12套", "待报价"],
                  ["江苏消防工程公司", "消防服 80套", "跟进中"],
                  ["海外采购商", "灭火器批量询价", "待分配"]
                ].map((row) => (
                  <div key={row[0]} className="grid gap-2 border-b border-ink/10 px-4 py-4 text-sm last:border-b-0 md:grid-cols-3 md:gap-4">
                    <span className="font-medium text-ink">{row[0]}</span>
                    <span className="text-steel">{row[1]}</span>
                    <span className="font-semibold text-gold">{row[2]}</span>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-md bg-white p-6 shadow-soft">
              <h2 className="text-lg font-semibold text-ink">
                {isZh ? "上线前待办" : "Pre-launch Tasks"}
              </h2>
              <ul className="mt-5 space-y-4 text-sm text-steel">
                {(isZh
                  ? ["补充真实产品图片与参数", "配置阿里云OSS上传", "接入邮件通知", "备案后配置HTTPS"]
                  : ["Add product photos and specs", "Configure Alibaba Cloud OSS", "Connect email notifications", "Enable HTTPS after ICP"]
                ).map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
