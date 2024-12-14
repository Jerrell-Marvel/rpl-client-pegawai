"use client";

import PendaftaranCard from "@/components/PendaftaranCard";
import { Pendaftaran } from "@/types/pendaftaran";
import { AxiosInstance } from "@/utils/axiosInstance";
import { Button , ScrollShadow, Input } from "@nextui-org/react";
import { JSX, SVGProps, useEffect, useState } from "react";

export const SearchIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

function DaftarUlangPage() {
  const current_date =  new Date();

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

    <main>
      <div className="p-4 pl-8 bg-white border-b border-black shadow-md">
        <p className="text-xs text-m text-gray-500" >{current_date.toDateString()}</p>
        <h1 className="text-3xl font-bold text-gray-800 mt-2">Daftar Ulang Pasien</h1> 

      </div>

        <div className="flex flex-col gap-8 items-center bg-gray-50 py-4">
          <ScrollShadow hideScrollBar className="max-w-[1200px] w-full max-h-[740px] overflow-y-auto grid sm:grid-cols-1 lg:grid-cols-2  gap-8">

            
              {pendaftaran.map((p) => {
                return (
                  <>
                  <div className="my-[20px]">
                    <PendaftaranCard pendaftaran={p}>
                      <div className="flex justify-end">
                        <Button
                            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-all"
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
