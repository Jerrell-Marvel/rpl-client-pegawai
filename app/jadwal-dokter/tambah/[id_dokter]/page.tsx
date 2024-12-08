"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dokter, Jadwal } from "@/types/dokter";
import {
  Button,
  Select,
  SelectItem,
  TimeInput,
  Input,
} from "@nextui-org/react";
import {
  parseAbsoluteToLocal,
  Time,
  ZonedDateTime,
} from "@internationalized/date";
import { Ruang } from "@/types/ruang";
import { div } from "framer-motion/client";
import { formatTime } from "@/utils/time";

type JadwalPraktikResponse = Dokter & { jadwal_praktik: Jadwal[] };

type GroupedJadwal = { [key: string]: Jadwal[] };

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

const hari = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"];

function TambahJadwalDokterPage({ params }: { params: { id_dokter: string } }) {
  const [jadwal, setJadwal] = useState<GroupedJadwal>();
  const [dokter, setDokter] = useState<Dokter>();

  //hari
  const [selectedHari, setSelectedHari] = useState("");

  // start time, end time
  const [startTime, setStartTime] = useState<Time | null>(null);
  const [endTime, setEndTime] = useState<Time | null>(null);

  // ruang
  const [ruang, setRuang] = useState<Ruang[]>([]);
  const [selectedRuang, setSelectedRuang] = useState<string>("");

  //kuota
  const [kuota, setKuota] = useState<string>("0");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<JadwalPraktikResponse>(
        `http://localhost:5000/api/jadwal-praktik/${params.id_dokter}`,
      );

      const { data: dataRuang } = await axios.get<Ruang[]>(
        "http://localhost:5000/api/ruang",
      );
      setRuang(dataRuang);

      const { jadwal_praktik, ...dokterData } = data;
      const groupedJadwal = groupAndSortJadwal(jadwal_praktik);
      setJadwal(groupedJadwal);
      setDokter(dokterData);
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (selectedHari && startTime && endTime && selectedRuang) {
      const { data } = await axios.post(
        "http://localhost:5000/api/jadwal-praktik",
        {
          hari: selectedHari,
          start_time: formatTime(startTime.toString()),
          end_time: formatTime(endTime.toString()),
          kuota,
          id_pegawai: params.id_dokter,
          id_ruang: selectedRuang,
        },
      );

      if (jadwal) {
        const newJadwalHari = [...(jadwal[selectedHari] || [])];

        const noRuang = ruang.find((r) => {
          return r.id_ruang === Number(selectedRuang);
        })!.no_ruang;

        newJadwalHari.push({
          id_jadwal: data.id_jadwal,
          hari: selectedHari,
          start_time: startTime.toString(),
          end_time: endTime.toString(),
          kuota: Number(kuota),
          id_pegawai: Number(params.id_dokter),
          id_ruang: Number(selectedRuang),
          is_active: true,
          no_ruang: noRuang,
        });
        // sort ulang
        sortJadwal(newJadwalHari);
        const newJadwal = { ...jadwal };
        newJadwal[selectedHari] = newJadwalHari;
        setJadwal(newJadwal);
      }
    }
  };

  const handleDelete = async (hari: string, id_jadwal: number) => {
    const { data } = await axios.delete(
      `http://localhost:5000/api/jadwal-praktik/${id_jadwal}`,
    );

    if (jadwal) {
      const newJadwalHari = [...(jadwal[hari] || [])].filter(
        (j) => j.id_jadwal !== id_jadwal,
      );

      const newJadwal = { ...jadwal };
      newJadwal[hari] = newJadwalHari;
      setJadwal(newJadwal);
    }
  };

  return (
    <>
      <main className="">
        <div className="h-fit w-full bg-white p-8">
          {/* Dokter, todo : extracto to component ltr */}
          <div>
            <h3 className="text-3xl font-bold">{dokter?.nama}</h3>
            <p className="text-slate-400">{dokter?.nama_spesialisasi}</p>
            <p className="text-slate-400">{dokter?.no_telp}</p>
          </div>
          {/* Line, todo : extract to component ltr */}
          <div className="my-2 h-[1px] w-full bg-slate-400"></div>
          {/* <div>{JSON.stringify(jadwal)}</div> */}

          <div className="mt-6 grid grid-cols-7 gap-8">
            {jadwal &&
              hari.map((h) => (
                <div key={h} className="flex flex-col gap-2 rounded-sm">
                  <p className="text-lg font-semibold">{h}</p>
                  {jadwal[h]?.map((j) => {
                    return (
                      <div
                        key={j.id_jadwal}
                        className="flex justify-between gap-2 bg-slate-100 p-2"
                      >
                        <div>
                          <p>{j.no_ruang}</p>
                          <p>
                            {formatTime(j.start_time)} -{" "}
                            {formatTime(j.end_time)}
                          </p>
                          <p>Kuota : {j.kuota}</p>
                        </div>

                        <button
                          className="h-4 w-4 bg-red-500"
                          onClick={() => {
                            handleDelete(h, j.id_jadwal);
                          }}
                        ></button>
                      </div>
                    );
                  })}
                </div>
              ))}
          </div>

          <div className="mt-8 h-[1px] w-full bg-slate-400"></div>

          <h3 className="mt-4 text-xl font-bold">Tambah Jadwal</h3>

          <div className="mt-6 grid grid-cols-4 gap-4">
            <Select
              className=""
              label="Hari"
              placeholder="Select hari"
              selectedKeys={[selectedHari]}
              variant="bordered"
              onChange={(e) => setSelectedHari(e.target.value)}
            >
              {hari.map((h) => (
                <SelectItem key={h}>{h}</SelectItem>
              ))}
            </Select>
            <TimeInput
              label="Waktu Mulai"
              value={startTime}
              onChange={setStartTime}
              granularity="minute"
              hourCycle={24}
              variant="bordered"
            />

            <TimeInput
              label="Waktu Selesai"
              value={endTime}
              onChange={setEndTime}
              granularity="minute"
              variant="bordered"
              hourCycle={24}
            />

            <Select
              className=""
              label="Ruang"
              placeholder="Select ruang"
              selectedKeys={[selectedRuang]}
              variant="bordered"
              onChange={(e) => setSelectedRuang(e.target.value)}
            >
              {ruang.map((r) => (
                <SelectItem key={r.id_ruang}>{r.no_ruang}</SelectItem>
              ))}
            </Select>

            <Input
              label="Kuota"
              placeholder="Masukkan kuota"
              type="number"
              value={kuota}
              variant="bordered"
              onValueChange={setKuota}
            />
          </div>

          <div className="mt-4 flex justify-end">
            <Button className="bg-primary text-white" onClick={handleSubmit}>
              Simpan
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}

export default TambahJadwalDokterPage;
