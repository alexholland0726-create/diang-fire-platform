import { NextResponse } from "next/server";
import { clearAdminCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/zh/admin/login", request.url));
  clearAdminCookie(response);
  return response;
}
