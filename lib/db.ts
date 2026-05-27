import fs from "node:fs";
import path from "node:path";

type DatabaseSyncType = {
  exec(sql: string): void;
  prepare(sql: string): {
    all(...params: unknown[]): unknown[];
    get(...params: unknown[]): unknown;
    run(...params: unknown[]): { lastInsertRowid: number | bigint; changes: number };
  };
};

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "diang.sqlite");

let db: DatabaseSyncType | null = null;

function loadSqlite() {
  // Node 22+ ships node:sqlite. Types may lag behind, so keep the boundary small.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require("node:sqlite") as {
    DatabaseSync: new (filename: string) => DatabaseSyncType;
  };
}

export type ProductCategoryRecord = {
  id: number;
  slug: string;
  nameZh: string;
  nameEn: string;
};

export type ProductRecord = {
  id: number;
  categoryId: number;
  categoryNameZh: string;
  categoryNameEn: string;
  sku: string;
  nameZh: string;
  nameEn: string;
  summaryZh: string;
  summaryEn: string;
  specs: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
};

const categorySeeds = [
  ["rescue", "消防救援装备", "Fire Rescue Equipment"],
  ["scba", "空气呼吸器", "SCBA"],
  ["ppe", "消防服与个人防护", "Fire Suits and PPE"],
  ["extinguishers", "灭火器与灭火装置", "Extinguishers and Systems"]
];

function initDatabase(database: DatabaseSyncType) {
  database.exec(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS product_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      name_zh TEXT NOT NULL,
      name_en TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER NOT NULL,
      sku TEXT NOT NULL DEFAULT '',
      name_zh TEXT NOT NULL,
      name_en TEXT NOT NULL DEFAULT '',
      summary_zh TEXT NOT NULL DEFAULT '',
      summary_en TEXT NOT NULL DEFAULT '',
      specs TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'DRAFT',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES product_categories(id)
    );
  `);

  const insertCategory = database.prepare(`
    INSERT OR IGNORE INTO product_categories (slug, name_zh, name_en)
    VALUES (?, ?, ?)
  `);

  for (const category of categorySeeds) {
    insertCategory.run(...category);
  }
}

export function getDb() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!db) {
    const { DatabaseSync } = loadSqlite();
    db = new DatabaseSync(dbPath);
    initDatabase(db);
  }

  return db;
}

export function listCategories() {
  return getDb()
    .prepare(
      `
      SELECT
        id,
        slug,
        name_zh AS nameZh,
        name_en AS nameEn
      FROM product_categories
      ORDER BY id ASC
    `
    )
    .all() as ProductCategoryRecord[];
}

export function listProducts() {
  return getDb()
    .prepare(
      `
      SELECT
        p.id,
        p.category_id AS categoryId,
        c.name_zh AS categoryNameZh,
        c.name_en AS categoryNameEn,
        p.sku,
        p.name_zh AS nameZh,
        p.name_en AS nameEn,
        p.summary_zh AS summaryZh,
        p.summary_en AS summaryEn,
        p.specs,
        p.status,
        p.created_at AS createdAt,
        p.updated_at AS updatedAt
      FROM products p
      JOIN product_categories c ON c.id = p.category_id
      ORDER BY p.updated_at DESC, p.id DESC
    `
    )
    .all() as ProductRecord[];
}

export function getProduct(id: number) {
  return getDb()
    .prepare(
      `
      SELECT
        p.id,
        p.category_id AS categoryId,
        c.name_zh AS categoryNameZh,
        c.name_en AS categoryNameEn,
        p.sku,
        p.name_zh AS nameZh,
        p.name_en AS nameEn,
        p.summary_zh AS summaryZh,
        p.summary_en AS summaryEn,
        p.specs,
        p.status,
        p.created_at AS createdAt,
        p.updated_at AS updatedAt
      FROM products p
      JOIN product_categories c ON c.id = p.category_id
      WHERE p.id = ?
    `
    )
    .get(id) as ProductRecord | undefined;
}
