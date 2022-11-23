import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Account() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);
  return <div>Account</div>;
}
