import fs from "node:fs";
import path from "node:path";

const dataDir = process.env.DIANG_DATA_DIR || path.join(process.cwd(), "data");
const storePath = path.join(dataDir, "diang-data.json");

export type ProductCategoryRecord = {
  id: number;
  slug: string;
  nameZh: string;
  nameEn: string;
};

export type ProductCategoryInput = {
  slug?: string;
  nameZh: string;
  nameEn: string;
};

export type ProductRecord = {
  id: number;
  categoryId: number;
  categorySlug: string;
  categoryNameZh: string;
  categoryNameEn: string;
  brand: string;
  sku: string;
  nameZh: string;
  nameEn: string;
  summaryZh: string;
  summaryEn: string;
  subcategoryZh: string;
  subcategoryEn: string;
  specs: string;
  referencePrice: string;
  imageUrl: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
};

export type ProductInput = {
  categoryId: number;
  brand: string;
  sku: string;
  nameZh: string;
  nameEn: string;
  summaryZh: string;
  summaryEn: string;
  subcategoryZh: string;
  subcategoryEn: string;
  specs: string;
  referencePrice: string;
  imageUrl: string;
  status: ProductRecord["status"];
};

export type InquiryRecord = {
  id: number;
  company: string;
  contactName: string;
  phone: string;
  email: string;
  category: string;
  message: string;
  status: "NEW" | "CONTACTED" | "QUOTED" | "CLOSED";
  createdAt: string;
  updatedAt: string;
};

export type InquiryInput = {
  company: string;
  contactName: string;
  phone: string;
  email: string;
  category: string;
  message: string;
};

type ProductStoredRecord = Omit<ProductRecord, "categorySlug" | "categoryNameZh" | "categoryNameEn">;

type Store = {
  nextProductId: number;
  nextInquiryId: number;
  categories: ProductCategoryRecord[];
  products: ProductStoredRecord[];
  inquiries: InquiryRecord[];
};

const categorySeeds: ProductCategoryRecord[] = [
  { id: 1, slug: "respiratory-protection", nameZh: "呼吸防护", nameEn: "Respiratory Protection" },
  { id: 2, slug: "eye-face-protection", nameZh: "眼面防护", nameEn: "Eye and Face Protection" },
  { id: 3, slug: "hearing-protection", nameZh: "听力防护", nameEn: "Hearing Protection" },
  { id: 4, slug: "hand-protection", nameZh: "手部防护", nameEn: "Hand Protection" },
  { id: 5, slug: "fall-protection", nameZh: "坠落防护", nameEn: "Fall Protection" },
  { id: 6, slug: "gas-detection", nameZh: "气体检测", nameEn: "Gas Detection" },
  { id: 7, slug: "fire-emergency-equipment", nameZh: "消防应急装备", nameEn: "Fire and Emergency Equipment" },
  { id: 8, slug: "industrial-safety", nameZh: "工业安全综合", nameEn: "Industrial Safety" }
];

function defaultStore(): Store {
  return {
    nextProductId: 1,
    nextInquiryId: 1,
    categories: categorySeeds,
    products: [],
    inquiries: []
  };
}

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function normalizeStore(store: Partial<Store>): Store {
  const seededCategories = categorySeeds.map((seed) => {
    const existing = store.categories?.find((item) => item.slug === seed.slug);
    return existing ? { ...existing, ...seed } : seed;
  });
  const customCategories = (store.categories || []).filter(
    (category) => !categorySeeds.some((seed) => seed.slug === category.slug || seed.id === category.id)
  );
  const categories = [...seededCategories, ...customCategories];

  const products = (store.products || []).map((product) => ({
    ...product,
    subcategoryZh: product.subcategoryZh || "",
    subcategoryEn: product.subcategoryEn || "",
    brand: product.brand || "",
    referencePrice: product.referencePrice || "",
    imageUrl: product.imageUrl || ""
  }));

  const inquiries = (store.inquiries || []).map((inquiry) => ({
    ...inquiry,
    category: inquiry.category || "",
    status: inquiry.status || "NEW"
  }));

  return {
    nextProductId:
      store.nextProductId || Math.max(0, ...products.map((product) => product.id)) + 1,
    nextInquiryId:
      store.nextInquiryId || Math.max(0, ...inquiries.map((inquiry) => inquiry.id)) + 1,
    categories,
    products,
    inquiries
  };
}

function readStore(): Store {
  ensureDataDir();

  if (!fs.existsSync(storePath)) {
    const store = defaultStore();
    writeStore(store);
    return store;
  }

  const raw = fs.readFileSync(storePath, "utf8");
  return normalizeStore(JSON.parse(raw) as Partial<Store>);
}

function writeStore(store: Store) {
  ensureDataDir();
  fs.writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

function withCategory(product: ProductStoredRecord, categories: ProductCategoryRecord[]): ProductRecord {
  const category = categories.find((item) => item.id === product.categoryId) || categories[0];

  return {
    ...product,
    categorySlug: category?.slug || "",
    categoryNameZh: category?.nameZh || "",
    categoryNameEn: category?.nameEn || ""
  };
}

export function listCategories() {
  return readStore().categories;
}

function toSlug(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function uniqueCategorySlug(categories: ProductCategoryRecord[], input: ProductCategoryInput, currentId?: number) {
  const baseSlug = toSlug(input.slug || input.nameEn || input.nameZh) || `category-${Date.now()}`;
  let slug = baseSlug;
  let index = 2;

  while (categories.some((category) => category.slug === slug && category.id !== currentId)) {
    slug = `${baseSlug}-${index}`;
    index += 1;
  }

  return slug;
}

export function createCategory(input: ProductCategoryInput) {
  const store = readStore();
  const id = Math.max(0, ...store.categories.map((category) => category.id)) + 1;
  const category: ProductCategoryRecord = {
    id,
    slug: uniqueCategorySlug(store.categories, input),
    nameZh: input.nameZh,
    nameEn: input.nameEn
  };

  store.categories.push(category);
  writeStore(store);

  return category;
}

export function updateCategory(id: number, input: ProductCategoryInput) {
  const store = readStore();
  const index = store.categories.findIndex((category) => category.id === id);

  if (index < 0) {
    return undefined;
  }

  const category = {
    ...store.categories[index],
    slug: uniqueCategorySlug(store.categories, input, id),
    nameZh: input.nameZh,
    nameEn: input.nameEn
  };

  store.categories[index] = category;
  writeStore(store);

  return category;
}

export function listProducts() {
  const store = readStore();
  return store.products
    .map((product) => withCategory(product, store.categories))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || b.id - a.id);
}

export function getProduct(id: number) {
  const store = readStore();
  const product = store.products.find((item) => item.id === id);
  return product ? withCategory(product, store.categories) : undefined;
}

export function createProduct(input: ProductInput) {
  const store = readStore();
  const now = new Date().toISOString();
  const product: ProductStoredRecord = {
    id: store.nextProductId,
    categoryId: input.categoryId,
    brand: input.brand,
    sku: input.sku,
    nameZh: input.nameZh,
    nameEn: input.nameEn,
    summaryZh: input.summaryZh,
    summaryEn: input.summaryEn,
    subcategoryZh: input.subcategoryZh,
    subcategoryEn: input.subcategoryEn,
    specs: input.specs,
    referencePrice: input.referencePrice,
    imageUrl: input.imageUrl,
    status: input.status,
    createdAt: now,
    updatedAt: now
  };

  store.nextProductId += 1;
  store.products.unshift(product);
  writeStore(store);

  return product.id;
}

export function updateProduct(id: number, input: ProductInput) {
  const store = readStore();
  const index = store.products.findIndex((item) => item.id === id);

  if (index < 0) {
    return false;
  }

  store.products[index] = {
    ...store.products[index],
    ...input,
    updatedAt: new Date().toISOString()
  };
  writeStore(store);
  return true;
}

export function deleteProduct(id: number) {
  const store = readStore();
  const nextProducts = store.products.filter((item) => item.id !== id);

  if (nextProducts.length === store.products.length) {
    return false;
  }

  store.products = nextProducts;
  writeStore(store);
  return true;
}

export function listInquiries() {
  return readStore().inquiries.sort((a, b) => b.createdAt.localeCompare(a.createdAt) || b.id - a.id);
}

export function createInquiry(input: InquiryInput) {
  const store = readStore();
  const now = new Date().toISOString();
  const inquiry: InquiryRecord = {
    id: store.nextInquiryId,
    company: input.company,
    contactName: input.contactName,
    phone: input.phone,
    email: input.email,
    category: input.category,
    message: input.message,
    status: "NEW",
    createdAt: now,
    updatedAt: now
  };

  store.nextInquiryId += 1;
  store.inquiries.unshift(inquiry);
  writeStore(store);

  return inquiry.id;
}

export function updateInquiryStatus(id: number, status: InquiryRecord["status"]) {
  const store = readStore();
  const inquiry = store.inquiries.find((item) => item.id === id);

  if (!inquiry) {
    return false;
  }

  inquiry.status = status;
  inquiry.updatedAt = new Date().toISOString();
  writeStore(store);
  return true;
}

