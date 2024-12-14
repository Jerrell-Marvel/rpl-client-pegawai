"use client";

import PemanggilanCard from "@/components/PemanggilanCard";
import PendaftaranCard from "@/components/PendaftaranCard";
import { Pemanggilan, Pendaftaran } from "@/types/pendaftaran";
import { AxiosInstance } from "@/utils/axiosInstance";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

function PemanggilanPage() {
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
    <main className="flex flex-col gap-8 p-12">
      {pendaftaran.map((p) => {
        return (
          <>
            <PemanggilanCard pemanggilan={p}>
              <Button
                as={Link}
                className="bg-primary text-white"
                href={`/diagnosis/${p.id_rkm_med}`}
              >
                Diagnosis
              </Button>
            </PemanggilanCard>
          </>
        );
      })}
    </main>
  );
}

export default PemanggilanPage;
