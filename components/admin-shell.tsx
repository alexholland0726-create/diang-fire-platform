import Link from "next/link";
import {
  Boxes,
  FileCheck2,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Settings,
  UsersRound,
  type LucideIcon
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import type { Locale } from "@/lib/site";

type AdminShellProps = {
  locale: Locale;
  active: "dashboard" | "products" | "inquiries" | "customers" | "content" | "settings";
  title: string;
  description: string;
  children: React.ReactNode;
};

export function AdminShell({ locale, active, title, description, children }: AdminShellProps) {
  const isZh = locale !== "en";
  const nav: Array<[AdminShellProps["active"], LucideIcon, string, string]> = [
    ["dashboard", LayoutDashboard, isZh ? "仪表盘" : "Dashboard", `/${locale}/admin`],
    ["products", Boxes, isZh ? "产品管理" : "Products", `/${locale}/admin/products`],
    ["inquiries", MessageSquareText, isZh ? "询价管理" : "Inquiries", `/${locale}/admin/inquiries`],
    ["customers", UsersRound, isZh ? "客户管理" : "Customers", `/${locale}/admin`],
    ["content", FileCheck2, isZh ? "内容与资料" : "Content", `/${locale}/admin`],
    ["settings", Settings, isZh ? "系统设置" : "Settings", `/${locale}/admin`]
  ];

  return (
    <main className="min-h-screen bg-mist">
      <aside className="fixed inset-y-0 left-0 hidden w-72 bg-ink px-5 py-6 text-white lg:block">
        <Link href={`/${locale}`}>
          <BrandLogo inverse />
        </Link>
        <nav className="mt-10 space-y-2">
          {nav.map(([key, Icon, label, href]) => (
            <Link
              key={key}
              href={href}
              className={`flex h-11 w-full items-center gap-3 rounded-md px-3 text-sm font-medium ${
                active === key ? "bg-gold text-ink" : "text-white/72 hover:bg-white/10 hover:text-white"
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
            <h1 className="text-xl font-semibold text-ink md:text-2xl">{title}</h1>
            <p className="mt-1 text-sm text-steel">{description}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link href={`/${locale}`} className="rounded-md border border-ink/10 px-4 py-2 text-sm font-semibold text-ink">
              {isZh ? "查看网站" : "View site"}
            </Link>
            <form action="/api/admin/logout" method="post">
              <button className="inline-flex h-10 items-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white">
                <LogOut className="h-4 w-4" />
                {isZh ? "退出" : "Logout"}
              </button>
            </form>
          </div>
        </header>
        <div className="p-5 lg:p-8">{children}</div>
      </section>
    </main>
  );
}
