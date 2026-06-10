import type { Locale } from "@/lib/site";

export const dynamic = "force-dynamic";

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return <div data-locale={params.locale}>{children}</div>;
}
