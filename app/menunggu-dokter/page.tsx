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
  };

  return (
    <main className="flex flex-col gap-8 p-12">
      <div className="p-4 pl-8 bg-white border-b border-black shadow-md">
        <p className="text-xs text-m text-gray-500" >{current_date.toDateString()}</p>
        <h1 className="text-3xl font-bold text-gray-800 mt-2">Daftar Ulang Pasien</h1> 

      </div>


      <div className="flex flex-col gap-8 items-center bg-gray-50 py-4">
        <ScrollShadow hideScrollBar className="max-w-[1200px] w-full max-h-[740px] overflow-y-auto grid sm:grid-cols-1 lg:grid-cols-2  gap-8">
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
