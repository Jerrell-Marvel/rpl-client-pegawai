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
    <div className="flex flex-col gap-8 p-10">
      <h1 className="text-4xl font-bold">Riwayat Rekam Medis</h1>
      {rekamMedis?.map((rkm) => {
        return (
          <div
            key={rkm.id_rkm_med}
            className="grid grid-cols-2 rounded-lg bg-slate-200 p-6"
          >
            {/* Informasi dasar */}
            <div>
              <h3 className="text-2xl font-bold">Informasi Dasar</h3>
              <p>
                Tanggal :{" "}
                <span className="font-semibold">
                  {rkm.tanggal_daftar ?? "-"}
                </span>
              </p>
              <p>
                Tinggi Badan:{" "}
                <span className="font-semibold">{rkm.tinggi_badan ?? "-"}</span>
              </p>
              <p>
                Berat Badan:
                <span className="font-semibold">{rkm.berat_badan ?? "-"}</span>
              </p>
              <p>
                Golongan Darah:{" "}
                <span className="font-semibold">
                  {rkm.golongan_darah ?? "-"}
                </span>
              </p>
              <p>
                diastolik:{" "}
                <span className="font-semibold">{rkm.diastolik ?? "-"}</span>
              </p>
              <p>
                sistolik:{" "}
                <span className="font-semibold">{rkm.sistolik ?? "-"}</span>
              </p>
              <p>
                Denyut Nadi:{" "}
                <span className="font-semibold">{rkm.denyut_nadi ?? "-"}</span>
              </p>
            </div>
            {/* Tampilin seperlunya aja nanti*/}

            {/* Diagnosis */}
            <div>
              <h3 className="text-2xl font-bold">Diagnosis</h3>
              <p>
                Resep Obat:{" "}
                <span className="font-semibold">{rkm.resep_obat ?? "-"}</span>
              </p>
              <p>
                Prognosis Tindakan Lanjut:{" "}
                <span className="font-semibold">
                  {rkm.prognosis_tindakan_lanjut ?? "-"}
                </span>
              </p>
              <p>
                Diag Penunjang:{" "}
                <span className="font-semibold">
                  {rkm.diag_penunjang ?? "-"}
                </span>
              </p>
              <p>
                Pemeriksaan Fisik:{" "}
                <span className="font-semibold">
                  {rkm.pemeriksaan_fisik ?? "-"}
                </span>
              </p>
              <p>
                Pemeriksaan Penunjang:{" "}
                <span className="font-semibold">
                  {rkm.pemeriksaan_penunjang ?? "-"}{" "}
                </span>
              </p>
              <p>
                Riwayat Penyakit:{" "}
                <span className="font-semibold">
                  {rkm.riwayat_penyakit ?? "-"}{" "}
                </span>
              </p>
              <p>
                Keluhan:{" "}
                <span className="font-semibold">{rkm.keluhan ?? "-"}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RiwayatRekamMedisPage;
