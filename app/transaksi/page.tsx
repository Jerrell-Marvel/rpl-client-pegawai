"use client";

import PemanggilanCard from "@/components/PemanggilanCard";
import { PendaftaranWithAntrian, Pendaftaran } from "@/types/pendaftaran";
import { AxiosInstance } from "@/utils/axiosInstance";
import { useCurrencyFormatter } from "@/utils/useCurrencyFormatter";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  ScrollShadow,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { p } from "framer-motion/client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type PendaftaranWithBiaya = PendaftaranWithAntrian & {
  biaya_kunjungan: number;
};

const metodePembayaran = ["tunai", "ovo", "gopay", "bca"];

function TransaksiPage() {
  const current_date = new Date();
  const [pendaftaran, setPendaftaran] = useState<PendaftaranWithBiaya[]>([]);

  const [selectedPendaftaran, setSelectedPendaftaran] =
    useState<PendaftaranWithBiaya | null>(null);

  const [selectedMetode, setSelectedMetode] = useState("tunai");

  const { formatRupiah } = useCurrencyFormatter();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await AxiosInstance.get<PendaftaranWithBiaya[]>(
        "http://localhost:5000/api/transaksi/belum-bayar",
      );

      setPendaftaran(data);
    };

    fetchData();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = (pendaftaran: PendaftaranWithBiaya) => {
    setSelectedPendaftaran(pendaftaran);
    onOpen();
  };

  const handleClose = () => {
    setSelectedMetode("tunai");
    setSelectedPendaftaran(null);
    onClose();
  };

  const handleSelesaiClick = async () => {
    if (selectedPendaftaran) {
      const { data } = await AxiosInstance.post(
        `http://localhost:5000/api/transaksi/bayar/${selectedPendaftaran.id_pendaftaran}`,
        {
          metode: selectedMetode,
        },
      );

      const newPendaftaran = pendaftaran.filter(
        (p) => p.id_pendaftaran !== selectedPendaftaran?.id_pendaftaran,
      );

      setPendaftaran(newPendaftaran);
      handleClose();
    }
  };

  return (
    <main>
      <div className="border-b border-black bg-white p-4 pl-8 shadow-md">
        <p className="text-m text-xs text-gray-500">
          {current_date.toDateString()}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-800">
          Diagnosa Pasien
        </h1>
      </div>
      <div className="flex flex-col items-center gap-8 bg-gray-50 py-4">
        <ScrollShadow
          hideScrollBar
          className="grid max-h-[740px] w-full max-w-[1200px] overflow-y-auto sm:grid-cols-1 lg:grid-cols-2"
        >
          {pendaftaran.map((p) => {
            return (
              <>
                <div className="mx-[20px] my-[20px]">
                  <PemanggilanCard pemanggilan={p}>
                    <span>{formatRupiah(p.biaya_kunjungan)}</span>
                    <Button onClick={() => handleOpen(p)}></Button>
                  </PemanggilanCard>
                </div>
              </>
            );
          })}
        </ScrollShadow>
      </div>

      <Modal backdrop="blur" isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p>{selectedPendaftaran!.nama_pasien}</p>
                <p>{selectedPendaftaran!.nama_dokter}</p>

                <p>
                  {selectedPendaftaran!.start_time} -{" "}
                  {selectedPendaftaran!.end_time}
                </p>

                <p>{formatRupiah(selectedPendaftaran!.biaya_kunjungan)}</p>
              </ModalHeader>
              <ModalBody>
                <RadioGroup
                  label="Pilih metode pembayaran"
                  value={selectedMetode}
                  onValueChange={setSelectedMetode}
                >
                  {metodePembayaran.map((mp) => {
                    return (
                      <Radio value={mp} key={mp}>
                        {mp}
                      </Radio>
                    );
                  })}
                </RadioGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button color="primary" onPress={handleSelesaiClick}>
                  Selesai
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
}

export default TransaksiPage;
