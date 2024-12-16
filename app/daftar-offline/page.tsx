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

  const [sisaKuota, setSisaKuota] = useState<number>(0);

  useEffect(() => {
    if (selectedDokter) {
      console.log("here");
      const fetchData = async () => {
        const { data } = await AxiosInstance.get<JadwalPraktikResponse>(
          `http://localhost:5000/api/jadwal-praktik/${selectedDokter}?day=today`,
        );

        const { jadwal_praktik, ...dokterData } = data;
        const groupedJadwal = groupAndSortJadwal(jadwal_praktik);
        setJadwal(groupedJadwal);
        console.log(groupedJadwal);
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

      const fetchData = async () => {
        const { data } = await AxiosInstance.get<JadwalPraktikResponse>(
          `http://localhost:5000/api/jadwal-praktik/${selectedDokter}?day=today`,
        );

        const { jadwal_praktik, ...dokterData } = data;
        const groupedJadwal = groupAndSortJadwal(jadwal_praktik);
        setJadwal(groupedJadwal);
        console.log(groupedJadwal);
      };

      fetchData();
      setSelectedJadwal(undefined);

      toast.success("Berhasil didaftarkan");
    }
    console.log(selectedPasien);
  };

  const current_date = new Date();

  return (
    <main>
      <div className="border-b border-black bg-white p-4 pl-8 shadow-md">
        <p className="text-m text-xs text-gray-500">
          {current_date.toDateString()}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-800">
          Daftar Rawat Jalan Pasien
        </h1>
      </div>

      <div className="pd-4 m-4 rounded-lg border border-black bg-gray-100">
        <div className="flex flex-col gap-6 p-8">
          {pasien && dokter ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Select
                  className="rounded-lg bg-white font-bold"
                  size="md"
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
                  className="rounded-lg bg-white font-bold"
                  size="md"
                  label="Dokter"
                  placeholder="Pilih dokter"
                  selectedKeys={[selectedDokter]}
                  variant="bordered"
                  onChange={(e) => {
                    setSelectedJadwal(undefined);
                    setSelectedDokter(e.target.value);
                  }}
                >
                  {dokter.map((d) => {
                    return <SelectItem key={d.id_pegawai}>{d.nama}</SelectItem>;
                  })}
                </Select>
              </div>
            </>
          ) : null}
          {jadwal && jadwal[dayName.getTodayDay().toLowerCase()] ? (
            <>
              <h3 className="text-xl font-bold">Pilih jadwal praktik dokter</h3>
              <p className="text-xl font-semibold">{dayName.getTodayDay()}</p>
              <div className="grid grid-cols-7 gap-6">
                {jadwal[dayName.getTodayDay().toLowerCase()].map((j) => {
                  return (
                    <div
                      key={j.id_jadwal}
                      className={`flex justify-between gap-2 rounded-lg border border-slate-300 p-2 transition-all ${selectedJadwal === j.id_jadwal ? "bg-primaryCol font-bold text-white" : j.sisa_kuota > 0 ? "cursor-pointer bg-white hover:bg-primaryCol hover:text-white" : "cursor-default bg-slate-300"}`}
                      onClick={() => {
                        setSisaKuota(j.sisa_kuota);
                        setSelectedJadwal(j.id_jadwal);
                      }}
                    >
                      <div>
                        <p>Ruang : {j.no_ruang}</p>
                        <p>
                          Jam :{formatTime(j.start_time)} -{" "}
                          {formatTime(j.end_time)}
                        </p>
                        <p>Sisa Kuota : {j.sisa_kuota}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : selectedDokter ? (
            <p>Tidak terdapat jadwal praktik untuk hari ini </p>
          ) : null}
          <Button
            onClick={() => handleSubmit()}
            type="submit"
            isDisabled={!selectedJadwal || sisaKuota <= 0}
            className={`${!!selectedJadwal && sisaKuota > 0 ? "bg-primaryCol text-white" : ""}`}
          >
            Submit
          </Button>
        </div>
      </div>
    </main>
  );
}
