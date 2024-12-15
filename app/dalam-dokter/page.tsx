"use client";

import PemanggilanCard from "@/components/PemanggilanCard";
import PendaftaranCard from "@/components/PendaftaranCard";
import { PendaftaranWithAntrian, Pendaftaran } from "@/types/pendaftaran";
import { TokenType } from "@/types/token";
import { AxiosInstance } from "@/utils/axiosInstance";
import { Button, ScrollShadow } from "@nextui-org/react";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function PemanggilanPage() {
  const current_date = new Date();
  const [pendaftaran, setPendaftaran] = useState<PendaftaranWithAntrian[]>([]);

  console.log(pendaftaran);

  console.log(pendaftaran);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await AxiosInstance.get<PendaftaranWithAntrian[]>(
        "http://localhost:5000/api/pendaftaran",
        {
          params: {
            status: "pemeriksaan",
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
        status: "tuntas",
      },
    );

    const newPendaftaran = pendaftaran.filter(
      (p) => p.id_pendaftaran !== id_pendaftaran,
    );
    setPendaftaran(newPendaftaran);

    toast.success("berhasil");
  };

  const token = window.localStorage.getItem("token") || "";
  const { role }: TokenType = jwtDecode(token);

  return (
    <main>
      <div className="border-b border-black bg-white p-4 pl-8 shadow-md">
        <p className="text-m text-xs text-gray-500">
          {current_date.toDateString()}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-800">
          Diagnosa Pasien
        </h1>
      </div>
      <div className="flex flex-col items-center gap-8 bg-gray-50 py-4">
        <ScrollShadow
          hideScrollBar
          className="grid max-h-[740px] w-full max-w-[1200px] overflow-y-auto sm:grid-cols-1 lg:grid-cols-2"
        >
          {pendaftaran.map((p) => {
            return (
              <>
                <div className="mx-[20px] my-[20px]">
                  <PemanggilanCard pemanggilan={p}>
                    <div className="flex justify-end">
                      {role === "dokter" && (
                        <>
                          <Button
                            as={Link}
                            className="bg-primary text-white"
                            href={`/diagnosis/${p.id_rkm_med}`}
                          >
                            Diagnosis
                          </Button>

                          <Button
                            className="rounded-md bg-green-500 px-6 py-2 text-white transition-all hover:bg-green-600"
                            onClick={() => handleSelesaiClick(p.id_pendaftaran)}
                          >
                            Selesai
                          </Button>
                        </>
                      )}
                    </div>
                  </PemanggilanCard>
                </div>
              </>
            );
          })}
        </ScrollShadow>
      </div>
    </main>
  );
}

export default PemanggilanPage;
