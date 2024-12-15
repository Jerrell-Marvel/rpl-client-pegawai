"use client";

import PemanggilanCard from "@/components/PemanggilanCard";
import PendaftaranCard from "@/components/PendaftaranCard";
import { Pemanggilan, Pendaftaran } from "@/types/pendaftaran";
import { AxiosInstance } from "@/utils/axiosInstance";
import { Button, ScrollShadow } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function PemanggilanPage() {
  const current_date = new Date();
  const [pendaftaran, setPendaftaran] = useState<Pemanggilan[]>([]);

  console.log(pendaftaran);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await AxiosInstance.get<Pemanggilan[]>(
        "http://localhost:5000/api/pendaftaran",
        {
          params: {
            status: "dokter",
          },
        },
      );

      setPendaftaran(data);
    };

    fetchData();
  }, []);

  const handleMasukRuanganClick = async (id_pendaftaran: number) => {
    const { data } = await AxiosInstance.post(
      `http://localhost:5000/api/pendaftaran/status/${id_pendaftaran}`,
      {
        status: "pemeriksaan",
      },
    );

    const newPendaftaran = pendaftaran.filter(
      (p) => p.id_pendaftaran !== id_pendaftaran,
    );
    setPendaftaran(newPendaftaran);

    toast.success("berhasil");
  };

  return (
    <main className="flex flex-col gap-8 p-12">
      <div className="border-b border-black bg-white p-4 pl-8 shadow-md">
        <p className="text-m text-xs text-gray-500">
          {current_date.toDateString()}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-800">
          Daftar Ulang Pasien
        </h1>
      </div>

      <div className="flex flex-col items-center gap-8 bg-gray-50 py-4">
        <ScrollShadow
          hideScrollBar
          className="grid max-h-[740px] w-full max-w-[1200px] gap-8 overflow-y-auto sm:grid-cols-1 lg:grid-cols-2"
        >
          {pendaftaran.map((p) => {
            return (
              <>
                <PemanggilanCard pemanggilan={p}>
                  <div className="flex justify-end">
                    <Button
                      //   as={Link}
                      className="bg-primary text-white"
                      //   href={`/informasi-dasar/${p.id_rkm_med}`}
                      onClick={() => handleMasukRuanganClick(p.id_pendaftaran)}
                    >
                      Sudah Masuk Ruangan Dokter
                    </Button>
                  </div>
                </PemanggilanCard>
              </>
            );
          })}
        </ScrollShadow>
      </div>
    </main>
  );
}

export default PemanggilanPage;
