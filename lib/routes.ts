import { markets, productCategories, solutions, type Locale } from "@/lib/site";

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const insightItems = [
  {
    key: "product-documents",
    zh: "产品资料",
    en: "Product Documents",
    descZh: "说明书、证书、检测报告、选型表统一归档，方便销售和客户快速调用。",
    descEn: "Manuals, certificates, reports, and selection sheets organized for quick access."
  },
  {
    key: "selection-guides",
    zh: "选型指南",
    en: "Selection Guides",
    descZh: "按行业场景整理常见配置建议，让客户先理解方案，再提交询价需求。",
    descEn: "Scenario-based configuration guidance before quote requests."
  },
  {
    key: "service-records",
    zh: "服务记录",
    en: "Service Records",
    descZh: "询价、项目、工单和维保信息沉淀下来，形成可持续的客户服务能力。",
    descEn: "Inquiries, projects, tickets, and service records create durable support."
  }
];

export const caseItems = [
  {
    key: "fire-rescue-teams",
    zh: "消防救援单位",
    en: "Fire Rescue Teams",
    descZh: "按人员防护、呼吸防护、破拆救援、现场照明等模块整理采购清单。",
    descEn: "Quote-ready lists for PPE, respiratory protection, rescue tools, and lighting."
  },
  {
    key: "industrial-parks",
    zh: "工业园区与制造工厂",
    en: "Industrial Parks and Plants",
    descZh: "围绕作业风险、车间场景和应急预案建立常用装备目录。",
    descEn: "Common equipment catalogs around site risks and emergency plans."
  },
  {
    key: "public-buildings",
    zh: "公共建筑与物业管理",
    en: "Public Buildings and Facilities",
    descZh: "应急照明、灭火器材、疏散物资与后续维保记录放在同一服务流程。",
    descEn: "Lighting, extinguishers, evacuation supplies, and maintenance records."
  }
];

export function getSolutions() {
  return solutions.map((item) => ({ ...item, key: slugify(item.en) }));
}

export function getMarkets() {
  return markets.map((item) => ({ ...item, key: slugify(item.en) }));
}

export function getProductCategoryLinks(locale: Locale) {
  return productCategories.map((category) => ({
    key: category.key,
    label: locale === "zh" ? category.zh : category.en,
    href: `/${locale}/products?category=${category.key}`
  }));
}

