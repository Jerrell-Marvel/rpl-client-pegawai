"use client";

import { TokenType } from "@/types/token";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SideBar() {
  const token = localStorage.getItem("token");
  console.log(token);

  if (!token) return <div></div>;
  const { role }: TokenType = jwtDecode(token);
  return (
    <>
      <div className="fixed left-0 top-0 flex h-screen w-[20vw] flex-col justify-between bg-gray-200 pr-5">
        <div className="mt-4 space-x-4">
          <Link
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
          </Link>
          <Link
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
          </Link>
          <Link
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
          </Link>
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
      <div className="h-screen w-[20vw] pr-5"></div>
    </>
  );
}
