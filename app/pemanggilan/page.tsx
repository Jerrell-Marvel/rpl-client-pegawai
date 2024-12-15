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
            status: "pemanggilan",
          },
        },
      );

      setPendaftaran(data);
    };

    fetchData();
  }, []);

  const handleSelesaiClick = async (id_pendaftaran: number) => {
    const { data } = await AxiosInstance.post(
      `http://localhost:5000/api/pendaftaran/status/${id_pendaftaran}`,
      {
        status: "dokter",
      },
    );

    const newPendaftaran = pendaftaran.filter(
      (p) => p.id_pendaftaran !== id_pendaftaran,
    );
    setPendaftaran(newPendaftaran);

    toast.success("berhasil");
  };

  return (
    <main className="m-0 flex max-h-screen flex-col gap-8 overflow-y-auto p-12">
      <div className="border-b border-black bg-white p-4 pl-8 shadow-md">
        <p className="text-m text-xs text-gray-500">
          {current_date.toDateString()}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-800">
          Pemanggilan Pasien
        </h1>
      </div>

      <div className="flex max-h-[70rem] flex-col items-center gap-8 bg-gray-50 py-4">
        <ScrollShadow
          hideScrollBar
          className="grid w-full max-w-[1200px] gap-8 overflow-y-auto sm:grid-cols-1 lg:grid-cols-2"
        >
          {pendaftaran.map((p) => {
            return (
              <div key={p.id_pendaftaran} className="my-[20px]">
                <PemanggilanCard pemanggilan={p}>
                  <div className="flex justify-end">
                    <Button
                      className="rounded-md bg-green-500 px-6 py-2 text-white transition-all hover:bg-green-600"
                      onClick={() => handleSelesaiClick(p.id_pendaftaran)}
                    >
                      Selesai
                    </Button>
                    <Button
                      as={Link}
                      className="mx-2 rounded-md bg-primary px-6 py-2 text-white transition-all hover:bg-blue-800"
                      href={`/informasi-dasar/${p.id_rkm_med}`}
                    >
                      Informasi Dasar
                    </Button>
                  </div>
                </PemanggilanCard>
              </div>
            );
          })}
        </ScrollShadow>
      </div>
    </main>
  );
}

export default PemanggilanPage;
