import { NextResponse } from "next/server";
import { clearAdminCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

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
  const response = NextResponse.redirect(redirectUrl(request, "/zh/admin/login"));
  clearAdminCookie(response);
  return response;
}
