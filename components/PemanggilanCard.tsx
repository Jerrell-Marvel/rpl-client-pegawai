import { Pendaftaran } from "@/types/pendaftaran";
import { formatTime } from "@/utils/time";
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
      <div className="transform rounded-lg bg-white pb-4 pl-6 pr-4 pt-6 shadow-lg transition-transform">
        <p className="border-b border-gray-400 text-2xl font-bold text-gray-800">
          {pemanggilan.nama_pasien}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-6 px-4">
          <div className="flex flex-col">
            <p className="mb-2 text-sm text-gray-600">
              Antrian:
              <span className="ml-2 font-semibold text-gray-800">
                {pemanggilan.antrian}
              </span>
            </p>
            <p className="mb-2 text-sm text-gray-600">
              ID Pendaftaran:
              <span className="ml-2 font-semibold text-gray-800">
                {pemanggilan.id_pendaftaran}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              No Rekam Medis:
              <span className="ml-2 font-semibold text-gray-800">
                {pemanggilan.no_rkm_medis}
              </span>
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm text-gray-600">
              Dokter:
              <span className="ml-2 font-semibold text-gray-800">
                {pemanggilan.nama_dokter}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Ruangan:
              <span className="ml-2 font-semibold text-gray-800">
                {pemanggilan.no_ruang}
              </span>
            </p>
          </div>
        </div>

        <div className="my-4 border-t border-gray-200" />

        <div className="indent-4 font-bold">
          <p>
            Jadwal Praktek:
            <span className="text-m mt-1 flex items-center justify-between text-gray-500">
              {formatTime(pemanggilan.start_time)} -{" "}
              {formatTime(pemanggilan.end_time)}
            </span>
          </p>
        </div>

        {children}
      </div>
    </>
  );
}

export default PemanggilanCard;
