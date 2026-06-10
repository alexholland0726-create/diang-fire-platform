import Link from "next/link";
import { ArrowRight, Boxes, Globe2, Search, ShieldCheck } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { listCategories, listProducts } from "@/lib/db";
import { productCategories, type Locale } from "@/lib/site";

export const dynamic = "force-dynamic";

const fallbackImage = "/site-images/fire-scene-team-hose.jpg";

const categoryVisuals: Record<string, string> = {
  "rescue-equipment": "/site-images/rescue-tools-spreader.jpg",
  "respiratory-protection": "/site-images/respiratory-scba-cylinder.jpg",
  firewear: "/site-images/firewear-firefighter-portrait.jpg",
  extinguishing: "/site-images/extinguishing-water-foam.jpg",
  "emergency-lighting": "/site-images/emergency-lighting-flashlight.jpg",
  "industrial-safety": "/site-images/industrial-respirator-team.jpg"
};

export default function ProductsPage({
  params,
  searchParams
}: {
  params: { locale: Locale };
  searchParams?: { category?: string; item?: string };
}) {
  const locale = params.locale === "en" ? "en" : "zh";
  const isZh = locale === "zh";
  const activeCategory = searchParams?.category || "all";
  const activeItem = searchParams?.item?.trim() || "";
  const dbCategories = listCategories();
  const visibleProducts = listProducts().filter((product) => product.status === "PUBLISHED");
  const categoryCards = productCategories.map((category) => {
    const dbCategory = dbCategories.find((item) => item.slug === category.key);
    const categoryProducts = dbCategory
      ? visibleProducts.filter((product) => product.categoryId === dbCategory.id)
      : [];
    const itemProducts = activeItem
      ? categoryProducts.filter((product) => {
          const haystack = [
            product.subcategoryZh,
            product.subcategoryEn,
            product.nameZh,
            product.nameEn,
            product.summaryZh,
            product.summaryEn,
            product.specs
          ]
            .join(" ")
            .toLowerCase();

          return haystack.includes(activeItem.toLowerCase());
        })
      : categoryProducts;

    return {
      ...category,
      products: activeItem && itemProducts.length === 0 ? categoryProducts : itemProducts,
      totalProducts: categoryProducts.length
    };
  });
  const shownCategories =
    activeCategory === "all"
      ? categoryCards
      : categoryCards.filter((category) => category.key === activeCategory);
  const shownProductCount = shownCategories.reduce((total, category) => total + category.products.length, 0);

  return (
    <main className="min-h-screen bg-mist">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5">
          <Link href={`/${locale}`} className="min-w-0">
            <BrandLogo />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href={`/${locale === "zh" ? "en" : "zh"}/products`}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-ink/10 px-3 text-sm font-medium text-ink hover:border-gold hover:text-gold"
            >
              <Globe2 className="h-4 w-4" />
              {isZh ? "English" : "中文"}
            </Link>
            <Link
              href={`/${locale}/inquiry`}
              className="inline-flex h-10 items-center rounded-md bg-ink px-4 text-sm font-semibold text-white hover:bg-gold hover:text-ink"
            >
              {isZh ? "提交询价" : "Request Quote"}
            </Link>
          </div>
        </div>
      </header>

      <section className="group relative overflow-hidden px-5 py-12 text-white md:py-16">
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-700 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url(${visibleProducts[0]?.imageUrl || fallbackImage})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(11,23,41,0.92)_0%,rgba(11,23,41,0.78)_48%,rgba(11,23,41,0.36)_100%)] backdrop-blur-[1px]" />
        <div className="industrial-grid absolute inset-0 opacity-35" />
        <div className="relative mx-auto max-w-7xl">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-gold">
            {isZh ? "返回首页" : "Back Home"}
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-gold">
                <Boxes className="h-4 w-4" />
                {isZh ? "产品中心" : "Products"}
              </div>
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
                {isZh ? "消防救援装备与工业安全产品" : "Fire Rescue and Industrial Safety Products"}
              </h1>
              <p className="mt-5 max-w-2xl leading-8 text-white/70">
                {isZh
                  ? "按产品分类查看已录入的产品，进入具体分类后可直接提交询价需求。"
                  : "Browse products by category and send product-specific quote requests."}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 rounded-md border border-white/16 bg-white/10 p-4 shadow-[0_18px_44px_rgba(0,0,0,0.20)] backdrop-blur-md">
              <div>
                <div className="text-3xl font-semibold text-gold">{visibleProducts.length}</div>
                <div className="mt-1 text-sm text-white/62">{isZh ? "可展示产品" : "Visible Products"}</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-gold">{shownProductCount}</div>
                <div className="mt-1 text-sm text-white/62">{isZh ? "当前筛选" : "Current Filter"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-8 md:py-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-md border border-ink/10 bg-white p-4 shadow-soft">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
                <Search className="h-4 w-4 text-gold" />
                {isZh ? "产品分类" : "Categories"}
              </div>
              <div className="space-y-2">
                <Link
                  href={`/${locale}/products`}
                  className={`flex items-center justify-between rounded-md px-3 py-3 text-sm font-semibold ${
                    activeCategory === "all" ? "bg-ink text-white" : "text-ink hover:bg-mist"
                  }`}
                >
                  {isZh ? "全部产品" : "All Products"}
                  <span className="text-xs opacity-70">{visibleProducts.length}</span>
                </Link>
                {categoryCards.map((category) => (
                  <Link
                    key={category.key}
                    href={`/${locale}/products?category=${category.key}`}
                    className={`flex items-center justify-between rounded-md px-3 py-3 text-sm font-semibold ${
                      activeCategory === category.key ? "bg-ink text-white" : "text-ink hover:bg-mist"
                    }`}
                  >
                    <span>{isZh ? category.zh : category.en}</span>
                    <span className="text-xs opacity-70">{category.products.length}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          <div className="grid gap-6">
            {shownCategories.map((category) => (
              <section key={category.key} id={category.key} className="overflow-hidden rounded-md border border-ink/10 bg-white shadow-soft">
                <div className="group relative min-h-36 overflow-hidden p-5 text-white md:p-6">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${categoryVisuals[category.key] || category.products[0]?.imageUrl || fallbackImage})` }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,23,41,0.86)_0%,rgba(11,23,41,0.62)_58%,rgba(11,23,41,0.28)_100%)] backdrop-blur-[1px]" />
                  <div className="industrial-grid absolute inset-0 opacity-35" />
                  <div className="relative flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-gold drop-shadow">
                        {category.key}
                      </div>
                      <h2 className="mt-2 text-2xl font-semibold drop-shadow">
                        {activeItem || (isZh ? category.zh : category.en)}
                      </h2>
                      <p className="mt-3 max-w-3xl leading-7 text-white/78">
                        {isZh ? category.descZh : category.descEn}
                      </p>
                    </div>
                    <Link
                      href={`/${locale}/products?category=${category.key}`}
                      className="inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-gold px-4 text-sm font-bold text-ink"
                    >
                      {isZh ? "查看全部产品" : "View all"}
                    </Link>
                  </div>
                </div>
                <div className="p-5 md:p-6">
                <div className="mb-5 flex flex-wrap gap-2">
                  {(isZh ? category.itemsZh : category.itemsEn).map((item) => (
                    <Link
                      key={item}
                      href={`/${locale}/products?category=${category.key}&item=${encodeURIComponent(item)}`}
                      className={`rounded-full border px-3 py-2 text-sm transition ${
                        activeItem === item
                          ? "border-gold bg-gold/15 text-ink"
                          : "border-ink/10 bg-mist text-steel hover:border-gold hover:bg-white hover:text-ink"
                      }`}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
                {category.products.length ? (
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {category.products.map((product) => (
                      <article key={product.id} className="overflow-hidden rounded-md border border-ink/10 bg-white">
                        <div
                          className="relative h-48 bg-ink bg-cover bg-center"
                          style={{ backgroundImage: `url(${product.imageUrl || fallbackImage})` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-ink/86 via-ink/30 to-transparent" />
                          <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink">
                            {product.sku || (isZh ? category.zh : category.en)}
                          </span>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold leading-snug text-ink">
                            {isZh ? product.nameZh : product.nameEn || product.nameZh}
                          </h3>
                          <p className="mt-3 line-clamp-3 min-h-[72px] text-sm leading-6 text-steel">
                            {isZh ? product.summaryZh || product.specs : product.summaryEn || product.summaryZh || product.specs}
                          </p>
                          <div className="mt-5 flex flex-wrap gap-3">
                            <Link
                              href={`/${locale}/products/${product.id}`}
                              className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-gold"
                            >
                              {isZh ? "查看详情" : "Details"}
                              <ArrowRight className="h-4 w-4 text-gold" />
                            </Link>
                            <Link
                              href={`/${locale}/inquiry?category=${encodeURIComponent(isZh ? category.zh : category.en)}&product=${encodeURIComponent(isZh ? product.nameZh : product.nameEn || product.nameZh)}`}
                              className="inline-flex items-center gap-2 text-sm font-semibold text-steel hover:text-gold"
                            >
                              {isZh ? "询价" : "Inquire"}
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-md border border-dashed border-ink/20 bg-mist p-6 text-sm leading-7 text-steel">
                    <div className="flex items-center gap-2 font-semibold text-ink">
                      <ShieldCheck className="h-4 w-4 text-gold" />
                      {isZh ? "该分类暂未录入产品" : "No products in this category yet"}
                    </div>
                    <p className="mt-2">
                      {isZh
                        ? "可以先提交该分类的采购需求，后台录入产品后这里会自动展示。"
                        : "You can still submit a quote request for this category. Products will appear here after they are added in admin."}
                    </p>
                  </div>
                )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
