"use client";
import React, { useEffect, useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { AxiosInstance } from "@/utils/axiosInstance";

type DiagnosisPageProps = {
  params: {
    id_rkm_med: number;
  };
};

type Diagnosis = {
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

function DiagnosisPage({ params }: DiagnosisPageProps) {
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await AxiosInstance.get<Diagnosis>(
        `http://localhost:5000/api/rekam-medis/diagnosis/${params.id_rkm_med}`,
      );

      setDiagnosis(data);
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

  return (
    <main>
      {diagnosis ? (
        <>
          {DiagnosisFields.map((diagnosisField) => {
            return (
              <Input
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
        </>
      ) : null}
      {JSON.stringify(diagnosis)};<Button onClick={handleSave}>Save</Button>
    </main>
  );
}

export default DiagnosisPage;
