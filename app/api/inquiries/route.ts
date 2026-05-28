import { NextResponse } from "next/server";
import { z } from "zod";
import { createInquiry } from "@/lib/db";

export const dynamic = "force-dynamic";

const inquirySchema = z.object({
  company: z.string().trim().max(120).optional().default(""),
  contactName: z.string().trim().min(1, "请填写联系人").max(80),
  phone: z.string().trim().max(80).optional().default(""),
  email: z.string().trim().email("请填写有效邮箱").or(z.literal("")).optional().default(""),
  category: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(5, "请简单说明采购需求").max(3000)
});

export async function POST(request: Request) {
  const payload = inquirySchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json(
      { error: payload.error.issues[0]?.message ?? "询价信息不完整" },
      { status: 400 }
    );
  }

  const id = createInquiry(payload.data);

  return NextResponse.json({ id }, { status: 201 });
}
