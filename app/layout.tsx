import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
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
      <body className={`${notoSans.className} `}>
        <AppRouterCacheProvider>
          <NextUIProvider>
            <div className="grid grid-cols-[2fr_8fr]">
              <div className="flex h-screen w-full flex-col justify-between bg-gray-200 pr-5">
                <div className="mt-4 space-x-4">
                  <a
                    href=""
                    className="group mb-4 ml-4 flex flex-row items-center p-2 transition-all hover:rounded-md hover:bg-[#e9f5fe]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      className="fill-[#5d7285] group-hover:fill-[#0c7fda]"
                    >
                      <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
                    </svg>
                    <p className="ml-2 w-full break-words group-hover:text-[#0c7fda]">
                      Dashboard
                    </p>
                  </a>
                  <a
                    href=""
                    className="group mb-4 ml-4 flex flex-row items-center p-2 transition-all hover:rounded-md hover:bg-[#e9f5fe]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      className="fill-[#5d7285] group-hover:fill-[#0c7fda]"
                    >
                      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                    </svg>
                    <p className="ml-2 w-full break-words group-hover:text-[#0c7fda]">
                      Informasi Pasien
                    </p>
                  </a>
                  <a
                    href=""
                    className="group mb-4 ml-4 flex flex-row items-center p-2 transition-all hover:rounded-md hover:bg-[#e9f5fe]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      className="fill-[#5d7285] group-hover:fill-[#0c7fda]"
                    >
                      <path d="M185-80q-17 0-29.5-12.5T143-122v-105q0-90 56-159t144-88q-40 28-62 70.5T259-312v190q0 11 3 22t10 20h-87Zm147 0q-17 0-29.5-12.5T290-122v-190q0-70 49.5-119T459-480h189q70 0 119 49t49 119v64q0 70-49 119T648-80H332Zm148-484q-66 0-112-46t-46-112q0-66 46-112t112-46q66 0 112 46t46 112q0 66-46 112t-112 46Z" />
                    </svg>
                    <p className="ml-2 w-full break-words group-hover:text-[#0c7fda]">
                      Kontak Dokter
                    </p>
                  </a>
                </div>

                <div className="mb-4 mt-auto">
                  <a
                    href=""
                    className="mb-4 ml-4 flex flex-row items-center rounded-md bg-[#667a8a] p-2 hover:bg-gray-500"
                  >
                    <img
                      src="./images/Logout.svg"
                      alt="Logo Image"
                      className="h-[24px] w-auto"
                    />

                    <p className="ml-2 text-[#ffffff]">Logout</p>
                  </a>
                </div>
              </div>

              <div className="min-h-screen bg-slate-100">{children}</div>
            </div>
          </NextUIProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
