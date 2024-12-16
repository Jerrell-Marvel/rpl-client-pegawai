"use client";

import Image from "next/image";
import LogoVida from "@/public/LogoVida.png";
import Background from "@/public/TempatAdministrasi.jpg";
import { SVGProps, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  DateInput,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Link from "next/link";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { AxiosInstance } from "@/utils/axiosInstance";
import { z } from "zod";

// Zod Schema
const RegistrationSchema = z
  .object({
    nama: z
      .string()
      .min(2, { message: "Nama harus memiliki minimal 2 karakter" })
      .max(255, { message: "Nama harus memiliki maksimal 255 karakter" }),
    no_telp: z
      .string()
      .regex(/^[0-9]+$/, { message: "Nomor telepon hanya boleh berisi angka" })
      .min(8, { message: "Nomor telepon minimal 8 digit" })
      .max(12, { message: "Nomor telepon maksimal 12 digit" }),
    email: z.string().email({ message: "Format email tidak valid" }),
    password: z
      .string()
      .min(8, { message: "Password minimal 8 karakter" })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: "Password harus mengandung huruf dan angka",
      }),
    confirm_password: z.string(),
    jenis_kelamin: z.enum(["laki", "perempuan"], {
      errorMap: () => ({ message: "Pilih jenis kelamin yang valid" }),
    }),
    tanggal_lahir: z.string().refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      },
      { message: "Tanggal lahir tidak valid" },
    ),
    id_kecamatan: z
      .number()
      .int()
      .positive({ message: "ID Kecamatan harus bilangan bulat positif" }),
    id_kelurahan: z
      .number()
      .int()
      .positive({ message: "ID Kelurahan harus bilangan bulat positif" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password tidak cocok",
    path: ["confirm_password"],
  });

type RegistrationFormData = z.infer<typeof RegistrationSchema>;

type KecamatanType = {
  id_kecamatan: number;
  nama_kecamatan: string;
};

type KelurahanType = {
  id_kelurahan: number;
  nama_kelurahan: string;
  id_kecamatan: number;
};

export default function SigninPage() {
  const router = useRouter();

  // Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(RegistrationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Submit Handler
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [errorSubmit, setErrorSubmit] = useState<string>("");

  const onSubmit = async (data: RegistrationFormData) => {
    const { id_kecamatan, confirm_password, ...formData } = data;

    const finalFormData = {
      ...formData,
      id_kelurahan: Number(formData.id_kelurahan),
    };

    try {
      setIsSubmiting(true);

      await AxiosInstance.post(
        "http://localhost:5000/api/pegawai/register",
        finalFormData,
      )
        .then((response) => {
          if (response.status === 200) {
            router.push("/masuk");
          }
        })
        .catch((err) => {
          setErrorSubmit("Gagal Melakukan Pendaftaran");
          console.error(err);
        });
    } catch (error) {
      setErrorSubmit("Gagal Melakukan Pendaftaran");
      console.error("Authentication error", error);
    } finally {
      setIsSubmiting(false);
    }
  };

  // Password Visibility
  const [isPWVisible, setIsPWVisible] = useState<boolean>(false);
  const [isCPWVisible, setIsCPWVisible] = useState<boolean>(false);

  const togglePWVisibility = () => setIsPWVisible(!isPWVisible);
  const toggleCPWVisibility = () => setIsCPWVisible(!isCPWVisible);

  // Kelurahan Kecamatan
  const [kecamatanList, setKecamatanList] = useState<KecamatanType[]>([]);

  const [kelurahanList, setKelurahanList] = useState<KelurahanType[]>([]);

  //roles
  const [selectedRole, setSelectedRole] = useState("");

  const currentKecamatan = watch("id_kecamatan");

  useEffect(() => {
    const fetchKecamatan = async () => {
      try {
        const response = await AxiosInstance.get(
          "http://localhost:5000/api/kecamatan",
        );
        setKecamatanList(response.data);
      } catch (error) {
        const err = error as AxiosError;
        console.error(err.message);
      }
    };

    fetchKecamatan();
  }, []);

  useEffect(() => {
    const fetchKelurahan = async () => {
      if (currentKecamatan) {
        try {
          const response = await AxiosInstance.get(
            `http://localhost:5000/api/kelurahan`,
          );
          const data = response.data.filter(
            (item: KelurahanType) => item.id_kecamatan === currentKecamatan,
          );
          setKelurahanList(data);
        } catch (error) {
          const err = error as AxiosError;
          console.error(err.message);
        }
      }
    };

    fetchKelurahan();
  }, [currentKecamatan]);

  return (
    <>
      <section className="flex min-h-screen justify-center p-10">
        <div className="flex w-1/2 flex-col items-center justify-evenly gap-10">
          {/* <Image src={LogoVida} alt="Logo Vida" className="h[40%] w-[40%]" /> */}
          <h2 className="text-3xl font-semibold text-primaryCol">
            Daftar Akun
          </h2>

          <div className="h-auto w-full px-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mb-4 flex flex-col gap-y-4 rounded-md bg-white p-6"
            >
              <div className="grid grid-cols-1 gap-4 text-base lg:grid-cols-2">
                <h5 className="col-span-2 text-center text-red-700">
                  {errorSubmit}
                </h5>

                {/* Nama */}
                <Input
                  errorMessage={errors.nama?.message}
                  isInvalid={!!errors.nama}
                  label="Nama Lengkap"
                  placeholder="John Doe"
                  {...register("nama")}
                  variant="bordered"
                />

                {/* Nomor Telepon */}
                <Input
                  errorMessage={errors.no_telp?.message}
                  isInvalid={!!errors.no_telp}
                  label="Nomor telepon"
                  placeholder="081234567890"
                  {...register("no_telp")}
                  variant="bordered"
                />

                {/* Email */}
                <Input
                  errorMessage={errors.email?.message}
                  isInvalid={!!errors.email}
                  label="Email"
                  placeholder="johndoe@gmail.com"
                  {...register("email")}
                  variant="bordered"
                />

                {/* Password */}
                <Input
                  {...register("password")}
                  errorMessage={errors.password?.message}
                  isInvalid={!!errors.password}
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-none"
                      type="button"
                      onClick={togglePWVisibility}
                    >
                      {isPWVisible ? (
                        <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                      ) : (
                        <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                      )}
                    </button>
                  }
                  label="Password"
                  placeholder="Masukkan Password"
                  type={isPWVisible ? "text" : "password"}
                  variant="bordered"
                />

                {/* Confirm Password */}
                <Input
                  {...register("confirm_password")}
                  errorMessage={errors.confirm_password?.message}
                  isInvalid={!!errors.confirm_password}
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleCPWVisibility}
                    >
                      {isCPWVisible ? (
                        <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                      ) : (
                        <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                      )}
                    </button>
                  }
                  label="Konfirmasi Password"
                  placeholder="Konfirmasi password"
                  type={isCPWVisible ? "text" : "password"}
                  variant="bordered"
                />

                {/* Tanggal Lahir */}

                <Controller
                  name="tanggal_lahir"
                  control={control}
                  render={({ field }) => (
                    <DateInput
                      label="Tanggal Lahir"
                      variant="bordered"
                      errorMessage={errors.tanggal_lahir?.message}
                      isInvalid={!!errors.tanggal_lahir}
                      onChange={(date) => {
                        if (date) {
                          const year = date.year;
                          let month = "0" + date.month;
                          let day = "0" + date.day;
                          month = month.substring(month.length - 2);
                          day = day.substring(day.length - 2);
                          field.onChange(`${year}-${month}-${day}`);
                        }
                      }}
                    />
                  )}
                />

                {/* Kecamatan */}
                <Controller
                  name="id_kecamatan"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      items={kecamatanList}
                      errorMessage={errors.id_kecamatan?.message}
                      isInvalid={!!errors.id_kecamatan}
                      label="Pilih Kecamatan"
                      variant="bordered"
                      placeholder="Pilih Kecamatan"
                      onChange={(e) => {
                        field.onChange(
                          e.target.value ? Number(e.target.value) : undefined,
                        );
                      }}
                    >
                      {(kecamatan) => (
                        <SelectItem
                          key={kecamatan.id_kecamatan}
                          value={kecamatan.id_kecamatan}
                        >
                          {kecamatan.nama_kecamatan}
                        </SelectItem>
                      )}
                    </Select>
                  )}
                />

                {/* Kelurahan */}
                <Controller
                  name="id_kelurahan"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      items={kelurahanList}
                      errorMessage={errors.id_kelurahan?.message}
                      isInvalid={!!errors.id_kelurahan}
                      placeholder="Pilih Kelurahan"
                      onChange={(e) => {
                        field.onChange(
                          e.target.value ? Number(e.target.value) : undefined,
                        );
                      }}
                      label="Pilih Kelurahan"
                      variant="bordered"
                    >
                      {(kelurahan) => (
                        <SelectItem
                          key={kelurahan.id_kelurahan}
                          value={kelurahan.id_kelurahan}
                        >
                          {kelurahan.nama_kelurahan}
                        </SelectItem>
                      )}
                    </Select>
                  )}
                />

                {/* Jenis Kelamin */}
                <Controller
                  name="jenis_kelamin"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      errorMessage={errors.jenis_kelamin?.message}
                      isInvalid={!!errors.jenis_kelamin}
                      label="Jenis Kelamin"
                      size="sm"
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <Radio value="perempuan">Perempuan</Radio>
                      <Radio value="laki">Laki-laki</Radio>
                    </RadioGroup>
                  )}
                />
              </div>
              <div>
                <button
                  className={`w-full rounded-full bg-primaryCol px-4 py-2 font-medium text-white transition focus:outline-none ${isSubmiting ? "cursor-default bg-slate-600" : "hover:bg-secondaryCol"}`}
                  type="submit"
                  disabled={isSubmiting}
                >
                  Daftar
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export const EyeSlashFilledIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
        fill="currentColor"
      />
      <path
        d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
        fill="currentColor"
      />
      <path
        d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
        fill="currentColor"
      />
      <path
        d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
        fill="currentColor"
      />
      <path
        d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const EyeFilledIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
        fill="currentColor"
      />
      <path
        d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
        fill="currentColor"
      />
    </svg>
  );
};
