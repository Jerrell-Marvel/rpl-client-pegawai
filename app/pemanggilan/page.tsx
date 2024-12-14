"use client";

import PemanggilanCard from "@/components/PemanggilanCard";
import PendaftaranCard from "@/components/PendaftaranCard";
import { Pemanggilan, Pendaftaran } from "@/types/pendaftaran";
import { AxiosInstance } from "@/utils/axiosInstance";
import { Button, ScrollShadow } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

function PemanggilanPage() {
  const current_date =  new Date();

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
  };

  return (
    <main className=" m-0 flex flex-col gap-8 p-12 max-h-screen overflow-y-auto">
      <div className="p-4 pl-8 bg-white border-b border-black shadow-md">

        <p className="text-xs text-m text-gray-500">{current_date.toDateString()}</p>
        <h1 className="text-3xl font-bold text-gray-800 mt-2">Pemanggilan Pasien</h1>

      </div>

  <div className="flex flex-col gap-8 items-center bg-gray-50 py-4 max-h-[70rem]">
    <ScrollShadow hideScrollBar className="max-w-[1200px] w-full  overflow-y-auto grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
      {pendaftaran.map((p) => {
        return (
          <div key={p.id_pendaftaran} className="my-[20px]">
            <PemanggilanCard pemanggilan={p}>
              <div className="flex justify-end">
                <Button
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-all"
                  onClick={() => handleSelesaiClick(p.id_pendaftaran)}
                >
                  Selesai
                </Button>
                <Button
                  as={Link}
                  className="bg-primary text-white px-6 mx-2 py-2 rounded-md hover:bg-blue-800 transition-all"
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
