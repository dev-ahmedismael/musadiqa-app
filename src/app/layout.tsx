import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import GlobalProviders from "@/providers/Global";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
});

export const metadata: Metadata = {
  title: "مصدقة | نظام المحاسبة الذكي للأعمال الحديثة",
  description:
    "مصدقة هو نظام محاسبي متكامل يوفر لك حلول ذكية لإدارة حساباتك بدقة وسهولة، مناسب لجميع أنواع الأعمال الحديثة ويعزز من نمو مشروعك بثقة واحترافية.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="emotion-insertion-point" content="" />
      </head>
      <body className={`${cairo.className} antialiased`}>
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
