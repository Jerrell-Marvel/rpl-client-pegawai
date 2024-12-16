export type Dokter = {
  id_pegawai: number;
  nama: string;
  no_telp: string;
  email: string;
  password: string;
  nip: string;
  created_at: string;
  is_active: boolean;
  id_kelurahan: number;
  role: "dokter";
  biaya_kunjungan: number;
  id_spesialisasi: number;
  nama_spesialisasi: string;
};

export type Jadwal = {
  id_jadwal: number;
  hari: string;
  start_time: string;
  end_time: string;
  kuota: number;
  id_pegawai: number;
  id_ruang: number;
  is_active: boolean;
  no_ruang: string;
  sisa_kuota: number;
};
