import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  ClipboardList,
  FileText,
  Globe2,
  Headset,
  LifeBuoy,
  Menu,
  Newspaper,
  ShieldCheck,
  Truck,
  type LucideIcon
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import {
  dictionary,
  featuredProducts,
  markets,
  productCategories,
  site,
  solutions,
  type Locale
} from "@/lib/site";

const heroImage =
  "https://images.pexels.com/photos/5965109/pexels-photo-5965109.jpeg?auto=compress&cs=tinysrgb&w=2400";

const productPanelImage =
  "https://images.pexels.com/photos/5965109/pexels-photo-5965109.jpeg?auto=compress&cs=tinysrgb&w=1200";

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale === "en" ? "en" : "zh";
  const t = dictionary[locale];
  const otherLocale = locale === "zh" ? "en" : "zh";
  const isZh = locale === "zh";
  const platformCards: Array<[LucideIcon, string]> = [
    [ClipboardList, isZh ? "询价与报价" : "Inquiries and Quotes"],
    [BarChart3, isZh ? "运营仪表盘" : "Operations Dashboard"],
    [FileText, isZh ? "资料与证书" : "Documents and Certificates"],
    [Headset, isZh ? "工单与维保" : "Tickets and Maintenance"]
  ];
  const supportCards: Array<[LucideIcon, string, string]> = [
    [
      LifeBuoy,
      isZh ? "服务与支持" : "Service Support",
      isZh ? "售后、维保、工单、授权供方资料管理。" : "After-sales, maintenance, tickets, and supplier documents."
    ],
    [
      FileText,
      isZh ? "资料中心" : "Resource Center",
      isZh ? "产品说明书、证书、选型表和政策法规。" : "Manuals, certificates, selection sheets, and regulations."
    ],
    [
      Headset,
      isZh ? "培训与咨询" : "Training and Consulting",
      isZh ? "产品选型、使用培训和项目采购咨询。" : "Product selection, usage training, and project sourcing consulting."
    ]
  ];
  const businessMap: Array<[LucideIcon, string, string]> = [
    [
      Truck,
      isZh ? "消防救援装备供应" : "Fire Rescue Equipment Supply",
      isZh ? "围绕消防救援、空气呼吸器、消防服、灭火器和应急装备，整合多品牌供方资源。" : "Multi-brand sourcing for rescue equipment, SCBA, fire suits, extinguishers, and emergency gear."
    ],
    [
      ShieldCheck,
      isZh ? "工业安全产品选型" : "Industrial Safety Selection",
      isZh ? "面向工厂园区、石化、电力、市政和公共建筑，提供更清晰的装备配置建议。" : "Selection support for industrial parks, chemical, power, municipal, and public-building scenarios."
    ],
    [
      FileText,
      isZh ? "资料与采购协同" : "Documents and Procurement",
      isZh ? "集中管理产品参数、证书、说明书和询价记录，让采购沟通更高效。" : "Manage specifications, certificates, manuals, and quote records in one workflow."
    ],
    [
      LifeBuoy,
      isZh ? "客户服务与维保跟进" : "Service and Maintenance",
      isZh ? "通过客户中心沉淀项目、设备、工单和维保记录，形成长期服务能力。" : "Use the client portal to track projects, devices, tickets, and maintenance records."
    ]
  ];

  return (
    <main className="min-h-screen bg-white">
      <div className="hidden border-b border-ink/10 bg-ink text-white md:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-5 text-xs">
          <div className="flex items-center gap-2 text-white/72">
            <Newspaper className="h-4 w-4 text-gold" />
            {isZh ? "最新：帝昂消防装备采购与客户服务平台第一版建设中" : "Latest: Diang sourcing and client service platform is in progress"}
          </div>
          <div className="flex items-center gap-5 text-white/64">
            <span>{isZh ? "资料中心" : "Resource Center"}</span>
            <span>{isZh ? "服务支持" : "Service Support"}</span>
            <span>{isZh ? "客户登录" : "Client Login"}</span>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5">
          <Link href={`/${locale}`} aria-label={site.nameZh} className="min-w-0">
            <BrandLogo />
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-ink lg:flex">
            {t.nav.map((item) => (
              <a key={item} href="#products" className="hover:text-gold">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href={`/${otherLocale}`}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-ink/10 px-3 text-sm font-medium text-ink hover:border-gold hover:text-gold"
            >
              <Globe2 className="h-4 w-4" />
              {t.language}
            </Link>
            <Link
              href={`/${locale}/admin`}
              className="hidden h-10 items-center rounded-md bg-ink px-4 text-sm font-semibold text-white hover:bg-navy md:inline-flex"
            >
              {t.admin}
            </Link>
            <details className="relative lg:hidden">
              <summary className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-md border border-ink/10 text-ink [&::-webkit-details-marker]:hidden">
                <Menu className="h-5 w-5" />
              </summary>
              <div className="absolute right-0 top-12 z-50 w-56 rounded-md border border-ink/10 bg-white p-2 shadow-soft">
                {t.nav.map((item) => (
                  <a key={item} href="#products" className="block rounded-md px-3 py-3 text-sm font-semibold text-ink hover:bg-mist">
                    {item}
                  </a>
                ))}
                <Link href={`/${locale}/admin`} className="mt-1 block rounded-md bg-ink px-3 py-3 text-sm font-semibold text-white">
                  {t.admin}
                </Link>
                <Link href={`/${locale}/portal`} className="mt-1 block rounded-md border border-ink/10 px-3 py-3 text-sm font-semibold text-ink">
                  {t.customer}
                </Link>
              </div>
            </details>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-ink text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-75"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="industrial-grid absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(201,154,73,0.10),transparent_28%),linear-gradient(100deg,rgba(11,23,41,0.86)_0%,rgba(11,23,41,0.76)_42%,rgba(11,23,41,0.34)_100%)]" />
        <div className="relative mx-auto flex min-h-[calc(100svh-72px)] max-w-7xl items-center px-5 py-12 md:min-h-[calc(100vh-72px)]">
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-3 border-l-2 border-gold bg-white/8 px-4 py-2 text-sm text-white/80">
              <ShieldCheck className="h-4 w-4 text-gold" />
              {isZh ? "B2B消防装备采购与客户服务平台" : "B2B sourcing and service platform"}
            </div>
            <h1 className="max-w-4xl text-3xl font-semibold leading-tight tracking-normal sm:text-4xl md:text-6xl">
              {isZh ? (
                <>
                  消防救援装备与工业安全
                  <br />
                  解决方案供应商
                </>
              ) : (
                t.heroTitle
              )}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/78 md:mt-6 md:text-lg">{t.heroLead}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${locale}/inquiry`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-gold px-6 text-sm font-bold text-ink hover:bg-white"
              >
                {t.ctaInquiry}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/${locale}/portal`}
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/30 px-6 text-sm font-bold text-white hover:border-gold hover:text-gold"
              >
                {t.ctaPortal}
              </Link>
            </div>
            <div className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-3 md:mt-12">
              {[
                [
                  isZh ? "装备选型" : "Selection",
                  isZh ? "按场景配置消防救援与工业安全装备" : "Scenario-based fire rescue and safety packages"
                ],
                [
                  isZh ? "供方整合" : "Supply Network",
                  isZh ? "对接多品牌资源，匹配规格、证书与交期" : "Multi-brand sourcing with specs, certificates, and lead times"
                ],
                [
                  isZh ? "项目跟进" : "Project Support",
                  isZh ? "从询价、资料到维保记录持续协同" : "Coordinated quotes, documents, and service records"
                ]
              ].map(([title, desc]) => (
                <div key={title} className="border-l border-gold/70 bg-ink/28 px-4 py-3 backdrop-blur-sm md:px-5 md:py-4">
                  <div className="text-lg font-semibold text-gold md:text-xl">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-white/72">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-10 px-5 pb-12 md:-mt-14">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-md border border-ink/10 bg-white shadow-soft">
          <div className="grid lg:grid-cols-[300px_1fr]">
            <div className="bg-ink p-6 text-white md:p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                {isZh ? "快速入口" : "Quick Access"}
              </div>
              <h2 className="mt-4 text-2xl font-semibold leading-tight">
                {isZh ? "按应用行业查找装备" : "Find Equipment by Market"}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/64">
                {isZh
                  ? "先选择使用场景，再进入产品、资料、询价和服务支持。"
                  : "Start with the use case, then move into products, documents, quotes, and support."}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {markets.map((market) => (
            <a
              key={market.zh}
              href="#markets"
              className="group border-b border-ink/10 px-5 py-5 transition hover:bg-mist sm:border-r lg:border-b-0"
            >
              <div className="text-sm font-semibold text-ink group-hover:text-gold">
                {isZh ? market.zh : market.en}
              </div>
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-steel">
                {isZh ? market.descZh : market.descEn}
              </p>
            </a>
          ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                {isZh ? "业务版图" : "Business Map"}
              </div>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-ink md:text-5xl">
                {isZh ? "用简单清楚的结构，呈现帝昂的专业能力" : "A Clear Map of Diang's Capabilities"}
              </h2>
              <p className="mt-5 max-w-xl leading-8 text-steel">
                {isZh
                  ? "网站不只是展示公司，而是帮助客户快速理解：我们供应什么、服务什么场景、如何配合采购、后续如何跟进。"
                  : "The website helps customers quickly understand what we supply, which scenarios we serve, how sourcing works, and how follow-up is managed."}
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:max-w-lg">
                {(isZh ? ["产品力", "专业感", "亲和体验"] : ["Product strength", "Professional image", "Friendly UX"]).map((item) => (
                  <div key={item} className="rounded-md border border-ink/10 bg-mist px-4 py-3 text-sm font-semibold text-ink">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-px overflow-hidden rounded-md border border-ink/10 bg-ink/10 sm:grid-cols-2">
              {businessMap.map(([Icon, title, desc]) => (
                <article key={title} className="group bg-white p-6 transition hover:bg-ink hover:text-white">
                  <div className="grid h-11 w-11 place-items-center rounded-md bg-ink text-gold group-hover:bg-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-ink group-hover:text-white">{title}</h3>
                  <p className="mt-3 leading-7 text-steel group-hover:text-white/70">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="bg-[linear-gradient(180deg,#F6F8FB_0%,#FFFFFF_46%)] px-5 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[330px_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
              {t.products}
            </div>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-ink md:text-5xl">
              {isZh ? "把产品目录做成采购工作台" : "A Catalog That Works Like a Sourcing Desk"}
            </h2>
            <p className="mt-5 leading-8 text-steel">
              {isZh
                ? "产品不再只是陈列，而是直接连接询价、资料下载、客户项目和销售跟进。"
                : "Products connect directly to quote requests, documents, client projects, and sales follow-up."}
            </p>
            <Link
              href={`/${locale}/inquiry`}
              className="mt-7 inline-flex h-12 items-center gap-2 rounded-md bg-ink px-5 text-sm font-bold text-white hover:bg-gold hover:text-ink"
            >
              {t.ctaInquiry}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4">
            <article className="grid overflow-hidden rounded-md border border-ink/10 bg-ink text-white shadow-soft lg:grid-cols-[1fr_280px]">
              <div className="p-6 md:p-8">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                  {isZh ? "采购流程" : "Sourcing Flow"}
                </div>
                <h3 className="mt-4 text-2xl font-semibold md:text-3xl">
                  {isZh ? "从产品筛选到报价跟进，一条线完成" : "From product selection to quote follow-up"}
                </h3>
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {(isZh
                    ? ["选择品类", "提交需求", "销售跟进"]
                    : ["Pick category", "Submit request", "Sales follow-up"]
                  ).map((step, index) => (
                    <div key={step} className="border border-white/10 bg-white/8 p-4">
                      <div className="text-sm text-gold">0{index + 1}</div>
                      <div className="mt-2 text-sm font-semibold">{step}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="min-h-56 bg-cover bg-center opacity-80"
                style={{ backgroundImage: `url(${productPanelImage})` }}
              />
            </article>
            {productCategories.map((category) => (
              <article
                key={category.key}
                className="group grid overflow-hidden rounded-md border border-ink/10 bg-white shadow-soft transition hover:-translate-y-1 hover:border-gold/70 md:grid-cols-[240px_1fr]"
              >
                <div className="relative min-h-48 bg-ink p-6 text-white">
                  <div className="absolute inset-0 industrial-grid opacity-70" />
                  <div className="absolute bottom-0 right-0 h-28 w-28 translate-x-8 translate-y-8 rounded-full border border-gold/40" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-md bg-white text-ink">
                      <Truck className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-white/45">
                        {category.key}
                      </div>
                      <div className="mt-2 text-2xl font-semibold text-gold">
                        {(isZh ? category.itemsZh : category.itemsEn).length}
                      </div>
                      <div className="text-sm text-white/60">
                        {isZh ? "重点子类" : "subcategories"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-ink md:text-2xl">
                        {isZh ? category.zh : category.en}
                      </h3>
                      <p className="mt-3 max-w-2xl leading-7 text-steel">
                        {isZh
                          ? "支持多品牌、多规格和项目制采购，后续可接入证书、说明书和报价单。"
                          : "Supports multi-brand, multi-spec, project-based sourcing with certificates, manuals, and quotes."}
                      </p>
                    </div>
                    <button className="inline-flex h-10 shrink-0 items-center justify-center rounded-md border border-ink/10 px-4 text-sm font-semibold text-ink group-hover:border-gold group-hover:text-gold">
                      {isZh ? "查看产品" : "View"}
                    </button>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {(isZh ? category.itemsZh : category.itemsEn).map((item) => (
                      <span key={item} className="rounded-full border border-ink/10 bg-mist px-3 py-2 text-sm text-steel">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="markets" className="bg-[radial-gradient(circle_at_20%_0%,rgba(201,154,73,0.18),transparent_28%),linear-gradient(135deg,#0B1729_0%,#10223A_100%)] px-5 py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                {isZh ? "应用行业" : "Markets"}
              </div>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold md:text-5xl">
                {isZh ? "按行业场景进入产品和服务" : "Explore Products by Market"}
              </h2>
            </div>
            <p className="max-w-xl leading-8 text-white/64">
              {isZh
                ? "参考 MSA 的行业导向信息架构，客户可以先选场景，再进入产品、资料、询价和服务支持。"
                : "Customers start from their market, then move into products, documents, quote requests, and service support."}
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr]">
            <article className="relative min-h-96 overflow-hidden rounded-md border border-white/10 bg-white/8 p-7">
              <div className="absolute inset-0 industrial-grid opacity-60" />
              <div className="absolute -bottom-20 -right-16 h-72 w-72 rounded-full border border-gold/30" />
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div className="inline-flex rounded-full bg-gold px-3 py-1 text-xs font-bold text-ink">
                    {isZh ? "行业场景" : "Market Scenarios"}
                  </div>
                  <h3 className="mt-6 max-w-xl text-3xl font-semibold leading-tight md:text-4xl">
                    {isZh ? "客户不是先找产品，而是先确认场景" : "Clients start from the environment, not the SKU"}
                  </h3>
                  <p className="mt-5 max-w-xl leading-8 text-white/68">
                    {isZh
                      ? "消防救援、石化、市政、电力和制造业客户，对认证、交期、资料和售后要求不同，页面需要让他们快速进入对应方案。"
                      : "Fire rescue, chemical, utility, power, and manufacturing clients need different certifications, lead times, documents, and service workflows."}
                  </p>
                </div>
                <Link href={`/${locale}/inquiry`} className="mt-8 inline-flex h-11 w-fit items-center gap-2 rounded-md bg-gold px-4 text-sm font-bold text-ink">
                  {t.ctaInquiry}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
            <div className="grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-2">
            {markets.map((market, index) => (
              <article key={market.zh} className="group bg-ink/70 p-6 transition hover:bg-white hover:text-ink">
                <div className="text-sm text-gold">0{index + 1}</div>
                <h3 className="mt-5 text-2xl font-semibold">{isZh ? market.zh : market.en}</h3>
                <p className="mt-4 leading-7 text-white/64 group-hover:text-steel">
                  {isZh ? market.descZh : market.descEn}
                </p>
                <button className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                  {isZh ? "查看方案" : "View solution"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </article>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F3F5F8] px-5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                {t.solutions}
              </div>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-ink md:text-5xl">
                {isZh ? "从产品贸易延伸到项目服务" : "From Product Trading to Project Service"}
              </h2>
            </div>
            <p className="max-w-xl leading-8 text-steel">
              {isZh
                ? "通过场景化方案、资料下载、报价记录、设备台账和维保工单，形成客户持续服务闭环。"
                : "Scenario pages, documents, quote records, asset lists, and tickets create a full service loop."}
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
            <aside className="rounded-md bg-white p-7 shadow-soft">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                Service Chain
              </div>
              <h3 className="mt-4 text-2xl font-semibold leading-tight text-ink">
                {isZh ? "让贸易服务看起来更专业、更可交付" : "Make trading service feel structured and deliverable"}
              </h3>
              <div className="mt-7 space-y-4">
                {(isZh
                  ? ["方案配置", "资料归档", "报价跟进", "维保工单"]
                  : ["Solution setup", "Document archive", "Quote follow-up", "Maintenance tickets"]
                ).map((item, index) => (
                  <div key={item} className="flex items-center gap-3 border-b border-ink/10 pb-4 last:border-b-0">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-xs font-bold text-gold">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </aside>
            <div className="grid gap-px overflow-hidden rounded-md border border-ink/10 bg-ink/10 lg:grid-cols-3">
            {solutions.map((solution) => (
              <article key={solution.zh} className="group bg-white p-7 transition hover:bg-ink hover:text-white">
                <Building2 className="h-8 w-8 text-gold" />
                <h3 className="mt-5 text-xl font-semibold text-ink group-hover:text-white">
                  {isZh ? solution.zh : solution.en}
                </h3>
                <p className="mt-4 leading-7 text-steel group-hover:text-white/70">
                  {isZh ? solution.descZh : solution.descEn}
                </p>
              </article>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                {isZh ? "重点产品" : "Featured Products"}
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-ink md:text-5xl">
                {isZh ? "像品牌官网一样突出主推产品" : "Featured Products with Brand-site Clarity"}
              </h2>
            </div>
            <Link
              href={`/${locale}/inquiry`}
              className="inline-flex h-12 items-center justify-center rounded-md bg-gold px-5 text-sm font-bold text-ink"
            >
              {isZh ? "询价全部产品" : "Request all products"}
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <article key={product.nameZh} className="overflow-hidden rounded-md border border-ink/10 bg-white shadow-soft">
                <div className="industrial-grid flex h-48 items-end bg-ink p-6">
                  <div>
                    <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">
                      {isZh ? product.tagZh : product.tagEn}
                    </span>
                    <h3 className="mt-4 text-2xl font-semibold text-white">
                      {isZh ? product.nameZh : product.nameEn}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="leading-7 text-steel">{isZh ? product.descZh : product.descEn}</p>
                  <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                    {isZh ? "了解更多" : "Learn more"}
                    <ArrowRight className="h-4 w-4 text-gold" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
              {isZh ? "Platform" : "Platform"}
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">
              {isZh ? "前台、后台、客户中心同步规划" : "Website, Admin, and Client Portal Planned Together"}
            </h2>
            <p className="mt-5 leading-8 text-steel">
              {isZh
                ? "帝昂第一版会直接具备内容管理、询价跟进、客户项目、设备台账、告警事件和维保工单的基础能力。"
                : "The first release includes CMS, inquiry tracking, client projects, device assets, alarm events, and maintenance tickets."}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {platformCards.map(([Icon, label]) => (
              <div key={String(label)} className="rounded-md border border-ink/10 p-6">
                <Icon className="h-7 w-7 text-gold" />
                <div className="mt-4 text-lg font-semibold text-ink">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-mist px-5 py-12">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {supportCards.map(([Icon, title, desc]) => (
            <article key={title} className="rounded-md bg-white p-6 shadow-soft">
              <Icon className="h-7 w-7 text-gold" />
              <h3 className="mt-4 text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-3 leading-7 text-steel">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="bg-ink px-5 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <BrandLogo inverse />
          <div className="text-sm text-white/65">
            {site.email} · {site.phone} · {isZh ? site.addressZh : site.addressEn}
          </div>
        </div>
      </footer>
    </main>
  );
}
