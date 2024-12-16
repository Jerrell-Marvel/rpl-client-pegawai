"use client";

import { Input, Radio, RadioGroup } from "@nextui-org/react";
import React, { ChangeEvent, useEffect, useState } from "react";

import { AxiosInstance } from "@/utils/axiosInstance";
import CardDokter, { CardDokterProps } from "@/components/CardDokter";

export const SearchIcon = (props: { className: string }) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13 13L10.1 10.1M11.6667 6.33333C11.6667 9.27885 9.27885 11.6667 6.33333 11.6667C3.38781 11.6667 1 9.27885 1 6.33333C1 3.38781 3.38781 1 6.33333 1C9.27885 1 11.6667 3.38781 11.6667 6.33333Z"
        stroke="#046E89"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default function DokterPage() {
  const [filterText, setFilterText] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("nama");
  const [jadwal, setJadwal] = useState<CardDokterProps[]>([]);
  const [jadwalFiltered, setJadwalFiltered] = useState<CardDokterProps[]>([]);

  useEffect(() => {
    const getData = async () => {
      AxiosInstance.get<CardDokterProps[]>(
        "http://localhost:5000/api/pegawai/dokter",
      ).then((response) => {
        setJadwal(response.data);
        setJadwalFiltered(response.data);
      });
    };

    getData();
  }, []);

  useEffect(() => {
    jadwalFilterHandler(filterText);
  }, [filterText, filterType]);

  const jadwalFilterHandler = (filterValue: string) => {
    console.log(filterType);
    switch (filterType) {
      case "nama":
        {
          const newJadwal = jadwal.filter((item) =>
            item.nama.toLowerCase().includes(filterValue.toLowerCase()),
          );
          setJadwalFiltered(newJadwal);
        }
        break;
      case "spesialisasi":
        {
          const newJadwal = jadwal.filter((item) =>
            item.nama_spesialisasi
              .toLowerCase()
              .includes(filterValue.toLowerCase()),
          );
          setJadwalFiltered(newJadwal);
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="p-10">
        <h4 className="my-6 text-center text-3xl font-bold text-primaryCol">
          List Dokter
        </h4>
        <div className="flex flex-col gap-3">
          <Input
            placeholder="Ketik nama dokter atau spesialisasi"
            startContent={
              <SearchIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
            }
            type="text"
            className="max-w-96 text-primaryCol"
            isClearable
            onClear={() => setFilterText("")}
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
            }}
          />
          <RadioGroup
            label="Filter Berdasarkan :"
            className="flex flex-row"
            size="md"
            value={filterType}
            onValueChange={setFilterType}
          >
            <Radio value="nama">Nama Dokter</Radio>
            <Radio value="spesialisasi">Spesialisasi</Radio>
          </RadioGroup>
        </div>
        <div className="grid grid-cols-2 gap-10 py-10">
          {jadwalFiltered.map((item: CardDokterProps, index: number) => {
            return <CardDokter {...item} key={index} />;
          })}
        </div>
      </div>
    </>
  );
}
