export type Pendaftaran = {
  id_pasien: number;
  nama_pasien: string;
  id_pendaftaran: number;
  no_rkm_medis: string;
  nama_dokter: string;
  no_ruang: string;
  start_time: string;
  end_time: string;
};

export type PendaftaranWithAntrian = {
  antrian: number;
  id_rkm_med: number;
} & Pendaftaran;
