export type Locale = "zh" | "en";

export const locales: Locale[] = ["zh", "en"];

export const site = {
  nameZh: "上海帝昂实业有限公司",
  nameEn: "Shanghai Di'ang Industrial Co., Ltd.",
  shortName: "DA",
  phone: "021-58073572",
  mobile: "13062878007",
  email: "sales@da-fire.com",
  addressZh: "上海浦东新区沪南公路8666弄2号楼7楼",
  addressEn: "7F, Building 2, Lane 8666, Hunan Highway, Pudong New Area, Shanghai"
};

export const dictionary = {
  zh: {
    nav: ["首页", "产品中心", "解决方案", "案例", "知识库", "关于我们"],
    heroTitle: "消防救援装备与工业安全解决方案供应商",
    heroLead:
      "聚合优质供应链，为消防救援、工业园区、公共建筑与应急管理客户提供装备选型、采购询价、项目跟进与维保管理服务。",
    ctaInquiry: "提交采购需求",
    ctaPortal: "进入客户平台",
    language: "English",
    products: "核心产品",
    solutions: "场景解决方案",
    admin: "管理后台",
    customer: "客户中心"
  },
  en: {
    nav: ["Home", "Products", "Solutions", "Cases", "Insights", "About"],
    heroTitle: "Fire Rescue Equipment and Industrial Safety Solutions",
    heroLead:
      "A B2B sourcing and service platform for fire rescue teams, industrial sites, public buildings, and emergency management customers.",
    ctaInquiry: "Request a Quote",
    ctaPortal: "Client Portal",
    language: "中文",
    products: "Featured Products",
    solutions: "Solutions",
    admin: "Admin",
    customer: "Portal"
  }
} as const;

export const productCategories = [
  {
    key: "rescue-equipment",
    zh: "消防救援装备",
    en: "Fire Rescue Equipment",
    descZh: "面向消防救援、抢险救灾和应急处置场景，整合破拆、照明、通信与救援辅助装备。",
    descEn: "For rescue, disaster response, and emergency operations, covering rescue tools, lighting, communication, and support gear.",
    serviceZh: "适合装备清单配置、项目询价和批量采购。",
    serviceEn: "Suitable for equipment lists, project inquiries, and batch sourcing.",
    itemsZh: ["破拆工具", "救援绳索", "应急照明", "通信装备"],
    itemsEn: ["Forcible entry tools", "Rescue ropes", "Emergency lighting", "Communication gear"]
  },
  {
    key: "respiratory-protection",
    zh: "呼吸防护",
    en: "Respiratory Protection",
    descZh: "覆盖正压式空气呼吸器、备用气瓶、面罩与气体检测，适配消防、化工和有限空间作业。",
    descEn: "Covers SCBA, spare cylinders, masks, and gas detection for firefighting, chemical, and confined-space work.",
    serviceZh: "支持规格核对、证书资料和后续维保跟进。",
    serviceEn: "Supports spec checks, certificates, and maintenance follow-up.",
    itemsZh: ["空气呼吸器", "备用气瓶", "面罩", "气体检测"],
    itemsEn: ["SCBA", "Spare cylinders", "Masks", "Gas detection"]
  },
  {
    key: "firewear",
    zh: "消防服装",
    en: "Fire Protective Clothing",
    descZh: "提供灭火防护服、抢险救援服、消防靴和手套等个人防护配置建议。",
    descEn: "Provides PPE selection for firefighting suits, rescue suits, boots, gloves, and related protection.",
    serviceZh: "按尺码、等级、标准和交期进行采购协同。",
    serviceEn: "Coordinates sourcing by size, grade, standard, and lead time.",
    itemsZh: ["灭火防护服", "抢险救援服", "消防靴", "消防手套"],
    itemsEn: ["Firefighting suits", "Rescue suits", "Fire boots", "Fire gloves"]
  },
  {
    key: "extinguishing",
    zh: "灭火设备",
    en: "Fire Extinguishing Equipment",
    descZh: "覆盖水基、干粉、二氧化碳以及特殊场景灭火装置，适合园区和公共建筑配置。",
    descEn: "Covers water-based, dry powder, CO2, and special extinguishing equipment for parks and buildings.",
    serviceZh: "支持按场景配置、数量统计和资料归档。",
    serviceEn: "Supports scenario configuration, quantity planning, and document archiving.",
    itemsZh: ["水基灭火器", "干粉灭火器", "二氧化碳灭火器", "专用灭火装置"],
    itemsEn: ["Water-based extinguishers", "Dry powder units", "CO2 extinguishers", "Special systems"]
  },
  {
    key: "emergency-lighting",
    zh: "应急照明",
    en: "Emergency Lighting",
    descZh: "包括移动照明、防爆照明、应急标志和现场照明系统，服务抢险和工业现场。",
    descEn: "Includes portable, explosion-proof, emergency signage, and scene lighting for rescue and industrial sites.",
    serviceZh: "适合现场应急、巡检维保和项目配套。",
    serviceEn: "Suitable for emergency response, inspection, maintenance, and project support.",
    itemsZh: ["移动照明灯", "防爆照明", "应急标志灯", "现场照明系统"],
    itemsEn: ["Portable lighting", "Explosion-proof lighting", "Emergency signage", "Scene lighting systems"]
  },
  {
    key: "industrial-safety",
    zh: "工业安全",
    en: "Industrial Safety",
    descZh: "面向石化、制造、仓储和有限空间作业，提供气体检测、防坠落、洗消等安全装备。",
    descEn: "For chemical, manufacturing, warehousing, and confined-space work, including detection, fall protection, and decon.",
    serviceZh: "按风险场景匹配产品、标准与交付资料。",
    serviceEn: "Matches products, standards, and delivery documents by risk scenario.",
    itemsZh: ["气体检测", "防坠落装备", "洗消设备", "有限空间作业防护"],
    itemsEn: ["Gas detection", "Fall protection", "Decontamination", "Confined-space safety"]
  }
];

export const solutions = [
  {
    zh: "消防救援队装备配置",
    en: "Fire Brigade Equipment Packages",
    descZh: "围绕人员防护、灭火、破拆、通信和后援保障，形成分级配置清单。",
    descEn: "Tiered packages for PPE, suppression, rescue, communication, and support."
  },
  {
    zh: "工厂园区消防安全",
    en: "Industrial Site Safety",
    descZh: "覆盖仓储、生产、配电、危化与人员疏散场景，支持选型和维保跟进。",
    descEn: "Selection and service support for warehouses, production lines, power rooms, and evacuation."
  },
  {
    zh: "公共建筑应急装备",
    en: "Public Building Emergency Kits",
    descZh: "面向学校、医院、商业综合体和办公楼，配置基础消防与应急救援物资。",
    descEn: "Emergency kits for schools, hospitals, commercial complexes, and office buildings."
  }
];

export const markets = [
  {
    zh: "消防救援",
    en: "Fire and Rescue",
    descZh: "空气呼吸器、消防服、头盔、破拆、通信和现场照明装备。",
    descEn: "SCBA, fire suits, helmets, rescue tools, communication, and lighting."
  },
  {
    zh: "石油化工",
    en: "Oil, Gas and Chemical",
    descZh: "气体检测、防爆照明、呼吸防护、应急洗消和个人防护用品。",
    descEn: "Gas detection, explosion-proof lighting, respiratory protection, decon, and PPE."
  },
  {
    zh: "公共事业",
    en: "Utilities",
    descZh: "面向电力、市政、水务和轨交客户的应急装备与维保服务。",
    descEn: "Emergency equipment and maintenance service for power, municipal, water, and transit clients."
  },
  {
    zh: "一般工业",
    en: "General Industry",
    descZh: "工厂园区、仓储物流和制造业的安全装备采购与资料管理。",
    descEn: "Safety equipment sourcing and document management for plants, warehouses, and manufacturing."
  }
];

export const featuredProducts = [
  {
    tagZh: "重点推荐",
    tagEn: "Featured",
    nameZh: "正压式空气呼吸器",
    nameEn: "Positive Pressure SCBA",
    imageUrl: "/site-images/respiratory-scba-cylinder.jpg",
    descZh: "适用于消防、应急救援、化工和市政等高风险作业环境。",
    descEn: "For firefighting, rescue, chemical, and municipal high-risk environments."
  },
  {
    tagZh: "消防救援",
    tagEn: "Fire Rescue",
    nameZh: "消防员灭火防护服",
    nameEn: "Firefighting Protective Suit",
    imageUrl: "/site-images/firewear-firefighter-portrait.jpg",
    descZh: "覆盖灭火、防热、防护和多规格采购场景。",
    descEn: "Supports firefighting, heat protection, PPE, and multi-spec procurement."
  },
  {
    tagZh: "工业安全",
    tagEn: "Industrial Safety",
    nameZh: "MSA 4合1气体检测仪",
    nameEn: "MSA 4-Gas Detector",
    imageUrl: "/site-images/industrial-respirator-team.jpg",
    descZh: "适用于有限空间、石化、制药和仓储作业的氧气、可燃气及有毒气体检测。",
    descEn: "For oxygen, combustible gas, and toxic gas detection in confined spaces, petrochemical, pharmaceutical, and warehousing operations."
  }
];

export const dashboardMetrics = [
  { labelZh: "今日询价", labelEn: "Inquiries Today", value: "18" },
  { labelZh: "待跟进客户", labelEn: "Open Leads", value: "42" },
  { labelZh: "在库产品", labelEn: "Products", value: "286" },
  { labelZh: "维保事件", labelEn: "Service Events", value: "9" }
];
