import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import GlobalProviders from "@/context/Global";

const roboto = Roboto({
  subsets: ["latin"],
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
      <body className={`${roboto.className} antialiased`}>
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
