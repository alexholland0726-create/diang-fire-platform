import Link from "next/link";
import { ArrowRight, Boxes, MessageSquareText, ShieldCheck, UploadCloud } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { requireAdminPage } from "@/lib/auth";
import { listInquiries, listProducts } from "@/lib/db";
import type { Locale } from "@/lib/site";

export default function AdminPage({ params }: { params: { locale: Locale } }) {
  requireAdminPage(params.locale);

  const isZh = params.locale !== "en";
  const products = listProducts();
  const inquiries = listInquiries();
  const newInquiries = inquiries.filter((item) => item.status === "NEW").length;
  const publishedProducts = products.filter((item) => item.status === "PUBLISHED").length;

  const metrics = [
    [isZh ? "产品总数" : "Total Products", String(products.length)],
    [isZh ? "已上架产品" : "Published Products", String(publishedProducts)],
    [isZh ? "询价总数" : "Total Inquiries", String(inquiries.length)],
    [isZh ? "新询价" : "New Inquiries", String(newInquiries)]
  ];

  const quickLinks = [
    [Boxes, isZh ? "产品管理" : "Products", isZh ? "新增、编辑、上传图片、上下架产品" : "Create, edit, upload images, publish, and archive products", `/${params.locale}/admin/products`],
    [MessageSquareText, isZh ? "询价管理" : "Inquiries", isZh ? "查看客户采购需求并更新跟进状态" : "Review customer sourcing requests and update follow-up status", `/${params.locale}/admin/inquiries`],
    [UploadCloud, isZh ? "图片上传" : "Image Upload", isZh ? "在产品编辑时上传产品图片" : "Upload product images while editing products", `/${params.locale}/admin/products`],
    [ShieldCheck, isZh ? "登录保护" : "Login Protection", isZh ? "后台和管理接口已开启登录保护" : "Admin pages and APIs are protected by login", `/${params.locale}/admin`]
  ] as const;

  return (
    <AdminShell
      locale={params.locale}
      active="dashboard"
      title={isZh ? "运营管理后台" : "Operations Admin"}
      description={isZh ? "产品、询价、客户和网站内容统一管理。" : "Unified management for products, leads, clients, and content."}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map(([label, value]) => (
          <article key={label} className="rounded-md bg-white p-6 shadow-soft">
            <div className="text-sm text-steel">{label}</div>
            <div className="mt-3 text-3xl font-semibold text-ink">{value}</div>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-md bg-white p-6 shadow-soft">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-ink">快捷入口</h2>
              <p className="mt-1 text-sm text-steel">常用管理功能集中在这里。</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {quickLinks.map(([Icon, title, desc, href]) => (
              <Link
                key={String(title)}
                href={String(href)}
                className="group rounded-md border border-ink/10 p-5 hover:border-gold"
              >
                <Icon className="h-5 w-5 text-gold" />
                <h3 className="mt-4 font-semibold text-ink">{String(title)}</h3>
                <p className="mt-2 text-sm leading-6 text-steel">{String(desc)}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                  {isZh ? "进入" : "Open"}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-md bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-ink">最近询价</h2>
            <Link href={`/${params.locale}/admin/inquiries`} className="text-sm font-semibold text-gold">
              {isZh ? "查看全部" : "View all"}
            </Link>
          </div>
          <div className="mt-5 overflow-hidden rounded-md border border-ink/10">
            {inquiries.slice(0, 5).length ? (
              inquiries.slice(0, 5).map((item) => (
                <div key={item.id} className="grid gap-2 border-b border-ink/10 px-4 py-4 text-sm last:border-b-0 md:grid-cols-[1fr_1fr_auto]">
                  <span className="font-medium text-ink">{item.company || item.contactName}</span>
                  <span className="text-steel">{item.category || (isZh ? "未选分类" : "No category")}</span>
                  <span className="font-semibold text-gold">{item.status === "NEW" ? (isZh ? "新线索" : "New") : (isZh ? "已跟进" : "Followed")}</span>
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-sm text-steel">{isZh ? "暂无询价。" : "No inquiries yet."}</div>
            )}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
