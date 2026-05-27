import Link from "next/link";
import { Mail, MapPin, Phone, Plus, Send } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { productCategories, site, type Locale } from "@/lib/site";

export default function InquiryPage({ params }: { params: { locale: Locale } }) {
  const isZh = params.locale !== "en";

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex min-h-20 max-w-7xl flex-col items-start justify-between gap-3 px-5 py-4 sm:flex-row sm:items-center">
          <Link href={`/${params.locale}`} className="min-w-0">
            <BrandLogo />
          </Link>
          <Link href={`/${params.locale}/portal`} className="text-sm font-semibold text-ink">
            {isZh ? "客户中心" : "Client Portal"}
          </Link>
        </div>
      </header>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[1fr_0.75fr]">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            {isZh ? "采购询价" : "Request a Quote"}
          </div>
          <h1 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">
            {isZh ? "提交消防装备采购需求" : "Submit Fire Equipment Requirements"}
          </h1>
          <p className="mt-5 max-w-2xl leading-8 text-steel">
            {isZh
              ? "填写产品、数量、项目场景和联系方式后，后台销售人员可在询价管理中跟进、备注、报价和归档。"
              : "Submit products, quantities, project context, and contact details for sales follow-up, quoting, and tracking."}
          </p>
          <form className="mt-8 grid gap-4 rounded-md border border-ink/10 bg-mist p-6">
            {[
              isZh ? "公司名称" : "Company",
              isZh ? "联系人" : "Contact Name",
              isZh ? "电话/WhatsApp" : "Phone / WhatsApp",
              isZh ? "邮箱" : "Email"
            ].map((label) => (
              <label key={label} className="grid gap-2 text-sm font-medium text-ink">
                {label}
                <input className="h-12 rounded-md border border-ink/10 bg-white px-4 outline-none focus:border-gold" />
              </label>
            ))}
            <label className="grid gap-2 text-sm font-medium text-ink">
              {isZh ? "需求说明" : "Requirement Details"}
              <textarea className="min-h-36 rounded-md border border-ink/10 bg-white p-4 outline-none focus:border-gold" />
            </label>
            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-gold px-5 text-sm font-bold text-ink">
              <Send className="h-4 w-4" />
              {isZh ? "提交需求" : "Submit Request"}
            </button>
          </form>
        </div>
        <aside className="space-y-5">
          <section className="rounded-md bg-ink p-6 text-white">
            <h2 className="text-xl font-semibold">{isZh ? "常用产品分类" : "Common Categories"}</h2>
            <div className="mt-5 space-y-3">
              {productCategories.map((category) => (
                <button
                  key={category.key}
                  className="flex w-full items-center justify-between rounded-md border border-white/12 px-4 py-3 text-left text-sm text-white/78 hover:border-gold hover:text-gold"
                >
                  {isZh ? category.zh : category.en}
                  <Plus className="h-4 w-4" />
                </button>
              ))}
            </div>
          </section>
          <section className="rounded-md border border-ink/10 p-6">
            <h2 className="text-xl font-semibold text-ink">{isZh ? "联系方式" : "Contact"}</h2>
            <div className="mt-5 space-y-4 text-sm text-steel">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold" />
                {site.phone}
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold" />
                {site.email}
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gold" />
                {isZh ? site.addressZh : site.addressEn}
              </div>
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
