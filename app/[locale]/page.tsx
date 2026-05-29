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
  Mail,
  MapPin,
  Menu,
  Newspaper,
  Phone,
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
  const navLinks = t.nav.map((label, index) => {
    const hrefs = ["#top", "#products", "#solutions", "#cases", "#knowledge", "#about"];
    return { label, href: hrefs[index] || "#top" };
  });
  const trustPoints: Array<[string, string]> = [
    [
      isZh ? "多品牌供方整合" : "Multi-brand supply",
      isZh ? "贸易型供应链更适合按项目匹配品牌、规格、证书与交期。" : "Project sourcing can match brands, specs, certificates, and lead times."
    ],
    [
      isZh ? "询价优先，不展示价格" : "Quote-first workflow",
      isZh ? "消防与工业安全产品受规格、资质、物流影响，询价比固定价格更准确。" : "Specs, compliance, and logistics make inquiry-based pricing more accurate."
    ],
    [
      isZh ? "资料与服务可追踪" : "Traceable service",
      isZh ? "产品资料、询价记录和维保跟进统一管理，便于长期服务。" : "Documents, inquiries, and service records stay organized for long-term support."
    ]
  ];
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
  const caseCards: Array<[string, string, string]> = [
    [
      isZh ? "消防救援单位" : "Fire rescue teams",
      isZh ? "装备清单与分级配置" : "Tiered equipment list",
      isZh ? "按人员防护、呼吸防护、破拆救援、现场照明等模块整理采购清单，便于询价、比价和资料归档。" : "Organize PPE, respiratory protection, rescue tools, and lighting into quote-ready lists."
    ],
    [
      isZh ? "工业园区与制造工厂" : "Industrial parks and plants",
      isZh ? "安全装备标准化采购" : "Standardized safety sourcing",
      isZh ? "围绕作业风险、车间场景和应急预案，建立常用装备目录与供方资料库。" : "Build a common equipment catalog and supplier document base around site risks and emergency plans."
    ],
    [
      isZh ? "公共建筑与物业管理" : "Public buildings and facilities",
      isZh ? "应急物资与维保跟进" : "Emergency kits and service follow-up",
      isZh ? "把应急照明、灭火器材、疏散物资与后续维保记录放在同一套服务流程里。" : "Keep lighting, extinguishers, evacuation supplies, and maintenance records in one service workflow."
    ]
  ];
  const knowledgeCards: Array<[LucideIcon, string, string]> = [
    [
      FileText,
      isZh ? "产品资料" : "Product documents",
      isZh ? "说明书、证书、检测报告、选型表统一归档，方便销售和客户快速调用。" : "Manuals, certificates, reports, and selection sheets are organized for quick access."
    ],
    [
      ShieldCheck,
      isZh ? "选型指南" : "Selection guides",
      isZh ? "按行业场景整理常见配置建议，让客户先理解方案，再提交询价需求。" : "Scenario-based configuration guidance helps customers understand solutions before asking for quotes."
    ],
    [
      Headset,
      isZh ? "服务记录" : "Service records",
      isZh ? "询价、项目、工单和维保信息沉淀下来，逐步形成可持续的客户服务能力。" : "Inquiries, projects, tickets, and service records create a durable service capability."
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
            <a href="#knowledge" className="hover:text-white">{isZh ? "资料中心" : "Resource Center"}</a>
            <a href="#knowledge" className="hover:text-white">{isZh ? "服务支持" : "Service Support"}</a>
            <a href="#contact" className="hover:text-white">{isZh ? "联系我们" : "Contact"}</a>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5">
          <Link href={`/${locale}`} aria-label={site.nameZh} className="min-w-0">
            <BrandLogo />
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-ink lg:flex">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="hover:text-gold">
                {item.label}
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
              href={`/${locale}/portal`}
              className="hidden h-10 items-center rounded-md border border-ink/10 px-4 text-sm font-semibold text-ink hover:border-gold hover:text-gold md:inline-flex"
            >
              {t.customer}
            </Link>
            <a
              href="#contact"
              className="hidden h-10 items-center rounded-md bg-ink px-4 text-sm font-semibold text-white hover:bg-gold hover:text-ink md:inline-flex"
            >
              {isZh ? "联系我们" : "Contact"}
            </a>
            <details className="relative lg:hidden">
              <summary className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-md border border-ink/10 text-ink [&::-webkit-details-marker]:hidden">
                <Menu className="h-5 w-5" />
              </summary>
              <div className="absolute right-0 top-12 z-50 w-56 rounded-md border border-ink/10 bg-white p-2 shadow-soft">
                {navLinks.map((item) => (
                  <a key={item.label} href={item.href} className="block rounded-md px-3 py-3 text-sm font-semibold text-ink hover:bg-mist">
                    {item.label}
                  </a>
                ))}
                <Link href={`/${locale}/portal`} className="mt-1 block rounded-md bg-ink px-3 py-3 text-sm font-semibold text-white">
                  {t.customer}
                </Link>
                <Link href={`/${locale}/admin`} className="mt-1 block rounded-md border border-ink/10 px-3 py-3 text-sm font-semibold text-ink">
                  {t.admin}
                </Link>
                <a href="#contact" className="mt-1 block rounded-md border border-ink/10 px-3 py-3 text-sm font-semibold text-ink">
                  {isZh ? "联系我们" : "Contact"}
                </a>
              </div>
            </details>
          </div>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden bg-ink text-white">
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
            <div className="mt-7 space-y-3">
              {trustPoints.map(([title, desc]) => (
                <div key={title} className="rounded-md border border-ink/10 bg-white p-4 shadow-soft">
                  <div className="text-sm font-semibold text-ink">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-steel">{desc}</div>
                </div>
              ))}
            </div>
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
                        {isZh ? category.descZh : category.descEn}
                      </p>
                    </div>
                    <Link
                      href={`/${locale}/inquiry`}
                      className="inline-flex h-10 shrink-0 items-center justify-center rounded-md border border-ink/10 px-4 text-sm font-semibold text-ink group-hover:border-gold group-hover:text-gold"
                    >
                      {isZh ? "询价" : "Inquire"}
                    </Link>
                  </div>
                  <div className="mt-5 rounded-md border border-gold/25 bg-gold/10 px-4 py-3 text-sm font-semibold leading-6 text-ink">
                    {isZh ? category.serviceZh : category.serviceEn}
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

      <section id="solutions" className="bg-[#F3F5F8] px-5 py-16 md:py-24">
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

      <section id="cases" className="bg-white px-5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                {isZh ? "案例场景" : "Case Scenarios"}
              </div>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-ink md:text-5xl">
                {isZh ? "让客户一眼看到帝昂能解决什么问题" : "Show What Diang Can Solve at a Glance"}
              </h2>
            </div>
            <p className="max-w-xl leading-8 text-steel">
              {isZh
                ? "第一版先用典型业务场景表达服务能力，后续可以替换为真实项目案例、客户行业和交付照片。"
                : "The first version uses typical business scenarios, then can be upgraded with real projects, industries, and delivery photos."}
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {caseCards.map(([market, title, desc], index) => (
              <article key={title} className="rounded-md border border-ink/10 bg-[linear-gradient(180deg,#FFFFFF_0%,#F6F8FB_100%)] p-7 shadow-soft">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">0{index + 1}</span>
                  <span className="text-sm font-semibold text-gold">{market}</span>
                </div>
                <h3 className="mt-7 text-2xl font-semibold text-ink">{title}</h3>
                <p className="mt-4 leading-7 text-steel">{desc}</p>
                <Link href={`/${locale}/inquiry`} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                  {isZh ? "提交类似需求" : "Submit similar request"}
                  <ArrowRight className="h-4 w-4 text-gold" />
                </Link>
              </article>
            ))}
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
                <div
                  className="relative flex h-52 items-end overflow-hidden bg-ink bg-cover bg-center p-6"
                  style={{ backgroundImage: `url(${product.imageUrl})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/62 to-ink/12" />
                  <div className="relative">
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

      <section id="about" className="px-5 py-20">
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

      <section id="knowledge" className="border-y border-ink/10 bg-mist px-5 py-12">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {knowledgeCards.map(([Icon, title, desc]) => (
            <article key={title} className="rounded-md bg-white p-6 shadow-soft">
              <Icon className="h-7 w-7 text-gold" />
              <h3 className="mt-4 text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-3 leading-7 text-steel">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F3F5F8_100%)] px-5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                {isZh ? "联系我们" : "Contact"}
              </div>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-ink md:text-5xl">
                {isZh ? "把联系方式放在客户最容易找到的位置" : "Make It Easy to Reach Diang"}
              </h2>
            </div>
            <p className="max-w-2xl leading-8 text-steel lg:justify-self-end">
              {isZh
                ? "采购咨询、产品选型、资料确认、项目配套和售后服务，都可以通过电话、手机或邮箱直接联系。"
                : "For sourcing, product selection, document checks, project support, and after-sales service, contact us directly by phone, mobile, or email."}
            </p>
          </div>

          <div className="overflow-hidden rounded-md border border-ink/10 bg-ink shadow-soft">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative p-7 text-white md:p-10 lg:p-12">
              <div className="industrial-grid absolute inset-0 opacity-45" />
              <div className="relative">
                <div className="inline-flex rounded-md bg-white/10 px-3 py-1 text-sm font-semibold text-gold">
                  {isZh ? "上海帝昂实业有限公司" : "Shanghai Di'ang Industrial Co., Ltd."}
                </div>
                <h3 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
                  {isZh ? "消防救援装备与工业安全产品采购咨询" : "Fire Rescue and Industrial Safety Sourcing Support"}
                </h3>
                <p className="mt-5 max-w-xl leading-8 text-white/68">
                  {isZh
                    ? "我们更适合处理非标询价、多品牌对比、证书资料确认、项目批量采购和后续维保跟进。"
                    : "We support custom inquiries, multi-brand comparison, certificate checks, project sourcing, and service follow-up."}
                </p>
                <div className="mt-8 grid gap-3 text-sm text-white/76 sm:grid-cols-2">
                  {(isZh
                    ? ["产品选型与报价", "证书与资料确认", "项目批量采购", "售后与维保跟进"]
                    : ["Selection and quotation", "Certificate checks", "Project sourcing", "After-sales support"]
                  ).map((item) => (
                    <div key={item} className="border-l border-gold bg-white/8 px-4 py-3 font-semibold">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/${locale}/inquiry`}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-gold px-6 text-sm font-bold text-ink hover:bg-white"
                  >
                    {t.ctaInquiry}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={`tel:${site.phone}`}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/25 px-6 text-sm font-bold text-white hover:border-gold hover:text-gold"
                  >
                    <Phone className="h-4 w-4" />
                    {isZh ? "电话咨询" : "Call"}
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 md:p-8 lg:p-10">
              <div className="rounded-md border border-ink/10 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] p-6 md:p-8">
                <div className="text-sm font-semibold text-gold">{isZh ? "公司信息" : "Company Information"}</div>
                <h3 className="mt-2 text-2xl font-semibold text-ink md:text-3xl">
                  {isZh ? site.nameZh : site.nameEn}
                </h3>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <a href={`tel:${site.phone}`} className="flex min-h-28 gap-4 rounded-md border border-ink/10 p-4 transition hover:border-gold hover:bg-mist">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-ink text-gold">
                      <Phone className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm text-steel">{isZh ? "官方电话" : "Office Phone"}</span>
                      <span className="mt-1 block text-xl font-semibold text-ink">{site.phone}</span>
                    </span>
                  </a>
                  <a href={`tel:${site.mobile}`} className="flex min-h-28 gap-4 rounded-md border border-ink/10 p-4 transition hover:border-gold hover:bg-mist">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-ink text-gold">
                      <Headset className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm text-steel">{isZh ? "业务手机" : "Mobile"}</span>
                      <span className="mt-1 block text-xl font-semibold text-ink">{site.mobile}</span>
                    </span>
                  </a>
                  <a href={`mailto:${site.email}`} className="flex min-h-28 gap-4 rounded-md border border-ink/10 p-4 transition hover:border-gold hover:bg-mist">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-ink text-gold">
                      <Mail className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-steel">{isZh ? "询盘邮箱" : "Inquiry Email"}</span>
                      <span className="mt-1 block break-words text-xl font-semibold text-ink">{site.email}</span>
                    </span>
                  </a>
                  <div className="flex min-h-28 gap-4 rounded-md border border-ink/10 p-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-ink text-gold">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm text-steel">{isZh ? "公司地址" : "Address"}</span>
                      <span className="mt-1 block text-xl font-semibold text-ink">{isZh ? site.addressZh : site.addressEn}</span>
                    </span>
                  </div>
                </div>
                <div className="mt-6 rounded-md bg-ink px-5 py-4 text-sm leading-7 text-white/76">
                  {isZh
                    ? "建议您在咨询时提供产品名称、使用场景、数量、交付地区和证书要求，我们可以更快判断规格和供货方案。"
                    : "For faster support, include product name, use case, quantity, delivery location, and certificate requirements."}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <footer className="bg-ink px-5 pb-28 pt-10 text-white md:py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <BrandLogo inverse />
          <div className="flex flex-col gap-2 text-sm text-white/65 md:items-end">
            <div>{site.email} · {site.phone} / {site.mobile} · {isZh ? site.addressZh : site.addressEn}</div>
            <Link href={`/${locale}/admin`} className="text-white/45 hover:text-gold">
              {isZh ? "内部管理入口" : "Internal admin"}
            </Link>
          </div>
        </div>
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-white/95 p-3 shadow-soft backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
          <a
            href={`tel:${site.mobile}`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-ink text-sm font-bold text-white"
          >
            <Phone className="h-4 w-4 text-gold" />
            {isZh ? "电话咨询" : "Call"}
          </a>
          <Link
            href={`/${locale}/inquiry`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-gold text-sm font-bold text-ink"
          >
            {isZh ? "提交需求" : "Inquire"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
