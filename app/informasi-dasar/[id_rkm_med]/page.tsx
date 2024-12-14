"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Input, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { AxiosInstance } from "@/utils/axiosInstance";
import { p } from "framer-motion/client";

type InformasiDasarPageProps = {
  params: {
    id_rkm_med: number;
  };
};

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

const informasiDasarFields: {
  displayText: string;
  field: keyof InformasiDasar;
}[] = [
  { displayText: "Tinggi Badan", field: "tinggi_badan" },
  { displayText: "Berat Badan", field: "berat_badan" },
  { displayText: "Diastolik", field: "diastolik" },
  { displayText: "Sistolik", field: "sistolik" },
  { displayText: "Denyut Nadi", field: "denyut_nadi" },
];

const golonganDarahOption = ["a", "b", "ab", "o"];

function InformasiDasarPage({ params }: InformasiDasarPageProps) {
  const current_date =  new Date();

  const [informasiDasar, setInformasiDasar] = useState<InformasiDasar | null>(
    null,
  );

  const [dokumenRekamMedis, setDokumenRekamMedis] = useState<
    DokumenRekamMedis[] | null
  >(null);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // diawal get dlu informasi dasarnya
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await AxiosInstance.get<{
        informasi_dasar: InformasiDasar;
        dokumen_rekam_medis: DokumenRekamMedis[];
      }>(
        `http://localhost:5000/api/rekam-medis/informasi-dasar/${params.id_rkm_med}`,
      );

      setInformasiDasar(data.informasi_dasar);
      setDokumenRekamMedis(data.dokumen_rekam_medis);
    };

    fetchData();
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);

      setSelectedFiles((prev) => [...prev, ...fileArray]);
    }
  };

  // save update ke backend
  const handleSave = async () => {
    if (
      informasiDasar &&
      Object.values(informasiDasar).every((value) => value)
    ) {
      // klo udh diisi semua
      const formData = new FormData();
      selectedFiles.forEach((file, index) => {
        formData.append(`dokumen_rekam_medis`, file);
      });

      for (const [key, value] of Object.entries(informasiDasar)) {
        formData.append(key, String(value));
      }

      const { data } = await AxiosInstance.post(
        `http://localhost:5000/api/rekam-medis/informasi-dasar/${params.id_rkm_med}`,
        formData,
      );
    }
  };

  const handleChange = (
    field: keyof InformasiDasar,
    value: number | string,
  ) => {
    if (informasiDasar) {
      const newInformasiDasar = {
        ...informasiDasar,
        [field]: value,
      };

      setInformasiDasar(newInformasiDasar);
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

  const handleDelete = async (id_dkm: number) => {
    const { data } = await AxiosInstance.delete(
      `http://localhost:5000/api/rekam-medis/dokumen/${id_dkm}`,
    );

    const newDokumenRekamMedis = dokumenRekamMedis!.filter(
      (dkm) => dkm.id_dkm !== id_dkm,
    );
    setDokumenRekamMedis(newDokumenRekamMedis);
  };

  return (
    <main className="m-0 flex flex-col gap-8 p-12 max-h-screen overflow-y-auto">
      <div className="p-4 pl-8 bg-white border-b border-black shadow-md">

        <p className="text-xs text-m text-gray-500">{current_date.toDateString()}</p>
        <h1 className="text-3xl font-bold text-gray-800 mt-2">Pemanggilan Pasien</h1>

      </div>
      <div className="flex flex-col gap-8 items-center bg-gray-50 py-4 px-4  max-h-[70rem]">

          {informasiDasar && dokumenRekamMedis ? (
            <>
              {informasiDasarFields.map((informasiDasarField) => {
                return (
                  <Input
                    className="border border-black rounded-xl"
                    key={informasiDasarField.field}
                    label={informasiDasarField.displayText}
                    
                    placeholder={informasiDasarField.displayText}
                    value={String(informasiDasar[informasiDasarField.field] || "")}
                    onChange={(e) => {
                      handleChange(
                        informasiDasarField.field,
                        Number(e.target.value),
                      );
                    }}
                    type="number"
                    min={0}
                  />
                );
              })}

              <Select
                className=""
                label="Golongan Darah"
                placeholder="Select Golongan Darah"
                selectedKeys={
                  informasiDasar.golongan_darah
                    ? [informasiDasar.golongan_darah]
                    : []
                }
                variant="bordered"
                onChange={(e) => {
                  handleChange("golongan_darah", e.target.value);
                }}
              >
                {golonganDarahOption.map((golDarah) => (
                  <SelectItem key={golDarah}>{golDarah}</SelectItem>
                ))}
              </Select>

              <ul>
                {dokumenRekamMedis.map((dkm) => {
                  return (
                    <li key={dkm.id_dkm} className="flex gap-6">
                      <Button onClick={() => downloadFile(dkm.path_file)}>
                        {dkm.path_file}
                      </Button>
                      <Button
                        className="bg-red-600 text-white"
                        onClick={() => handleDelete(dkm.id_dkm)}
                      >
                        Delete
                      </Button>
                    </li>
                  );
                })}
              </ul>

              <Input type="file" multiple onChange={handleFileChange} />
            </>
          ) : null}
          {JSON.stringify(informasiDasar)};
          <Button onClick={handleSave}>Save</Button>
      </div>

    </main>
  );
}

export default InformasiDasarPage;
