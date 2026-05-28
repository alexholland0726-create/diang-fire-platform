import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSession, setAdminCookie, validateAdminCredentials } from "@/lib/auth";

export const dynamic = "force-dynamic";

const loginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
  locale: z.enum(["zh", "en"]).default("zh")
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const payload = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    locale: formData.get("locale") || "zh"
  });

  if (!payload.success || !validateAdminCredentials(payload.data.username, payload.data.password)) {
    return NextResponse.redirect(new URL(`/${payload.success ? payload.data.locale : "zh"}/admin/login?error=1`, request.url));
  }

  const response = NextResponse.redirect(new URL(`/${payload.data.locale}/admin`, request.url));
  setAdminCookie(response, createAdminSession(payload.data.username));
  return response;
}
