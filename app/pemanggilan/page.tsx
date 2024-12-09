"use client";

import PendaftaranCard from "@/components/PendaftaranCard";
import { Pendaftaran } from "@/types/pendaftaran";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

function PemanggilanPage() {
  const [pendaftaran, setPendaftaran] = useState<Pendaftaran[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/pendaftaran/pemanggilan",
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
            <PendaftaranCard pendaftaran={p}></PendaftaranCard>
          </>
        );
      })}
    </main>
  );
}

export default PemanggilanPage;
