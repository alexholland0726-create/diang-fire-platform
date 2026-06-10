import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { getProduct } from "@/lib/db";
import { type Locale } from "@/lib/site";

export const dynamic = "force-dynamic";

const fallbackImage = "/site-images/fire-scene-team-hose.jpg";

function parseSpecs(specs: string) {
  return specs
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function ProductDetailPage({ params }: { params: { locale: Locale; id: string } }) {
  const locale = params.locale === "en" ? "en" : "zh";
  const isZh = locale === "zh";
  const id = Number(params.id);

  if (!Number.isInteger(id) || id <= 0) {
    notFound();
  }

  const product = getProduct(id);

  if (!product || product.status !== "PUBLISHED") {
    notFound();
  }

  const name = isZh ? product.nameZh : product.nameEn || product.nameZh;
  const summary = isZh ? product.summaryZh || product.summaryEn : product.summaryEn || product.summaryZh;
  const specs = parseSpecs(product.specs);
  const galleryImages = Array.from(new Set([product.imageUrl, ...(product.images || [])].filter(Boolean)));
  const heroImage = galleryImages[0] || fallbackImage;

  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5">
          <Link href={`/${locale}`} className="min-w-0">
            <BrandLogo />
          </Link>
          <Link
            href={`/${locale}/products`}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-ink/10 px-4 text-sm font-semibold text-ink hover:border-gold hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            {isZh ? "产品中心" : "Products"}
          </Link>
        </div>
      </header>

      <section className="bg-mist px-5 py-10 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-steel hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              {isZh ? "返回产品列表" : "Back to products"}
            </Link>
            <div className="mt-8 inline-flex rounded-md bg-ink px-3 py-2 text-sm font-semibold text-gold">
              {isZh ? product.categoryNameZh : product.categoryNameEn}
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-ink md:text-5xl">
              {name}
            </h1>
            {summary ? <p className="mt-5 max-w-2xl leading-8 text-steel">{summary}</p> : null}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${locale}/inquiry?category=${encodeURIComponent(isZh ? product.categoryNameZh : product.categoryNameEn)}&product=${encodeURIComponent(name)}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-gold px-5 text-sm font-bold text-ink"
              >
                {isZh ? "询价该产品" : "Request Quote"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/${locale}/products${product.categorySlug ? `?category=${product.categorySlug}` : ""}`}
                className="inline-flex h-12 items-center justify-center rounded-md border border-ink/10 px-5 text-sm font-bold text-ink hover:border-gold hover:text-gold"
              >
                {isZh ? "查看同类产品" : "Same Category"}
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-md border border-ink/10 bg-ink shadow-soft">
            <div
              className="aspect-[4/3] bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
            {galleryImages.length > 1 ? (
              <div className="grid grid-cols-3 gap-2 bg-white p-2">
                {galleryImages.slice(1, 4).map((image) => (
                  <div
                    key={image}
                    className="aspect-[4/3] rounded-sm bg-mist bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_360px]">
          <article className="rounded-md border border-ink/10 bg-white p-6 shadow-soft md:p-8">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-gold">
              <FileText className="h-4 w-4" />
              {isZh ? "产品说明" : "Product Details"}
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-ink">
              {isZh ? "规格与适用场景" : "Specifications and Use Cases"}
            </h2>
            {specs.length ? (
              <div className="mt-6 grid gap-3">
                {specs.map((item) => (
                  <div key={item} className="flex gap-3 rounded-md bg-mist p-4 text-sm leading-6 text-steel">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-5 leading-8 text-steel">
                {isZh
                  ? "该产品的详细规格正在整理中，可先提交询价，我们会根据使用场景补充参数与资料。"
                  : "Detailed specifications are being prepared. Submit a request and we will provide parameters by use case."}
              </p>
            )}
          </article>

          <aside className="rounded-md bg-ink p-6 text-white shadow-soft">
            <ShieldCheck className="h-8 w-8 text-gold" />
            <h2 className="mt-5 text-2xl font-semibold">
              {isZh ? "采购咨询提示" : "Sourcing Notes"}
            </h2>
            <div className="mt-5 space-y-3 text-sm leading-7 text-white/70">
              <p>{isZh ? "建议提供数量、交付城市、使用场景和证书要求。" : "Share quantity, delivery city, use case, and certificate needs."}</p>
              {product.sku ? <p>{isZh ? `型号/SKU：${product.sku}` : `SKU: ${product.sku}`}</p> : null}
              <p>{isZh ? "后台销售会根据产品和分类信息跟进报价。" : "Sales will follow up based on product and category details."}</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
