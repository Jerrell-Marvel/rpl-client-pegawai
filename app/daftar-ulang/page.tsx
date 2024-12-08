"use client";

import { Pendaftaran } from "@/types/pendaftaran";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

function DaftarUlangPage() {
  const [pendaftaran, setPendaftaran] = useState<Pendaftaran[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/pendaftaran/online",
      );

      setPendaftaran(data);
    };

    fetchData();
  }, []);

  const handleDaftarUlang = async (id_pendaftaran: number) => {
    const { data } = await axios.post(
      `http://localhost:5000/api/pendaftaran/daftar-ulang/${id_pendaftaran}`,
    );

    const newPendaftaran = pendaftaran.filter(
      (p) => p.id_pendaftaran !== id_pendaftaran,
    );

    setPendaftaran(newPendaftaran);
  };
  return (
    <main className="flex flex-col gap-8 bg-slate-100 p-12">
      {pendaftaran.map((p) => {
        return (
          <>
            <div className="rounded-md bg-white p-4">
              <p className="text-xl font-bold">{p.nama_pasien}</p>
              <p className="text-slate-400">
                Id pendaftaran : {p.id_pendaftaran}
              </p>
              <p className="text-slate-400">
                No rekam medis : {p.no_rkm_medis}
              </p>

              <p className="font-bold">Dokter : {p.nama_dokter}</p>
              <p>Ruangan : {p.no_ruang}</p>
              <p>
                {p.start_time} - {p.end_time}
              </p>
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
            </div>
          </>
        );
      })}
    </main>
  );
}

export default DaftarUlangPage;
