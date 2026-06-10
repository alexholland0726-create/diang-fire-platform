import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequest, unauthorizedJson } from "@/lib/auth";
import { updateCategory } from "@/lib/db";

export const dynamic = "force-dynamic";

const categorySchema = z.object({
  slug: z.string().trim().max(80).optional().default(""),
  nameZh: z.string().trim().min(1, "请输入中文分类名称").max(120),
  nameEn: z.string().trim().max(160).optional().default("")
});

function parseId(id: string) {
  const numericId = Number(id);
  return Number.isInteger(numericId) && numericId > 0 ? numericId : null;
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  if (!isAdminRequest(request)) {
    return unauthorizedJson();
  }

  const id = parseId(params.id);

  if (!id) {
    return NextResponse.json({ error: "分类ID无效" }, { status: 400 });
  }

  const payload = categorySchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json(
      { error: payload.error.issues[0]?.message ?? "分类信息不完整" },
      { status: 400 }
    );
  }

  const category = updateCategory(id, payload.data);

  if (!category) {
    return NextResponse.json({ error: "分类不存在" }, { status: 404 });
  }

  return NextResponse.json({ category });
}
