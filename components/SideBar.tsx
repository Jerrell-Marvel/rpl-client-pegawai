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
  "daftar-ulang": {
    svgPath:
      "M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z",
    displayText: "Daftar Ulang",
  },
  pemanggilan: {
    svgPath:
      "M185-80q-17 0-29.5-12.5T143-122v-105q0-90 56-159t144-88q-40 28-62 70.5T259-312v190q0 11 3 22t10 20h-87Zm147 0q-17 0-29.5-12.5T290-122v-190q0-70 49.5-119T459-480h189q70 0 119 49t49 119v64q0 70-49 119T648-80H332Zm148-484q-66 0-112-46t-46-112q0-66 46-112t112-46q66 0 112 46t46 112q0 66-46 112t-112 46Z",
    displayText: "Pemanggilan",
  },
  "menunggu-dokter": {
    svgPath:
      "M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z",
    displayText: "Menunggu Dokter",
  },
  "dalam-dokter": {
    svgPath:
      "M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z",
    displayText: "Dalam Dokter",
  },
  "daftar-offline": {
    svgPath:
      "M185-80q-17 0-29.5-12.5T143-122v-105q0-90 56-159t144-88q-40 28-62 70.5T259-312v190q0 11 3 22t10 20h-87Zm147 0q-17 0-29.5-12.5T290-122v-190q0-70 49.5-119T459-480h189q70 0 119 49t49 119v64q0 70-49 119T648-80H332Zm148-484q-66 0-112-46t-46-112q0-66 46-112t112-46q66 0 112 46t46 112q0 66-46 112t-112 46Z",
    displayText: "Daftar Offline",
  },
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

  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <div className="fixed left-0 top-0 flex h-screen w-[20vw] flex-col justify-between bg-gray-200 p-6">
        <div className="flex flex-col gap-4">
          {allowedUrl?.map((url) => {
            console.log(urlMapper[url]);
            return (
              <Link
                href={`/${url}`}
                className="group flex flex-row items-center gap-2 rounded-lg px-4 py-3 transition-all hover:bg-[#e9f5fe]"
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
                <p className="w-full group-hover:text-[#0c7fda]">
                  {urlMapper[url].displayText}
                </p>
              </Link>
            );
          })}
        </div>

        <div>
          <button
            onClick={logoutHandler}
            className="flex w-full flex-row items-center gap-2 rounded-md bg-gray-600 px-4 py-3 hover:bg-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>

            <p className="text-white">Logout</p>
          </button>
        </div>
      </div>
    </>
  );
}
