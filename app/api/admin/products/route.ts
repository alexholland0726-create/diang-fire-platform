import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb, listProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

const productSchema = z.object({
  categoryId: z.coerce.number().int().positive(),
  sku: z.string().trim().max(80).optional().default(""),
  nameZh: z.string().trim().min(1, "请输入中文产品名称"),
  nameEn: z.string().trim().max(160).optional().default(""),
  summaryZh: z.string().trim().max(1000).optional().default(""),
  summaryEn: z.string().trim().max(1000).optional().default(""),
  specs: z.string().trim().max(4000).optional().default(""),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT")
});

export async function GET() {
  return NextResponse.json({ products: listProducts() });
}

export async function POST(request: Request) {
  const payload = productSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json(
      { error: payload.error.issues[0]?.message ?? "产品信息不完整" },
      { status: 400 }
    );
  }

  const product = payload.data;
  const result = getDb()
    .prepare(
      `
      INSERT INTO products (
        category_id,
        sku,
        name_zh,
        name_en,
        summary_zh,
        summary_en,
        specs,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `
    )
    .run(
      product.categoryId,
      product.sku,
      product.nameZh,
      product.nameEn,
      product.summaryZh,
      product.summaryEn,
      product.specs,
      product.status
    );

  return NextResponse.json({ id: Number(result.lastInsertRowid) }, { status: 201 });
}
