import Link from "next/link";
import {
  Boxes,
  FileCheck2,
  LayoutDashboard,
  MessageSquareText,
  Settings,
  UsersRound,
  type LucideIcon
} from "lucide-react";
import { AdminProductsManager } from "@/components/admin-products-manager";
import { BrandLogo } from "@/components/brand-logo";
import type { Locale } from "@/lib/site";

export default function AdminProductsPage({ params }: { params: { locale: Locale } }) {
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
          {nav.map(([Icon, label, href]) => (
            <Link
              key={label}
              href={href}
              className={`flex h-11 w-full items-center gap-3 rounded-md px-3 text-sm font-medium ${
                href.endsWith("/products")
                  ? "bg-gold text-ink"
                  : "text-white/72 hover:bg-white/10 hover:text-white"
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
          <div>
            <h1 className="text-xl font-semibold text-ink md:text-2xl">
              {isZh ? "产品管理" : "Product Management"}
            </h1>
            <p className="mt-1 text-sm text-steel">
              {isZh ? "新增、编辑、上下架和删除产品。" : "Create, edit, publish, archive, and delete products."}
            </p>
          </div>
          <Link
            href={`/${params.locale}/admin`}
            className="rounded-md border border-ink/10 px-4 py-2 text-sm font-semibold text-ink"
          >
            {isZh ? "返回仪表盘" : "Back to dashboard"}
          </Link>
        </header>
        <div className="p-5 lg:p-8">
          <AdminProductsManager />
        </div>
      </section>
    </main>
  );
}
