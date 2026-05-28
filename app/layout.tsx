import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "上海帝昂实业有限公司 | 消防救援装备与工业安全解决方案",
  description:
    "上海帝昂实业有限公司提供消防救援装备、空气呼吸器、消防服、灭火器及工业安全装备采购服务。",
  icons: {
    icon: "/brand/da-icon-white.png",
    shortcut: "/brand/da-icon-white.png",
    apple: "/brand/da-icon-white.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
