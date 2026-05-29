import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSession, setAdminCookie, validateAdminCredentials } from "@/lib/auth";

export const dynamic = "force-dynamic";

const loginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
  locale: z.enum(["zh", "en"]).default("zh")
});

function redirectUrl(request: Request, path: string) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost || request.headers.get("host") || "";
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const protocol = forwardedProto || (host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https");
  const publicHost =
    !host || host.startsWith("0.0.0.0") || host.startsWith("[::]") ? process.env.NEXT_PUBLIC_SITE_HOST || "www.da-fire.com" : host;

  return new URL(path, `${protocol}://${publicHost}`);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const payload = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    locale: formData.get("locale") || "zh"
  });

  if (!payload.success || !validateAdminCredentials(payload.data.username, payload.data.password)) {
    return NextResponse.redirect(redirectUrl(request, `/${payload.success ? payload.data.locale : "zh"}/admin/login?error=1`));
  }

  const response = NextResponse.redirect(redirectUrl(request, `/${payload.data.locale}/admin`));
  setAdminCookie(response, createAdminSession(payload.data.username));
  return response;
}
