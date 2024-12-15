import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "@/components/SideBar";
import SideBarWrapper from "@/components/SideBarWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <body className={`${notoSans.className}`}>
        <ToastContainer position="top-center" />
        <AppRouterCacheProvider>
          <NextUIProvider>
            <SideBarWrapper>
              <div className="min-h-screen bg-slate-100">{children}</div>
            </SideBarWrapper>
          </NextUIProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
