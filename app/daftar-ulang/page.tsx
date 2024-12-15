"use client";

import PendaftaranCard from "@/components/PendaftaranCard";
import { Pendaftaran } from "@/types/pendaftaran";
import { AxiosInstance } from "@/utils/axiosInstance";
import { Button, ScrollShadow } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function DaftarUlangPage() {
  const current_date = new Date();

  const [pendaftaran, setPendaftaran] = useState<Pendaftaran[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await AxiosInstance.get(
        "http://localhost:5000/api/pendaftaran",
        {
          params: {
            status: "pendaftaran",
          },
        },
      );

      setPendaftaran(data);
    };

    fetchData();
  }, []);

  const handleDaftarUlang = async (id_pendaftaran: number) => {
    const { data } = await AxiosInstance.post(
      `http://localhost:5000/api/pendaftaran/daftar-ulang/${id_pendaftaran}`,
    );

    const newPendaftaran = pendaftaran.filter(
      (p) => p.id_pendaftaran !== id_pendaftaran,
    );

    setPendaftaran(newPendaftaran);

    toast.success("pasien telah terdaftar ulang");
  };
  return (
    <main>
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
                <div className="my-[20px]">
                  <PendaftaranCard pendaftaran={p}>
                    <div className="flex justify-end">
                      <Button
                        className="rounded-md bg-primary px-6 py-2 text-white transition-all hover:bg-blue-800"
                        onClick={() => {
                          handleDaftarUlang(p.id_pendaftaran);
                        }}
                      >
                        Daftarkan
                      </Button>
                    </div>
                  </PendaftaranCard>
                </div>
              </>
            );
          })}
        </ScrollShadow>
      </div>
    </main>
  );
}

export default DaftarUlangPage;
