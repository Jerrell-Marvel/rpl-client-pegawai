"use client";
import React, { useEffect, useState } from "react";
import { Button, Input, Link, Select, SelectItem } from "@nextui-org/react";
import { AxiosInstance } from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const current_date = new Date();
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
      try {
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
        setIsLoading(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.status === 401 || error.status === 403) {
            router.push(`/unauthorized`);
          }
        }
      }
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

    toast.success("berhasil disimpan");
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

  if (isLoading) {
    return <></>;
  }

  return (
    <main>
      <div className="border-b border-black bg-white p-4 pl-8 shadow-md">
        <p className="text-xs text-gray-500">{current_date.toDateString()}</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-800">
          Diagnosa Pasien
        </h1>
      </div>

      <div>
        {informasiDasar && dokumenRekamMedis ? (
          <>
            <div className="flex flex-col p-4">
              <div className="mx-4 my-4 flex h-min justify-center rounded-t-lg border border-black bg-white p-2 font-bold">
                Informasi Dasar Pasien
              </div>
              <div className="w-vw mx-4 rounded-b-lg border border-gray-400 bg-white">
                {Object.entries(informasiDasar).map(([k, v]) => {
                  return (
                    <div className="py-2 indent-4" key={k}>
                      <div className="flex items-center pl-4 capitalize">
                        <p className="h-1 w-1.5 rounded-full bg-black"></p>
                        <p>
                          {k.split("_").join(" ")} : <b>{v}</b>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
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
              <p className="flex justify-center border-b border-t border-black bg-white p-4 text-lg font-bold">
                Diagnosis
              </p>
              <div className="mx-4 my-4 grid grid-cols-2 gap-4">
                {DiagnosisFields.map((diagnosisField) => {
                  return (
                    <Input
                      className="mb-4 rounded-xl border border-black"
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
                className="my-4 ml-4 bg-primary text-white"
                href={`/riwayat-rekam-medis/${diagnosis.id_pasien}`}
              >
                Riwayat Rekam Medis
              </Button>
            </div>
          </>
        ) : null}
      </div>
      {/* {JSON.stringify(diagnosis)}; */}
      <div className="mx-4 flex justify-end">
        <Button onClick={handleSave}>Save</Button>
      </div>
    </main>
  );
}

export default DiagnosisPage;
