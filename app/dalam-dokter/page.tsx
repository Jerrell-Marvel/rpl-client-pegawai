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

  console.log(pendaftaran);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await AxiosInstance.get<Pemanggilan[]>(
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

  return (
    <main>
      <div className="p-4 pl-8 bg-white border-b border-black shadow-md">
        <p className="text-xs text-m text-gray-500" >{current_date.toDateString()}</p>
        <h1 className="text-3xl font-bold text-gray-800 mt-2">Diagnosa Pasien</h1> 

      </div>
      <div className="flex flex-col gap-8 items-center bg-gray-50 py-4">
        <ScrollShadow hideScrollBar className="max-w-[1200px] w-full max-h-[740px] overflow-y-auto grid sm:grid-cols-1 lg:grid-cols-2 " >
        {pendaftaran.map((p) => {
          return (
            <>
            <div className="my-[20px] mx-[20px]">
              <PemanggilanCard pemanggilan={p}>
                <div className="flex justify-end">
                  <Button
                    as={Link}
                    className="bg-primary text-white"
                    href={`/diagnosis/${p.id_rkm_med}`}
                  >
                    Diagnosis
                  </Button>

                </div>
              </PemanggilanCard>

            </div>
            </>
          );
          })}
        </ScrollShadow>
        </div >
       
    </main>
  );
}

export default PemanggilanPage;
