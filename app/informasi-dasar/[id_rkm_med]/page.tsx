"use client";
import React, { useEffect, useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { AxiosInstance } from "@/utils/axiosInstance";

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
  const [informasiDasar, setInformasiDasar] = useState<InformasiDasar | null>(
    null,
  );

  // diawal get dlu informasi dasarnya
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await AxiosInstance.get<InformasiDasar>(
        `http://localhost:5000/api/rekam-medis/informasi-dasar/${params.id_rkm_med}`,
      );

      setInformasiDasar(data);
    };

    fetchData();
  }, []);

  // save update ke backend
  const handleSave = async () => {
    if (
      informasiDasar &&
      Object.values(informasiDasar).every((value) => value)
    ) {
      // klo udh diisi semua
      const { data } = await AxiosInstance.post(
        `http://localhost:5000/api/rekam-medis/informasi-dasar/${params.id_rkm_med}`,
        informasiDasar,
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

  return (
    <main>
      {informasiDasar ? (
        <>
          {informasiDasarFields.map((informasiDasarField) => {
            return (
              <Input
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
        </>
      ) : null}
      {JSON.stringify(informasiDasar)};
      <Button onClick={handleSave}>Save</Button>
    </main>
  );
}

export default InformasiDasarPage;
