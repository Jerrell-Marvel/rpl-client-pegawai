import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "@/components/SideBar";

const notoSans = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Poliklinik",
  description: "Sistem Informasi Poliklinik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.className} `}>
        <AppRouterCacheProvider>
          <NextUIProvider>
            <div className="flex">
              <SideBar />
              <div className="min-h-screen w-full bg-slate-100">{children}</div>
            </div>
          </NextUIProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
