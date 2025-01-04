"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const message =
    searchParams.get("message") ||
    "You are not allowed to access this resource";

  return (
    <div className="flex min-h-screen flex-col items-center bg-blue-50">
      <h1 className="absolute pt-40 text-7xl font-semibold text-red-500">
        Unauthorized Error!
      </h1>
      <p className="absolute pt-60 text-2xl capitalize">{message}</p>
      <div className="flex h-screen flex-col items-center justify-center">
        <Link href={"/"} className="text-xl text-blue-500 underline">
          Go Back To Home
        </Link>
      </div>
    </div>
  );
}
