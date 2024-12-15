"use client";
import React, { useEffect, useState } from "react";
import { Button, Input, Link, Select, SelectItem } from "@nextui-org/react";
import { AxiosInstance } from "@/utils/axiosInstance";

type DiagnosisPageProps = {
  params: {
    id_rkm_med: number;
  };
};

type Diagnosis = {
  id_pasien: number;
  resep_obat: string | null;
  id_rkm_med: number;
  prognosis_tindakan_lanjut: string | null;
  diag_penunjang: string | null;
  pemeriksaan_fisik: string | null;
  pemeriksaan_penunjang: string | null;
  keluhan: string | null;
};

const DiagnosisFields: {
  displayText: string;
  field: keyof Diagnosis;
}[] = [
  { displayText: "Resep Obat", field: "resep_obat" },
  {
    displayText: "Prognosis Tindakan Lanjut",
    field: "prognosis_tindakan_lanjut",
  },
  { displayText: "Diagnosis Penunjang", field: "diag_penunjang" },
  { displayText: "Pemeriksaan Fisik", field: "pemeriksaan_fisik" },
  { displayText: "Pemeriksaan Penunjang", field: "pemeriksaan_penunjang" },
  { displayText: "Keluhan", field: "keluhan" },
];

type InformasiDasar = {
  // questionable
  //   pemeriksaan_fisik: string | null;
  //   pemeriksaan_penunjang: string | null;
  //   riwayat_penyakit: string | null;
  //   keluhan: string | null;
  // end

  id_rkm_med: number;
  tinggi_badan: number | null;
  berat_badan: number | null;
  golongan_darah: string | null;
  diastolik: number | null;
  sistolik: number | null;
  denyut_nadi: number | null;
};

type DokumenRekamMedis = {
  id_dkm: number;
  uploaded_at: string;
  path_file: string;
  id_rkm_med: number;
  is_active: boolean;
};

function DiagnosisPage({ params }: DiagnosisPageProps) {
  const current_date =  new Date();
  //INFORMASI DASAR
  const [informasiDasar, setInformasiDasar] = useState<InformasiDasar | null>(
    null,
  );

  const [dokumenRekamMedis, setDokumenRekamMedis] = useState<
    DokumenRekamMedis[] | null
  >(null);

  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: diagnosisData } = await AxiosInstance.get<Diagnosis>(
        `http://localhost:5000/api/rekam-medis/diagnosis/${params.id_rkm_med}`,
      );

      setDiagnosis(diagnosisData);

      const { data: informasiDasarData } = await AxiosInstance.get<{
        informasi_dasar: InformasiDasar;
        dokumen_rekam_medis: DokumenRekamMedis[];
      }>(
        `http://localhost:5000/api/rekam-medis/informasi-dasar/${params.id_rkm_med}`,
      );

      setInformasiDasar(informasiDasarData.informasi_dasar);
      setDokumenRekamMedis(informasiDasarData.dokumen_rekam_medis);
    };

    fetchData();
  }, []);

  // save update ke backend
  const handleSave = async () => {
    // klo udh diisi semua
    const { data } = await AxiosInstance.post(
      `http://localhost:5000/api/rekam-medis/diagnosis/${params.id_rkm_med}`,
      diagnosis,
    );
  };

  const handleChange = (field: keyof Diagnosis, value: string) => {
    if (diagnosis) {
      const newDiagnosis = {
        ...diagnosis,
        [field]: value,
      };

      setDiagnosis(newDiagnosis);
    }
  };

  const downloadFile = async (filename: string) => {
    const response = await AxiosInstance.get(
      `http://localhost:5000/uploads/${filename}`,
      {
        responseType: "blob",
      },
    );

    const link = document.createElement("a");
    const url = window.URL.createObjectURL(response.data);
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <main>
      <div className="p-4 pl-8 bg-white border-b border-black shadow-md">
        <p className="text-xs text-m text-gray-500" >{current_date.toDateString()}</p>
        <h1 className="text-3xl font-bold text-gray-800 mt-2">Diagnosa Pasien</h1> 

      </div>
      {informasiDasar && dokumenRekamMedis ? (
        
        
        <>
          <div className="my-4 mx-4">
            {Object.entries(informasiDasar).map(([k, v]) => {
              return (
                <div key={k}>
                  <p>{k}</p>
                  <p>{v}</p>
                </div>
              );
            })}
          </div>
          
          <ul>
            {dokumenRekamMedis.map((dkm) => {
              return (
                <li key={dkm.id_dkm} className="flex gap-6">
                  <Button onClick={() => downloadFile(dkm.path_file)}>
                    {dkm.path_file}
                  </Button>
                </li>
              );
            })}
          </ul>
          <div className="border-b border-gray-400" />
        </>
      ) : null}

      {diagnosis ? (

        <>
        <div>
            <div className="grid grid-cols-2 gap-4 mx-4 my-4">
              {DiagnosisFields.map((diagnosisField) => {
                
                return (
                  <Input
                    className="border border-black rounded-xl mb-4 "
                    key={diagnosisField.field}
                    label={diagnosisField.displayText}
                    placeholder={diagnosisField.displayText}
                    value={String(diagnosis[diagnosisField.field] || "")}
                    onChange={(e) => {
                      handleChange(diagnosisField.field, e.target.value);
                    }}
                    min={0}
                  />
                );
              })}

            </div>
            <Button
              as={Link}
              className="bg-primary text-white ml-4 my-4"
              href={`/riwayat-rekam-medis/${diagnosis.id_pasien}`}
            >
              Riwayat Rekam Medis
            </Button>

        </div>
        </>
      ) : null}
      {/* {JSON.stringify(diagnosis)}; */}
      <div className="flex justify-end mx-4">
      <Button
      onClick={handleSave}>Save</Button>

      </div>
    </main>
  );
}

export default DiagnosisPage;
