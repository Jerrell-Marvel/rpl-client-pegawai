"use client";

import PemanggilanCard from "@/components/PemanggilanCard";
import PendaftaranCard from "@/components/PendaftaranCard";
import { Pemanggilan, Pendaftaran } from "@/types/pendaftaran";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

function PemanggilanPage() {
  const [pendaftaran, setPendaftaran] = useState<Pemanggilan[]>([]);

  console.log(pendaftaran);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<Pemanggilan[]>(
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

  return (
    <main className="flex flex-col gap-8 bg-slate-100 p-12">
      {pendaftaran.map((p) => {
        return (
          <>
            <PemanggilanCard pemanggilan={p}>
              <div className="flex justify-end">
                <Button
                  as={Link}
                  className="bg-primary text-white"
                  href={`/informasi-dasar/${p.id_rkm_med}`}
                >
                  Informasi Dasar
                </Button>
              </div>
            </PemanggilanCard>
          </>
        );
      })}
    </main>
  );
}

export default PemanggilanPage;
