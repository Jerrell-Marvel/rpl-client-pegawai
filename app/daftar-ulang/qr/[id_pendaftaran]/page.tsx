"use client";

import { TokenType } from "@/types/token";
import { AxiosInstance } from "@/utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

type DaftarUlangQrPageProps = {
  params: {
    id_pendaftaran: string;
  };
};
export default function DaftarUlangQrPage({ params }: DaftarUlangQrPageProps) {
  const [isLoading, setIsLoading] = useState(true);

  const initialRender = useRef(true);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await AxiosInstance.post(
        `http://localhost:5000/api/pendaftaran/daftar-ulang/${params.id_pendaftaran}`,
      );
      setIsLoading(false);
    };
    const token = window.localStorage.getItem("token");
    if (token) {
      const { role }: TokenType = jwtDecode(token);

      if (role === "pet-admin" && initialRender.current) {
        fetchData();
      }
    }

    initialRender.current = false;
  }, []);
  return <div>{isLoading ? "Mendaftarkan..." : "Berhasil"}</div>;
}
