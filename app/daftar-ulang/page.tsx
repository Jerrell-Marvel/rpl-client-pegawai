"use client";

import PendaftaranCard from "@/components/PendaftaranCard";
import { Pendaftaran } from "@/types/pendaftaran";
import { AxiosInstance } from "@/utils/axiosInstance";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

function DaftarUlangPage() {
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
  };
  return (
    <main className="flex flex-col gap-8 p-12">
      {pendaftaran.map((p) => {
        return (
          <>
            <PendaftaranCard pendaftaran={p}>
              <div className="flex justify-end">
                <Button
                  className="bg-primary text-white"
                  onClick={() => {
                    handleDaftarUlang(p.id_pendaftaran);
                  }}
                >
                  Daftarkan
                </Button>
              </div>
            </PendaftaranCard>
          </>
        );
      })}
    </main>
  );
}

export default DaftarUlangPage;
