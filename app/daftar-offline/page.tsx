"use client";
import { Jadwal } from "@/types/dokter";
import { AxiosInstance } from "@/utils/axiosInstance";
import { useDayName } from "@/utils/useDayName";
import { formatTime } from "@/utils/time";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Pasien = {
  id_pasien: number;
  nama: string;
  no_telp: string;
  email: string;
  password: string;
  no_rkm_medis: string;
  created_at: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
  is_active: boolean;
  id_kelurahan: number;
};

type Dokter = {
  id_pegawai: number;
  nama: string;
  no_telp: string;
  email: string;
  password: string;
  nip: string;
  created_at: string;
  is_active: boolean;
  id_kelurahan: number;
  role: string;
  biaya_kunjungan: number;
  id_spesialisasi: number;
  nama_spesialisasi: string;
};

type GroupedJadwal = { [key: string]: Jadwal[] };

const hari = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"];

type JadwalPraktikResponse = Dokter & { jadwal_praktik: Jadwal[] };

const groupAndSortJadwal = (jadwal: Jadwal[]): GroupedJadwal => {
  const groupedjadwals: GroupedJadwal = jadwal.reduce((acc, jadwal) => {
    const day = jadwal.hari;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(jadwal);
    return acc;
  }, {} as GroupedJadwal);

  Object.keys(groupedjadwals).forEach((day) => {
    sortJadwal(groupedjadwals[day]);
  });

  return groupedjadwals;
};

const sortJadwal = (jadwal: Jadwal[]) => {
  jadwal.sort((a, b) => a.start_time.localeCompare(b.start_time));
};

export default function DaftarOfflinePage() {
  // pasien
  const [pasien, setPasien] = useState<Pasien[]>();
  const [selectedPasien, setSelectedPasien] = useState<string>("");

  // dokter
  const [dokter, setDokter] = useState<Dokter[]>();
  const [selectedDokter, setSelectedDokter] = useState<string>("");

  // jadwal
  const [jadwal, setJadwal] = useState<GroupedJadwal>();
  const [selectedJadwal, setSelectedJadwal] = useState<number>();

  const dayName = useDayName();

  useEffect(() => {
    const fetchData = async () => {
      const { data: dataPasien } = await AxiosInstance.get<Pasien[]>(
        "http://localhost:5000/api/pasien",
      );

      const { data: dataDokter } = await AxiosInstance.get<Dokter[]>(
        "http://localhost:5000/api/pegawai/dokter",
      );

      setPasien(dataPasien);
      setDokter(dataDokter);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDokter) {
      console.log("here");
      const fetchData = async () => {
        const { data } = await AxiosInstance.get<JadwalPraktikResponse>(
          `http://localhost:5000/api/jadwal-praktik/${selectedDokter}`,
        );

        const { jadwal_praktik, ...dokterData } = data;
        const groupedJadwal = groupAndSortJadwal(jadwal_praktik);
        setJadwal(groupedJadwal);
      };

      fetchData();
    }
  }, [selectedDokter]);

  const handleSubmit = async () => {
    if (selectedPasien && selectedJadwal) {
      const { data } = await AxiosInstance.post(
        `http://localhost:5000/api/pendaftaran/offline`,
        {
          id_pasien: selectedPasien,
          id_jadwal: selectedJadwal,
        },
      );

      toast.success("Berhasil didaftarkan");
    }
    console.log(selectedPasien);
  };

  return (
    <div>
      {pasien && dokter ? (
        <>
          <Select
            className=""
            label="Pasien"
            placeholder="Select pasien"
            selectedKeys={[selectedPasien]}
            variant="bordered"
            onChange={(e) => setSelectedPasien(e.target.value)}
          >
            {pasien.map((p) => {
              return <SelectItem key={p.id_pasien}>{p.email}</SelectItem>;
            })}
          </Select>

          <Select
            className=""
            label="Dokter"
            placeholder="Pilih dokter"
            selectedKeys={[selectedDokter]}
            variant="bordered"
            onChange={(e) => setSelectedDokter(e.target.value)}
          >
            {dokter.map((d) => {
              return <SelectItem key={d.id_pegawai}>{d.nama}</SelectItem>;
            })}
          </Select>
        </>
      ) : null}

      {jadwal ? (
        <>
          <h3 className="mt-6 font-bold">Pilih jadwal adik adik</h3>
          <p className="text-lg font-semibold">{dayName.getTodayDay()}</p>
          <div className="mt-6 grid grid-cols-7 gap-8">
            {jadwal[dayName.getTodayDay().toLowerCase()].map((j) => {
              return (
                <div
                  key={j.id_jadwal}
                  className={`flex cursor-pointer justify-between gap-2 bg-slate-100 p-2 hover:bg-slate-200 ${selectedJadwal === j.id_jadwal ? "bg-slate-200" : ""}`}
                  onClick={() => setSelectedJadwal(j.id_jadwal)}
                >
                  <div>
                    <p>{j.no_ruang}</p>
                    <p>
                      {formatTime(j.start_time)} - {formatTime(j.end_time)}
                    </p>
                    <p>Kuota : {j.kuota}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}

      <Button onClick={() => handleSubmit()}>Submit</Button>
    </div>
  );
}