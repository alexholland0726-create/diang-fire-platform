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

  return (
    <AdminShell
      locale={params.locale}
      active="dashboard"
      title={isZh ? "运营管理后台" : "Operations Admin"}
      description={isZh ? "产品、询价、客户和网站内容统一管理。" : "Unified management for products, leads, clients, and content."}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["产品总数", String(products.length)],
          ["已上架产品", String(publishedProducts)],
          ["询价总数", String(inquiries.length)],
          ["新询价", String(newInquiries)]
        ].map(([label, value]) => (
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
            {[
              [Boxes, "产品管理", "新增、编辑、上传图片、上下架产品", `/${params.locale}/admin/products`],
              [MessageSquareText, "询价管理", "查看客户采购需求并更新跟进状态", `/${params.locale}/admin/inquiries`],
              [UploadCloud, "图片上传", "在产品编辑时上传产品图片", `/${params.locale}/admin/products`],
              [ShieldCheck, "登录保护", "后台和管理接口已开启登录保护", `/${params.locale}/admin`]
            ].map(([Icon, title, desc, href]) => {
              const LucideIcon = Icon as typeof Boxes;
              return (
                <Link
                  key={String(title)}
                  href={String(href)}
                  className="group rounded-md border border-ink/10 p-5 hover:border-gold"
                >
                  <LucideIcon className="h-5 w-5 text-gold" />
                  <h3 className="mt-4 font-semibold text-ink">{String(title)}</h3>
                  <p className="mt-2 text-sm leading-6 text-steel">{String(desc)}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                    进入
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="rounded-md bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-ink">最近询价</h2>
            <Link href={`/${params.locale}/admin/inquiries`} className="text-sm font-semibold text-gold">
              查看全部
            </Link>
          </div>
          <div className="mt-5 overflow-hidden rounded-md border border-ink/10">
            {inquiries.slice(0, 5).length ? (
              inquiries.slice(0, 5).map((item) => (
                <div key={item.id} className="grid gap-2 border-b border-ink/10 px-4 py-4 text-sm last:border-b-0 md:grid-cols-[1fr_1fr_auto]">
                  <span className="font-medium text-ink">{item.company || item.contactName}</span>
                  <span className="text-steel">{item.category || "未选分类"}</span>
                  <span className="font-semibold text-gold">{item.status === "NEW" ? "新线索" : "已跟进"}</span>
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-sm text-steel">暂无询价。</div>
            )}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
