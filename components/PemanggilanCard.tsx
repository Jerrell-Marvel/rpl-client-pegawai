import { Pendaftaran } from "@/types/pendaftaran";
import React from "react";

type PendaftaranPemanggilan = {
  antrian: number;
} & Pendaftaran;

type PemanggilanCardProps = {
  pemanggilan: PendaftaranPemanggilan;
  children?: React.ReactNode;
};

function PemanggilanCard({ pemanggilan, children }: PemanggilanCardProps) {
  return (
    <>
      <div className="rounded-md bg-white p-4">
        <p className="text-xl font-bold">{pemanggilan.nama_pasien}</p>
        <p className="text-slate-400">Antrian : {pemanggilan.antrian}</p>
        <p className="text-slate-400">
          Id pendaftaran : {pemanggilan.id_pendaftaran}
        </p>
        <p className="text-slate-400">
          No rekam medis : {pemanggilan.no_rkm_medis}
        </p>

        <p className="font-bold">Dokter : {pemanggilan.nama_dokter}</p>
        <p>Ruangan : {pemanggilan.no_ruang}</p>
        <p>
          {pemanggilan.start_time} - {pemanggilan.end_time}
        </p>
        {children}
      </div>
    </>
  );
}

export default PemanggilanCard;
