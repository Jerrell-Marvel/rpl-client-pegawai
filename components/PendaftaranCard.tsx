import { Pendaftaran } from "@/types/pendaftaran";
import React from "react";

function PendaftaranCard({
  pendaftaran,
  children,
}: {
  pendaftaran: Pendaftaran;
  children?: React.ReactNode;
}) {
  return (
    <>
      <div className="rounded-md bg-white p-4">
        <p className="text-xl font-bold">{pendaftaran.nama_pasien}</p>
        <p className="text-slate-400">
          Id pendaftaran : {pendaftaran.id_pendaftaran}
        </p>
        <p className="text-slate-400">
          No rekam medis : {pendaftaran.no_rkm_medis}
        </p>

        <p className="font-bold">Dokter : {pendaftaran.nama_dokter}</p>
        <p>Ruangan : {pendaftaran.no_ruang}</p>
        <p>
          {pendaftaran.start_time} - {pendaftaran.end_time}
        </p>
        {children}
      </div>
    </>
  );
}

export default PendaftaranCard;
