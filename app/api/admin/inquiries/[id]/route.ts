import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequest, unauthorizedJson } from "@/lib/auth";
import { updateInquiryStatus } from "@/lib/db";

export const dynamic = "force-dynamic";

const statusSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "QUOTED", "CLOSED"])
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
    return NextResponse.json({ error: "询价ID无效" }, { status: 400 });
  }

  const payload = statusSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "状态无效" }, { status: 400 });
  }

  if (!updateInquiryStatus(id, payload.data.status)) {
    return NextResponse.json({ error: "询价不存在" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
