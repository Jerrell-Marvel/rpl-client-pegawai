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
      <div className="rounded-lg shadow-lg bg-white pl-6 pt-6 pr-4 pb-4 transition-transform transform hover:scale-95 hover:shadow-2xl">

        <p className="text-2xl font-bold text-gray-800 border-b border-gray-400 ">{pendaftaran.nama_pasien}</p>
        
        
        <div className="grid grid-cols-2 gap-6 mt-4 indent-4">
          
          <div className="flex flex-col">
            <p className="text-sm text-gray-600 mb-2">
              ID Pendaftaran:
              <span className="font-semibold ml-2 text-gray-800">
                {pendaftaran.id_pendaftaran}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Nomor Rekam Medis:
              <span className="font-semibold ml-2 text-gray-800">
                <br/>
                <span className="indent-4">{pendaftaran.no_rkm_medis}</span>
              </span>
            </p>
          </div>

     
          <div>
            <p className="text-sm text-gray-600 mb-2">
              Dokter:
              <span className="font-semibold ml-2 text-gray-800">
                {pendaftaran.nama_dokter}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Ruangan:
              <span className="font-semibold ml-2 text-gray-800">
                {pendaftaran.no_ruang}
              </span>
            </p>
          </div>
        </div>

 
        <div className="border-t border-gray-200 my-4" />


        <div className="font-bold indent-4">
              <p>
                Jadwal Praktek :
              </p>
              <p className="flex justify-between items-center text-m text-gray-500 mt-1">
                {pendaftaran.start_time} - {pendaftaran.end_time}
              </p>

            </div>
          {children}
      </div>
    </>
  );
}

export default PendaftaranCard;
