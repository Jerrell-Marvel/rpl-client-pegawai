"use client";

import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";

export default function SideBarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    setToken(window.localStorage.getItem("token") ?? "");
  }, []);

  console.log(token);

  return (
    <div className={`${token ? "pl-[20vw]" : ""}`}>
      {token && <SideBar token={token} />}
      {children}
    </div>
  );
}
