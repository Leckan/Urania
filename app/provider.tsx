"use client";
import React, { use, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

function Provider({ children }: { children: React.ReactNode }) {
  const { data } = useSession();

  useEffect(() => {
    data?.user?.email && createNewUser();
  }, [data]);

  const createNewUser = async () => {
    if (!data?.user?.email) return;
    try {
      const result =await axios.post("/api/user", {});
      console.log("User created successfully:", result.data);
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  return <div>{children}</div>;
}

export default Provider;
