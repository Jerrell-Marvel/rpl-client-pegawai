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
      <div className="rounded-lg shadow-lg bg-white pl-6 pt-6 pr-4 pb-4 transition-transform transform hover:scale-95 hover:shadow-2xl">
  <p className="text-2xl font-bold text-gray-800 border-b border-gray-400">{pemanggilan.nama_pasien}</p>
  
  <div className="grid grid-cols-2 gap-6 mt-4 indent-4">
    <div className="flex flex-col">
      <p className="text-sm text-gray-600 mb-2">
        Antrian:
        <span className="font-semibold ml-2 text-gray-800">
          {pemanggilan.antrian}
        </span>
      </p>
      <p className="text-sm text-gray-600 mb-2">
        ID Pendaftaran:
        <span className="font-semibold ml-2 text-gray-800">
          {pemanggilan.id_pendaftaran}
        </span>
      </p>
      <p className="text-sm text-gray-600">
        No Rekam Medis:
        <span className="font-semibold ml-2 text-gray-800">
          {pemanggilan.no_rkm_medis}
        </span>
      </p>
    </div>

    <div>
      <p className="text-sm text-gray-600 mb-2">
        Dokter:
        <span className="font-semibold ml-2 text-gray-800">
          {pemanggilan.nama_dokter}
        </span>
      </p>
      <p className="text-sm text-gray-600">
        Ruangan:
        <span className="font-semibold ml-2 text-gray-800">
          {pemanggilan.no_ruang}
        </span>
      </p>
    </div>
  </div>

  <div className="border-t border-gray-200 my-4" />

  <div className="font-bold indent-4">
    <p>Jadwal Praktek:</p>
    <p className="flex justify-between items-center text-m text-gray-500 mt-1">
      {pemanggilan.start_time} - {pemanggilan.end_time}
    </p>
  </div>

  {children}
</div>

    </>
  );
}

export default PemanggilanCard;
