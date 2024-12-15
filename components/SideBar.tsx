"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TokenType } from "@/types/token";
import { jwtDecode } from "jwt-decode";

type SideBarProps = {
  token: string;
};

const urlMapper: { [key: string]: { svgPath: string; displayText: string } } = {
  "daftar-ulang": { svgPath: "", displayText: "Daftar Ulang" },
  pemanggilan: { svgPath: "", displayText: "Pemanggilan" },
  "menunggu-dokter": { svgPath: "", displayText: "Menunggu Dokter" },
  "dalam-dokter": { svgPath: "", displayText: "Dalam Dokter" },
  "daftar-offline": { svgPath: "", displayText: "Daftar Offline" },
};

const allowedUrlAccessMapper: { [key: string]: string[] } = {
  perawat: ["pemanggilan", "menunggu-dokter", "dalam-dokter"],
  dokter: ["dalam-dokter"],
  "pet-admin": ["daftar-ulang", "daftar-offline"],
  "sis-admin": [
    "daftar-ulang",
    "pemanggilan",
    "menunggu-dokter",
    "dalam-dokter",
  ],
};

export default function SideBar({ token }: SideBarProps) {
  const { role: userRole }: TokenType = jwtDecode(token);

  console.log(userRole);

  const allowedUrl = allowedUrlAccessMapper[userRole];

  // dokter : dalam-dokter

  // perawat : pemanggilan, menunggu-dokter, dalam-dokter

  // pet-admin : semua

  console.log(userRole);

  return (
    <>
      <div className="fixed left-0 top-0 flex h-screen w-[20vw] flex-col justify-between bg-gray-200 pr-5">
        <div className="mt-4 space-x-4">
          {allowedUrl.map((url) => {
            console.log(urlMapper[url]);
            return (
              <Link
                href={`/${url}`}
                className="group mb-4 ml-4 flex flex-row items-center p-2 transition-all hover:rounded-md hover:bg-[#e9f5fe]"
                key={url}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  className="fill-[#5d7285] group-hover:fill-[#0c7fda]"
                >
                  <path d={urlMapper[url].svgPath} />
                </svg>
                <p className="ml-2 w-full break-words group-hover:text-[#0c7fda]">
                  {urlMapper[url].displayText}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mb-4 mt-auto">
          <a
            href=""
            className="mb-4 ml-4 flex flex-row items-center rounded-md bg-[#667a8a] p-2 hover:bg-gray-500"
          >
            <Image
              src="./images/Logout.svg"
              alt="Logo Image"
              width={24}
              height={24}
              className="h-6 w-6"
            />

            <p className="ml-2 text-white">Logout</p>
          </a>
        </div>
      </div>
    </>
  );
}
