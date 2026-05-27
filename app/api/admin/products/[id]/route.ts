import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb, getProduct } from "@/lib/db";

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

function parseId(id: string) {
  const numericId = Number(id);
  return Number.isInteger(numericId) && numericId > 0 ? numericId : null;
}

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);

  if (!id) {
    return NextResponse.json({ error: "产品ID无效" }, { status: 400 });
  }

  const product = getProduct(id);

  if (!product) {
    return NextResponse.json({ error: "产品不存在" }, { status: 404 });
  }

  return NextResponse.json({ product });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);

  if (!id) {
    return NextResponse.json({ error: "产品ID无效" }, { status: 400 });
  }

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
      UPDATE products
      SET
        category_id = ?,
        sku = ?,
        name_zh = ?,
        name_en = ?,
        summary_zh = ?,
        summary_en = ?,
        specs = ?,
        status = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
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
      product.status,
      id
    );

  if (!result.changes) {
    return NextResponse.json({ error: "产品不存在" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);

  if (!id) {
    return NextResponse.json({ error: "产品ID无效" }, { status: 400 });
  }

  const result = getDb().prepare("DELETE FROM products WHERE id = ?").run(id);

  if (!result.changes) {
    return NextResponse.json({ error: "产品不存在" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
