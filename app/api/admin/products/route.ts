import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequest, unauthorizedJson } from "@/lib/auth";
import { createProduct, listProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

const productSchema = z.object({
  categoryId: z.coerce.number().int().positive(),
  brand: z.string().trim().max(80).optional().default(""),
  sku: z.string().trim().max(80).optional().default(""),
  nameZh: z.string().trim().min(1, "请输入中文产品名称"),
  nameEn: z.string().trim().max(160).optional().default(""),
  summaryZh: z.string().trim().max(1000).optional().default(""),
  summaryEn: z.string().trim().max(1000).optional().default(""),
  subcategoryZh: z.string().trim().max(120).optional().default(""),
  subcategoryEn: z.string().trim().max(120).optional().default(""),
  specs: z.string().trim().max(4000).optional().default(""),
  referencePrice: z.string().trim().max(80).optional().default(""),
  imageUrl: z.string().trim().max(500).optional().default(""),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT")
});

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorizedJson();
  }

  return NextResponse.json({ products: listProducts() });
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorizedJson();
  }

  const payload = productSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json(
      { error: payload.error.issues[0]?.message ?? "产品信息不完整" },
      { status: 400 }
    );
  }

  const id = createProduct(payload.data);

  return NextResponse.json({ id }, { status: 201 });
}
