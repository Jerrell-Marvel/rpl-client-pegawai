"use client";

import { AxiosInstance } from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

type RiwayatRekammedisPageProps = {
  params: {
    id_pasien: string;
  };
};

type RekamMedis = {
  id_pendaftaran: number;
  status: string;
  antrian: number;
  tanggal_daftar: string;
  id_pasien: number;
  id_jadwal: number;
  id_rkm_med: number;
  resep_obat: string | null;
  prognosis_tindakan_lanjut: string | null;
  diag_penunjang: string | null;
  pemeriksaan_fisik: string | null;
  pemeriksaan_penunjang: string | null;
  riwayat_penyakit: string | null;
  keluhan: string | null;
  tinggi_badan: number | null;
  berat_badan: number | null;
  golongan_darah: string | null;
  diastolik: number | null;
  sistolik: number | null;
  denyut_nadi: number | null;
};

function RiwayatRekamMedisPage({ params }: RiwayatRekammedisPageProps) {
  const current_date = new Date();
  const [rekamMedis, setRekamMedis] = useState<RekamMedis[]>();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await AxiosInstance.get(
        `http://localhost:5000/api/rekam-medis/${params.id_pasien}`,
      );

      setRekamMedis(data);
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="border-b border-black bg-white p-4 pl-8 shadow-md">
        <p className="text-m text-xs text-gray-500">
          {current_date.toDateString()}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-800">
          Riwayat Rekam Medis
        </h1>
      </div>

      <div className="grid grid-cols-3 ">
        <p className="flex justify-center bg-stone-200 font-bold py-2 blend hover:bg-stone-400">Pasien</p>
        <p className="flex justify-center bg-stone-200 font-bold py-2 blend hover:bg-stone-400">Informasi Dasar</p>
        <p  className="flex justify-center bg-stone-200 font-bold py-2 blend hover:bg-stone-400">Diagnosa Pasien</p>
      </div>

      {rekamMedis?.map((rkm) => {
        return (
          <div>
            <p className="border-b border-black border-dashed"></p>
            <div key={rkm.id_rkm_med} className="grid grid-cols-3">
              
              <div className="flex flex-col gap-4 m-4 bg-white border border-black p-4 rounded-lg hover:scale-90 transition-transform ">
                
                <p>id_pendaftaran: {rkm.id_pendaftaran}</p>
                <p>status: {rkm.status}</p>
                <p>antrian: {rkm.antrian}</p>
                <p>tanggal_daftar: {rkm.tanggal_daftar}</p>
                <p>id_pasien: {rkm.id_pasien}</p>
                <p>id_jadwal: {rkm.id_jadwal}</p>

              </div>
              {/* Tampilin seperlunya aja nanti*/}
              
              <div className="flex flex-col gap-4 m-4 bg-white border border-black p-4 rounded-lg hover:scale-90 transition-transform ">
                <p>tinggi_badan: {rkm.tinggi_badan ?? "-"}</p>
                <p>berat_badan: {rkm.berat_badan ?? "-"}</p>
                <p>golongan_darah: {rkm.golongan_darah ?? "-"}</p>
                <p>diastolik: {rkm.diastolik ?? "-"}</p>
                <p>sistolik: {rkm.sistolik ?? "-"}</p>
                <p>denyut_nadi: {rkm.denyut_nadi ?? "-"}</p>
              </div>
              
              <div className="flex flex-col gap-4 m-4 bg-white border border-black p-4 rounded-lg hover:scale-90 transition-transform ">
                <p>id_rkm_med: {rkm.id_rkm_med}</p>
                <p>resep_obat: {rkm.resep_obat ?? "-"}</p>
                <p>
                  prognosis_tindakan_lanjut: {rkm.prognosis_tindakan_lanjut ?? "-"}
                </p>
                <p>diag_penunjang: {rkm.diag_penunjang ?? "-"}</p>
                <p>pemeriksaan_fisik: {rkm.pemeriksaan_fisik ?? "-"}</p>
                <p>pemeriksaan_penunjang: {rkm.pemeriksaan_penunjang ?? "-"}</p>
                <p>riwayat_penyakit: {rkm.riwayat_penyakit ?? "-"}</p>
                <p>keluhan: {rkm.keluhan ?? "-"}</p>

              </div>

              </div>
          </div>
        );
      })}
    </div>
  );
}

export default RiwayatRekamMedisPage;
