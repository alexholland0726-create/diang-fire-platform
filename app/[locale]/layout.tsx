import type { Locale } from "@/lib/site";

export function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "en" }];
}

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return <div data-locale={params.locale}>{children}</div>;
}
