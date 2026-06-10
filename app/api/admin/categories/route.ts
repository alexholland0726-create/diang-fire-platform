import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequest, unauthorizedJson } from "@/lib/auth";
import { createCategory, listCategories } from "@/lib/db";

export const dynamic = "force-dynamic";

const categorySchema = z.object({
  slug: z.string().trim().max(80).optional().default(""),
  nameZh: z.string().trim().min(1, "请输入中文分类名称").max(120),
  nameEn: z.string().trim().max(160).optional().default("")
});

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorizedJson();
  }

  return NextResponse.json({ categories: listCategories() });
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorizedJson();
  }

  const payload = categorySchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json(
      { error: payload.error.issues[0]?.message ?? "分类信息不完整" },
      { status: 400 }
    );
  }

  return NextResponse.json({ category: createCategory(payload.data) }, { status: 201 });
}
