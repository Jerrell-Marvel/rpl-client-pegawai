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
  "daftar-offline": {
    svgPath:
      "M185-80q-17 0-29.5-12.5T143-122v-105q0-90 56-159t144-88q-40 28-62 70.5T259-312v190q0 11 3 22t10 20h-87Zm147 0q-17 0-29.5-12.5T290-122v-190q0-70 49.5-119T459-480h189q70 0 119 49t49 119v64q0 70-49 119T648-80H332Zm148-484q-66 0-112-46t-46-112q0-66 46-112t112-46q66 0 112 46t46 112q0 66-46 112t-112 46Z",
    displayText: "Daftar Offline",
  },
  "daftar-ulang": {
    svgPath:
      "M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z",
    displayText: "Daftar Ulang",
  },
  "dalam-dokter": {
    svgPath:
      "M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z",
    displayText: "Dalam Dokter",
  },
  "jadwal-dokter": {
    svgPath:
      "M185-80q-17 0-29.5-12.5T143-122v-105q0-90 56-159t144-88q-40 28-62 70.5T259-312v190q0 11 3 22t10 20h-87Zm147 0q-17 0-29.5-12.5T290-122v-190q0-70 49.5-119T459-480h189q70 0 119 49t49 119v64q0 70-49 119T648-80H332Zm148-484q-66 0-112-46t-46-112q0-66 46-112t112-46q66 0 112 46t46 112q0 66-46 112t-112 46Z",
    displayText: "Jadwal Dokter",
  },
  "menunggu-dokter": {
    svgPath:
      "M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z",
    displayText: "Menunggu Dokter",
  },
  pemanggilan: {
    svgPath:
      "M185-80q-17 0-29.5-12.5T143-122v-105q0-90 56-159t144-88q-40 28-62 70.5T259-312v190q0 11 3 22t10 20h-87Zm147 0q-17 0-29.5-12.5T290-122v-190q0-70 49.5-119T459-480h189q70 0 119 49t49 119v64q0 70-49 119T648-80H332Zm148-484q-66 0-112-46t-46-112q0-66 46-112t112-46q66 0 112 46t46 112q0 66-46 112t-112 46Z",
    displayText: "Pemanggilan",
  },

  "daftar-pegawai": {
    svgPath:
      "M185-80q-17 0-29.5-12.5T143-122v-105q0-90 56-159t144-88q-40 28-62 70.5T259-312v190q0 11 3 22t10 20h-87Zm147 0q-17 0-29.5-12.5T290-122v-190q0-70 49.5-119T459-480h189q70 0 119 49t49 119v64q0 70-49 119T648-80H332Zm148-484q-66 0-112-46t-46-112q0-66 46-112t112-46q66 0 112 46t46 112q0 66-46 112t-112 46Z",
    displayText: "Daftar Pegawai",
  },

  transaksi: {
    svgPath:
      "M20.667 14c1.781 0 3.333-.671 3.333-1.5s-1.552-1.5-3.333-1.5c-1.781 0-3.333.671-3.333 1.5s1.551 1.5 3.333 1.5zm.062-1.34c-.199-.06-.81-.111-.81-.45 0-.189.223-.358.639-.396v-.148h.214v.141c.156.004.33.021.523.06l-.078.229c-.147-.034-.311-.066-.472-.066l-.048.001c-.321.013-.347.191-.125.267.364.112.844.195.844.493 0 .238-.289.366-.645.397v.146h-.214v-.139c-.22-.002-.451-.038-.642-.102l.098-.229c.163.042.367.084.552.084l.139-.01c.247-.034.296-.199.025-.278zm-.062 5.34c1.261 0 2.57-.323 3.333-.934v.434c0 .829-1.552 1.5-3.333 1.5-1.781 0-3.333-.671-3.333-1.5v-.434c.763.611 2.071.934 3.333.934zm0-3.333c1.261 0 2.57-.323 3.333-.934v.434c0 .829-1.552 1.5-3.333 1.5-1.781 0-3.333-.671-3.333-1.5v-.434c.763.611 2.071.934 3.333.934zm0 1.666c1.261 0 2.57-.323 3.333-.935v.435c0 .828-1.552 1.5-3.333 1.5-1.781 0-3.333-.672-3.333-1.5v-.435c.763.612 2.071.935 3.333.935zm-12.167-3.833c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5zm3.236-1.14l-.09.411c-.192-.067-.405-.128-.611-.116-.372.022-.405.344-.145.479.428.201.985.35.985.886.001.429-.334.659-.749.716v.264h-.251v-.25c-.259-.004-.526-.066-.749-.181l.113-.411c.239.092.558.191.807.135.287-.065.346-.36.028-.503-.233-.108-.944-.201-.944-.811 0-.341.261-.646.746-.713v-.266h.251v.254c.179.005.382.037.609.106zm6.264-5.36h-17v10h-1v-11h18v1zm2 1v2.834c-.715.059-1.401.214-2 .458v-1.292h-14v7h12v2h-14v-11h18z",
    displayText: "Pembayaran Pasien",
  },
};

const allowedUrlAccessMapper: { [key: string]: string[] } = {
  perawat: ["pemanggilan", "menunggu-dokter", "dalam-dokter"],
  dokter: ["dalam-dokter"],
  "pet-admin": ["daftar-ulang", "daftar-offline", "jadwal-dokter", "transaksi"],
  "sis-admin": ["daftar-pegawai"],
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
                  viewBox={url === "transaksi" ? "0 0 24 24" : "0 -960 960 960"}
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
