import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import type { Locale } from "@/lib/site";

export default function AdminLoginPage({
  params,
  searchParams
}: {
  params: { locale: Locale };
  searchParams: { error?: string };
}) {
  const isZh = params.locale !== "en";

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#071323_0%,#142337_52%,#F4F6F8_52%,#F4F6F8_100%)] px-5 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-md bg-white shadow-soft lg:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-ink p-8 text-white md:p-12">
            <Link href={`/${params.locale}`} className="inline-block">
              <BrandLogo inverse />
            </Link>
            <div className="mt-20 max-w-md">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-gold text-ink">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <h1 className="mt-6 text-3xl font-semibold md:text-4xl">
                {isZh ? "帝昂运营管理后台" : "Diang Admin Portal"}
              </h1>
              <p className="mt-5 leading-8 text-white/70">
                {isZh
                  ? "用于管理产品、询价线索、客户服务和网站内容。请使用管理员账号登录。"
                  : "Manage products, inquiries, client service, and website content."}
              </p>
            </div>
          </div>
          <div className="flex items-center p-8 md:p-12">
            <form action="/api/admin/login" method="post" className="grid w-full gap-5">
              <input type="hidden" name="locale" value={params.locale} />
              <div>
                <h2 className="text-2xl font-semibold text-ink">{isZh ? "管理员登录" : "Admin Login"}</h2>
                <p className="mt-2 text-sm text-steel">
                  {isZh ? "登录后可进入产品与询价管理。" : "Sign in to manage products and inquiries."}
                </p>
              </div>
              {searchParams.error && (
                <div className="rounded-md bg-ember/10 px-4 py-3 text-sm font-medium text-ember">
                  {isZh ? "账号或密码不正确" : "Invalid username or password"}
                </div>
              )}
              <label className="grid gap-2 text-sm font-medium text-ink">
                {isZh ? "管理员账号" : "Username"}
                <input
                  name="username"
                  autoComplete="username"
                  className="h-12 rounded-md border border-ink/10 px-4 outline-none focus:border-gold"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-ink">
                {isZh ? "管理员密码" : "Password"}
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="h-12 rounded-md border border-ink/10 px-4 outline-none focus:border-gold"
                  required
                />
              </label>
              <button className="h-12 rounded-md bg-ink px-5 text-sm font-bold text-white">
                {isZh ? "登录后台" : "Sign in"}
              </button>
              <Link href={`/${params.locale}`} className="text-sm font-semibold text-steel hover:text-ink">
                {isZh ? "返回官网首页" : "Back to website"}
              </Link>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
